import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserContext from './cadastro/UserContextFile'; // ajuste o caminho conforme necessário

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { state } = useContext(UserContext);

    const handleLogin = () => {
        const user = state.usuarios.find(u => u.email === email && u.password === password);
        if (user) {
            // Se login for bem-sucedido, navegue para as tabs e passe o ID do motorista logado
            navigation.navigate('Tabs', { motoristaId: user.id });
        } else {
            alert('Email ou senha incorretos');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <Button title="Entrar" onPress={handleLogin} />
            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate('ReservationForm')}
            >
                <Text style={styles.registerButtonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    registerButton: {
        marginTop: 16,
        alignItems: 'center',
    },
    registerButtonText: {
        fontSize: 16,
        color: 'blue',
    },
});

export default LoginScreen;
