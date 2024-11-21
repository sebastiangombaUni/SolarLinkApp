import { DataContext } from "@/context/DataContext/DataContext";
import React, { useContext, useState } from "react";
import { LineChart, BarChart } from "react-native-chart-kit";
import { View, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import { format, parseISO } from "date-fns";

const screenWidth = Dimensions.get("window").width;

// Definir tipos para los datos de energía
interface EnergyData {
  energyUsage: number;
  time?: string; // Para datos horarios
  day?: string; // Para datos semanales
  month?: string; // Para datos mensuales
  [key: string]: any; // Permite otras propiedades opcionales
}

export default function EnergyScreen() {
  const { userData, consumptionData, isLoading } = useContext(DataContext);
  const [selectedPeriod, setSelectedPeriod] = useState<"hour" | "week" | "month">("hour");

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  if (!userData || !consumptionData) {
    return <Text >No hay datos disponibles para este usuario.</Text>;
  }

  // Preparar datos para gráficos
  const hourlyData: EnergyData[] = consumptionData.hourlyData.map((item: any) => ({
    time: item.hour,
    energyUsage: item.energyUsage,
  }));

  const weeklyData: EnergyData[] = consumptionData.weeklyData.map((item: any) => ({
    day: format(parseISO(item.date), "eee, MMM d"),
    energyUsage: item.totalEnergyUsage,
  }));

  const monthlyData: EnergyData[] = consumptionData.monthlyData.map((item: any) => ({
    month: item.month,
    energyUsage: item.totalEnergyUsage,
  }));

  const getData = (): EnergyData[] => {
    switch (selectedPeriod) {
      case "hour":
        return hourlyData;
      case "week":
        return weeklyData;
      case "month":
        return monthlyData;
      default:
        return hourlyData;
    }
  };

  const calculateTotals = (data: EnergyData[]) => {
    const totalEnergyUsage = data.reduce((acc: number, item: EnergyData) => acc + item.energyUsage, 0);
    const averageEnergyUsage = data.length > 0 ? (totalEnergyUsage / data.length).toFixed(2) : 0;
    return { totalEnergyUsage, averageEnergyUsage };
  };

  const { totalEnergyUsage, averageEnergyUsage } = calculateTotals(getData());

  const renderChart = () => {
    const chartData = {
      labels: getData().map((item) =>
        selectedPeriod === "hour"
          ? item.time || "N/A" // Asegúrate de que no sea undefined
          : selectedPeriod === "week"
          ? item.day || "N/A"
          : item.month || "N/A"
      ),
      datasets: [
        {
          data: getData().map((item) => item.energyUsage),
        },
      ],
    };
    

    if (selectedPeriod === "hour") {
      return (
        <LineChart
          data={chartData}
          width={screenWidth - 40}
          height={250}
          yAxisLabel="kWh "
          fromZero={true}
          chartConfig={{
            backgroundGradientFrom: "#f9f9f1",
            backgroundGradientTo: "#f9f9f1",
            color: (opacity = 1) => `rgba(107, 91, 149, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(75, 75, 75, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{
            marginVertical: 8,
            marginLeft: 30, // Más espacio para labels del eje Y
            marginRight: 30, // Más espacio para bordes
            borderRadius: 16,
          
          }}
          bezier
          verticalLabelRotation={90} 
/>

      );
    }

    return (
      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={250}
        yAxisLabel="kWh "
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#f9f9f1",
          backgroundGradientTo: "#f9f9f1",
          color: (opacity = 1) => `rgba(107, 91, 149, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(75, 75, 75, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          marginLeft: 20,
        }}
        
        verticalLabelRotation={90}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Selector de Periodo */}
      <View style={styles.tabContainer}>
        {["hour", "week", "month"].map((period) => (
          <Pressable
            key={period}
            onPress={() => setSelectedPeriod(period as "hour" | "week" | "month")}
            style={[styles.tab, selectedPeriod === period && styles.activeTab]}
          >
            <Text style={[styles.tabText, selectedPeriod === period && styles.activeTabText]}>
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Totales y Promedios */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <View style={styles.circle} />
          <View>
            <Text style={styles.summaryText}>{averageEnergyUsage} kWh</Text>
            <Text style={styles.summaryLabel}>Summary Average</Text>
          </View>
        </View>
        <View style={styles.summaryBox}>
          <View style={styles.circle} />
          <View>
            <Text style={styles.summaryText}>{totalEnergyUsage} kWh</Text>
            <Text style={styles.summaryLabel}>Total Consumption</Text>
          </View>
        </View>
      </View>

      {/* Contenedor del Gráfico */}
      <View style={styles.chartContainer}>{renderChart()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f1",
    paddingTop: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#e5e5e5",
    borderRadius: 40,
    alignSelf: "center",
    width: "90%",
    marginVertical: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 3,
  },
  tabText: {
    color: "#000",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#6b5b95",
    fontWeight: "700",
  },
  summaryContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  summaryBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6E6FA",
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    width: "90%",
    marginVertical: 10,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#B39DDB",
    marginRight: 20,
  },
  summaryText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#757575",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  chartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
