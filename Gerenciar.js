//imports
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from '@rneui/themed';
import { useContext } from 'react';
import Oferecer from './cadastro/Oferecer';
import TripsContext from './cadastro/TripContextFile';
import TripDetails from './cadastro/TripDetails';
import TripForm from './cadastro/TripForm';
import ChatScreen from './cadastro/Chat';

const Stack = createNativeStackNavigator();
//criando a stack
const MainStack = ({ route }) => {
  const { dispatch } = useContext(TripsContext);
  const { motoristaId } = route.params;
//screens
  return (
    <Stack.Navigator
      initialRouteName="Oferecer"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200ee', 
        },
        headerTintColor: '#ffffff', 
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Oferecer"
        component={Oferecer}
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
