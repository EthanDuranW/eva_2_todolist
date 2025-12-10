import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { authService } from "../services/auth";

interface Usuario {
  id: string;
  name: string;
  email: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    verificarSesion();
  }, []);

  const verificarSesion = async () => {
    try {
      const token = await authService.obtenerToken();
      if (!token) {
        setCargando(false);
        return;
      }

      const tokenValido = await authService.verificarToken();
      if (tokenValido) {
        setEstaAutenticado(true);
      }
    } catch (error) {
      console.error("Error verificando sesión:", error);
      setEstaAutenticado(false);
    } finally {
      setCargando(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Intentando login con:', email);
      const respuesta = await authService.login({ email, password });
      console.log('✅ Login exitoso:', respuesta.user);
      setUsuario(respuesta.user);
      setEstaAutenticado(true);
      return true;
    } catch (error: any) {
      console.log('❌ Error en login:', error.message);
      return false;
    }
  };

  const registro = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('📝 Intentando registro para:', email);
      const respuesta = await authService.registro({ email, password });
      console.log('✅ Registro exitoso:', respuesta.user);
      setUsuario(respuesta.user);
      setEstaAutenticado(true);
      return true;
    } catch (error: any) {
      console.log('❌ Error en registro:', error.message);
      return false;
    }
  };

  const logout = async () => {
    await authService.eliminarToken();
    setEstaAutenticado(false);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        estaAutenticado, 
        usuario,
        cargando,
        login, 
        registro,
        logout, 
        userEmail: usuario?.email || null 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};