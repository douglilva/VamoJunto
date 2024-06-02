import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput} from 'react-native-paper';
import { ListItem, Avatar, Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import TripsContext from './EventContextFile';

// Componente para listar as viagens com as opções de participar e buscar por viagens
export default function TripList({ route }) {
    const navigation = useNavigation();
    const { state, dispatch } = useContext(TripsContext);
    const [searchTerm, setSearchTerm] = useState('');
    const { motoristaId } = route.params;

    function participateInTrip(tripId) {
        dispatch({ type: 'removePassenger', payload: { tripId, motoristaId } });
    }

    function getActions(trip) {
        return (
            <Button
                onPress={() => participateInTrip(trip.id)}
                type='clear'
                icon={<Icon name='cancel' size={25} color='red' />}
            />
        );
    }

    function getTripsItems({ item: trip }) {
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
                        <ListItem.Title>{`${origin} -> ${destination}`}</ListItem.Title>
                        <ListItem.Subtitle>{`Data: ${date}`}</ListItem.Subtitle>
                        <ListItem.Subtitle>{`Hora: ${time}`}</ListItem.Subtitle>
                        <ListItem.Subtitle>{`Assentos disponíveis: ${availableSeats}`}</ListItem.Subtitle>
                    </ListItem.Content>
                    {getActions(trip)}
                </ListItem>
            );
        } else {
            return null;
        }
    }

    const filteredTrips = state.trips.filter(trip =>
        (trip.origin && trip.origin.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (trip.destination && trip.destination.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        marginBottom: 16,
    },
});
