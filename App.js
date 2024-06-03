//imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TripsProvider } from './cadastro/TripContextFile';
import { UserProvider } from './cadastro/UserContextFile';
import { PaperProvider } from 'react-native-paper';
import LoginScreen from './Login';
import TabNavigator from './Tab';
import UserRegistrationForm from "./cadastro/UserForm"

const Stack = createNativeStackNavigator();

export default function App() {
  //elementos envolvidos nos providers, tela de login e o tab sendo chamados
  return (
    <PaperProvider>
      <TripsProvider>
        <UserProvider>
          <NavigationContainer>
            {/* stack com as telas inicais de login e cadastro e tab principal */}
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
               <Stack.Screen
                name="UserRegistrationForm"
                component={UserRegistrationForm} 
                options={{
                  title: 'Cadastre-se'
              }}             
                
              />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </TripsProvider>
    </PaperProvider>
  );
}


//estilos
const screenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  }
}
