import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from '@rneui/themed';
import EventsContext from "./EventContextFile"; 

//Componente para gerar o formulário de reserva
const ReservationForm = ({ route, navigation }) => {
    const { state, dispatch } = useContext(EventsContext);

    const eventId = route.params.eventId;
    const event = state.events.find(event => event.id === eventId); 

    const [reservation, setReservation] = useState({
        id: null,
        eventId: eventId,
        name: "",
        document: "",
        numberOfTickets: 0
    });

    useEffect(() => {
        if (route.params?.reservation) {
            const { id, eventId, name, document, numberOfTickets } = route.params.reservation;
            setReservation({ id, eventId, name, document, numberOfTickets });
        }
    }, [route.params?.reservation]);

    const handleIncrement = () => {
        if (reservation.id) {
            setReservation(prevState => ({
                ...prevState,
                numberOfTickets: prevState.numberOfTickets + 1
            }));
        } else {
            setReservation(prevState => ({
                ...prevState,
                numberOfTickets: prevState.numberOfTickets < eventId.tickets ? prevState.numberOfTickets + 1 : prevState.numberOfTickets
            }));
        }
    };
    
    const handleDecrement = () => {
        setReservation(prevState => ({
            ...prevState,
            numberOfTickets: prevState.numberOfTickets > 0 ? prevState.numberOfTickets - 1 : 0
        }));
    };

    const handleReservation = () => {
        if (reservation.name.trim() && reservation.document.trim() && reservation.numberOfTickets > 0) {
            if (reservation.id) {
                dispatch({ type: 'updateReservation', payload: { eventId: event.id, updatedReservation: reservation } });
            } else {
                const newReservation = { ...reservation, id: generateReservationId() };
                dispatch({ type: 'addReservation', payload: { eventId: eventId.id, reservation: newReservation } });
            }
            navigation.goBack();
        } else {
            alert("Por favor, preencha todos os campos obrigatórios.");
        }
    };

    const generateReservationId = () => {
        return Math.random().toString(36).substring(7);
    };

    return (
        <View style={styles.container}>
            <Text>Nome:</Text>
            <TextInput
                style={styles.input}
                onChangeText={name => setReservation(prevState => ({ ...prevState, name }))}
                placeholder="Informe seu nome"
                value={reservation.name}
            />
            <Text>Documento:</Text>
            <TextInput
                style={styles.input}
                onChangeText={document => setReservation(prevState => ({ ...prevState, document }))}
                placeholder="Informe o número do seu documento"
                value={reservation.document}
            />
            <Text>Número de Ingressos:</Text>
            <View style={styles.counterContainer}>
                <Button title="-" onPress={handleDecrement} />
                <TextInput
                    style={styles.input}
                    placeholder="0"
                    value={reservation.numberOfTickets.toString()}
                    keyboardType="numeric"
                    onChangeText={text => setReservation(prevState => ({ ...prevState, numberOfTickets: parseInt(text) || 0 }))}
                />
                <Button title="+" onPress={handleIncrement} />
            </View>
            <Button
                title={reservation.id ? 'Atualizar Reserva' : 'Confirmar Reserva'}
                onPress={handleReservation}
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
        paddingHorizontal: 10,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default ReservationForm;
