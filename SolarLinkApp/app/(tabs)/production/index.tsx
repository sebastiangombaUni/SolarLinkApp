import { DataContext } from "@/context/DataContext/DataContext";
import React, { useContext, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { View, Pressable, Text, StyleSheet } from "react-native";

export default function EnergyScreen() {
  const { userData, consumptionData, isLoading } = useContext(DataContext);
  const [selectedPeriod, setSelectedPeriod] = useState("hour");

  if (isLoading) {
    return <Text>Cargando datos...</Text>;
  }

  if (!userData || !consumptionData) {
    return <Text>No hay datos disponibles para este usuario.</Text>;
  }

  // Preparar datos para gráficos
  const hourlyData = consumptionData.hourlyData.map((item) => ({
    ...item,
    time: item.hour,
    energyUsage: item.energyUsage,
  }));

  const weeklyData = consumptionData.weeklyData.map((item) => ({
    ...item,
    day: format(parseISO(item.date), "eee, MMM d"),
    energyUsage: item.totalEnergyUsage,
  }));

  const monthlyData = consumptionData.monthlyData.map((item) => ({
    ...item,
    month: item.month,
    energyUsage: item.totalEnergyUsage,
  }));

  // Función para obtener los datos según el periodo seleccionado
  const getData = () => {
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

  // Función para calcular el Total y el Promedio (Average) del consumo de energía
  const calculateTotals = (data: any[]) => {
    const totalEnergyUsage = data.reduce((acc, item) => acc + item.energyUsage, 0);
    const averageEnergyUsage = data.length > 0 ? (totalEnergyUsage / data.length).toFixed(2) : 0;
    return { totalEnergyUsage, averageEnergyUsage };
  };

  // Obtener Totales y Promedios según el periodo
  const { totalEnergyUsage, averageEnergyUsage } = calculateTotals(getData());

  // Función para renderizar el gráfico según el periodo seleccionado
  const renderChart = () => {
    switch (selectedPeriod) {
      case "hour":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={getData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="#6b5b95" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="energyUsage" stroke="#6b5b95" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case "week":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#6b5b95" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="energyUsage" fill="#B39DDB" /> {/* Purple color for weekly bar */}
            </BarChart>
          </ResponsiveContainer>
        );
      case "month":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#6b5b95" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="energyUsage" fill="#B39DDB" /> {/* Purple color for monthly bar */}
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Selector de Periodo */}
      <View style={styles.tabContainer}>
        {["hour", "week", "month"].map((period) => (
          <Pressable
            key={period}
            onPress={() => setSelectedPeriod(period)}
            style={[styles.tab, selectedPeriod === period && styles.activeTab]}
          >
            <Text style={[styles.tabText, selectedPeriod === period && styles.activeTabText]}>
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Mostrar Totales y Promedios con diseño personalizado */}
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

      {/* Contenedor del gráfico */}
      <View style={styles.chartContainer}>
        {renderChart()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f1',
    paddingTop: 20,
    fontFamily: 'ShareTech-Regular',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    borderRadius: 40,
    alignSelf: 'center',
    width: '90%',
    marginVertical: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    color: '#000',
    fontWeight: '500',
    fontFamily: 'ShareTech-Regular',
  },
  activeTabText: {
    color: '#6b5b95',
    fontWeight: '700',
    fontFamily: 'ShareTech-Regular',
  },
  summaryContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    fontFamily: 'ShareTech-Regular', 
  },
  
  summaryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6FA', // Light lavender background
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: '90%', // Adjust to take most of the screen width
    marginVertical: 10, // Add spacing between boxes
  },
  
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#B39DDB', // Softer purple shade
    marginRight: 20,
  },
  
  summaryText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Darker text color
    fontFamily: 'ShareTech-Regular',
  },
  
  summaryLabel: {
    fontSize: 14,
    color: '#757575', // Light gray for subtitle
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'ShareTech-Regular',
  },
  
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
