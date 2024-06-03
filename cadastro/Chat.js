//imports
import React, { useState, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import TripsContext from './TripContextFile';
import UserContext, { getUserById } from './UserContextFile';

const ChatScreen = ({ route }) => {
  const { trip, motoristaId } = route.params;
  const { dispatch } = useContext(TripsContext);
  const { state: userState } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState({ id: motoristaId, text: "" });
  const [updated, setUpdated] = useState(trip);

//adiciona a mensagem na trip
  const addMessage = () => {
    const updatedTrip = {
      ...updated,
      messages: [...(updated.messages || []), newMessage]
    };
    dispatch({
      type: 'updateTrip',
      payload: updatedTrip
    });
    setUpdated(updatedTrip);
    setNewMessage({ id: motoristaId, text: "" });
  };

//encontra o usuario que escreveu a mensagem
  const getUserName = (userId) => {
    const user = getUserById(userState, userId);
    return user ? user.name : 'Outro';
  };
  
//mostra as mensagens
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={updated.messages || []}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 5,
                marginLeft: item.id === motoristaId ? 'auto' : 10,
                marginRight: item.id === motoristaId ? 10 : 'auto',
                alignSelf: item.id === motoristaId ? 'flex-end' : 'flex-start',
                backgroundColor: item.id === motoristaId ? '#e0e0e0' : '#B6ACDE',
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: "#6200ee" }}>
                {item.id === motoristaId ? 'Você: ' : `${getUserName(item.id)}: `}
              </Text>
              <Text style={{ fontSize: 20 }}>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <TextInput
          style={{ flex: 1, marginRight: 10 }}
          label="Digite sua mensagem"
          value={newMessage.text}
          onChangeText={(text) => setNewMessage({ ...newMessage, text })}
          mode="outlined"
        />
        <Button mode="contained" onPress={addMessage}>
          Enviar
        </Button>
      </View>
    </View>
  );
};

export default ChatScreen;
