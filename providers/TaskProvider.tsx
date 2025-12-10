import { ReactNode, useState } from "react";
import { Tarea, TaskContext } from "../Context/TaskContext";
import { taskService } from "../services/tasks";

export function TaskProvider({ children }: { children: ReactNode }) {
  const [lista, setLista] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(false);

  const cargarTareas = async () => {
    try {
      setCargando(true);
      const tareas = await taskService.listarTareas();
      setLista(tareas);
    } catch (error: any) {
      console.error("Error cargando tareas:", error);
      setLista([]);
    } finally {
      setCargando(false);
    }
  };

  const agregarTarea = async (tarea: {
    titulo: string;
    descripcion?: string;
    imagen?: string;
    ubicacion?: { lat: number; lng: number };
    completed: boolean;
  }) => {
    try {
      const nuevaTarea = await taskService.crearTarea(tarea);
      setLista((prev) => [...prev, nuevaTarea]);
    } catch (error) {
      console.error("Error agregando tarea:", error);
      throw error;
    }
  };

  const eliminarTarea = async (id: string) => {
    try {
      await taskService.eliminarTarea(id);
      setLista((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error eliminando tarea:", error);
      throw error;
    }
  };

  const editarTarea = async (
    id: string,
    cambios: {
      titulo?: string;
      descripcion?: string;
      imagen?: string;
      ubicacion?: { lat: number; lng: number };
      completed?: boolean;
    }
  ) => {
    try {
      const tareaActualizada = await taskService.actualizarTarea(id, cambios);
      setLista((prev) =>
        prev.map((t) => (t.id === id ? tareaActualizada : t))
      );
    } catch (error) {
      console.error("Error editando tarea:", error);
      throw error;
    }
  };

  return (
    <TaskContext.Provider
      value={{ lista, cargando, cargarTareas, agregarTarea, eliminarTarea, editarTarea }}
    >
      {children}
    </TaskContext.Provider>
  );
}