import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
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

    const renderPassenger = ({ item }) => (
        <Text style={styles.text}>{findPassengerName(item)}</Text>
    );

    const renderContent = () => (
        <View style={styles.container}>
            <Text style={styles.text}><Text style={styles.bold}>Origem:</Text> {trip.origin}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Destino:</Text> {trip.destination}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Data:</Text> {trip.date}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Hora:</Text> {trip.time}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Assentos disponíveis:</Text> {trip.availableSeats}</Text>
            {trip.motoristaId === motoristaId ? (
                <>
                    <Text style={styles.text}><Text style={styles.bold}>Passageiros:</Text></Text>
                    {trip.passengers.length === 0 ? (
                        <Text style={styles.text}>Ainda não há passageiros</Text>
                    ) : (
                        <FlatList
                            data={trip.passengers}
                            renderItem={renderPassenger}
                            keyExtractor={(item) => item.toString()}
                        />
                        
                    )}
                </>
            ) : (
                <Text style={styles.text}><Text style={styles.bold}>Nome do motorista:</Text> {findDriverName(trip.driver)}</Text>
            )}
        </View>
    );

    return (
        <FlatList
            ListHeaderComponent={() => (
                <Image source={require('./bora-la.png')} style={styles.image} />
            )}
            data={[{ key: 'content' }]} // Dummy data to trigger rendering
            renderItem={renderContent}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.contentContainer}
            style={styles.screenContainer}
        />
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#ffffff', // Fundo da tela anterior
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
        flexGrow: 1, // Garantir que o contêiner se estenda para preencher o espaço
    },
    text: {
        color: '#ffffff', // Cor do texto
        marginBottom: 10,
        fontSize:15,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default TripDetails;
