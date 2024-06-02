import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Gerenciar from "./Gerenciar";
import Home from "./Home";
import Perfil from "./Perfil";
import SuasViagens from "./cadastro/SuasViagens";
import Notificacao from "./Notificacao";
import SuasViagensStack from "./SuasViagensStack";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
    const { motoristaId } = route.params;

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = 'magnify';
                            break;
                        case 'Gerenciar':
                            iconName = 'plus';
                            break;
                        case 'Suas viagens':
                            iconName = 'car';
                            break;
                        case 'Perfil':
                            iconName = 'account';
                            break;
                        case 'Notificação':
                            iconName = 'bell';
                            break;
                        default:
                            iconName = 'home';
                            break;
                    }

                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6200ee', // Cor ativa personalizada
                tabBarInactiveTintColor: '#757575', // Cor inativa personalizada
                tabBarStyle: {
                    backgroundColor: '#ffffff', // Cor de fundo personalizada
                    borderTopColor: '#bdbdbd', // Cor da borda superior personalizada
                    borderTopWidth: 2,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                initialParams={{ motoristaId }}
                options={{ headerShown: false, tabBarLabel: 'Encontrar' }}
            />
            <Tab.Screen
                name="Gerenciar"
                component={Gerenciar}
                initialParams={{ motoristaId }}
                options={{ headerShown: false, tabBarLabel: 'Oferecer' }}
            />
            <Tab.Screen
                name="Suas viagens"
                component={SuasViagensStack}
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
        </Tab.Navigator>
    );
}

export default TabNavigator;
