import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import FilterList from './cadastro/FilterList';
import ReservationForm from './cadastro/ReservationForm';
import ReservationsList from './cadastro/ReservationsList';
import EventsContext from './cadastro/EventContextFile';

//Componente stack do que é renderizado na aba home
export default props => {
    const Stack = createNativeStackNavigator();

    return (
            <Stack.Navigator
                initialRouteName='FilterList'
                screenOptions={screenOptions}>

                {/* Tela para listar os eventos */}
                <Stack.Screen
                    name="Eventos Disponíveis"
                    component={FilterList}
                    options={({ navigation }) => {
                        const { state, dispatch } = useContext(EventsContext);
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
  }
  