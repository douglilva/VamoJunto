//imports
import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ListItem, Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import TripsContext from './TripContextFile';
import trajetoImage from './assets/trajeto.png'; 

// Componente para listar as viagens com as opções de participar e buscar por viagens
export default function TripList({ route }) {
    const navigation = useNavigation();
    const { state, dispatch } = useContext(TripsContext);
    const [searchTerm, setSearchTerm] = useState('');
    const { motoristaId } = route.params;

    //remove o passageiro se usuario cancelar particacao
    function participateInTrip(tripId) {
        dispatch({ type: 'removePassenger', payload: { tripId, motoristaId } });
    }

    //botao para cancelar participacao
    function getActions(trip) {
        return (
            <Button
                onPress={() => participateInTrip(trip.id)}
                type='clear'
                icon={<Icon name='cancel' size={35} color='#6200ee' />}
            />
        );
    }

    //funcao para exibir as viagens
    function getTripsItems({ item: trip }) {
        //verifica se o usuario esta incluso na lista de passageiros
        if (trip.passengers.includes(motoristaId) && !trip.parar) {
            const origin = trip.origin || 'Origem não informada';
            const destination = trip.destination || 'Destino não informado';
            const date = trip.date || 'Data não informada';
            const time = trip.time || 'Hora não informada';
            const availableSeats = trip.availableSeats != null ? trip.availableSeats : 'Não informado';

            return (
                <ListItem
                    onPress={() => navigation.navigate('ChatScreen', { trip, motoristaId })}
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
        } else {
            return null;
        }
    }

    //filtro para a busca
    const filteredTrips = state.trips.filter(trip =>
        (trip.origin && trip.origin.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (trip.destination && trip.destination.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    //exibir caixa de busca
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                label="Busque a origem ou destino"
                value={searchTerm}
                onChangeText={setSearchTerm}
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
    },
});
