import { api } from './api';
import { authService } from './auth';

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

interface CrearTareaDto {
  titulo: string;
  descripcion?: string;
  imagen?: string;
  ubicacion?: { lat: number; lng: number };
}

interface ActualizarTareaDto {
  titulo?: string;
  descripcion?: string;
  imagen?: string;
  ubicacion?: { lat: number; lng: number };
  completed?: boolean;
}

export const taskService = {
  async obtenerEncabezados() {
    const token = await authService.obtenerToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  },

  async listarTareas(): Promise<Tarea[]> {
    const encabezados = await this.obtenerEncabezados();
    const respuesta = await api.request('/tasks', {
      method: 'GET',
      headers: encabezados,
    });
    return Array.isArray(respuesta) ? respuesta : (respuesta.tasks || []);
  },

  async obtenerTarea(id: string): Promise<Tarea> {
    const encabezados = await this.obtenerEncabezados();
    return await api.request(`/tasks/${id}`, {
      method: 'GET',
      headers: encabezados,
    });
  },

  async crearTarea(tarea: CrearTareaDto): Promise<Tarea> {
    const encabezados = await this.obtenerEncabezados();
    return await api.request('/tasks', {
      method: 'POST',
      headers: encabezados,
      body: JSON.stringify(tarea),
    });
  },

  async actualizarTarea(id: string, cambios: ActualizarTareaDto): Promise<Tarea> {
    const encabezados = await this.obtenerEncabezados();
    return await api.request(`/tasks/${id}`, {
      method: 'PATCH',
      headers: encabezados,
      body: JSON.stringify(cambios),
    });
  },

  async eliminarTarea(id: string): Promise<void> {
    const encabezados = await this.obtenerEncabezados();
    await api.request(`/tasks/${id}`, {
      method: 'DELETE',
      headers: encabezados,
    });
  },

  async subirImagen(uri: string): Promise<string> {
    try {
      const token = await authService.obtenerToken();
      
      const nombreArchivo = uri.split('/').pop() || 'imagen.jpg';
      const tipoArchivo = nombreArchivo.split('.').pop() || 'jpg';
      
      const formData = new FormData();
      formData.append('image', {
        uri,
        name: nombreArchivo,
        type: `image/${tipoArchivo}`,
      } as any);

      console.log('Subiendo imagen a:', `${api.baseUrl}/upload`);
      console.log('URI de la imagen:', uri);

      const respuesta = await fetch(`${api.baseUrl}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      console.log('Respuesta del servidor:', respuesta.status, respuesta.statusText);

      if (!respuesta.ok) {
        const textoError = await respuesta.text();
        console.error('Error del servidor:', textoError);
        let errorObj;
        try {
          errorObj = JSON.parse(textoError);
        } catch {
          errorObj = { message: textoError || 'Error al subir imagen' };
        }
        throw new Error(errorObj.message || errorObj.error || 'Error al subir imagen');
      }

      const datos = await respuesta.json();
      console.log('Datos recibidos:', datos);
      return datos.url || datos.imageUrl || datos.image;
    } catch (error: any) {
      console.error('Error completo en subirImagen:', error);
      throw new Error(error.message || 'No se pudo subir la imagen');
    }
  },
};
