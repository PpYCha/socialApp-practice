import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

import Ionicons from 'react-native-vector-icons/Ionicons';

import PostCard from '../components/PostCard';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {Container} from '../styles/FeedStyles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// const Post = [
//   {
//     id: '1',
//     userName: 'Jenny Doe',
//     userImg: require('../assets/users/3.jpg'),
//     postTime: '4 mins ago',
//     post: 'Hey there, this is my test for a post of my social app in React Native.',
//     postImg: require('../assets/posts/3.jpg'),
//     liked: true,
//     likes: '14',
//     comments: '5',
//   },
//   {
//     id: '2',
//     userName: 'John Doe',
//     userImg: require('../assets/users/1.jpg'),
//     postTime: '2 hours ago',
//     post: 'Hey there, this is my test for a post of my social app in React Native.',
//     postImg: 'none',
//     liked: false,
//     likes: '8',
//     comments: '0',
//   },
//   {
//     id: '3',
//     userName: 'Ken William',
//     userImg: require('../assets/users/4.jpg'),
//     postTime: '1 hours ago',
//     post: 'Hey there, this is my test for a post of my social app in React Native.',
//     postImg: require('../assets/posts/2.jpg'),
//     liked: true,
//     likes: '1',
//     comments: '0',
//   },
//   {
//     id: '4',
//     userName: 'Selina Paul',
//     userImg: require('../assets/users/6.jpg'),
//     postTime: '1 day ago',
//     post: 'Hey there, this is my test for a post of my social app in React Native.',
//     postImg: require('../assets/posts/4.jpg'),
//     liked: true,
//     likes: '22',
//     comments: '4',
//   },
//   {
//     id: '5',
//     userName: 'Christy Alex',
//     userImg: require('../assets/users/7.jpg'),
//     postTime: '2 days ago',
//     post: 'Hey there, this is my test for a post of my social app in React Native.',
//     postImg: 'none',
//     liked: false,
//     likes: '0',
//     comments: '0',
//   },
// ];

const HomeScreen = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          // console.log('Total Posts:', querySnapshot.size);
          querySnapshot.forEach(doc => {
            const {userId, post, postImg, postTime, likes, comments} =
              doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Christy Alex',
              userImg:
                ' https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg',
              postTime: postTime,
              post,
              postImg: postImg,
              liked: false,
              likes,
              comments,
            });
          });

          setPosts(list);

          if (loading) {
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
    return () => {};
  }, [deleted]);

  const handleDelete = postId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = postId => {
    console.log('Current post id:', postId);

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
        Wd;
      })
      .catch(e => console.log('Error deleting posst.', e));
  };

  const ListHeader = () => {
    return null;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 60, height: 60, borderRadius: 50}} />
              <View style={{marginLeft: 20}}>
                <View style={{width: 120, height: 20, borderRadius: 4}} />
                <View
                  style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
                />
              </View>
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <View style={{width: 300, height: 20, borderRadius: 4}} />
              <View
                style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
              />
              <View
                style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
              />
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 60, height: 60, borderRadius: 50}} />
              <View style={{marginLeft: 20}}>
                <View style={{width: 120, height: 20, borderRadius: 4}} />
                <View
                  style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
                />
              </View>
            </View>
            <View style={{marginTop: 10, marginBottom: 30}}>
              <View style={{width: 300, height: 20, borderRadius: 4}} />
              <View
                style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
              />
              <View
                style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
              />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <Container>
          <FlatList
            data={posts}
            renderItem={({item}) => (
              <PostCard
                item={item}
                onDelete={handleDelete}
                onPress={() =>
                  navigation.navigate('HomeProfile', {userId: item.userId})
                }
              />
            )}
            keyExtractor={item => item.id}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          />
        </Container>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
