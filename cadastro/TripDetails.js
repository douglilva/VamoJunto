import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import UserContext, { getUserById } from './UserContextFile'; // Importando o contexto de usuários e a função para buscar usuário pelo ID

const TripDetails = ({ route, navigation }) => {
    const { trip } = route.params;
    const { state: userState } = useContext(UserContext); // Obtendo o estado do contexto de usuários

    // Função para encontrar o nome do motorista com base no ID
    const findDriverName = (driverId) => {
        const driver = getUserById(userState, driverId);
        return driver ? driver.name : 'Não encontrado';
    };

    return (
        <View style={styles.container}>
            <Text>Origem: {trip.origin}</Text>
            <Text>Destino: {trip.destination}</Text>
            <Text>Data: {trip.date}</Text>
            <Text>Hora: {trip.time}</Text>
            <Text>Assentos disponíveis: {trip.availableSeats}</Text>
            <Text>Nome do motorista: {findDriverName(trip.driver)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

export default TripDetails;
