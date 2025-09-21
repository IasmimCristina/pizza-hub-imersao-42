import type { Recipe } from "./Recipe";

export type User = {
  name: string;
  // Listas de preferências:
  favorites: Recipe[];
  hated: Recipe[];
};
