import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import UserContext from './UserContextFile';

const UserRegistrationForm = ({ navigation }) => {
    const { state, dispatch } = useContext(UserContext);
    const [user, setUser] = useState({
        name: '',
        document: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        console.warn('Usuários salvos:', state.usuarios);
    }, [state.usuarios]);

    const handleRegister = () => {
        if (!user.name.trim() || !user.document.trim() || !user.email.trim() || !user.password.trim() || !user.confirmPassword.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (user.password !== user.confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        const newUser = {
            name: user.name,
            document: user.document,
            email: user.email,
            password: user.password
        };

        dispatch({ type: 'createUsuario', payload: newUser });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text>Nome:</Text>
            <TextInput
                style={styles.input}
                value={user.name}
                onChangeText={name => setUser({ ...user, name })}
                placeholder="Informe seu nome"
            />
            <Text>Documento:</Text>
            <TextInput
                style={styles.input}
                value={user.document}
                onChangeText={document => setUser({ ...user, document })}
                placeholder="Informe o número do seu documento"
            />
            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={email => setUser({ ...user, email })}
                placeholder="Informe seu email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text>Senha:</Text>
            <TextInput
                style={styles.input}
                value={user.password}
                onChangeText={password => setUser({ ...user, password })}
                placeholder="Informe sua senha"
                secureTextEntry
            />
            <Text>Confirmar Senha:</Text>
            <TextInput
                style={styles.input}
                value={user.confirmPassword}
                onChangeText={confirmPassword => setUser({ ...user, confirmPassword })}
                placeholder="Confirme sua senha"
                secureTextEntry
            />
            <Button title="Cadastrar" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default UserRegistrationForm;
