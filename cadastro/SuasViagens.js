import React, { useContext, useState } from 'react';
import { View, Text, Alert, FlatList, TextInput } from 'react-native';
import { ListItem, Avatar, Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import TripsContext from './EventContextFile';

// Componente para listar as viagens com as opções de participar e buscar por viagens
export default function TripList({ route }) {
    const navigation = useNavigation();
    const { state, dispatch } = useContext(TripsContext);
    const [searchTerm, setSearchTerm] = useState('');
    const {motoristaId} = route.params;
    
    
    function participateInTrip(tripId) {
        // Aqui você deve substituir pelo ID do usuário atual
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
        // Verifica se o motorista da viagem é igual ao motorista logado
        
        if (trip.passengers.includes(motoristaId) && trip.parar==false) {
            // Se não for, retorna null para não renderizar este item na lista
            
        const origin = trip.origin || 'Origem não informada';
        const destination = trip.destination || 'Destino não informado';
        const date = trip.date || 'Data não informada';
        const time = trip.time || 'Hora não informada';
        const availableSeats = trip.availableSeats != null ? trip.availableSeats : 'Não informado';

        return (
            <ListItem
                onPress={() => navigation.navigate('ChatScreen', {trip, motoristaId})}
                bottomDivider>
                <Avatar
                    rounded
                    source={{ uri: trip.avatarUrl || 'https://via.placeholder.com/150' }} // Adicione uma URL de avatar padrão, se não disponível
                />
                <ListItem.Content>
                    <ListItem.Title>{`${origin} -> ${destination}`}</ListItem.Title>
                    <ListItem.Subtitle>{`Data: ${date}`}</ListItem.Subtitle>
                    <ListItem.Subtitle>{`Hora: ${time}`}</ListItem.Subtitle>
                    <ListItem.Subtitle>{`Assentos disponíveis: ${availableSeats}`}</ListItem.Subtitle>
                </ListItem.Content>
                {getActions(trip)}
            </ListItem>
        );
        }else{
            return null;
        }

        
    }

    // Busca por origem ou destino
    const filteredTrips = state.trips.filter(trip =>
        (trip.origin && trip.origin.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (trip.destination && trip.destination.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
                placeholder="Busque a origem ou destino"
                onChangeText={text => setSearchTerm(text)}
                value={searchTerm}
            />
            <FlatList
                keyExtractor={trip => trip.id.toString()}
                data={filteredTrips}
                renderItem={getTripsItems}
            />
        </View>
    );
}
