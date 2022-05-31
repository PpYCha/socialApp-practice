import React from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../../styles/MessageStyles';
import ActionButton from 'react-native-action-button';

const Messages = [
  {
    id: '1',
    userName: 'Josh Yma',
    userImg:
      'https://firebasestorage.googleapis.com/v0/b/abnafe-b203d.appspot.com/o/photos%2F0900d190-52d6-4ae8-b6a1-d2fe83bb2be31652816213968.jpg?alt=media&token=bcd336cf-64ff-4fb2-b6f9-6a5730450b65',
    messageTime: '4 mins ago',
    messageText: 'Hey Jessica, how are you feeling?',
  },
  // {
  //   id: '2',
  //   userName: 'John Doe',
  //   userImg: require('../../assets/users/user-1.jpg'),
  //   messageTime: '2 hours ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '3',
  //   userName: 'Ken William',
  //   userImg: require('../../assets/users/user-4.jpg'),
  //   messageTime: '1 hours ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '4',
  //   userName: 'Selina Paul',
  //   userImg: require('../../assets/users/user-6.jpg'),
  //   messageTime: '1 day ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '5',
  //   userName: 'Christy Alex',
  //   userImg: require('../../assets/users/user-7.jpg'),
  //   messageTime: '2 days ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
];

const MessagesScreen = ({navigation}) => {
  return (
    <Container>
      <FlatList
        data={Messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card
            onPress={() =>
              navigation.navigate('Chat', {userName: item.userName})
            }>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={{uri: item.userImg}} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                  <PostTime>{item.messageTime}</PostTime>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        onPress={() => navigation.navigate('ExpertList')}
      />
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
