import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from '@rneui/themed';
import { useContext } from 'react';
import { Alert } from 'react-native';
import FilterList from './cadastro/FilterList';
import EventForm from './cadastro/EventForm';
import EventsContext from './cadastro/EventContextFile';
import TripDetails from './cadastro/TripDetails';
import TripForm from './cadastro/EventForm';
import ChatScreen from './cadastro/Chat';

const Stack = createNativeStackNavigator();

const MainStack = ({ route }) => {
  const { dispatch } = useContext(EventsContext);
  const { motoristaId } = route.params;

  return (
    <Stack.Navigator
      initialRouteName="FilterList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200ee', // Cor de fundo do cabeçalho personalizada
        },
        headerTintColor: '#ffffff', // Cor do texto do cabeçalho personalizada
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="FilterList"
        component={FilterList}
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
                onPress={() => navigation.navigate('TripForm', { motoristaId:  motoristaId})}
                type="clear"
                icon={<Icon name="add" size={25} color="white" />}
              />
            </>
          ),
        })}
      />
      <Stack.Screen
        name="TripForm"
        component={TripForm}
        options={{
          title: 'Formulário de Viagem',
        }}
      />
      <Stack.Screen name="TripDetails" component={TripDetails} />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          // Mantendo as opções de cabeçalho padrão
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
