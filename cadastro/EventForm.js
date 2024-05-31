import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button } from '@rneui/themed';
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
            // Exibe um alerta de data inválida
            Alert.alert('Data Inválida', 'Por favor, selecione uma data futura.');
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
            // Exibe um alerta de hora inválida
            Alert.alert('Hora Inválida', 'Por favor, selecione uma hora futura ou igual à hora atual.');
        } else {
            setSelectedTime(time);
            const formattedTime = moment(time).format('HH:mm');
            setTrip({ ...trip, time: formattedTime });
        }
    };

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
            <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
                <Text>{trip.date || "Selecione a data"}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                date={selectedDate}
                minimumDate={new Date()} // Define a data mínima como a data atual
                locale="pt_BR" // Define o idioma do picker
            />
            <Text>Hora:</Text>
            <TouchableOpacity onPress={showTimePicker} style={styles.dateInput}>
                <Text>{trip.time || "Selecione a hora"}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
                date={selectedTime}
                locale="pt_BR" // Define o idioma do picker
                is24Hour={true} // Configura para o formato 24h
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
                    trip.driver = motoristaId;
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
        paddingHorizontal: 10,
    },
    dateInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
});

export default TripForm;
