export type InteriorType = "interior" | "hobby";

export type InteriorName =
  | "books"
  | "movie"
  | "music"
  | "picture"
  | "plant"
  | "sofa"
  | "windowDay"
  | "windowNight"
  | "youtube";

export interface Interior {
  id: number;
  name: InteriorName;
  src: string;
  type: InteriorType;
  position: { x: number; y: number };
  isVisible: boolean;
}
