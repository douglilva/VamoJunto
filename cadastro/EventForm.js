import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from '@rneui/themed';
import TripsContext from "./EventContextFile";

// Componente que gera o formulário de viagem
const TripForm = ({ route, navigation }) => {
    const [trip, setTrip] = useState(route.params ? route.params : {});
    const { dispatch } = useContext(TripsContext);
    const { motoristaId } = route.params; // Recebe o motoristaId dos parâmetros da rota

    return (
        <View style={styles.container}>
            <Text>Origem:</Text>
            <TextInput
                style={styles.input}
                onChangeText={origin => setTrip({ ...trip, origin })}
                placeholder="Informe a origem"
                value={trip.origin}
            />
            <Text>Destino:</Text>
            <TextInput
                style={styles.input}
                onChangeText={destination => setTrip({ ...trip, destination })}
                placeholder="Informe o destino"
                value={trip.destination}
            />
            <Text>Data:</Text>
            <TextInput
                style={styles.input}
                onChangeText={date => setTrip({ ...trip, date })}
                placeholder="Informe a data"
                value={trip.date}
            />
            <Text>Hora:</Text>
            <TextInput
                style={styles.input}
                onChangeText={time => setTrip({ ...trip, time })}
                placeholder="Informe a hora"
                value={trip.time}
            />
            <Text>Assentos Disponíveis:</Text>
            <TextInput
                style={styles.input}
                onChangeText={availableSeats => setTrip({ ...trip, availableSeats: parseInt(availableSeats) })}
                placeholder="Informe o número de assentos disponíveis"
                value={trip.availableSeats ? trip.availableSeats.toString() : ""}
                keyboardType="numeric"
            />
            <Button
                title='Salvar'
                onPress={() => {
                    trip.driver=motoristaId,
                    console.warn(trip.driver)
                    dispatch({
                        type: trip.id ? 'updateTrip' : 'createTrip',
                        payload: trip,
                    });
                    navigation.goBack();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
});

export default TripForm;
