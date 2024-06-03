import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { TextInput, Button, Text, Portal, Modal, Paragraph } from 'react-native-paper';
import UserContext from './UserContextFile';
import * as ImagePicker from 'expo-image-picker';

const UserRegistrationForm = ({ navigation }) => {
    const { state, dispatch } = useContext(UserContext);
    const [user, setUser] = useState({
        name: '',
        document: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null
    });
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Solicitar permissões de mídia no uso do aplicativo
        const requestPermission = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Desculpe, precisamos da permissão da galeria para isso funcionar!');
            }
        };

        requestPermission();
    }, []);

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
            password: user.password,
            profileImage: user.profileImage
        };

        dispatch({ type: 'createUsuario', payload: newUser });
        navigation.goBack();
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setUser({ ...user, profileImage: result.assets[0].uri });
        }
    };

    const hideModal = () => setVisible(false);

    return (
        <View style={styles.container}>
            {user.profileImage && (
                <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            )}
            <TextInput
                style={styles.input}
                label="Nome"
                value={user.name}
                onChangeText={name => setUser({ ...user, name })}
                placeholder="Informe seu nome"
                mode="outlined"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                label="Documento"
                value={user.document}
                onChangeText={document => setUser({ ...user, document })}
                placeholder="Informe o número do seu documento"
                mode="outlined"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                label="Email"
                value={user.email}
                onChangeText={email => setUser({ ...user, email })}
                placeholder="Informe seu email"
                keyboardType="email-address"
                autoCapitalize="none"
                mode="outlined"
            />
            <TextInput
                style={styles.input}
                label="Senha"
                value={user.password}
                onChangeText={password => setUser({ ...user, password })}
                placeholder="Informe sua senha"
                secureTextEntry
                mode="outlined"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                label="Confirmar Senha"
                value={user.confirmPassword}
                onChangeText={confirmPassword => setUser({ ...user, confirmPassword })}
                placeholder="Confirme sua senha"
                secureTextEntry
                mode="outlined"
                autoCapitalize="none"
            />
            <Button mode="contained" onPress={pickImage} style={styles.button}>
                Selecionar Foto de Perfil
            </Button>
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
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 16,
        alignSelf: 'center'
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
