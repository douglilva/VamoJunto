//imports
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Encontrar from './cadastro/Encontrar';
import TripDetails from './cadastro/TripDetails';

// Componente stack do que é renderizado na aba home(encontrar viagens)
export default function Home({ route }) {
    const Stack = createNativeStackNavigator();
    const { motoristaId } = route.params; 
    return (
        <Stack.Navigator
            initialRouteName='Encontrar'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6200ee', 
                },
                headerTintColor: '#ffffff', 
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>

            <Stack.Screen
                name="Encontrar"
                component={Encontrar}
                initialParams={{ motoristaId: motoristaId }}
                options={{
                    title: 'Encontrar viagem'
                }}
            />

            <Stack.Screen
                name="TripDetails"
                component={TripDetails}
                initialParams={{ motoristaId }}
                options={{
                    title: 'Detalhes'
                }}
            />
        </Stack.Navigator>
    );
}
