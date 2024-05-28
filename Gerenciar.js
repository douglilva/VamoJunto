import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, Icon } from '@rneui/themed';
import { useContext } from 'react';
import { Alert } from 'react-native';
import EventList from './cadastro/EventList';
import EventForm from './cadastro/EventForm';
import EventsContext from './cadastro/EventContextFile';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainDrawerNavigator = () => {
  const { dispatch } = useContext(EventsContext);
  return (

    <Drawer.Navigator
        initialRouteName="MainStack"
        drawerPosition="right"
        screenOptions={{
            headerStyle: {
            backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff', 
            drawerStyle: {
                backgroundColor: '#fff', 
            },
            drawerActiveTintColor: '#f4511e', 
            drawerInactiveTintColor: '#000', 
        }}>

        {/* Tela do drawer que contém o stack do gerenciador de eventos dentro */}
        <Drawer.Screen
            name="MainStack"
            component={MainStack}
            options={{
                title: 'Gerenciador de Eventos',
                headerTitle: '', 
                drawerIcon: ({ focused, size }) => (
                    <Icon name="menu" size={size} color={focused ? '#f4511e' : 'gray'} />
                  ),
            }}
        />

        {/* Tela do drawer que contém o formulário de adicionar eventos */}
        <Drawer.Screen
            name="AddEvent"
            component={EventForm}
            options={{
                title: 'Adicionar Evento',
                drawerIcon: ({ color }) => <Icon name="add" size={25} color={color} />, // Adicionar um ícone ao lado do título
                headerShown: true,
            }}
        />
  </Drawer.Navigator>
  
  );
};

//Componente stack do gerenciador de eventos
const MainStack = () => {
  const { dispatch } = useContext(EventsContext);

  return (
    <Stack.Navigator
      initialRouteName="EventList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFA500',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
      }}>

      {/* Tela para listar os eventos */}
      <Stack.Screen
        name="EventList"
        component={EventList}
        options={({ navigation }) => ({
          title: 'Lista de Eventos',
          headerRight: () => (
            <Button
              onPress={() => Alert.alert('Apagar tudo', 'Deseja excluir a lista de eventos?',[
                      {
                        text: 'Sim',
                        onPress: () => {
                          dispatch({
                            type: 'deleteAll'
                          });
                        }
                      },
                      {
                        text: 'Não',
                      }
                  ])
                }
                type='clear'
                icon={<Icon name="delete" size={25} color="white" />} />
          )
        })}
      />

      {/* Tela com o formulário para editar evento */}
      <Stack.Screen
        name="EventForm"
        component={EventForm}
        options={{
          title: 'Atualizar Evento'
        }}
      />
    </Stack.Navigator>
  );
};

export default MainDrawerNavigator;
