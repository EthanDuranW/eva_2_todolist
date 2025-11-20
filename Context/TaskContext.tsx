import { createContext } from "react";

export type Ubicacion = {
  lat: number;
  lng: number;
};

export type Tarea = {
  id: string;
  titulo: string;
  descripcion: string;
  imagen?: string;
  ubicacion?: Ubicacion;
};

export type TaskContextType = {
  lista: Tarea[];
  agregarTarea: (tarea: {
    titulo: string;
    descripcion: string;
    imagen?: string;
    ubicacion?: Ubicacion;
  }) => void;

  eliminarTarea: (id: string) => void;

  editarTarea: (
    id: string,
    cambios: {
      titulo?: string;
      descripcion?: string;
      imagen?: string;
      ubicacion?: Ubicacion;
    }
  ) => void;
};

export const TaskContext = createContext<TaskContextType>({
  lista: [],
  agregarTarea: () => {},
  eliminarTarea: () => {},
  editarTarea: () => {},
});