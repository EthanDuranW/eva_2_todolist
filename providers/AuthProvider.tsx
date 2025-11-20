import { ReactNode, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);

  // Usuario en duro
  const USER = "admin";
  const PASS = "1234";

  const login = (user: string, pass: string) => {
    if (user === USER && pass === PASS) {
      setIsLogged(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};