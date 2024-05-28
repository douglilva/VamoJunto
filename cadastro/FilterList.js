import React, { useContext } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { ListItem, Avatar, Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import EventsContext from './EventContextFile';
import ReservationForm from './ReservationForm'; 
import ReservationList from './ReservationsList'; 

//Componente para listar os eventos com os favoritos em destaque
export default function FilterList() {
    const { state } = useContext(EventsContext);
    const navigation = useNavigation();

    const handleEventPress = (eventId) => {
        navigation.navigate('ReservationList', { eventId: eventId }); 
    };

    function getActions(eventId) {
        if(eventId.tickets > 0){
            return (
                <>
                <Button
                    onPress={() => navigation.navigate('ReservationForm', { eventId: eventId })} 
                    type='clear'
                    icon={<Icon name="ticket" type='font-awesome' size={25} color="red" />}
                />

                <Button
                    onPress={() => navigation.navigate('ReservationList', { eventId: eventId })} 
                    type='clear'
                    icon={<Icon name="eye" type='font-awesome' size={25} color="gray" />}
                />
                </>
            );
        }else{
            return (
                <>
                <Text>Esgotado</Text>

                <Button
                    onPress={() => navigation.navigate('ReservationList', { eventId: eventId })} 
                    type='clear'
                    icon={<Icon name="eye" type='font-awesome' size={25} color="gray" />}
                />
                </>
            );
        }
    
    }

    function getEventsItems({ item: event }) {
        return (
            <TouchableOpacity onPress={() => handleEventPress(event.id)}>
                <ListItem bottomDivider>
                    <Avatar rounded source={{ uri: event.avatarUrl }} />
                    <ListItem.Content>
                        <ListItem.Title>{event.name}</ListItem.Title>
                        <ListItem.Subtitle>{event.date}</ListItem.Subtitle>
                        <ListItem.Subtitle>{event.endereco}</ListItem.Subtitle>
                        <ListItem.Subtitle>Ingressos Disponíveis: {event.tickets}</ListItem.Subtitle>
                    </ListItem.Content>
                    {event.favorite && <Icon name="star" type='font-awesome' color="yellow" />}
                    {getActions(event)}
                </ListItem>
            </TouchableOpacity>
        );
    }

    // Mostrar os favoritos antes
    const sortedEvents = [...state.events].sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));

    return (
        <View>
            <FlatList
                keyExtractor={event => event.id.toString()}
                data={sortedEvents}
                renderItem={getEventsItems}
            />
        </View>
    );
}

export function FilterListStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FilterList" component={FilterList} />
            <Stack.Screen name="ReservationForm" component={ReservationForm} />
            <Stack.Screen name="ReservationList" component={ReservationList} />
        </Stack.Navigator>
    );
}