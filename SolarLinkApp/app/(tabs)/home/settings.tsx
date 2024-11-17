import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "@/context/AuthContext/AuthContext";

export default function SettingsTab() {
  const { state, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>
      {state.user && (
        <>
          <Text style={styles.subtitle}>
            Nombre: {state.user.name} {state.user.lastname}
          </Text>
          <Text style={styles.subtitle}>Correo: {state.user.email}</Text>
        </>
      )}
      <Text style={styles.logout} onPress={logout}>
        Cerrar Sesión
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#555",
  },
  logout: {
    marginTop: 20,
    fontSize: 16,
    color: "red",
    textDecorationLine: "underline",
  },
});
