import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TripsProvider } from './cadastro/EventContextFile';
import LoginScreen from './Login';
import TabNavigator from './Tab';
import { UserProvider } from './cadastro/UserContextFile';
import { PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <TripsProvider>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Tabs"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </TripsProvider>
    </PaperProvider>
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
