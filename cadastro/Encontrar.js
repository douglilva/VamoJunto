//imports
import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { ListItem } from '@rneui/themed'; 
import TripsContext from './TripContextFile';
import trajetoImage from './assets/trajeto.png'

export default function TripList({ route, navigation }) {
    const { state, dispatch } = useContext(TripsContext);
    const [searchTerm, setSearchTerm] = useState('');
    const { motoristaId } = route.params;
    const [visible, setVisible] = useState(false);

    //se inscrever na trip
    function participateInTrip(tripId) {
        dispatch({ type: 'addPassenger', payload: { tripId, motoristaId } });
    }

    function getActions(trip) {
       
        return (
            <Button
                onPress={() => participateInTrip(trip.id)}
                mode='contained'
                style={styles.actionButton}
            >
                Participar
            </Button>
        );
    }
    //mostrar as trips disponiveis
    function getTripsItems({ item: trip }) {
        if (trip.driver === motoristaId || trip.availableSeats <= 0 || trip.passengers.includes(motoristaId) || trip.parar) {
            return null;
        }

        const origin = trip.origin || 'Origem não informada';
        const destination = trip.destination || 'Destino não informado';
        const date = trip.date || 'Data não informada';
        const time = trip.time || 'Hora não informada';
        const availableSeats = trip.availableSeats != null ? trip.availableSeats : 'Não informado';

        return (
            <ListItem
                onPress={() => navigation.navigate('TripDetails', { trip })}
                bottomDivider>
                <ListItem.Content>
                        <View style={styles.titleContainer}>
                            <Image source={trajetoImage} style={styles.image} />
                            <View>
                                <Text style={styles.titulo}>{origin}</Text>
                                <Text style={styles.titulo_destino}>{destination}</Text>
                            </View>
                        </View>
                        <ListItem.Subtitle style={styles.subtitulo}><Text style={styles.bold}>Data:</Text> {date}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.subtitulo}><Text style={styles.bold}>Hora:</Text> {time}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.subtitulo}><Text style={styles.bold}>Assentos disponíveis:</Text> {availableSeats}</ListItem.Subtitle>
                </ListItem.Content>
                {getActions(trip)}
            </ListItem>
        );
    }

    //Filtro para busca
    const filteredTrips = state.trips.filter(trip =>
        (trip.origin && trip.origin.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (trip.destination && trip.destination.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    //retorna a busca
    return (
        <View style={styles.container}>
            <TextInput
                label="Busque a origem ou destino"
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
                style={styles.input}
                mode="outlined"
            />
            <FlatList
                keyExtractor={trip => trip.id.toString()}
                data={filteredTrips}
                renderItem={getTripsItems}
            />
        </View>
    );
}
//estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        marginBottom: 16,
    },
    subtitulo: {
        fontSize: 15,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6200ee',
        marginLeft: -20,
    },
    titulo_destino: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6200ee',
        marginTop: 10,
        marginLeft: -20,
    },
    bold: {
        fontWeight: 'bold',
        color: '#6200ee',
    },
    image: {
        width: 50, 
        height: 100, 
        marginRight: 10,
        marginLeft: -20,
        transform: [{ rotate: '90deg' }],
        resizeMode: 'contain',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -35,
        marginBottom: -10,
    },
    actionButton: {
        marginTop: 0,
    },
});
