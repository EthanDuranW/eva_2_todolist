import { Stack, useRouter, useSegments } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { AuthProvider } from "../providers/AuthProvider";
import { TaskProvider } from "../providers/TaskProvider";

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isLogged } = useContext(AuthContext);
  const segments = useSegments();
  const router = useRouter();

  // Estado para confirmar que el layout ya montó
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Marcamos el layout como listo para navegar
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return; // 🚨 NO navegar antes de estar listos

    const inAuthGroup = segments[0] === "login";

    if (!isLogged && !inAuthGroup) {
      router.replace("/login");
    }

    if (isLogged && inAuthGroup) {
      router.replace("/");
    }
  }, [isLogged, segments, ready, router]);

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