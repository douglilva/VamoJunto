import React, { useContext } from 'react';
import { View, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import { ListItem, Avatar, Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import TripsContext from './EventContextFile';
import TripForm from './EventForm';

export default function OfferedTripsList({route}) {
    const { state, dispatch } = useContext(TripsContext);
    const navigation = useNavigation();
    const motoristaId=route.params;

    const handleEditTrip = (trip) => {
        navigation.navigate('TripForm', trip );
    };

    const handleDeleteTrip = (trip) => {
        Alert.alert('Excluir Corrida', 'Deseja excluir a corrida?', [
            {
                text: 'Sim',
                onPress: () => dispatch({ type: 'deleteTrip', payload: trip })
            },
            {
                text: 'Não'
            }
        ]);
    };

    const handleEndTrip = (tripId) => {
        Alert.alert('Encerrar Corrida', 'Deseja encerrar a corrida?', [
            {
                text: 'Sim',
                onPress: () => dispatch({ type: 'endTrip', payload: tripId })
            },
            {
                text: 'Não'
            }
        ]);
    };

    function getActions(trip) {
        return (
            <>
                <Button
                    onPress={() => handleEditTrip(trip)}
                    type='clear'
                    icon={<Icon name='edit' size={25} color='orange' />}
                />
                <Button
                    onPress={() => handleEndTrip(trip.id)}
                    type='clear'
                    icon={<Icon name='stop' size={25} color='red' />}
                />
                <Button
                    onPress={() => handleDeleteTrip(trip)}
                    type='clear'
                    icon={<Icon name='delete' size={25} color='gray' />}
                />
            </>
        );
    }

    function getTripsItems({ item: trip }) {
        
        // Verifica se o motorista da viagem é diferente do motorista logado
        if (trip.driver == motoristaId.motoristaId) {

            return (
                <TouchableOpacity onPress={() => navigation.navigate('TripDetails', { trip })}>
                    <ListItem bottomDivider>
                        <Avatar rounded source={{ uri: trip.avatarUrl || 'https://via.placeholder.com/150' }} />
                        <ListItem.Content>
                            <ListItem.Title>{`${trip.origin} -> ${trip.destination}`}</ListItem.Title>
                            <ListItem.Subtitle>{`Data: ${trip.date}`}</ListItem.Subtitle>
                            <ListItem.Subtitle>{`Hora: ${trip.time}`}</ListItem.Subtitle>
                            <ListItem.Subtitle>{`Assentos disponíveis: ${trip.availableSeats}`}</ListItem.Subtitle>
                        </ListItem.Content>
                        {getActions(trip)}
                    </ListItem>
                </TouchableOpacity>
            );
        } else {

            return null;
        }
    }

    return (
        <View>
            <FlatList
                keyExtractor={trip => trip.id.toString()}
                data={state.trips}
                renderItem={getTripsItems}
            />
        </View>
    );
}

export function OfferedTripsListStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="OfferedTripsList" component={OfferedTripsList} />
            <Stack.Screen name="EditTripForm" component={EditTripForm} />
            <Stack.Screen name="TripDetails" component={TripDetails} />
        </Stack.Navigator>
    );
}
