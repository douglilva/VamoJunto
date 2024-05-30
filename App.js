import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TripsProvider } from './cadastro/EventContextFile';
import LoginScreen from './Login'
import Tab from './Tab';
import ReservationForm from './cadastro/ReservationForm';
import { UserProvider } from './cadastro/UserContextFile';


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <TripsProvider>
      <UserProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Tabs" component={Tab} />
                <Stack.Screen name="ReservationForm" component={ReservationForm} />
            </Stack.Navigator>
        </NavigationContainer>
        </UserProvider>
    </TripsProvider>
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
