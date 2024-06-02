import React, { useState, useContext, useEffect } from 'react';
import { View, Alert, Modal, StyleSheet } from 'react-native';
import { Button, Text, TextInput, Appbar } from 'react-native-paper'; // Importando Button, Text e TextInput do React Native Paper
import UserContext from './cadastro/UserContextFile';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o ícone que deseja usar

const ProfileScreen = ({ route, navigation }) => {
    const { motoristaId } = route.params;
    const { state, dispatch } = useContext(UserContext);
    const currentUser = state.usuarios.find(user => user.id === motoristaId);

    const [user, setUser] = useState({
        name: '',
        document: '',
        email: '',
        password: '',
        nota: 0,
    });

    const [oldPassword, setOldPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setUser({
                name: currentUser.name,
                document: currentUser.document,
                email: currentUser.email,
                password: currentUser.password,
                nota: currentUser.nota,
            });
        }
    }, [currentUser]);

    const handleUpdate = () => {
        if (!user.name.trim() || !user.document.trim() || !user.email.trim() || !user.password.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setModalVisible(true);
    };

    const confirmUpdate = () => {
        if (oldPassword !== currentUser.password) {
            Alert.alert('Erro', 'A senha antiga está incorreta.');
            return;
        }

        const updatedUser = {
            ...currentUser,
            name: user.name,
            document: user.document,
            email: user.email,
            password: user.password,
        };

        dispatch({ type: 'updateUsuario', payload: updatedUser });
        setModalVisible(false);
    };

    const renderStars = () => {
        const stars = [];
        const integerPart = Math.floor(user.nota);
        const decimalPart = user.nota - integerPart;

        for (let i = 0; i < integerPart; i++) {
            stars.push(<Icon key={i} name="star" size={20} color="#FFD700" />);
        }

        if (decimalPart > 0) {
            stars.push(<Icon key="half" name="star-half-empty" size={20} color="#FFD700" />);
        }

        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Icon key={integerPart + i} name="star-o" size={20} color="#FFD700" />);
        }

        return stars;
    };

    const renderNotaText = () => {
        if (user.nota >= 0 && user.nota < 2) {
            return 'Tem que melhorar :(';
        } else if (user.nota >= 2 && user.nota < 3) {
            return 'Boa!';
        } else if (user.nota >= 3 && user.nota < 4) {
            return 'Boa!';
        } else if (user.nota >= 4 && user.nota < 5) {
            return 'Muito boa!';
        } else if (user.nota === 5) {
            return 'Excelente!';
        } else {
            return '';
        }
    };

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.Content title="Perfil" titleStyle={styles.title} />
                <Appbar.Action icon="logout" onPress={handleLogout} color="#ffffff" />
            </Appbar.Header>
            <View style={styles.container}>
                <Text>Nota do usuário:</Text>
                <View style={styles.starsContainer}>
                    {renderStars()}
                    <Text style={styles.notaText}>{renderNotaText()}</Text>
                </View>
                <TextInput
                    label="Nome"
                    value={user.name}
                    onChangeText={name => setUser({ ...user, name })}
                    style={styles.input}
                />
                <TextInput
                    label="Documento"
                    value={user.document}
                    onChangeText={document => setUser({ ...user, document })}
                    style={styles.input}
                />
                <TextInput
                    label="Email"
                    value={user.email}
                    onChangeText={email => setUser({ ...user, email })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />
                <TextInput
                    label="Senha"
                    value={user.password}
                    onChangeText={password => setUser({ ...user, password })}
                    secureTextEntry
                    style={styles.input}
                />
                <Button mode="contained" onPress={handleUpdate} style={styles.button}>
                    Atualizar
                </Button>
                
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Digite sua senha antiga para confirmar a atualização:</Text>
                            <TextInput
                                label="Senha Antiga"
                                value={oldPassword}
                                onChangeText={setOldPassword}
                                secureTextEntry
                                style={styles.input}
                            />
                            <Button mode="contained" onPress={confirmUpdate} style={styles.button}>
                                Confirmar
                            </Button>
                            <Button mode="contained"
 onPress={() => setModalVisible(false)} style={styles.button}>
 Cancelar
</Button>
</View>
</View>
</Modal>
</View>
</View>
);
};

const styles = StyleSheet.create({
appbar: {
backgroundColor: '#6200ee', // Cor de fundo do cabeçalho personalizada
},
title: {
color: '#ffffff', // Cor do texto do cabeçalho personalizada
fontWeight: 'bold',
},
container: {
padding: 20,
},
input: {
marginBottom: 10,
},
button: {
marginBottom: 10,
},
centeredView: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
marginTop: 22,
},
modalView: {
margin: 20,
backgroundColor: 'white',
borderRadius: 20,
padding: 35,
alignItems: 'center',
shadowColor: '#000',
shadowOffset: {
width: 0,
height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 4,
elevation: 5,
},
modalText: {
marginBottom: 15,
textAlign: 'center',
},
starsContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 10,
},
notaText: {
marginLeft: 5,
fontSize: 16,
},
});

export default ProfileScreen;
