import React, { useContext } from 'react';
import { View, FlatList, Alert, Text } from 'react-native';
import { ListItem, Avatar, Button, Icon } from '@rneui/themed';
import TripsContext from "./EventContextFile"; 

//Componente para listar as reservas de um evento com a opção de editar e excluir
export default function ReservationList({ route, navigation }) {
    const { state, dispatch } = useContext(EventsContext);

    const eventId = route.params.eventId;

    const event = state.events.find(event => event.id === eventId); 

    const eventReservations = event ? event.reservations : [];

    function handleEditReservation(reservationId) {
        const reservation = eventReservations.find(reservation => reservation.id === reservationId);
        navigation.navigate('ReservationForm', { eventId: event.id, reservation: reservation });
    }
    

    function handleDeleteReservation(reservationId) {
        Alert.alert('Excluir Reserva', 'Deseja excluir a reserva?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'removeReservation',
                        payload: { eventId: eventId, reservationId: reservationId }
                    });
                }
            },
            {
                text: 'Não'
            }
        ]);
    }

    function getReservationsItems({ item: reservation }) {
        if (!reservation) return null; 

        return (
            <ListItem bottomDivider>
                <Avatar rounded source={{ uri: reservation.avatarUrl }} />
                <ListItem.Content>
                    <ListItem.Title>{reservation.name}</ListItem.Title>
                    <ListItem.Subtitle>{reservation.document}</ListItem.Subtitle>
                    <ListItem.Subtitle>Número de ingressos: {reservation.numberOfTickets}</ListItem.Subtitle>
                </ListItem.Content>
                <Button
                    onPress={() => handleEditReservation(reservation.id)} 
                    type='clear'
                    icon={<Icon name='edit' size={25} color='orange' />}
                />

                <Button
                    onPress={() => handleDeleteReservation(reservation.id)} 
                    type='clear'
                    icon={<Icon name='delete' size={25} color='gray' />}
                />
            </ListItem>
        );
    }

    return (
        <View>
            <FlatList
                keyExtractor={reservation => reservation.id.toString()}
                data={eventReservations}
                renderItem={getReservationsItems}
                ListEmptyComponent={<Text>  Não há reservas para este evento.</Text>}
            />
        </View>
    );
}
