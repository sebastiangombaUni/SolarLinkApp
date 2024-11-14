import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from "@/context/AuthContext/AuthContext";
import { useRouter } from 'expo-router';

export default function SignUp() {
    const { signup } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const router = useRouter();

    const isEmailValid = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSignup = async () => {
        if (!isEmailValid(email)) {
            Alert.alert('Error', 'Enter a valid Email');
            return;
        }
        
        if (password1 !== password2) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            await signup(email, password1, name, lastname, username);
            Alert.alert('Success', 'User created successfully');
            router.push('/tabs/home');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'There has been a problem');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SolarLink</Text>
            
            <View style={styles.formContainer}>
                <Text style={styles.welcomeText}>Welcome.</Text>
                
                <Text style={styles.label}>Name</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#6b7280"
                />

                <Text style={styles.label}>Last Name</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="last name"
                    value={lastname}
                    onChangeText={setLastname}
                    placeholderTextColor="#6b7280"
                />
                
                <Text style={styles.label}>Username</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="username"
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor="#6b7280"
                />

                <Text style={styles.label}>Email address</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#6b7280"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    secureTextEntry
                    value={password1}
                    onChangeText={setPassword1}
                    placeholderTextColor="#6b7280"
                />
                
                <Text style={styles.label1}>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="confirm password"
                    secureTextEntry
                    value={password2}
                    onChangeText={setPassword2}
                    placeholderTextColor="#6b7280"
                />
                
                <Pressable style={styles.button} onPress={handleSignup}>
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
        marginTop: 20,
        fontSize: 16,
        color: '#333',
        fontFamily: 'ShareTech-Regular',
    },
    label1: {
        alignSelf: 'flex-start',
        marginTop: 1,
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
