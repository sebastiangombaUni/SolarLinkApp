import { Stack } from "expo-router";


export default function RootLayout() {
  return (
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor: '#2c363f',
          headerTransparent: true,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Inicio' }} />
        <Stack.Screen name="getStarted" options={{ title: 'Getting Started' }} />
        {/* Cuando el usuario se loggea */}
        <Stack.Screen name="(tabs)" />
      </Stack>

  );
}