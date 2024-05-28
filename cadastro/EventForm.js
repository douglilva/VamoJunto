import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from '@rneui/themed';
import EventsContext from "./EventContextFile";

//Componente que gera o formulário de evento
const EventForm = ({ route, navigation }) => {
    const [event, setEvent] = useState(route.params ? route.params : {});
    const { dispatch } = useContext(EventsContext);

    return (
        <View style={styles.container}>
            <Text>Nome:</Text>
            <TextInput
                style={styles.input}
                onChangeText={name => setEvent({...event, name})}
                placeholder="Informe o Nome"
                value={event.name}
            />
            <Text> Avatar: </Text>
            <TextInput
                style={styles.input}
                onChangeText={avatarUrl => setEvent({...event, avatarUrl})}
                placeholder="Informe o avatar"
                value={event.avatarUrl}
            />

            <Text>Data:</Text>
            <TextInput
                style={styles.input}
                onChangeText={date => setEvent({...event, date})}
                placeholder="Informe a Data"
                value={event.date}
            />
            <Text>Localização:</Text>
            <TextInput
                style={styles.input}
                onChangeText={endereco => setEvent({...event, endereco})}
                placeholder="informe o seu endereço"
                value={event.endereco}
            />
            <Text>Número de Ingressos:</Text>
            <TextInput
                style={styles.input}
                onChangeText={tickets => setEvent({...event, tickets})}
                placeholder="Informe o Número de Ingressos Disponíveis"
                value={event.tickets ? event.tickets.toString() : ""}
                keyboardType="numeric"
            />
            <Text>Valor:</Text>
            <TextInput
                style={styles.input}
                onChangeText={value => setEvent({...event, value})}
                placeholder="Informe o Valor"
                value={event.value}
                keyboardType="numeric"
            />
            <Button
                title='Salvar'
                onPress={()=> {
                    dispatch({
                        type: event.id ? 'updateEvent' : 'createEvent',
                        payload: event,
                    })
                    navigation.goBack()
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

export default EventForm;
