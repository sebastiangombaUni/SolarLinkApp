import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, View, Text } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { DataContext } from "@/context/DataContext/DataContext";
import { Link } from "expo-router";

export default function HomeScreen() {
  const { consumoReal, isLoading } = useContext(DataContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText style={styles.loadingText}>Cargando...</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Contenedor principal de la imagen */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/homeimage.png")}
          style={styles.fullScreenImage}
        />
        {/* Superposiciones sobre la imagen */}
        <View style={styles.overlayContainer}>
          <View style={[styles.line, styles.lineWindow]} />
          <ThemedText style={[styles.text, { top: "13%", left: "12%" }]}>
            {consumoReal?.home ?? "0"}kW HOME
          </ThemedText>

          <View style={[styles.line, styles.lineSolar]} />
          <ThemedText style={[styles.text, { top: "13%", right: "12%" }]}>
            {consumoReal?.solar ?? "0"}kW SOLAR
          </ThemedText>

          <View style={[styles.line, styles.lineBattery]} />
          <ThemedText style={[styles.text, { bottom: "10%", left: "38%" }]}>
            {consumoReal?.grid ?? "0"}kW GRID
          </ThemedText>

          <View style={[styles.line, styles.lineGrid]} />
          <ThemedText style={[styles.text, { bottom: "10%", right: "15%" }]}>
            {consumoReal?.battery ?? "0"}kW
          </ThemedText>
          <ThemedText style={[styles.text, { bottom: "8%", right: "15%" }]}>
            {consumoReal?.batteryLevel ?? "0"}% BL
          </ThemedText>
        </View>
      </View>

      {/* Botón circular para ir a la pantalla Weather */}
      <Link href="/(tabs)/home/weather" asChild>
        <Pressable style={styles.weatherButton}>
          <Image
            source={require("../../../assets/images/weather.png")} // Asegúrate de tener esta imagen en tus assets
            style={styles.weatherIcon}
          />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f1",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1, // Permite que la imagen ocupe todo el espacio disponible
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Garantiza que la imagen no se recorte
  },
  overlayContainer: {
    position: "absolute", // Superpone los elementos sobre la imagen
    width: "100%", // Coincide con el tamaño del contenedor
    height: "100%",
  },
  text: {
    position: "absolute",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  line: {
    position: "absolute",
    width: 2,
    backgroundColor: "gray",
  },
  lineWindow: {
    height: "30%",
    top: "15%",
    left: "10%",
  },
  lineSolar: {
    height: "15%",
    top: "15%",
    right: "40%",
  },
  lineBattery: {
    height: "15%",
    bottom: "15%",
    left: "50%",
  },
  lineGrid: {
    height: "15%",
    bottom: "15%",
    right: "25%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f1",
  },
  loadingText: {
    fontSize: 18,
    color: "gray",
    fontWeight: "bold",
  },
  weatherButton: {
    position: "absolute",
    bottom: 30,
    right: '80%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6b5b95",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  weatherIcon: {
    width: 30,
    height: 30,
    tintColor: "#fff",
  },
});
