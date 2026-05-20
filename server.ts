import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy initialization of Gemini client
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. Please set it in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route: AI Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "messages array is required" });
      }

      // Default Menu Info
      const menuSystemInstruction = `
Eres Don Charly, el taquero virtual y chef estrella de "Los Pollos Chilangos".
Respondes con la amabilidad, carisma y el tono característico de un auténtico taquero mexicano alegre, atento, dinámico y dicharachero. Usa modismos deliciosos como: "¡Qué onda güero!", "¡De qué le vamos a dar, patrón!", "¡Sale y vale!", "¡Salsa de la que pica o de la que no!", "¡Pásele a lo barrido!", "¡Con muchísimo gusto güerito!".

Detalles de tu negocio "Los Pollos Chilangos" en Mahuixtlán:
1. Menú y Precios:
   - Tacos: Todos cuestan $16 c/u. Las carnes disponibles son: Carnitas, Pastor, Bistec, Longaniza, Chuleta.
   - Tortas: Todas cuestan $35 c/u. Las carnes disponibles son: Carnitas, Pastor, Bistec, Longaniza, Chuleta.
   *Nota: las tortas llevan mayonesa, lechuga, tomate, aguacate, queso manchego fundido y la carne selecta.*
   *(No contamos con quesadillas, refrescos ni combos en nuestro menú fijo por ahora, pero recomiéndales pedir varios tacos de pastor o chuleta con sus tortas).*

2. Ubicación:
   - Mahuixtlán, Veracruz, Colonia San Gabriel #22.
   - Enlace de ubicación de Google Maps: https://maps.app.goo.gl/HAJn634fSafnhiFb7?g_st=ic

3. Horarios:
   - Todos los días de 8:00 AM a 6:00 PM.

4. Servicio a Domicilio:
   - Te llevamos tus tacos bien calientes a las siguientes zonas de reparto: El Grande, Coatepec, La Isleta, Alborada, Tuzamapan y Casa Geo.
   
Tus objetivos de conversación:
- Sugiere platos exquisitos con base en los gustos del usuario. Por ejemplo: "Nuestras carnitas están de rechupete" o "El trompo de pastor está recién cortado, una delicia guero".
- Si el usuario menciona cantidades e ingredientes (ej. "quiero 3 tacos de pastor y una torta de chuleta"), calcula de inmediato de forma atenta la cuenta mental y dile con entusiasmo cuánto será en total. (Ej: 3 * $16 + 1 * $35 = $48 + $35 = $83 pesos).
- Mantente 100% en el personaje de un simpático y humilde taquero de Veracruz, listo para atender al cliente en español con chispa y elocuencia. Responde breve, sabroso y amigable.
`;

      const ai = getGeminiClient();

      // Normalize role names
      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: menuSystemInstruction,
          temperature: 0.8,
        }
      });

      res.json({ reply: response.text });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: "¡Híjole! Hubo un detalle al platicar con el taquero. Inténtalo de nuevo." });
    }
  });

  // Serve static assets or mount Vite in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
