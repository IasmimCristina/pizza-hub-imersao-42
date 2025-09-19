import type { Recipe } from "./Recipe";

export type RecipeListType = "favorite" | "hated";

export type RecipeLists = {
  favorite: Recipe[];
  hated: Recipe[];
};
