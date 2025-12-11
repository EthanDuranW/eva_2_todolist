import { useContext, useState } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../Context/AuthContext";
import { useThemeColors } from "../hooks/use-theme-colors";

export default function LoginScreen() {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const { login, registro } = useContext(AuthContext);

  const [esRegistro, setEsRegistro] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const ingresar = async () => {
    if (!email.trim()) {
      setError("¡Oye! Escribe tu email po wn 📧");
      return;
    }

    if (!password.trim()) {
      setError("¡Oye! Escribe tu contraseña po 🔒");
      return;
    }

    setError("");
    setCargando(true);

    try {
      const exitoso = await login(email, password);
      if (!exitoso) {
        setError("😔 Email o contraseña incorrecta. ¿Quieres registrarte?");
      }
    } catch (err: any) {
      setError(err.message || "😱 Uff qué raro, algo falló wn");
    } finally {
      setCargando(false);
    }
  };

  const registrarse = async () => {
    if (!email.trim()) {
      setError("¡Oye! Escribe tu email po wn 📧");
      return;
    }

    if (!password.trim()) {
      setError("¡Oye! Escribe una contraseña po 🔒");
      return;
    }

    setError("");
    setCargando(true);

    try {
      const exitoso = await registro(email, password);
      if (!exitoso) {
        setError("😔 No se pudo crear la cuenta. Intenta de nuevo");
      }
    } catch (err: any) {
      const mensajeError = err.message || "😱 Algo falló al registrarte wn";
      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        {esRegistro ? "🎉 Crear Cuenta" : "👋 Iniciar Sesión"}
      </Text>

      {esRegistro ? (
        <>
          <Text style={styles.descripcion}>
            Registra tu email y contraseña para comenzar
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {cargando ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <>
              <Button title="Registrarme" onPress={registrarse} />
              <TouchableOpacity 
                onPress={() => {
                  setEsRegistro(false);
                  setError("");
                  setPassword("");
                }} 
                style={styles.linkContainer}
              >
                <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <>
          <Text style={styles.descripcion}>
            Ingresa tus credenciales para acceder
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {cargando ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <>
              <Button title="Ingresar" onPress={ingresar} />
              <TouchableOpacity 
                onPress={() => {
                  setEsRegistro(true);
                  setError("");
                  setPassword("");
                }} 
                style={styles.linkContainer}
              >
                <Text style={styles.link}>¿No tienes cuenta? Regístrate aquí</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}

function createStyles(colors: any) {
  return StyleSheet.create({
    container: { 
      flexGrow: 1, 
      padding: 20, 
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    titulo: { 
      fontSize: 28, 
      fontWeight: "bold", 
      textAlign: "center", 
      marginBottom: 15,
      color: colors.text,
    },
    descripcion: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: "center",
      marginBottom: 25,
      paddingHorizontal: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      padding: 12,
      marginBottom: 15,
      borderRadius: 10,
      fontSize: 16,
      backgroundColor: colors.inputBackground,
      color: colors.text,
    },
    nota: { 
      fontSize: 13, 
      color: colors.primary, 
      textAlign: "center", 
      marginBottom: 15,
      fontWeight: "600"
    },
    error: { 
      color: colors.danger, 
      marginBottom: 10, 
      textAlign: "center" 
    },
    linkContainer: {
      marginTop: 20,
      padding: 10,
    },
    link: {
      color: colors.primary,
      textAlign: "center",
      fontSize: 14,
      textDecorationLine: "underline",
    },
  });
}