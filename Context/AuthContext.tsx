import { createContext } from "react";

interface Usuario {
  id: string;
  name: string;
  email: string;
}

export const AuthContext = createContext<{
  estaAutenticado: boolean;
  usuario: Usuario | null;
  cargando: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  registro: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  userEmail: string | null;
}>({
  estaAutenticado: false,
  usuario: null,
  cargando: true,
  login: async () => false,
  registro: async () => false,
  logout: async () => {},
  userEmail: null,
});