import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';

export default function FAQ() {
  const router = useRouter(); // Usamos el router para navegación

  const faqs = [
    {
      question: "¿Cómo puedo registrarme?",
      answer: "Para registrarte, haz clic en el botón de registro en la pantalla principal y completa el formulario.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos tarjetas de crédito, débito y transferencias bancarias.",
    },
    {
      question: "¿Dónde puedo encontrar información detallada de mi sistema?",
      answer: "La puedes encontrar en la sección 'Mi cuenta' bajo 'Sistema Solar'.",
    },
    {
      question: "¿Qué beneficios trae tener un sistema SolarLink?",
      answer: "Puedes encontrar los beneficios de tener un sistema SolarLink en la sección 'Mi cuenta' bajo 'Sistema Solar'.",
    },
    {
      question: "¿Cómo puedo recibir soporte personalizado de mi sistema SolarLink?",
      answer: "Puedes contactar con nuestro equipo de soporte en la sección 'Talk to us'.",
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "FAQ's" }} />
      <ScrollView>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
        <Pressable
          style={styles.chatButton}
          onPress={() => router.push('/support/${chatId}')} // Navegamos al componente del chat
        >
          <Text style={styles.chatButtonText}>Talk to us</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f5ea', 
    padding: 20,
  },
  faqContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#d6dbd2',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  answer: {
    fontSize: 14,
    color: '#666',
  },
  chatButton: {
    marginTop: 20,
    marginHorizontal: '20%',
    paddingVertical: 15,
    backgroundColor: '#957fef',
    borderRadius: 40,
    alignItems: 'center',
  },
  chatButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'ShareTech-Regular',
  },
});
