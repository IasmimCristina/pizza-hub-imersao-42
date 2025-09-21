import type { User } from "../../domain/entities/User";

export function login(name: string, password: string): User | null {
  if (password === "password" && name.trim()) {
    return { name, favorites: [], hated: [] };
  }
  return null;
}
