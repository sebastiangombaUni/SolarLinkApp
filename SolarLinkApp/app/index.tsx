import {Link } from 'expo-router';
import { Button, Pressable, Text, View, StyleSheet } from "react-native";

export default function index() {
    return (
        <View style ={{flex : 1, margin:20, gap: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f5ea'}}>
            <Text style={styles.title}>
                SolarLink
            </Text>
            <Text style={styles.text}>
                <Text style={styles.text2}>Empower</Text> your life with smart <Text style={styles.text2}>solar energy</Text>
            </Text>
            


            <Link href="/getStarted" asChild>
                <Pressable style={styles.button}><Text>Get Started</Text></Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        lineHeight: 32,
        alignContent: 'center',
        
    },
    text2: {
        fontSize: 28,
        lineHeight: 32,
        //fontWeight: 'bold', 
        alignContent: 'center',
        color: '#957fef',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
        color: '#2c363f',
        alignItems: 'center',
    },
    button: {
        backgroundColor: "#957fef", // Azul oscuro
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 40,
        marginBottom: 20,
        marginTop: 50,
    }
})