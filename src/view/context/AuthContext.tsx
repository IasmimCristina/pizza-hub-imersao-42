import { createContext, useContext, useState } from "react";
import type { User } from "../../domain/entities/User";
import { login as loginService } from "../../infraestructure/auth/authService";

type AuthContextType = {
  user: User | null;
  login: (name: string, password: string) => boolean;
  logout: () => void;
};

//  Centralização do estado global:
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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

  return (
    //  O provider irá encapsular o app.
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
//  Custom Hook para utilização do contexto:
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider!");
  return ctx;
};
