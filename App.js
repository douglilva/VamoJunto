import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EventsProvider } from './cadastro/EventContextFile';
import LoginScreen from './Login'
import Tab from './Tab';
import ReservationForm from './cadastro/ReservationForm';


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <EventsProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Tabs" component={Tab} />
                <Stack.Screen name="ReservationForm" component={ReservationForm} />
            </Stack.Navigator>
        </NavigationContainer>
    </EventsProvider>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
}
