const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://basic-hono-api.borisbelmarm.workers.dev';

export const api = {
  baseUrl: API_URL,
  
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint}`;
    
    try {
      console.log('🌐 Petición a:', url, 'Método:', options.method || 'GET');
      
      // Mostrar el payload si existe
      if (options.body) {
        console.log('📦 PAYLOAD ENVIADO:', options.body);
        try {
          const payloadObj = JSON.parse(options.body.toString());
          console.log('📋 PAYLOAD (formato JSON):', JSON.stringify(payloadObj, null, 2));
        } catch {
          console.log('📋 PAYLOAD (texto plano):', options.body);
        }
      }
      
      // Mostrar headers
      console.log('📨 HEADERS:', options.headers);
      
      const respuesta = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      // Leer el texto de la respuesta una sola vez
      const textoRespuesta = await respuesta.text();
      console.log('📡 Respuesta status:', respuesta.status, 'Texto:', textoRespuesta.substring(0, 200));

      if (!respuesta.ok) {
        let mensajeError = `Error ${respuesta.status}`;
        
        // Intentar parsear como JSON
        try {
          const errorData = JSON.parse(textoRespuesta);
          if (typeof errorData === 'string') {
            mensajeError = errorData;
          } else if (errorData.message) {
            mensajeError = errorData.message;
          } else if (errorData.error) {
            mensajeError = typeof errorData.error === 'string' ? errorData.error : JSON.stringify(errorData.error);
          } else {
            mensajeError = JSON.stringify(errorData);
          }
        } catch {
          // Si no es JSON, usar el texto directamente
          if (textoRespuesta) mensajeError = textoRespuesta;
        }
        
        // Manejar errores específicos de Cloudflare
        if (respuesta.status === 503 && mensajeError.includes('1102')) {
          mensajeError = '🔧 El servidor está caído ahora mismo. Intenta de nuevo en unos minutos po';
        } else if (respuesta.status === 503) {
          mensajeError = '⚠️ Servidor no disponible. Espera un toque y vuelve a intentar';
        }
        
        console.error('❌ Error del servidor:', mensajeError);
        throw new Error(mensajeError);
      }

      // Parsear respuesta exitosa
      try {
        return JSON.parse(textoRespuesta);
      } catch {
        return textoRespuesta;
      }
    } catch (error: any) {
      if (error.message && error.message.includes('Network request failed')) {
        console.error('🔌 Oe, no hay internet parece');
        throw new Error('¡Uff! No hay internet wn. Revisa tu WiFi o datos móviles 📶');
      }
      throw error;
    }
  },
};
