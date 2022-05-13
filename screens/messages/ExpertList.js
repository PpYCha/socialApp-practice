import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

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

const ExpertList = ({navigation}) => {
  const [userData, setUserData] = useState();
  const getExpertList = async () => {
    const list = [];
    await firestore()
      .collection('users')
      .where('typeofUser', 'in', ['Expert'])
      // .where('typeofUser', 'in', 'Expert')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const id = documentSnapshot.id;
          const {fname, lname, userImg} = documentSnapshot.data();
          list.push({
            fname,
            lname,
            id,
            userImg,
          });
        });
      });
    setUserData(list);
    console.debug(list);
  };

  useEffect(() => {
    getExpertList();
  }, []);

  return (
    <Container>
      <FlatList
        data={userData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card
            onPress={() =>
              navigation.navigate('Chat', {userName: item.userName})
            }>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.userImg} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.fname + ' ' + item.lname}</UserName>
                  {/* <PostTime>{item.messageTime}</PostTime> */}
                </UserInfoText>
                {/* <MessageText>{item.messageText}</MessageText> */}
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
};

export default ExpertList;

const styles = StyleSheet.create({});
