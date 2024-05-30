import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from '@rneui/themed';
import { useContext } from 'react';
import { Alert } from 'react-native';
import EventList from './cadastro/EventList';
import EventForm from './cadastro/EventForm';
import EventsContext from './cadastro/EventContextFile';
import TripDetails from './cadastro/TripDetails';

const Stack = createNativeStackNavigator();

const MainStack = ({ route }) => { // Receba o route como um parâmetro
  const { dispatch } = useContext(EventsContext);
  const { motoristaId } = route.params; // Recebe o motoristaId dos parâmetros da rota

  return (
    <Stack.Navigator
      initialRouteName="EventList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFA500',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="EventList"
        component={EventList}
        initialParams={{ motoristaId: motoristaId }}
        options={({ navigation }) => ({
          title: 'Lista de Eventos',
          headerRight: () => (
            <>
              <Button
                onPress={() =>
                  Alert.alert('Apagar tudo', 'Deseja excluir a lista de eventos?', [
                    {
                      text: 'Sim',
                      onPress: () => {
                        dispatch({
                          type: 'deleteAll',
                        });
                      },
                    },
                    {
                      text: 'Não',
                    },
                  ])
                }
                type="clear"
                icon={<Icon name="delete" size={25} color="white" />}
              />
              <Button
                onPress={() => navigation.navigate('EventForm', { motoristaId:  motoristaId})}
                type="clear"
                icon={<Icon name="add" size={25} color="white" />}
              />
            </>
          ),
        })}
      />
      <Stack.Screen
        name="EventForm"
        component={EventForm}
        options={{
          title: 'Adicionar Evento',
        }}
      />
      <Stack.Screen name="TripDetails" component={TripDetails} />
    </Stack.Navigator>
  );
};

export default MainStack;
