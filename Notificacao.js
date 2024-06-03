//imports
import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Image } from 'react-native';
import { TextInput, Appbar } from 'react-native-paper';
import { ListItem } from '@rneui/themed';
import { AirbnbRating } from 'react-native-ratings';
import TripsContext from './cadastro/TripContextFile';
import UserContext, { getUserById } from './cadastro/UserContextFile';
import trajetoImage from './cadastro/assets/trajeto.png';

export default function Notificacao({ route, navigation }) {
    const { state, dispatch } = useContext(TripsContext);
    const { state: state_u, dispatch: dispatch_u } = useContext(UserContext);
    const [searchTerm, setSearchTerm] = useState('');
    const { motoristaId } = route.params;

    
//Atualiza a nota do usuario
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
//lista as viagens para notificação
    function getTripsItems({ item: trip }) {
        if (trip.passengers.includes(motoristaId) && trip.parar && !trip.avaliadores.includes(motoristaId)) {
            const origin = trip.origin || 'Origem não informada';
            const destination = trip.destination || 'Destino não informado';
            const date = trip.date || 'Data não informada';
            const time = trip.time || 'Hora não informada';

            return (
                <ListItem
                  
                    bottomDivider
                    containerStyle={styles.listItemContainer}
                >
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
                        <ListItem.Subtitle style={styles.avalie}>{`Esta viagem foi encerrada.`}</ListItem.Subtitle>
                        <ListItem.Subtitle style={styles.avalie}>{`Dê sua avaliação:`}</ListItem.Subtitle>
                        <View style={styles.ratingContainer}>
                            <AirbnbRating 
                                count={5}
                                reviews={["Péssimo", "Ruim", "Ok", "Bom", "Excelente"]}
                                defaultRating={0}
                                size={20}
                                onFinishRating={(rating) => handleRatingCompleted(rating, trip)}
                            />
                        </View>
                    </ListItem.Content>
                    
                </ListItem>
            );
        } else {
            return null;
        }
    }

    //filtro para a busca
    const filteredTrips = state.trips.filter(trip =>
        (trip.origin && trip.origin.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (trip.destination && trip.destination.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    //busca
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
//estilos
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
    listItemContainer: {
        paddingVertical: 8,
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
    subtitulo: {
        fontSize: 15,
    },
    avalie: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    bold: {
        fontWeight: 'bold',
        color: '#6200ee',
    },
    image: {
        width: 50, 
        height: 100,
        marginRight: 10,
        marginLeft: -20, 
        transform: [{ rotate: '90deg' }],
        resizeMode: 'contain',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingContainer: {
        marginTop: -45,
    },
});
