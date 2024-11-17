import { Link } from 'expo-router';
import { ActivityIndicator, Pressable, Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function Index() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const loadFonts = async () => {
        await Font.loadAsync({
            'ShareTech-Regular': require('../assets/fonts/ShareTech-Regular.ttf'), // Ruta a tu fuente
        });
        setFontsLoaded(true);
    };

    useEffect(() => {
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#957fef" />; // Indicador de carga
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                SolarLink
            </Text>
            <Text style={styles.text}>
                <Text style={styles.text2}>Empower</Text> your life with smart <Text style={styles.text2}>solar energy</Text>
            </Text>

            <Link href="/getStarted" asChild>
                <Pressable style={styles.button}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Get Started</Text>
                </Pressable>
            </Link>

            <Text style={styles.terms}>
                By proceeding, you agree to our <Text style={{textDecorationLine: 'underline'}}>Terms of use</Text> and confirm you have read our <Text style={{textDecorationLine: 'underline'}}>Privacy and Cookie Statement</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        gap: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f5ea',
        fontFamily: 'ShareTech-Regular',
    },
    text: {
        fontSize: 28,
        lineHeight: 32,
        fontFamily: 'ShareTech-Regular', 
        alignContent: 'center',
    },
    text2: {
        fontSize: 28,
        lineHeight: 32,
        fontFamily: 'ShareTech-Regular', 
        alignContent: 'center',
        color: '#957fef',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'ShareTech-Regular', 
        lineHeight: 32,
        color: '#2c363f',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#957fef",
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 40,
        marginBottom: 20,
        marginTop: 50,
    },
    terms: {
        fontSize: 12,
        color: '#2c363f',
        alignItems: 'center',
        textAlignVertical: 'bottom',
        gap: 20,
        fontFamily: 'ShareTech-Regular', 
    },
});
