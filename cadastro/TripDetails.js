import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.imageContainer}>
                {/* Importando e exibindo a imagem "bora-la.jpg" como capa inteira */}
                <Image source={require('./bora-la.jpg')} style={styles.coverImage} resizeMode="contain" />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>Origem: {trip.origin}</Text>
                <Text style={styles.text}>Destino: {trip.destination}</Text>
                <Text style={styles.text}>Data: {trip.date}</Text>
                <Text style={styles.text}>Hora: {trip.time}</Text>
                <Text style={styles.text}>Assentos disponíveis: {trip.availableSeats}</Text>
                <Text style={styles.text}>Passageiros:</Text>
                {trip.passengers.length === 0 ? (
                    <Text style={styles.text}>Ainda não há passageiros</Text>
                ) : (
                    <FlatList
                        data={trip.passengers}
                        renderItem={({ item }) => (
                            <Text style={styles.text}>{findPassengerName(item)}</Text>
                        )}
                    />
                )}
                <Text style={styles.text}>Nome do motorista: {findDriverName(trip.driver)}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fefefe', // Cor de fundo da página
    },
    imageContainer: {
        backgroundColor: 'transparent',
    },
    coverImage: {
        width: '100%',
    },
    textContainer: {
        backgroundColor: '#6200ee',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    text: {
        color: 'white',
        marginBottom: 10,
    },
});

export default TripDetails;
