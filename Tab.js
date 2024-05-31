import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Gerenciar from "./Gerenciar"
import Home from "./Home"
import Perfil from "./Perfil"
import SuasViagens from "./cadastro/SuasViagens"
import Notificacao from "./Notificacao";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
    const { motoristaId } = route.params;
    
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor:'red',
                tabBarInactiveTintColor: 'blue',
                tabBarLabelStyle: {fontSize: 30},
                tabBarOptions: {
                    style: styles.tabBar, 
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{ motoristaId }}
                options={{ headerShown: false }} 
            />
            <Tab.Screen
                name="Gerenciar"
                component={Gerenciar}
                initialParams={{ motoristaId }}
                options={{ headerShown: false }} 
            />
            <Tab.Screen
                name="Suas viagens"
                component={SuasViagens}
                initialParams={{ motoristaId }}
                options={{ headerShown: false }} 
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                initialParams={{ motoristaId }}
                options={{ headerShown: false }} 
            />
            <Tab.Screen
                name="Notificação"
                component={Notificacao}
                initialParams={{ motoristaId }}
                options={{ headerShown: false }} 
            />
            {/* Adicione outras telas do Tab Navigator aqui */}
        </Tab.Navigator>
    );
}

const styles = {
    tabBar: {  
        borderTopColor: 'orange',
        borderTopWidth: 2,
        backgroundColor: 'orange', 
    },
}

export default TabNavigator;
