import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Button, ActivityIndicator, StyleSheet, Pressable } from 'react-native';

interface MessageProps {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
const API_KEY = 'AIzaSyB3aD4yq91IcpHBnI1kimF1-R92M0HMBcU'; // Asegúrate de reemplazarlo con tu clave real

export default function Chat() {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const userMessage: MessageProps = {
            id: `${Date.now()}`,
            text: message,
            sender: 'user',
        };

        setMessages((prev) => [userMessage, ...prev]);
        setMessage('');
        setLoading(true);

        try {
            const body = {
                contents: [
                    {
                        parts: [
                            {
                                text: message,
                            },
                        ],
                    },
                ],
            };

            const response = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            console.log('Respuesta del servidor:', data); // Registro detallado de la respuesta

            const botText =
                data?.candidates?.[0]?.content?.text || "No response content received.";


            const botMessage: MessageProps = {
                id: `${Date.now()}-bot`,
                text: botText,
                sender: 'bot',
            };

            setMessages((prev) => [botMessage, ...prev]);
        } catch (error) {
            console.error('Error al comunicar con Gemini:', error);

            // Mensaje de error
            const errorMessage: MessageProps = {
                id: `${Date.now()}-error`,
                text: 'Error connecting to Gemini. Please try again later.',
                sender: 'bot',
            };
            setMessages((prev) => [errorMessage, ...prev]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageContainer,
                            item.sender === 'user' ? styles.myMessage : styles.theirMessage,
                        ]}
                    >
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
                inverted
            />
            
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={message}
                    onChangeText={setMessage}
                />
                <Pressable style={{backgroundColor: '#957fef', padding: 10, borderRadius:40}} onPress={handleSendMessage} ><Text style={{fontFamily: 'ShareTech-Regular', color: 'white'}}>Enviar</Text></Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5ea',
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    myMessage: {
        backgroundColor: '#957fef',
        alignSelf: 'flex-end',
    },
    theirMessage: {
        backgroundColor: '#E5E5EA',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});
