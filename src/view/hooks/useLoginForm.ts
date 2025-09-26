import { useState } from "react";
import { useUser } from "../context/UserContext";

// Separação de responsbailidades - Lógica.
export const useLoginForm = (onSuccess?: () => void) => {
  // Utilização do contexto.
  const { login } = useUser();

  //  O custom Hook controla o estado dos campos
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  //  e gerencia os erros:
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(name, password)) {
      setError("Senha inválida!");
    } else {
      setError("");
      if (onSuccess) onSuccess();
    }
  };

  return {
    name,
    setName,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};
