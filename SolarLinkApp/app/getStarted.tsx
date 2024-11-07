import { Link } from 'expo-router';
import { ActivityIndicator, Pressable, Text, View, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function getStarted() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>
            SolarLink
        </Text>
        
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome.</Text>
          
          <Text style={styles.label}>Email address</Text>
          <TextInput 
            style={styles.input}
            placeholder="email"
            placeholderTextColor="#6b7280"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="#6b7280"
          />

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </Pressable>
          <Text style={{alignSelf: 'center', color: '#FFFFFF', paddingTop: 20}}>Or</Text>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      margin: 20,
      gap: 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f2f5ea', 
  },
  title: {
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: 'ShareTech-Regular',
      lineHeight: 32,
      color: '#2c363f',
      alignItems: 'center',
      marginBottom: 40,
  },
  formContainer: {
      width: '100%',
      padding: 30,
      borderRadius: 20,
      backgroundColor: 'rgba(149, 127, 239, 0.4)', 
      alignItems: 'center',
  },
  welcomeText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      alignSelf: 'flex-start',
  },
  label: {
      alignSelf: 'flex-start',
      marginTop: 15,
      fontSize: 16,
      color: '#333',
      fontFamily: 'ShareTech-Regular',
  },
  input: {
      width: '100%',
      padding: 10,
      marginVertical: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
  },
  button: {
      backgroundColor: "#957fef",
      paddingVertical: 15,
      paddingHorizontal: 60,
      borderRadius: 40,
      marginTop: 20,
      alignItems: 'center',
  },
  buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontFamily: 'ShareTech-Regular',
  },
});
