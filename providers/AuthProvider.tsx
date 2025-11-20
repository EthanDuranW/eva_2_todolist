import { ReactNode, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Validar formato de email
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const login = (email: string, pass: string) => {
    // Validar que el email tenga formato correcto
    if (!isValidEmail(email)) {
      console.error("Email inválido");
      return false;
    }

    // Validar que la contraseña no esté vacía
    if (!pass || pass.trim() === "") {
      console.error("Contraseña requerida");
      return false;
    }

    // Si ambos campos son válidos, permitir login
    setIsLogged(true);
    setUserEmail(email);
    return true;
  };

  const logout = () => {
    setIsLogged(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};