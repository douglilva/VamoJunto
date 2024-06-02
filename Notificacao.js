import React, { useContext, useState } from 'react';
import { View, Text, Alert, FlatList } from 'react-native';
import { TextInput} from 'react-native-paper';
import { ListItem, Avatar, Button, Icon } from '@rneui/themed';
import { AirbnbRating } from 'react-native-ratings';
import TripsContext from './cadastro/EventContextFile';
import UserContext, { getUserById }  from './cadastro/UserContextFile';

// Componente para listar as viagens com as opções de participar e buscar por viagens
export default function Notificacao({ route }) {
    const { state, dispatch } = useContext(TripsContext);
    const { state:state_u, dispatch:dispatch_u } = useContext(UserContext);
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

    function handleRatingCompleted(rating, trip) {
        const driver = getUserById(state_u,trip.driver)
        const currentRating = (driver.nota + rating)/2 ;
        const updated={
            ...trip,
            avaliadores: [...(trip.avaliadores || []), motoristaId]
        }
        
        dispatch({
            type: 'updateTrip',
            payload: updated
        });
        
        const updatedDriver = {
            ...driver,
            nota: currentRating
        };

        dispatch_u({
            type: 'updateUsuario',
            payload: updatedDriver
        });
        if(trip.passengers.length==updated.avaliadores.length){
        }
    }

    function getTripsItems({ item: trip }) {
        // Verifica se o motorista da viagem é igual ao motorista logado
        
        if (trip.passengers.includes(motoristaId) && trip.parar && !trip.avaliadores.includes(motoristaId)) {
            // Se não for, retorna null para não renderizar este item na lista
    
        const origin = trip.origin || 'Origem não informada';
        const destination = trip.destination || 'Destino não informado';
        const date = trip.date || 'Data não informada';
        const time = trip.time || 'Hora não informada';
        const availableSeats = trip.availableSeats != null ? trip.availableSeats : 'Não informado';

        return (
            <ListItem
                onPress={() => props.navigation.navigate('TripDetails', trip)}
                bottomDivider>
                <Avatar
                    rounded
                    source={{ uri: trip.avatarUrl || 'https://via.placeholder.com/150' }} // Adicione uma URL de avatar padrão, se não disponível
                />
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
