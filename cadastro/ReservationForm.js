import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, Portal, Modal, Paragraph } from 'react-native-paper';
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
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        
    }, [state.usuarios]);

    const handleRegister = () => {
        if (!user.name.trim() || !user.document.trim() || !user.email.trim() || !user.password.trim() || !user.confirmPassword.trim()) {
            setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
            setVisible(true);
            return;
        }

        if (user.password !== user.confirmPassword) {
            setErrorMessage('As senhas não coincidem.');
            setVisible(true);
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

    const hideModal = () => setVisible(false);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                value={user.name}
                onChangeText={name => setUser({ ...user, name })}
                placeholder="Informe seu nome"
                mode="outlined"
            />
            <Text style={styles.label}>Documento:</Text>
            <TextInput
                style={styles.input}
                value={user.document}
                onChangeText={document => setUser({ ...user, document })}
                placeholder="Informe o número do seu documento"
                mode="outlined"
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={email => setUser({ ...user, email })}
                placeholder="Informe seu email"
                keyboardType="email-address"
                autoCapitalize="none"
                mode="outlined"
            />
            <Text style={styles.label}>Senha:</Text>
            <TextInput
                style={styles.input}
                value={user.password}
                onChangeText={password => setUser({ ...user, password })}
                placeholder="Informe sua senha"
                secureTextEntry
                mode="outlined"
            />
            <Text style={styles.label}>Confirmar Senha:</Text>
            <TextInput
                style={styles.input}
                value={user.confirmPassword}
                onChangeText={confirmPassword => setUser({ ...user, confirmPassword })}
                placeholder="Confirme sua senha"
                secureTextEntry
                mode="outlined"
            />
            <Button mode="contained" onPress={handleRegister} style={styles.button}>
                Cadastrar
            </Button>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Erro</Text>
                    <Paragraph>{errorMessage}</Paragraph>
                    <Button mode="contained" onPress={hideModal} style={styles.modalButton}>
                        Ok
                    </Button>
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalButton: {
        marginTop: 16,
    },
});

export default UserRegistrationForm;
