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
        <Stack.Screen name="index" options={{ title: 'Start' }} />
        <Stack.Screen name="getStarted" options={{ title: 'Getting Started' }} />
        <Stack.Screen name="signUp" options={{ title: 'Sign Up' }} />
        {/* Cuando el usuario se loggea */}
        <Stack.Screen name="(tabs)" />
      </Stack>

  );
}