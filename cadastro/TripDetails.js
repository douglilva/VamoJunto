//imports
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import UserContext, { getUserById } from './UserContextFile';

const TripDetails = ({ route }) => {
    const { trip, motoristaId } = route.params;
    const { state: userState } = useContext(UserContext);

    // Encontrar o nome do motorista com base no ID
    const findDriverName = (driverId) => {
        const driver = getUserById(userState, driverId);
        return driver ? driver.name : 'Não encontrado';
    };

    // Encontrar a nota do motorista com base no ID
    const findDriverRate = (driverId) => {
        const driver = getUserById(userState, driverId);
        return driver ? driver.nota : 'Não encontrado';
    };


    // Encontrar o nome de cada passageiro com base no ID
    const findPassengerName = (passengerId) => {
        const passenger = getUserById(userState, passengerId);
        return passenger ? passenger.name : 'Não encontrado';
    };

    const renderPassenger = ({ item }) => (
        <Text style={styles.text}>{findPassengerName(item)}</Text>
    );

//mostrar os detalhes
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
                <>
                <Text style={styles.text}><Text style={styles.bold}>Nome do motorista:</Text> {findDriverName(trip.driver)}</Text>
                <Text style={styles.text}><Text style={styles.bold}>Nota do motorista:</Text> {findDriverRate(trip.driver)}</Text>
                </>
            )}
        </View>
    );

    //Mostrar imagem de fundo
    return (
        <FlatList
            ListHeaderComponent={() => (
                <Image source={require('./assets/bora-la.png')} style={styles.image} />
            )}
            data={[{ key: 'content' }]}
            renderItem={renderContent}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.contentContainer}
            style={styles.screenContainer}
        />
    );
};

//Estilos
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#ffffff', 
    },
    contentContainer: {
        flexGrow: 1,
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'contain', 
    },
    container: {
        flex: 1,
        backgroundColor: '#6200ee', 
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 10,
        marginTop: 20,
        flexGrow: 1,
    },
    text: {
        color: '#ffffff',
        marginBottom: 10,
        fontSize:15,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default TripDetails;
