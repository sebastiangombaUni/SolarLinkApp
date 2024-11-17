import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext/AuthContext";
import React from "react";
import { DataProvider } from "@/context/DataContext/DataContext";

export default function RootLayout() {
  return (
    <AuthProvider>
    <DataProvider>
  
      <Stack
        screenOptions={{
          headerShown: false,
          headerTintColor: '#2c363f',
          headerTransparent: true,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Start' }} />
        <Stack.Screen name="getStarted" options={{ title: 'Getting Started' }} />
        <Stack.Screen name="signUp" options={{ title: 'Sign Up' }} />
       
        <Stack.Screen name="(tabs)" />
      </Stack>
      </DataProvider>
    </AuthProvider>
  );
}