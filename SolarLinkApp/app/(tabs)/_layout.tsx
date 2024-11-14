import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { DataProvider } from '@/context/DataContext/DataContext';


export default function _layout() {
    return (
        <DataProvider>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "blue",
                    headerShown: false
                }}
            >
                <Tabs.Screen
                    name='home'
                    options={{
                        title: "home",
                        tabBarIcon: ({ color }) => (<FontAwesome5 name="home" size={24} color={color} />)
                    }}
                />
                <Tabs.Screen
                    name='energy'
                    options={{
                        title: "Energy",
                        tabBarIcon: ({ color }) => (<FontAwesome5 name="bolt" size={24} color={color} />)
                    }}
                />
                <Tabs.Screen
                    name='payments'
                    options={{
                        title: "Payments",
                        tabBarIcon: ({ color }) => (<FontAwesome5 name="credit-card" size={24} color={color} />)
                    }}
                />
                <Tabs.Screen
                    name='production'
                    options={{
                        title: "Production",
                        tabBarIcon: ({ color }) => (<FontAwesome5 name="industry" size={24} color={color} />)
                    }}
                />
                <Tabs.Screen
                    name='support'
                    options={{
                        title: "Support",
                        tabBarIcon: ({ color }) => (<FontAwesome5 name="hands-helping" size={24} color={color} />)
                    }}
                />
            </Tabs>
        </DataProvider>
    );
}
