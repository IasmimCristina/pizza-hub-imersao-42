import { createContext, useContext, useState } from "react";
import type { Recipe } from "../../domain/entities/Recipe";

type RecipeListsContextType = {
  favorites: Recipe[];
  hated: Recipe[];
  addToFavorites: (recipe: Recipe) => void;
  addToHated: (recipe: Recipe) => void;
  removeFromFavorites: (id: string) => void;
  removeFromHated: (id: string) => void;
};

export const RecipeListsContext = createContext<
  RecipeListsContextType | undefined
>(undefined);

export const RecipeListsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [hated, setHated] = useState<Recipe[]>([]);

  const addToFavorites = (recipe: Recipe) => {
    setFavorites((previousFavorites) =>
      previousFavorites.some(
        (favoriteRecipe) => favoriteRecipe.title === recipe.title
      )
        ? previousFavorites
        : [...previousFavorites, recipe]
    );
    setHated((previousHated) =>
      previousHated.filter((hatedRecipe) => hatedRecipe.title !== recipe.title)
    );
  };

  const addToHated = (recipe: Recipe) => {
    setHated((previousHated) =>
      previousHated.some((hatedRecipe) => hatedRecipe.title === recipe.title)
        ? previousHated
        : [...previousHated, recipe]
    );
    setFavorites((previousFavorites) =>
      previousFavorites.filter(
        (favoriteRecipe) => favoriteRecipe.title !== recipe.title
      )
    );
  };

  const removeFromFavorites = (title: string) => {
    setFavorites((previousFavorites) =>
      previousFavorites.filter(
        (favoriteRecipe) => favoriteRecipe.title !== title
      )
    );
  };

  const removeFromHated = (title: string) => {
    setHated((previousHated) =>
      previousHated.filter((hatedRecipe) => hatedRecipe.title !== title)
    );
  };

  return (
    <RecipeListsContext.Provider
      value={{
        favorites,
        hated,
        addToFavorites,
        addToHated,
        removeFromFavorites,
        removeFromHated,
      }}
    >
      {children}
    </RecipeListsContext.Provider>
  );
};

export const useRecipeLists = () => {
  const ctx = useContext(RecipeListsContext);
  if (!ctx)
    throw new Error("useRecipeLists must be used within RecipeListsProvider!");
  return ctx;
};
