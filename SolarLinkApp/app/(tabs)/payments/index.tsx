import { DataContext } from "@/context/DataContext/DataContext";
import React, { useContext, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";

const UserConsumption = () => {
  const { userData, consumptionData, isLoading } = useContext(DataContext);


  if (isLoading) {
    return <Text style={styles.loadingText}>Cargando datos...</Text>;
  }

  if (!userData || !consumptionData) {
    return <Text style={styles.noDataText}>No hay datos disponibles para este usuario.</Text>;
  }

  // Preparar datos para el gráfico mensual
  const monthlyData = consumptionData.monthlyData.map((item) => ({
    ...item,
    month: item.month,
    energyUsage: item.totalEnergyUsage * 1000, // Multiplicar por mil
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>¡Bienvenido, {userData.name}!</Text>
      <Text style={styles.subtitle}>Esto fueron sus costos mensuales:</Text>

      {/* Historial de pagos */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Historial de Pagos</Text>
        <Text style={styles.noPaymentsText}>Ningún pago registrado.</Text>
      </View>

      {/* Contenedor del gráfico */}
      <View style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#6b5b95" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="energyUsage" fill="#6b5b95" />
          </BarChart>
        </ResponsiveContainer>
      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => alert('Factura pagada')}>
          <Text style={styles.buttonText}>Pagar Factura</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => alert('Consultando factura')}>
          <Text style={styles.buttonText}>Consultar Factura</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f1',
    paddingTop: 20,
    paddingHorizontal: 20,
    fontFamily: 'ShareTech-Regular',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'ShareTech-Regular',
    color: '#6b5b95',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#4b4b4b',
    fontFamily: 'ShareTech-Regular',
  },
  loadingText: {
    textAlign: 'center',
    color: '#6b5b95',
  },
  noDataText: {
    textAlign: 'center',
    color: '#6b5b95',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 1
  },
  button: {
    backgroundColor: '#6b5b95',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'ShareTech-Regular',
  },
  historyContainer: {
    marginTop: 30,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b5b95',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily    : 'ShareTech-Regular',
  },
  noPaymentsText: {
    textAlign: 'center',
    color: '#4b4b4b',
    fontFamily: 'ShareTech-Regular',
  },
});

export default UserConsumption;
