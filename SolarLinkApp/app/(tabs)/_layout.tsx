import { View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { DataProvider } from '@/context/DataContext/DataContext';

export default function _layout() {
  return (
    <DataProvider>
      <View style={{ flex: 1, backgroundColor: '#f9f9f1' }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: '#f9f9f1' },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="production"
            options={{
              title: 'Production',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="solar-panel" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="energy"
            options={{
              title: 'Energy',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="plug" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="home" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="payments"
            options={{
              title: 'Payments',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="money-bill-alt" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="support"
            options={{
              title: 'Support',
              tabBarIcon: ({ color }) => (
                <FontAwesome5 name="hands-helping" size={24} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </DataProvider>
  );
}
