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
          title: 'Oferecer viagens',
          headerRight: () => (
            <>
             
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
          title: 'Cadastrar uma nova viagem',
        }}
      />

      <Stack.Screen 
        name="TripDetails"
        component={TripDetails} 
        options={{
          title: 'Detalhes',
        }}
      />
  
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: 'Chat da Viagem',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
