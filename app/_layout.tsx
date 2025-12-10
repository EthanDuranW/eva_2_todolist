import { Stack, useRouter, useSegments } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { AuthProvider } from "../providers/AuthProvider";
import { TaskProvider } from "../providers/TaskProvider";

function AuthGate({ children }: { children: React.ReactNode }) {
  const { estaAutenticado, cargando } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  const [listo, setListo] = useState(false);

  useEffect(() => {
    setListo(true);
  }, []);

  useEffect(() => {
    if (!listo || cargando) return;

    const enGrupoAuth = segments[0] === "login";

    if (!estaAutenticado && !enGrupoAuth) {
      router.replace("/login");
    }

    if (estaAutenticado && enGrupoAuth) {
      router.replace("/");
    }
  }, [estaAutenticado, segments, listo, cargando, router]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AuthGate>
          <Stack screenOptions={{ headerShown: false }} />
        </AuthGate>
      </TaskProvider>
    </AuthProvider>
  );
}