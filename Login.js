import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Text, Title, Portal, Modal, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import UserContext from './cadastro/UserContextFile'; // ajuste o caminho conforme necessário

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();
    const { state } = useContext(UserContext);

    const handleLogin = () => {
        const user = state.usuarios.find(u => u.email === email && u.password === password);
        if (user) {
            // Se login for bem-sucedido, navegue para as tabs e passe o ID do motorista logado
            navigation.navigate('Tabs', { motoristaId: user.id });
        } else {
            setVisible(true); // Mostrar o modal
        }
    };

    const hideModal = () => setVisible(false);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('./cadastro/logo-vamojunto.png')} style={styles.image} />
            </View>

            <View style={styles.content}>
                
                <TextInput
                    style={styles.input}
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    mode="outlined"
                />
                <TextInput
                    style={styles.input}
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    mode="outlined"
                />
                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Entrar
                </Button>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => navigation.navigate('UserRegistrationForm')}
                >
                    <Text style={styles.registerButtonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Erro de Login</Text>
                    <Paragraph>Email ou senha incorretos</Paragraph>
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
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: -100, // Mover a imagem para cima
        marginBottom: 16,
    },
    image: {
        width: '50%',
        height: 200,
        resizeMode: 'contain', // Garantir que a imagem não seja cortada
    },
    content: {
        marginTop: -50, // Ajuste para manter a distância do título "Login"
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    registerButton: {
        marginTop: 16,
        alignItems: 'center',
    },
    registerButtonText: {
        fontSize: 16,
        color: 'blue',
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

export default LoginScreen;
