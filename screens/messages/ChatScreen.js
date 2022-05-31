// @refresh reset

import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send, InputToolbar} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);

  const {expertId} = route.params;

  useEffect(() => {
    console.log(expertId);

    const unsubscribe = firestore()
      .collection('chats')
      .onSnapshot(querySnapshot => {
        const messageFireStore = querySnapshot
          .docChanges()
          .filter(({type}) => type === 'added')
          .map(({doc}) => {
            const message = doc.data();
            return {...message, createdAt: message.createdAt.toDate()};
          })
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        appendMessages(messageFireStore);
        // onSend(messageFireStore);
      });
  }, []);

  // const onSend = useCallback(
  //   messages => {
  //     setMessages(
  //       previousMessages => GiftedChat.append(previousMessages, messages),

  //       firestore()
  //         .collection('chats')
  //         .doc(Date.now().toString())
  //         .set(messages[0]),
  //     );
  //   },
  //   [messages],
  // );

  const appendMessages = useCallback(
    messages => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [messages],
  );

  const handleSend = async messages => {
    const writes = messages.map(m => firestore().collection('chats').add(m));
    await Promise.all(writes);
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
          left: {
            backgroundColor: '#E4E6EB',
          },
        }}
        textStyle={{
          right: {
            color: '#E4E6EB',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const renderInputToolbar = props => {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar {...props} containerStyle={{backgroundColor: '#888888'}} />
    );
  };

  return (
    <GiftedChat
      renderInputToolbar={renderInputToolbar}
      messages={messages}
      onSend={handleSend}
      user={{
        _id: expertId,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
