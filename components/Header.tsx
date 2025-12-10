import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";

interface HeaderProps {
  userEmail: string | null;
  onLogout: () => void | Promise<void>;
}

export const Header = ({ userEmail, onLogout }: HeaderProps) => {
  const manejarLogout = async () => {
    await onLogout();
  };

  return (
    <>
      <Text style={styles.titulo}>Mis Tareas</Text>

      <View style={styles.headerRow}>
        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>{userEmail}</Text>
        </View>

        <TouchableOpacity onPress={manejarLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
    color: colors.text,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  emailContainer: {
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  emailText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },

  logoutBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  logoutText: {
    color: colors.danger,
    fontWeight: "700",
    fontSize: 14,
  },
});
