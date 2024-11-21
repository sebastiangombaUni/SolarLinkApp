import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Weather() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Función para obtener el clima desde la API
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "http://api.weatherapi.com/v1/current.json?key=729515e41de840a3bf4193328242111&q=Bogota&aqi=yes"
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError("No se pudo obtener el clima. Por favor, intenta más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6b5b95" />
        <Text style={styles.loadingText}>Cargando datos del clima...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botón circular para regresar al índice */}
      <Pressable style={styles.backButton} onPress={() => router.push("/(tabs)/home")}>
      <FontAwesome5 name="arrow-left" size={24} color={"white"} />
      </Pressable>

      <Text style={styles.title}>Clima en Bogotá</Text>
      <View style={styles.weatherContainer}>
        <Image
          source={{ uri: `https:${weatherData?.current?.condition?.icon}` }}
          style={styles.weatherIcon}
        />
        <Text style={styles.temperature}>
          {weatherData?.current?.temp_c}°C
        </Text>
        <Text style={styles.condition}>
          {weatherData?.current?.condition?.text}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailCircle}>
          <Text style={styles.detailText}>Humedad: {weatherData?.current?.humidity}%</Text>
        </View>
        <View style={styles.detailCircle}>
          <Text style={styles.detailText}>Calidad del aire: {weatherData?.current?.air_quality["pm2_5"].toFixed(2)} µg/m³</Text>
        </View>
        <View style={styles.detailCircle}>
          <Text style={styles.detailText}>Viento: {weatherData?.current?.wind_kph} km/h</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f1",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6b5b95",
  },
  weatherContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
  },
  condition: {
    fontSize: 18,
    color: "#666",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  detailCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6b5b95",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    padding: 10,
  },
  detailText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f1",
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: "#6b5b95",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f1",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  backButton: {
    position: "absolute",
    top: 30,
    right: 10,
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
  backIcon: {
    width: 30,
    height: 30,
    backgroundColor: "transparent",
  },
});
