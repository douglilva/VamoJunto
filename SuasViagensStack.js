//imports
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SuasViagens from "./cadastro/SuasViagens";
import ChatScreen from "./cadastro/Chat";


const Stack = createNativeStackNavigator();

// Componente para o stack do SuasViagens
const SuasViagensStack = ({ route }) => {
    const { motoristaId } = route.params;
    //screens
    return (
        <Stack.Navigator initialRouteName="SuasViagens">
            <Stack.Screen
                name="SuasViagens"
                component={SuasViagens}
                initialParams={{ motoristaId }}
                options={{
                    title: "Suas viagens",
                    headerStyle: {
                        backgroundColor: '#6200ee',
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} 
            />
            <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                    title: 'Chat da Viagem',
                    headerStyle: {
                        backgroundColor: '#6200ee',
                    },
                    headerTintColor: '#ffffff', 
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
};

export default SuasViagensStack;
