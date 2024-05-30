import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';

const TripDetails = ({ route, navigation }) => {
    const { origin, destination, date, time, availableSeats, driverName } = route.params;

    return (
        <View style={styles.container}>
            <Text>Origem: {origin}</Text>
            <Text>Destino: {destination}</Text>
            <Text>Data: {date}</Text>
            <Text>Hora: {time}</Text>
            <Text>Assentos disponíveis: {availableSeats}</Text>
            <Text>Nome do motorista: {driverName}</Text>
            <Button
                title="Voltar"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
});

export default TripDetails;
