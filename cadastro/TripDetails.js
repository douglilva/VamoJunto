import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from '@rneui/themed';
import UserContext, { getUserById } from './UserContextFile'; // Importando o contexto de usuários e a função para buscar usuário pelo ID

const TripDetails = ({ route, navigation }) => {
    const { trip, motoristaId } = route.params;
    const { state: userState } = useContext(UserContext); // Obtendo o estado do contexto de usuários

    // Função para encontrar o nome do motorista com base no ID
    const findDriverName = (driverId) => {
        const driver = getUserById(userState, driverId);
        return driver ? driver.name : 'Não encontrado';
    };

    // Função para encontrar o nome de cada passageiro com base no ID
    const findPassengerName = (passengerId) => {
        const passenger = getUserById(userState, passengerId);
        return passenger ? passenger.name : 'Não encontrado';
    };

    if (trip.motoristaId === motoristaId) {
        return (
            <View style={styles.container}>
                <Text>Origem: {trip.origin}</Text>
                <Text>Destino: {trip.destination}</Text>
                <Text>Data: {trip.date}</Text>
                <Text>Hora: {trip.time}</Text>
                <Text>Assentos disponíveis: {trip.availableSeats}</Text>
                <Text>Passageiros:</Text>
                {trip.passengers.length === 0 ? (
                    <Text>Ainda não há passageiros</Text>
                ) : (
                    <FlatList
                        data={trip.passengers}
                        renderItem={({ item }) => (
                            <Text>{findPassengerName(item)}</Text>
                        )}
                    />
                )}
            </View>
        );
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