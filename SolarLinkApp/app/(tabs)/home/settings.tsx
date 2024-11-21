import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "@/context/AuthContext/AuthContext";
import { router } from "expo-router";

export default function SettingsTab() {
  const { state, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings </Text>
      {state.user && (
        <>
          <Text style={styles.subtitle}>
            Name: {state.user.name} {state.user.lastname}
          </Text>
          <Text style={styles.subtitle}>Correo: {state.user.email}</Text>
        </>
      )}
      <Text
      style={styles.logout}
      onPress={logout}
    >
      Cerrar Sesión
    </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "f2f5ea",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "ShareTech-Regular",

  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    color: "#555",
    fontFamily: "ShareTech-Regular",  
  },
  logout: {
    marginTop: '120%',
    fontSize: 16,
    color: "red",
    textDecorationLine: "underline",
    fontFamily: "ShareTech-Regular",
  },
});
