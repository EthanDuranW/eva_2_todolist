import { createContext } from "react";

export type AuthContextType = {
  isLogged: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  login: () => false,
  logout: () => {},
});