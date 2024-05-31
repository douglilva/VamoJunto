import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import TripsContext from './EventContextFile';
import UserContext, { getUserById } from './UserContextFile';

const ChatScreen = ({ route }) => {
  const { trip, motoristaId } = route.params;
  const { dispatch } = useContext(TripsContext);
  const { state: userState } = useContext(UserContext);
  const [newMessage, setNewMessage] = useState({ id: motoristaId, text: "" });
  const [updated, setUpdated] = useState(trip);

  const addMessage = () => {
    const updatedTrip = {
      ...updated,
      messages: [...(updated.messages || []), newMessage]
    };
    dispatch({
      type: 'updateTrip',
      payload: updatedTrip
    });
    setUpdated(updatedTrip); // Atualiza o estado com a nova mensagem
    setNewMessage({ id: motoristaId, text: "" }); // Limpa o campo de mensagem depois de enviá-la
  };

  const getUserName = (userId) => {
    const user = getUserById(userState, userId);
    return user ? user.name : 'Outro';
  };

  return (
    <View>
      <Text>Chat da Viagem</Text>
      <FlatList
        data={updated.messages || []}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.id === motoristaId ? 'Você: ' : `${getUserName(item.id)}: `}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: 'gray', marginRight: 10 }}
          placeholder="Digite sua mensagem"
          value={newMessage.text}
          onChangeText={(text) => setNewMessage({ ...newMessage, text })} // Atualiza o estado corretamente
        />
        <Button title="Enviar" onPress={addMessage} />
      </View>
    </View>
  );
};

export default ChatScreen;