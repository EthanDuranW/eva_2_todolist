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
    const respuesta = await api.request('/todos', {
      method: 'GET',
      headers: encabezados,
    });
    
    // Extraer el array de tareas
    const datos = respuesta.data || respuesta.todos || respuesta.tasks || respuesta;
    const tareas = Array.isArray(datos) ? datos : [];
    
    // Mapear cada tarea del inglés al español
    return tareas.map((tarea: any) => {
      console.log("🔄 Mapeando tarea del backend:", JSON.stringify(tarea, null, 2));
      
      const tareaMapeada = {
        id: tarea.id,
        titulo: tarea.title,
        descripcion: tarea.description,
        imagen: tarea.photoUri,
        ubicacion: tarea.location ? {
          lat: tarea.location.latitude,
          lng: tarea.location.longitude,
        } : undefined,
        completed: tarea.completed,
        userId: tarea.userId,
        createdAt: tarea.createdAt,
      };
      
      console.log("✅ Tarea mapeada a español:", JSON.stringify(tareaMapeada, null, 2));
      return tareaMapeada;
    });
  },

  async obtenerTarea(id: string): Promise<Tarea> {
    const encabezados = await this.obtenerEncabezados();
    const respuesta = await api.request(`/todos/${id}`, {
      method: 'GET',
      headers: encabezados,
    });
    
    // Mapear respuesta del inglés al español
    const datos = respuesta.data || respuesta;
    return {
      id: datos.id,
      titulo: datos.title,
      descripcion: datos.description,
      imagen: datos.photoUri,
      ubicacion: datos.location ? {
        lat: datos.location.latitude,
        lng: datos.location.longitude,
      } : undefined,
      completed: datos.completed,
      userId: datos.userId,
      createdAt: datos.createdAt,
    };
  },

  async crearTarea(tarea: CrearTareaDto): Promise<Tarea> {
    const encabezados = await this.obtenerEncabezados();
    
    // Mapear campos del español al inglés para la API
    const tareaAPI: any = {
      title: tarea.titulo,
      completed: false,
    };
    
    // El backend usa "photoUri" para las imágenes
    if (tarea.imagen) {
      tareaAPI.photoUri = tarea.imagen;
    }
    
    // Mapear ubicación: { lat, lng } -> { latitude, longitude }
    if (tarea.ubicacion) {
      tareaAPI.location = {
        latitude: tarea.ubicacion.lat,
        longitude: tarea.ubicacion.lng,
      };
    }
    
    console.log("📤 Datos a enviar al backend (español):", JSON.stringify(tarea, null, 2));
    console.log("📤 Datos mapeados a inglés para API:", JSON.stringify(tareaAPI, null, 2));
    
    const respuesta = await api.request('/todos', {
      method: 'POST',
      headers: encabezados,
      body: JSON.stringify(tareaAPI),
    });
    
    console.log("📥 Respuesta del backend al crear tarea:", JSON.stringify(respuesta, null, 2));
    
    // Mapear respuesta del inglés al español
    const datos = respuesta.data || respuesta;
    return {
      id: datos.id,
      titulo: datos.title,
      descripcion: datos.description,
      imagen: datos.photoUri,
      ubicacion: datos.location ? {
        lat: datos.location.latitude,
        lng: datos.location.longitude,
      } : undefined,
      completed: datos.completed,
      userId: datos.userId,
      createdAt: datos.createdAt,
    };
  },

  async actualizarTarea(id: string, cambios: ActualizarTareaDto): Promise<Tarea> {
    const encabezados = await this.obtenerEncabezados();
    
    // Mapear campos del español al inglés para la API
    const cambiosAPI: any = {};
    if (cambios.titulo !== undefined) cambiosAPI.title = cambios.titulo;
    if (cambios.imagen !== undefined) cambiosAPI.photoUri = cambios.imagen;
    if (cambios.ubicacion !== undefined) {
      cambiosAPI.location = {
        latitude: cambios.ubicacion.lat,
        longitude: cambios.ubicacion.lng,
      };
    }
    if (cambios.completed !== undefined) cambiosAPI.completed = cambios.completed;
    
    const respuesta = await api.request(`/todos/${id}`, {
      method: 'PATCH',
      headers: encabezados,
      body: JSON.stringify(cambiosAPI),
    });
    
    // Mapear respuesta del inglés al español
    const datos = respuesta.data || respuesta;
    return {
      id: datos.id,
      titulo: datos.title,
      descripcion: datos.description,
      imagen: datos.photoUri,
      ubicacion: datos.location ? {
        lat: datos.location.latitude,
        lng: datos.location.longitude,
      } : undefined,
      completed: datos.completed,
      userId: datos.userId,
      createdAt: datos.createdAt,
    };
  },

  async eliminarTarea(id: string): Promise<void> {
    const encabezados = await this.obtenerEncabezados();
    await api.request(`/todos/${id}`, {
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

      console.log('📸 Subiendo imagen a:', `${api.baseUrl}/images`);
      console.log('URI de la imagen:', uri);

      const respuesta = await fetch(`${api.baseUrl}/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      console.log('📡 Respuesta del servidor:', respuesta.status, respuesta.statusText);

      if (!respuesta.ok) {
        const textoError = await respuesta.text();
        console.error('❌ Error del servidor:', textoError);
        let errorObj;
        try {
          errorObj = JSON.parse(textoError);
        } catch {
          errorObj = { message: textoError || 'Error al subir imagen' };
        }
        throw new Error(errorObj.message || errorObj.error || 'Error al subir imagen');
      }

      const datos = await respuesta.json();
      console.log('✅ Imagen subida, respuesta:', datos);
      
      // El backend devuelve { success: true, data: { url: "..." } }
      const url = datos.data?.url || datos.url || datos.imageUrl || datos.image || datos.path;
      console.log('🔗 URL extraída:', url);
      
      if (!url) {
        console.error('❌ No se encontró URL en la respuesta:', JSON.stringify(datos));
        throw new Error('El servidor no devolvió una URL válida');
      }
      
      return url;
    } catch (error: any) {
      console.error('❌ Error completo en subirImagen:', error);
      throw new Error(error.message || 'No se pudo subir la imagen');
    }
  },
};
