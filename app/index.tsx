import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { DeleteModal } from "../components/DeleteModal";
import { Header } from "../components/Header";
import { TaskCard } from "../components/TaskCard";
import { AuthContext } from "../Context/AuthContext";
import { TaskContext, TaskContextType } from "../Context/TaskContext";
import { colors } from "../theme/colors";

export default function HomeScreen() {
  const router = useRouter();

  const { lista, eliminarTarea, editarTarea, cargarTareas, cargando } = useContext<TaskContextType>(TaskContext);
  const { logout, userEmail, estaAutenticado } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [tareaAEliminar, setTareaAEliminar] = useState<string | null>(null);
  const [expandidaNoCompletadas, setExpandidaNoCompletadas] = useState(true);
  const [expandidaCompletadas, setExpandidaCompletadas] = useState(true);

  useEffect(() => {
    if (estaAutenticado) {
      cargarTareas();
    }
  }, [estaAutenticado]);

  const tareasNoCompletadas = lista.filter(tarea => !tarea.completed);
  const tareasCompletadas = lista.filter(tarea => tarea.completed);

  const confirmarEliminar = (id: string) => {
    setTareaAEliminar(id);
    setModalVisible(true);
  };

  const borrar = async () => {
    if (tareaAEliminar) {
      try {
        await eliminarTarea(tareaAEliminar);
      } catch (error) {
        console.error("Error eliminando tarea:", error);
      }
    }
    setModalVisible(false);
    setTareaAEliminar(null);
  };

  const cambiarEstadoTarea = async (id: string, estadoActual: boolean) => {
    try {
      await editarTarea(id, { completed: !estadoActual });
    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header userEmail={userEmail || ""} onLogout={logout} />

      <TouchableOpacity
        style={styles.botonAdd}
        onPress={() =>
          router.push({
            pathname: "/add-task",
          })
        }
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {cargando ? (
        <View style={styles.cargandoContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={[
            {
              type: "section",
              id: "no-completadas",
              title: "No Completadas",
              count: tareasNoCompletadas.length,
              expanded: expandidaNoCompletadas,
              setExpanded: setExpandidaNoCompletadas,
              tareas: tareasNoCompletadas,
            },
            {
              type: "section",
              id: "completadas",
              title: "Completadas",
              count: tareasCompletadas.length,
              expanded: expandidaCompletadas,
              setExpanded: setExpandidaCompletadas,
              tareas: tareasCompletadas,
            },
          ] as any[]}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: { item: any }) => (
            <CollapsibleSection
              title={item.title}
              count={item.count}
              isExpanded={item.expanded}
              onToggle={() => item.setExpanded(!item.expanded)}
            >
              {item.tareas.map((tarea: any, index: number) => (
                <TaskCard
                  key={tarea.id}
                  item={tarea}
                  index={index}
                  onChangeStatus={() => cambiarEstadoTarea(tarea.id, tarea.completed)}
                  onDelete={() => confirmarEliminar(tarea.id)}
                  onEdit={() =>
                    router.push({
                      pathname: "/Edit-task",
                      params: { id: tarea.id },
                    })
                  }
                />
              ))}
            </CollapsibleSection>
          )}
        />
      )}

      <DeleteModal
        visible={modalVisible}
        onConfirm={borrar}
        onCancel={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

/* estilos */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },

  botonAdd: {
    position: "absolute",
    right: 20,
    bottom: Platform.OS === "android" ? 80 : 20,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 999,
  },

  cargandoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});