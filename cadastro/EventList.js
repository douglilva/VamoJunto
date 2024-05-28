import React, { useContext, useState } from 'react';
import { View, Text, Alert, FlatList, TextInput } from 'react-native';
import { ListItem, Avatar, Button, Icon } from '@rneui/themed'; 
import EventsContext from './EventContextFile';

//Componente para listar os eventos com as opções d eeditar, excluir e favoritar com caixa de busca
export default function EventList(props) {
    const { state, dispatch } = useContext(EventsContext);
    const [searchTerm, setSearchTerm] = useState('');

    function toggleFavorite(eventId) {
        dispatch({ type: 'toggleFavorite', payload: eventId });
    }

    function getActions(event) {
        return (
            <>
               <Button
                    onPress={() => toggleFavorite(event.id)}
                    type='clear'
                    icon={
                        <Icon
                            name="favorite"
                            size={25}
                            color={event.favorite ? 'red' : 'lightgrey'}
                        />
                    }
                />
                <Button
                    onPress={() => props.navigation.navigate('EventForm', event)}
                    type='clear'
                    icon={<Icon name='edit' size={25} color='orange' />}
                />
                <Button
                    onPress={() => confirmEventDeletion(event)}
                    type='clear'
                    icon={<Icon name='delete' size={25} color='gray' />}
                />
            </>
        );
    }

    function confirmEventDeletion(event) {
        Alert.alert('Excluir Evento', 'Deseja excluir o evento?', [
            {
                text: 'Sim',
                onPress() {
                    dispatch({
                        type: 'deleteEvent',
                        payload: event,
                    });
                }
            },
            {
                text: 'Não'
            }
        ]);
    }

    function getEventsItems({ item: event }) {
        return (
            <ListItem
                onPress={() => (props.navigation.navigate('EventForm', event))}
                bottomDivider>
                <Avatar
                    rounded
                    source={{ uri: event.avatarUrl }} 
                />
                <ListItem.Content>
                    <ListItem.Title>{event.name}</ListItem.Title>
                    <ListItem.Subtitle>{event.date}</ListItem.Subtitle>
                    <ListItem.Subtitle>{event.location}</ListItem.Subtitle>
                    <ListItem.Subtitle>Valor: {event.value}</ListItem.Subtitle>
                    <ListItem.Subtitle>Ingressos disponíveis: {event.tickets}</ListItem.Subtitle>
                </ListItem.Content>
                {getActions(event)}
            </ListItem>
        );
    }

    //Busca por nome ou local
    const filteredEvents = state.events.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
                placeholder="Busque o nome ou a localização do evento"
                onChangeText={text => setSearchTerm(text)}
                value={searchTerm}
            />
            <FlatList
                keyExtractor={event => event.id.toString()}
                data={filteredEvents}
                renderItem={getEventsItems}
            />
        </View>
    );
}
