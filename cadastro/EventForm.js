import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Title, Portal, Modal, Paragraph, Text, TouchableRipple } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TripsContext from "./EventContextFile";
import moment from "moment";
import 'moment/locale/pt-br'; // Importa o idioma português

moment.locale('pt-br'); // Define o idioma para português

const TripForm = ({ route, navigation }) => {
    const [trip, setTrip] = useState(route.params ? route.params : {});
    const { dispatch } = useContext(TripsContext);
    const { motoristaId } = route.params; // Recebe o motoristaId dos parâmetros da rota

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(trip.date ? moment(trip.date, "LL").toDate() : new Date());
    const [selectedTime, setSelectedTime] = useState(trip.time ? moment(trip.time, "HH:mm").toDate() : new Date());
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        hideDatePicker();
        const currentDate = new Date(); // Data e hora atuais
        if (moment(date).isBefore(currentDate, 'day')) {
            setErrorMessage('Por favor, selecione uma data futura.');
            setVisible(true); // Mostrar o modal de erro
        } else {
            setSelectedDate(date);
            const formattedDate = moment(date).format('LL'); // Formato: "31 de dezembro de 2022"
            setTrip({ ...trip, date: formattedDate });
        }
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        hideTimePicker();
        const currentDate = new Date(); // Data e hora atuais
        if (moment(selectedDate).isSame(currentDate, 'day') && moment(time).isBefore(currentDate, 'hour')) {
            setErrorMessage('Por favor, selecione uma hora futura ou igual à hora atual.');
            setVisible(true); // Mostrar o modal de erro
        } else {
            setSelectedTime(time);
            const formattedTime = moment(time).format('HH:mm');
            setTrip({ ...trip, time: formattedTime });
        }
    };

    const hideModal = () => setVisible(false);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                label="Origem"
                onChangeText={origin => setTrip({ ...trip, origin })}
                placeholder="Informe a origem"
                value={trip.origin}
                mode="outlined"
            />
            <TextInput
                style={styles.input}
                label="Destino"
                onChangeText={destination => setTrip({ ...trip, destination })}
                placeholder="Informe o destino"
                value={trip.destination}
                mode="outlined"
            />
            <TouchableRipple onPress={showDatePicker}>
                <View pointerEvents="none">
                    <TextInput
                        label="Data"
                        value={trip.date || ""}
                        mode="outlined"
                        style={styles.input}
                    />
                </View>
            </TouchableRipple>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                date={selectedDate}
                minimumDate={new Date()} // Define a data mínima como a data atual
                locale="pt_BR" // Define o idioma do picker
            />
            <TouchableRipple onPress={showTimePicker}>
                <View pointerEvents="none">
                    <TextInput
                        label="Hora"
                        value={trip.time || ""}
                        mode="outlined"
                        style={styles.input}
                    />
                </View>
            </TouchableRipple>
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
                date={selectedTime}
                locale="pt_BR" // Define o idioma do picker
                is24Hour={true} // Configura para o formato 24h
            />
            <TextInput
                style={styles.input}
                label="Assentos Disponíveis"
                onChangeText={availableSeats => setTrip({ ...trip, availableSeats: parseInt(availableSeats) })}
                placeholder="Informe o número de assentos disponíveis"
                value={trip.availableSeats ? trip.availableSeats.toString() : ""}
                keyboardType="numeric"
                mode="outlined"
            />
            <Button
                mode="contained"
                onPress={() => {
                    trip.driver = motoristaId;
                    dispatch({
                        type: trip.id ? 'updateTrip' : 'createTrip',
                        payload: trip,
                    });
                    navigation.goBack();
                }}
                style={styles.button}
            >
                Salvar
            </Button>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Erro</Text>
                    <Paragraph>{errorMessage}</Paragraph>
                    <Button mode="contained" onPress={hideModal} style={styles.modalButton}>
                        Ok
                    </Button>
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 16,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalButton: {
        marginTop: 16,
    },
});

export default TripForm;
