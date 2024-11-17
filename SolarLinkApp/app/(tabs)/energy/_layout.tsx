import { Stack, Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function RootLayout() {
  
  return (
    <>
      <View style={styles.header}>
        {/* Izquierda: Logo y texto */}
        <View style={styles.leftSection}>
          <FontAwesome5 name="bolt" size={20} color="green" />
          <Text style={styles.systemText}>Juanes System</Text>
        </View>

        {/* Centro: SolarLink */}
        <Text style={styles.title}>SolarLink</Text>

        {/* Derecha: Íconos */}
        <View style={styles.rightSection}>
         
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome5 name="bell" size={20} color="#333" />
            </TouchableOpacity>
      
         
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome5 name="cog" size={20} color="#333" />
            </TouchableOpacity>
        
        </View>
      </View>
      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{
            headerShown: false, // Oculta el encabezado predeterminado
          }}
        />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f1", 
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  systemText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333", // Color de texto
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center", // Centra el texto
  },
  rightSection: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15, // Espaciado entre los íconos
  },
});
