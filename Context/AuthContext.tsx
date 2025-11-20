import { createContext } from "react";

export const AuthContext = createContext<{
  isLogged: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  userEmail: string | null;
}>({
  isLogged: false,
  login: () => false,
  logout: () => {},
  userEmail: null,
});