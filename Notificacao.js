import React, { useContext, useState } from 'react';
import { View, Alert, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import { ListItem, Icon } from '@rneui/themed';
import { AirbnbRating } from 'react-native-ratings';
import TripsContext from './cadastro/EventContextFile';
import UserContext, { getUserById } from './cadastro/UserContextFile';

export default function Notificacao({ route, navigation }) {
    const { state, dispatch } = useContext(TripsContext);
    const { state: state_u, dispatch: dispatch_u } = useContext(UserContext);
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

    function handleRatingCompleted(rating, trip) {
        const driver = getUserById(state_u, trip.driver);
        const currentRating = (driver.nota + rating) / 2;
        const updated = {
            ...trip,
            avaliadores: [...(trip.avaliadores || []), motoristaId],
        };

        dispatch({
            type: 'updateTrip',
            payload: updated,
        });

        const updatedDriver = {
            ...driver,
            nota: currentRating,
        };

        dispatch_u({
            type: 'updateUsuario',
            payload: updatedDriver,
        });
    }

    function getTripsItems({ item: trip }) {
        if (trip.passengers.includes(motoristaId) && trip.parar && !trip.avaliadores.includes(motoristaId)) {
            const origin = trip.origin || 'Origem não informada';
            const destination = trip.destination || 'Destino não informado';
            const date = trip.date || 'Data não informada';
            const time = trip.time || 'Hora não informada';
            const availableSeats = trip.availableSeats != null ? trip.availableSeats : 'Não informado';

            return (
                <ListItem
                    onPress={() => navigation.navigate('TripDetails', trip)}
                    bottomDivider
                >
                    <ListItem.Content>
                        <ListItem.Title>{`${origin} -> ${destination}`}</ListItem.Title>
                        <ListItem.Subtitle>{`Data: ${date}`}</ListItem.Subtitle>
                        <AirbnbRating
                            count={5}
                            reviews={["Péssimo", "Ruim", "Ok", "Bom", "Excelente"]}
                            defaultRating={0}
                            size={20}
                            onFinishRating={(rating) => handleRatingCompleted(rating, trip)}
                        />
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
        <View>
            <Appbar.Header style={styles.appbar}>
                <Appbar.Content title="Notificações" titleStyle={styles.title} />
            </Appbar.Header>
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
    appbar: {
        backgroundColor: '#6200ee',
    },
    title: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    input: {
        margin: 10,
    },
});
