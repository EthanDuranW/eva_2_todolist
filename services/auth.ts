import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

const TOKEN_KEY = 'auth_token';

interface CredencialesLogin {
  email: string;
  password: string;
}

interface CredencialesRegistro {
  email: string;
  password: string;
}

interface RespuestaAuth {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authService = {
  async login(credenciales: CredencialesLogin): Promise<RespuestaAuth> {
    console.log('📡 Enviando solicitud de login a /auth/login');
    const respuesta = await api.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });
    
    console.log('📦 Respuesta de login recibida:', respuesta);
    
    // La nueva API envuelve la respuesta en { success: true, data: { token, user } }
    const datos = respuesta.data || respuesta;
    const token = datos.token;
    const user = datos.user;
    
    if (token) {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      console.log('💾 Token guardado en AsyncStorage:', token.substring(0, 20) + '...');
    } else {
      console.error('❌ No se recibió token en la respuesta');
    }
    
    return { token, user };
  },

  async registro(datos: CredencialesRegistro): Promise<RespuestaAuth> {
    console.log('📡 Enviando solicitud de registro a /auth/register');
    console.log('📋 Datos enviados:', { email: datos.email, password: '***' });
    
    try {
      const respuesta = await api.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(datos),
      });
      
      console.log('📦 Respuesta de registro recibida:', respuesta);
      
      // La nueva API envuelve la respuesta en { success: true, data: { token, user } }
      const datos_resp = respuesta.data || respuesta;
      const token = datos_resp.token;
      const user = datos_resp.user;
      
      if (token) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
        console.log('💾 Token guardado en AsyncStorage:', token.substring(0, 20) + '...');
      } else {
        console.error('❌ No se recibió token en la respuesta');
      }
      
      return { token, user };
    } catch (error: any) {
      console.error('❌ Error en servicio de registro:', error.message);
      throw error;
    }
  },

  async obtenerToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  },

  async guardarToken(token: string): Promise<void> {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },

  async eliminarToken(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },

  async verificarToken(): Promise<boolean> {
    const token = await this.obtenerToken();
    if (!token) return false;

    try {
      const usuario = await api.request('/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('✅ Token válido para usuario:', usuario);
      return true;
    } catch (error) {
      console.log('❌ Token inválido, eliminando...');
      await this.eliminarToken();
      return false;
    }
  },
};
