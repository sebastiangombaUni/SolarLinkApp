import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { DataContext } from "@/context/DataContext/DataContext";

const screenWidth = Dimensions.get("window").width;

const UserConsumption = () => {
  const { userData, consumptionData, isLoading } = useContext(DataContext);

  if (isLoading) {
    return <Text style={styles.loadingText}>Cargando datos...</Text>;
  }

  if (!userData || !consumptionData) {
    return <Text style={styles.noDataText}>No hay datos disponibles para este usuario.</Text>;
  }

  // Preparar datos para el gráfico mensual
  const chartData = {
    labels: consumptionData.monthlyData.map((item) => item.month),
    datasets: [
      {
        data: consumptionData.monthlyData.map((item) => item.totalEnergyUsage *1000), // Multiplicar por mil
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.welcome}>¡Bienvenido, {userData.name}!</Text>
      <Text style={styles.subtitle}>Esto fueron sus costos mensuales:</Text>

      {/* Gráfico */}
      <View style={styles.chartContainer}>
      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={250}
        yAxisLabel="kWh " 
        yAxisSuffix="" 
        fromZero={true} 
        showBarTops={true} 
        chartConfig={{
          backgroundColor: "#f9f9f1",
          backgroundGradientFrom: "#f9f9f1",
          backgroundGradientTo: "#f9f9f1",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(107, 91, 149, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(75, 75, 75, ${opacity})`,
          style: { borderRadius: 16 },
          barPercentage: 0.7, // Ajusta el porcentaje de ancho de las barras
          propsForLabels: {
            fontSize: 12, // Ajustar el tamaño de fuente de los labels
            textAnchor: "middle", // Centrar los textos
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginLeft: 20, // Espacio adicional para los labels del eje Y
        }}
      />
      </View>

      {/* Historial de pagos */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Historial de Pagos</Text>
        <Text style={styles.noPaymentsText}>Ningún pago registrado.</Text>
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => alert("Factura pagada")}>
          <Text style={styles.buttonText}>Pagar Factura</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => alert("Consultando factura")}>
          <Text style={styles.buttonText}>Consultar Factura</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f1",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#6b5b95",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#4b4b4b",
  },
  loadingText: {
    textAlign: "center",
    color: "#6b5b95",
  },
  noDataText: {
    textAlign: "center",
    color: "#6b5b95",
  },
  chartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#6b5b95",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  historyContainer: {
    marginTop: 30,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6b5b95",
    marginBottom: 10,
    textAlign: "center",
  },
  noPaymentsText: {
    textAlign: "center",
    color: "#4b4b4b",
    marginBottom: 80,
  },
});

export default UserConsumption;
