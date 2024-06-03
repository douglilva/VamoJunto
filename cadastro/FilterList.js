import React, { useContext } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { ListItem, Avatar, Button, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import TripsContext from './EventContextFile';
import ChatScreen from './Chat';
import TripForm from './EventForm';
import trajetoImage from './trajeto.png'

export default function OfferedTripsList({route}) {
    const { state, dispatch } = useContext(TripsContext);
    const navigation = useNavigation();
    const {motoristaId} = route.params;

    const handleEditTrip = (trip) => {
        navigation.navigate('TripForm', trip );
    };

    const handleDeleteTrip = (trip) => {
        Alert.alert('Excluir Viagem', 'Deseja excluir a viagem?', [
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
        
        Alert.alert('Encerrar Viagem', 'Deseja encerrar a viagem?', [
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
                    onPress={() => navigation.navigate('ChatScreen', {trip, motoristaId})}
                    type='clear'
                    icon={<Icon name='chat' size={25} color='#6200ee' />}
                />
                <Button
                    onPress={() => handleEditTrip(trip)}
                    type='clear'
                    icon={<Icon name='edit' size={25} color='#6200ee' />}
                />
                <Button
                    onPress={() => handleEndTrip(trip.id)}
                    type='clear'
                    icon={<Icon name='stop' size={25} color='#6200ee' />}
                />
                <Button
                    onPress={() => handleDeleteTrip(trip)}
                    type='clear'
                    icon={<Icon name='delete' size={25} color='#6200ee' />}
                />
            </>
        );
    }

    function getTripsItems({ item: trip }) {
        
        // Verifica se o motorista da viagem é diferente do motorista logado
        if (trip.driver == motoristaId && trip.parar==false) {

            return (
                <TouchableOpacity onPress={() => navigation.navigate('TripDetails', { trip, motoristaId })}>
                    <ListItem bottomDivider>
                        
                    <ListItem.Content>
                        <View style={styles.titleContainer}>
                            <Image source={trajetoImage} style={styles.image} />
                            <View>
                                <Text style={styles.titulo}>{trip.origin}</Text>
                                <Text style={styles.titulo_destino}>{trip.destination}</Text>
                            </View>
                        </View>
                        <ListItem.Subtitle style={styles.subtitulo}><Text style={styles.bold}>Data:</Text> {trip.date}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.subtitulo}><Text style={styles.bold}>Hora:</Text> {trip.time}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.subtitulo}><Text style={styles.bold}>Assentos disponíveis:</Text> {trip.availableSeats}</ListItem.Subtitle>
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
        fontSize: 15,
        fontWeight: 'bold',
        color: '#6200ee',
        marginLeft: -20,
    },
    titulo_destino: {
        fontSize: 15,
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
        marginTop: -20,
        marginBottom: -10,
    },
    actionButton: {
        marginTop: 0,
    },
});