import { View, Text, ScrollView, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import ModalCamera from '@/components/ModalCamera'; // Asegúrate de importar el modal QR

export default function FAQ() {
  const router = useRouter();
  const [isQRModalVisible, setQRModalVisible] = useState(false);

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

  const handleQRScanned = (data: string) => {
    console.log('Código QR escaneado:', data);
    setQRModalVisible(false);
    // Puedes manejar los datos escaneados aquí (redirigir, mostrar información, etc.)
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "FAQ's" }} />
      
      {/* Modal para lector QR */}
      <ModalCamera
        isVisible={isQRModalVisible}
        onClose={() => setQRModalVisible(false)}
        onQRScanned={handleQRScanned}
      />

      <ScrollView>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}

        <View style={styles.buttonRow}>
          {/* Botón "Talk to us" */}
          <Pressable
            style={styles.chatButton}
            onPress={() => router.push('/support/${chatId}')}
          >
            <Text style={styles.chatButtonText}>Talk to us</Text>
          </Pressable>

          {/* Botón QR */}
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => setQRModalVisible(true)}
          >
            <Text style={styles.qrButtonText}>QR</Text>
          </TouchableOpacity>
        </View>
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
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  chatButton: {
    flex: 1,
    paddingVertical: 15,
    marginRight: 10,
    backgroundColor: '#957fef',
    borderRadius: 40,
    alignItems: 'center',
  },
  chatButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'ShareTech-Regular',
  },
  qrButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#957fef',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  qrButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
