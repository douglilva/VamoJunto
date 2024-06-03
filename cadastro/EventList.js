import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { TextInput, Button, Text, Title, Portal, Modal, Paragraph } from 'react-native-paper';
import { ListItem, Avatar } from '@rneui/themed'; // Importei apenas o necessário para esta implementação
import TripsContext from './EventContextFile';
import trajetoImage from './trajeto.png'
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
        width: 50, // Ajuste o tamanho da imagem conforme necessário
        height: 100, // Ajuste a altura da imagem conforme necessário
        marginRight: 10,
        marginLeft: -20,
        transform: [{ rotate: '90deg' }], // Rotacionar a imagem
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
