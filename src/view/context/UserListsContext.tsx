import { createContext, useContext, useState, useEffect } from "react";
import type { Recipe } from "../../domain/entities/Recipe";
import { useAuth } from "./AuthContext";
import { saveUserToStorage } from "../../infraestructure/auth/userStorage";


type UserListsContextType = {
  favorites: Recipe[];
  hated: Recipe[];
  addToFavorites: (recipe: Recipe) => void;
  addToHated: (recipe: Recipe) => void;
  removeFromFavorites: (title: string) => void;
  removeFromHated: (title: string) => void;
};

const UserListsContext = createContext<UserListsContextType | undefined>(
  undefined
);

export const UserListsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Recipe[]>(user?.favorites ?? []);
  const [hated, setHated] = useState<Recipe[]>(user?.hated ?? []);

  // Limpa listas ao trocar de usuário
  useEffect(() => {
    setFavorites(user?.favorites ?? []);
    setHated(user?.hated ?? []);
  }, [user]);

    // Salva listas no usuário e persiste no storage
  useEffect(() => {
    if (user) {
      const updatedUser = { ...user, favorites, hated };
      saveUserToStorage(updatedUser);
    }
  }, [favorites, hated, user]);

  const addToFavorites = (recipe: Recipe) => {
    setFavorites((prev) =>
      prev.some((favRecipe) => favRecipe.title === recipe.title)
        ? prev
        : [...prev, recipe]
    );
    setHated((prev) =>
      prev.filter((hatedRecipe) => hatedRecipe.title !== recipe.title)
    );
  };

  const addToHated = (recipe: Recipe) => {
    setHated((prev) =>
      prev.some((hatedRecipe) => hatedRecipe.title === recipe.title)
        ? prev
        : [...prev, recipe]
    );
    setFavorites((prev) =>
      prev.filter((favRecipe) => favRecipe.title !== recipe.title)
    );
  };

  const removeFromFavorites = (title: string) => {
    setFavorites((prev) =>
      prev.filter((favRecipe) => favRecipe.title !== title)
    );
  };

  const removeFromHated = (title: string) => {
    setHated((prev) =>
      prev.filter((hatedRecipe) => hatedRecipe.title !== title)
    );
  };

  return (
    <UserListsContext.Provider
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
    </UserListsContext.Provider>
  );
};

export const useUserLists = () => {
  const ctx = useContext(UserListsContext);
  if (!ctx)
    throw new Error("useUserLists must be used within UserListsProvider!");
  return ctx;
};
