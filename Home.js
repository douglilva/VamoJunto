import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventList from './cadastro/EventList';
import ReservationForm from './cadastro/ReservationForm';
import ReservationsList from './cadastro/ReservationsList';
import EventsContext from './cadastro/EventContextFile';
import TripDetails from './cadastro/TripDetails'

//Componente stack do que é renderizado na aba home
export default function Home({ route }) {
    const Stack = createNativeStackNavigator();
    const { motoristaId } = route.params; // Recebe o motoristaId dos parâmetros da rota
    return (
        <Stack.Navigator
            initialRouteName='EventList'
            screenOptions={screenOptions}>

            {/* Tela para listar os eventos */}
            {/* <Stack.Screen
                name="FilterList"
                options={{ title: 'Eventos Disponíveis' }}
                initialParams={{ motoristaId: motoristaId }}
            >
                {props => <FilterList {...props} motoristaId={motoristaId} />}
            </Stack.Screen> */}

            <Stack.Screen
                name="EventList"
                component={EventList}
                initialParams={{ motoristaId: motoristaId }}
                options={{
                    title: 'Encontrar corrida'
                }}
            />

            {/* Tela para fazer reserva */}
            <Stack.Screen
                name="ReservationForm"
                component={ReservationForm}
                options={{
                    title: 'Formulário de Reserva'
                }}
            />

            {/* Tela para listar reservas */}
            <Stack.Screen
                name="ReservationList"
                component={ReservationsList}
                options={{
                    title: 'Lista de Reservas'
                }}
            />

            <Stack.Screen
                name="TripDetails"
                component={TripDetails}
                options={{
                    title: 'Detalhes da Reserva'
                }}
            />
        </Stack.Navigator>
    );
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold'
    },
};
