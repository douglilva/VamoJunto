import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, Modal, Text } from 'react-native';
import { Button } from '@rneui/themed';
import UserContext from './cadastro/UserContextFile';

const ProfileScreen = ({ route, navigation }) => {
    const { motoristaId } = route.params;
    const { state, dispatch } = useContext(UserContext);
    const currentUser = state.usuarios.find(user => user.id === motoristaId);

    const [user, setUser] = useState({
        name: '',
        document: '',
        email: '',
        password: '',
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
        // Verificar se a senha antiga fornecida corresponde à senha armazenada
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

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={user.name}
                onChangeText={name => setUser({ ...user, name })}
                placeholder="Nome"
            />
            <TextInput
                style={styles.input}
                value={user.document}
                onChangeText={document => setUser({ ...user, document })}
                placeholder="Documento"
            />
            <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={email => setUser({ ...user, email })}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                value={user.password}
                onChangeText={password => setUser({ ...user, password })}
                placeholder="Senha"
                secureTextEntry
            />
            <Button title="Atualizar" onPress={handleUpdate} />
            
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
                            style={styles.input}
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            placeholder="Senha Antiga"
                            secureTextEntry
                        />
                        <Button title="Confirmar" onPress={confirmUpdate} />
                        <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
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
});

export default ProfileScreen;
