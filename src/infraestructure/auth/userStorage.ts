import type { User } from "../../domain/entities/User";

const STORAGE_KEY = "pizza-hub-user";
const USER_LISTS_KEY = "pizza-hub-user-lists";

export function saveUserToStorage(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  // Salva listas por nome de usuário
  if (user.name) {
    const allLists = getAllUserLists();
    allLists[user.name] = {
      favorites: user.favorites,
      hated: user.hated,
    };
    localStorage.setItem(USER_LISTS_KEY, JSON.stringify(allLists));
  }
}

export function getUserFromStorage(): User | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}

export function clearUserFromStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

function getAllUserLists(): Record<string, { favorites: User["favorites"]; hated: User["hated"] }> {
  const data = localStorage.getItem(USER_LISTS_KEY);
  if (!data) return {};
  try {
    return JSON.parse(data);
  } catch {
    return {};
  }
}

export function getUserListsByName(name: string): { favorites: User["favorites"]; hated: User["hated"] } {
  const allLists = getAllUserLists();
  return allLists[name] || { favorites: [], hated: [] };
}
