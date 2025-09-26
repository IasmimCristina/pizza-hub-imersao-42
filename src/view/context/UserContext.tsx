import { createContext, useContext, useState } from "react";
import type { User } from "../../domain/entities/User";
import type { Recipe } from "../../domain/entities/Recipe";
import { login as loginService } from "../../infraestructure/auth/authService";

type UserContextType = {
  user: User | null;
  login: (name: string, password: string) => boolean;
  logout: () => void;

  addToFavorites: (recipe: Recipe) => void;
  addToHated: (recipe: Recipe) => void;
  removeFromFavorites: (title: string) => void;
  removeFromHated: (title: string) => void;
};

//  Centralização do estado global:
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, password: string) => {
    const loggedUser = loginService(name, password);
    if (loggedUser) {
      setUser(loggedUser);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  // Use prev sempre que o novo estado depender do estado anterior:
  const addToFavorites = (recipe: Recipe) => {
    if (!user) return;

    setUser((prev) => {
      if (!prev) return prev;

      const favorites = prev.favorites.some(
        (favRecipe) => favRecipe.title === recipe.title
      )
        ? prev.favorites
        : [...prev.favorites, recipe];

      const hated = prev.hated.filter(
        (hatedRecipe) => hatedRecipe.title !== recipe.title
      );

      return { ...prev, favorites, hated };
    });
  };

  const addToHated = (recipe: Recipe) => {
    if (!user) return;

    setUser((prev) => {
      if (!prev) return prev;

      const hated = prev.hated.some(
        (hatedRecipe) => hatedRecipe.title === recipe.title
      )
        ? prev.hated
        : [...prev.hated, recipe];

      const favorites = prev.favorites.filter(
        (favRecipe) => favRecipe.title !== recipe.title
      );

      return { ...prev, favorites, hated };
    });
  };

  const removeFromFavorites = (title: string) => {
    if (!user) return;

    setUser((prev) => {
      if (!prev) return prev;
      const favorites = prev.favorites.filter(
        (favRecipe) => favRecipe.title !== title
      );
      return { ...prev, favorites };
    });
  };

  const removeFromHated = (title: string) => {
    if (!user) return;

    setUser((prev) => {
      if (!prev) return prev;
      const hated = prev.hated.filter(
        (hatedRecipe) => hatedRecipe.title !== title
      );
      return { ...prev, hated };
    });
  };

  return (
    //  O provider irá encapsular o app.
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        addToFavorites,
        addToHated,
        removeFromFavorites,
        removeFromHated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

//  Custom Hook para utilização do contexto:
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider!");
  return ctx;
};
