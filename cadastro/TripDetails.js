import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import UserContext, { getUserById } from './UserContextFile'; // Importando o contexto de usuários e a função para buscar usuário pelo ID

const TripDetails = ({ route }) => {
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
        <ScrollView style={styles.screenContainer} contentContainerStyle={styles.contentContainer}>
            <Image source={require('./bora-la.jpg')} style={styles.image} />
            <View style={styles.container}>
                <Text style={styles.text}>Origem: {trip.origin}</Text>
                <Text style={styles.text}>Destino: {trip.destination}</Text>
                <Text style={styles.text}>Data: {trip.date}</Text>
                <Text style={styles.text}>Hora: {trip.time}</Text>
                <Text style={styles.text}>Assentos disponíveis: {trip.availableSeats}</Text>
                {trip.motoristaId === motoristaId ? (
                    <>
                        <Text style={styles.text}>Passageiros:</Text>
                        {trip.passengers.length === 0 ? (
                            <Text style={styles.text}>Ainda não há passageiros</Text>
                        ) : (
                            <FlatList
                                data={trip.passengers}
                                renderItem={({ item }) => (
                                    <Text style={styles.text}>{findPassengerName(item)}</Text>
                                )}
                                keyExtractor={(item) => item.toString()}
                            />
                        )}
                    </>
                ) : (
                    <Text style={styles.text}>Nome do motorista: {findDriverName(trip.driver)}</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#f9f9f9', // Fundo da tela anterior
    },
    contentContainer: {
        flexGrow: 1,
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'contain', // Garantir que a imagem não seja cortada
    },
    container: {
        flex: 1,
        backgroundColor: '#6200ee', // Fundo do retângulo arredondado
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: -20, // Remove a margem inferior
        flexGrow: 1, // Garantir que o contêiner se estenda para preencher o espaço
    },
    text: {
        color: '#ffffff', // Cor do texto
        marginBottom: 10,
    },
});

export default TripDetails;
