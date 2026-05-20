export interface CartItem {
  id: string;
  name: string;
  type: "taco" | "torta";
  meat: string;
  price: number;
  quantity: number;
  onion: boolean;
  cilantro: boolean;
  pineapple: boolean; // only pastor
  salsa: "verde" | "roja" | "ninguna" | "ambas";
  notes?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export const DELIVERY_ZONES = [
  "Coatepec",
  "El Grande",
  "La Isleta",
  "Alborada",
  "Tuzamapan",
  "Casa Geo"
] as const;

export type DeliveryZoneType = typeof DELIVERY_ZONES[number];
