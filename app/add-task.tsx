import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import AnimatedButton from "../components/AnimatedButton";
import Input from "../components/Input";
import { AuthContext } from "../Context/AuthContext";
import { TaskContext } from "../Context/TaskContext";
import { taskService } from "../services/tasks";
import { colors } from "../theme/colors";

import type { ViewStyle } from "react-native";

const getBackBtnStyle = (top: number): ViewStyle => ({
  position: "absolute",
  top: top + 10,
  left: 15,
  zIndex: 20,
  padding: 6,
  backgroundColor: "rgba(255,255,255,0.9)",
  borderRadius: 30,
});

export default function AddTaskScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { userEmail } = useContext(AuthContext);
  const { agregarTarea } = useContext(TaskContext);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);
  const [ubicacion, setUbicacion] =
    useState<{ lat: number; lng: number } | null>(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const pedirPermisoGaleria = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Oye poh! 🖼️", "Necesito que me dejes revisar tus fotitos de la galería 📸");
        return false;
      }
      return true;
    } catch {
      Alert.alert("Chuta! 😅", "Algo pasó y no pude pedir permiso pa' la galería wn");
      return false;
    }
  };

  const pedirPermisoCamara = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Yaaa poh! 📷", "Dame permiso pa' usar la cámara po compadre 🤳");
        return false;
      }
      return true;
    } catch {
      Alert.alert("Rayos! ⚡", "No pude pedir permiso pa' la cámara, que la cagá");
      return false;
    }
  };

  const elegirImagen = async () => {
    try {
      const ok = await pedirPermisoGaleria();
      if (!ok) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        const uriLocal = result.assets[0].uri;
        setSubiendoImagen(true);
        try {
          const urlRemota = await taskService.subirImagen(uriLocal);
          setImagen(urlRemota);
        } catch (error) {
          Alert.alert("Pucha! 😔", "No pude subir la foto al servidor. Inténtalo de nuevo po");
          console.error(error);
        } finally {
          setSubiendoImagen(false);
        }
      }
    } catch {
      Alert.alert("Nooo! 📸", "No pude abrir la cámara cachai. Será el celu?");
    }
  };

  const tomarFoto = async () => {
    try {
      const ok = await pedirPermisoCamara();
      if (!ok) return;

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled) {
        const uriLocal = result.assets[0].uri;
        setSubiendoImagen(true);
        try {
          const urlRemota = await taskService.subirImagen(uriLocal);
          setImagen(urlRemota);
        } catch (error) {
          Alert.alert("Pucha! 😔", "No pude subir la foto al servidor. Inténtalo de nuevo po");
          console.error(error);
        } finally {
          setSubiendoImagen(false);
        }
      }
    } catch {
      Alert.alert("Nooo! 📸", "No pude abrir la cámara cachai. Será el celu?");
    }
  };

  const obtenerUbicacion = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Oye! 📍", "Necesito que me dejes saber dónde estái po compa");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setUbicacion({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    } catch {
      Alert.alert("Chuta! 🗺️", "No pillé tu ubicación. ¿Será que estás en modo avión?");
    }
  };

  const guardar = async () => {
    try {
      if (!titulo.trim()) {
        Alert.alert("Epa! ✍️", "Ponle un título a la tarea po, no seai flojo");
        return;
      }

      setGuardando(true);

      await agregarTarea({
        titulo: titulo,
        descripcion: descripcion,
        imagen: imagen || undefined,
        ubicacion: ubicacion || undefined,
        completed: false,
      });

      router.replace("/");
    } catch (error) {
      Alert.alert("Noooo! 💾", "No se pudo guardar la tarea wn. Dale otra oportunidad");
      console.error(error);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <TouchableOpacity
        onPress={() => router.replace("/")}
        style={getBackBtnStyle(insets.top)}
      >
        <Ionicons name="arrow-back" size={28} color={colors.text} />
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titulo}>Nueva Tarea</Text>

          <View style={styles.card}>
            <Input placeholder="Título" value={titulo} onChangeText={setTitulo} />

            <Input
              placeholder="Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              style={{ height: 120 }}
            />

            <AnimatedButton
              label="Elegir de la galería"
              onPress={elegirImagen}
              color="#8f82eeff"
              icon="images-outline"
            />

            <AnimatedButton
              label="Tomar foto"
              onPress={tomarFoto}
              color="#eeb17bff"
              icon="camera-outline"
            />

            {subiendoImagen && (
              <View style={styles.cargandoImagen}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.textoCargando}>Subiendo imagen...</Text>
              </View>
            )}

            {imagen && (
              <Image source={{ uri: imagen }} style={styles.imgPreview} />
            )}

            <AnimatedButton
              label="Obtener ubicación"
              onPress={obtenerUbicacion}
              color="#268fdfff"
              icon="location-outline"
            />

            {ubicacion && (
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.mapaMini}
                  initialRegion={{
                    latitude: ubicacion.lat,
                    longitude: ubicacion.lng,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                  }}
                  pointerEvents="none"
                >
                  <Marker
                    coordinate={{
                      latitude: ubicacion.lat,
                      longitude: ubicacion.lng,
                    }}
                  />
                </MapView>
              </View>
            )}

            {guardando ? (
              <View style={styles.cargandoImagen}>
                <ActivityIndicator size="small" color="#3aac69ff" />
                <Text style={styles.textoCargando}>Guardando...</Text>
              </View>
            ) : (
              <AnimatedButton
                label="Guardar tarea"
                onPress={guardar}
                color="#3aac69ff"
                icon="checkmark-done-outline"
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  imgPreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 10,
  },

  mapContainer: {
    width: "100%",
    marginTop: 15,
  },

  mapaMini: {
    width: "100%",
    height: 150,
    borderRadius: 12,
  },

  cargandoImagen: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginTop: 10,
  },

  textoCargando: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.text,
  },
});