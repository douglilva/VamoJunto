import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, Button, Text, Title, Portal, Modal, Paragraph } from 'react-native-paper';
import { ListItem, Avatar } from '@rneui/themed'; // Importei apenas o necessário para esta implementação
import TripsContext from './EventContextFile';

export default function TripList({ route, navigation }) {
    const { state, dispatch } = useContext(TripsContext);
    const [searchTerm, setSearchTerm] = useState('');
    const { motoristaId } = route.params;
    const [visible, setVisible] = useState(false);

    function participateInTrip(tripId) {
        dispatch({ type: 'addPassenger', payload: { tripId, motoristaId } });
    }

    function cancelParticipationInTrip(tripId) {
        dispatch({ type: 'removePassenger', payload: { tripId, passengerId: motoristaId } });
    }

    function getActions(trip) {
        const isPassenger = trip.passengers.includes(motoristaId);

        return isPassenger ? (
            <Button
                onPress={() => cancelParticipationInTrip(trip.id)}
                mode='contained'
                color='#FF0000'
                style={styles.actionButton}
            >
                Cancelar Participação
            </Button>
        ) : (
            <Button
                onPress={() => participateInTrip(trip.id)}
                mode='contained'
                color='#00FF00'
                style={styles.actionButton}
            >
                Participar
            </Button>
        );
    }

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
                    <ListItem.Title>{`${origin} -> ${destination}`}</ListItem.Title>
                    <ListItem.Subtitle>{`Data: ${date}`}</ListItem.Subtitle>
                    <ListItem.Subtitle>{`Hora: ${time}`}</ListItem.Subtitle>
                    <ListItem.Subtitle>{`Assentos disponíveis: ${availableSeats}`}</ListItem.Subtitle>
                </ListItem.Content>
                {getActions(trip)}
            </ListItem>
        );
    }

    const filteredTrips = state.trips.filter(trip =>
        (trip.origin && trip.origin.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (trip.destination && trip.destination.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

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

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Erro de Login</Text>
                    <Paragraph>Email ou senha incorretos</Paragraph>
                    <Button mode="contained" onPress={hideModal} style={styles.modalButton}>
                        Ok
                    </Button>
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
    },
    actionButton: {
        marginTop: 16,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalButton: {
        marginTop: 16,
        alignSelf: 'center',
    },
});
