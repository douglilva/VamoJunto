import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Gerenciar from "./Gerenciar"
import Home from "./Home"

const Tab = createBottomTabNavigator()

export default props => (
    <Tab.Navigator
        initialRouteName="FilterList"
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
            options={{ headerShown: false }} 
        />

        <Tab.Screen
            name="Gerenciar"
            component={Gerenciar}
            options={{ headerShown: false }} 
        />

    </Tab.Navigator>
)

const styles = {
    tabBar: {  
        borderTopColor: 'orange',
        borderTopWidth: 2,
        backgroundColor: 'orange', 
    },
}
