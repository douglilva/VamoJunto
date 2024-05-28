import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EventsProvider } from './cadastro/EventContextFile';
import Tab from './Tab';


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <EventsProvider>
      <NavigationContainer>
        <Tab></Tab>
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
