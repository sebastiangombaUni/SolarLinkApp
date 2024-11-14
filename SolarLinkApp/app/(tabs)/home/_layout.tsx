import { Stack, Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <>
      <View style={styles.header}>
      </View>
      <Stack
     initialRouteName="index"
     >
       
        {/* <Stack.Screen
          name="message"
          options={{
            title: "Mensajes",
          }}
        /> */}
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  linksContainer: {
    flexDirection: 'row',
  },
  link: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007AFF',
  },
});