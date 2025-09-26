import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../../domain/entities/User";
import type { Recipe } from "../../domain/entities/Recipe";
import { login as loginService } from "../../infraestructure/auth/authService";
import {
  saveUserToStorage,
  getUserFromStorage,
  clearUserFromStorage,
  getUserListsByName,
} from "../../infraestructure/auth/storageService";

type UserContextType = {
  user: User | null;
  login: (name: string, password: string) => boolean;
  logout: () => void;
  addToFavorites: (recipe: Recipe) => void;
  addToHated: (recipe: Recipe) => void;
  removeFromFavorites: (title: string) => void;
  removeFromHated: (title: string) => void;
};

// Centralização do estado global:
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Executa apenas uma vez na criação do estado
    return getUserFromStorage();
  });

  // Sincronização entre abas:
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "pizza-hub-user") {
        // Logout se foi removido:
        const newUser = event.newValue ? JSON.parse(event.newValue) : null;
        setUser(newUser);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const saveUser = (userData: User) => {
    setUser(userData);
    saveUserToStorage(userData);
  };

  const login = (name: string, password: string): boolean => {
    const loggedUser = loginService(name, password);
    if (loggedUser) {
      // Carregar listas salvas do usuário se existirem
      const savedLists = getUserListsByName(name);
      const userWithLists: User = {
        ...loggedUser,
        favorites:
          savedLists.favorites.length > 0
            ? savedLists.favorites
            : loggedUser.favorites,
        hated:
          savedLists.hated.length > 0 ? savedLists.hated : loggedUser.hated,
      };
      saveUser(userWithLists);
      return true;
    }
    return false;
  };

  const logout = (): void => {
    clearUserFromStorage();
    setUser(null);
  };

  // Use prev sempre que o novo estado depender do estado anterior:
  const addToFavorites = (recipe: Recipe): void => {
    if (!user) return;
    const updatedUser = {
      ...user,
      favorites: user.favorites.some(
        (favRecipe) => favRecipe.title === recipe.title
      )
        ? user.favorites
        : [...user.favorites, recipe],
      hated: user.hated.filter(
        (hatedRecipe) => hatedRecipe.title !== recipe.title
      ),
    };
    saveUser(updatedUser);
  };

  const addToHated = (recipe: Recipe): void => {
    if (!user) return;
    const updatedUser = {
      ...user,
      hated: user.hated.some(
        (hatedRecipe) => hatedRecipe.title === recipe.title
      )
        ? user.hated
        : [...user.hated, recipe],
      favorites: user.favorites.filter(
        (favRecipe) => favRecipe.title !== recipe.title
      ),
    };
    saveUser(updatedUser);
  };

  const removeFromFavorites = (title: string): void => {
    if (!user) return;
    const updatedUser = {
      ...user,
      favorites: user.favorites.filter(
        (favRecipe) => favRecipe.title !== title
      ),
    };
    saveUser(updatedUser);
  };

  const removeFromHated = (title: string): void => {
    if (!user) return;
    const updatedUser = {
      ...user,
      hated: user.hated.filter((hatedRecipe) => hatedRecipe.title !== title),
    };
    saveUser(updatedUser);
  };

  return (
    // O provider irá encapsular o app.
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

// Custom Hook para utilização do contexto:
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider!");
  return ctx;
};
