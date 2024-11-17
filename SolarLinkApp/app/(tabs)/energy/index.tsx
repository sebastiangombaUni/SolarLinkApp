import { DataContext } from '@/context/DataContext/DataContext';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
 // Ajusta la ruta según donde tengas tu DataContext

export default function EnergyScreen() {
  const { state, fetchConsumptionData } = useContext(DataContext);  // Accede al contexto de datos
  const { hourlyData, weeklyData, monthlyData, loading, user } = state;
  const [selectedPeriod, setSelectedPeriod] = useState('hour');

  // Función para obtener los datos según el periodo seleccionado
  const getData = () => {
    switch (selectedPeriod) {
      case 'hour':
        return hourlyData;
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      default:
        return hourlyData;
    }
  };

  useEffect(() => {
    if (user && loading) {
      fetchConsumptionData();  // Carga los datos al iniciar
    }
  }, [user, loading]);



  return (
    <View style={styles.container}>
      {/* Selector de Periodo */}
      <View style={styles.tabContainer}>
        {['hour', 'week', 'month'].map((period) => (
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

      {/* Gráfico */}
      <View style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={getData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#6b5b95" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6b5b95" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f1',
    paddingTop: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    borderRadius: 40,
    marginHorizontal: 'auto',
    marginVertical: 'auto',
    overflow: 'hidden',
    alignSelf: 'center',
    width: '90%',
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
  },
  activeTabText: {
    color: '#6b5b95',
    fontWeight: '700',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
