import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import UserContext from './UserContextFile';

const UserRegistrationForm = ({ navigation }) => {
    const { dispatch } = useContext(UserContext);
    const [user, setUser] = useState({
        name: '',
        document: ''
    });

    const handleRegister = () => {
        if (user.name.trim() && user.document.trim()) {
            dispatch({ type: 'createUsuario', payload: user });
            navigation.goBack();
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Nome:</Text>
            <TextInput
                style={styles.input}
                value={user.name}
                onChangeText={(name) => setUser({ ...user, name })}
                placeholder="Informe seu nome"
            />
            <Text>Documento:</Text>
            <TextInput
                style={styles.input}
                value={user.document}
                onChangeText={(document) => setUser({ ...user, document })}
                placeholder="Informe o número do seu documento"
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
