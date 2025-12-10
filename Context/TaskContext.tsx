import { createContext } from "react";

export interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string;
  imagen?: string;
  ubicacion?: { lat: number; lng: number };
  completed: boolean;
  userId: string;
  createdAt: string;
}

export interface TaskContextType {
  lista: Tarea[];
  cargando: boolean;
  cargarTareas: () => Promise<void>;
  agregarTarea: (tarea: Omit<Tarea, "id" | "createdAt" | "userId">) => Promise<void>;
  eliminarTarea: (id: string) => Promise<void>;
  editarTarea: (id: string, tarea: Partial<Tarea>) => Promise<void>;
}

export const TaskContext = createContext<TaskContextType>({
  lista: [],
  cargando: false,
  cargarTareas: async () => {},
  agregarTarea: async () => {},
  eliminarTarea: async () => {},
  editarTarea: async () => {},
});