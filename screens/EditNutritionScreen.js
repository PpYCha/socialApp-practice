import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import CustomTextInput from '../components/CustomTextInput';
import FormButton from '../components/FormButton';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../navigation/AuthProvider';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import CustomFlatlist from '../components/CustomFlatlist';

const EditNutritionScreen = () => {
  const [nutriFacts, setNutriFacts] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const fetchPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('facts')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {
              category,
              name,
              benifits,
              tips,
              nameOfNutrition,
              amountOfNutrition,
            } = doc.data();
            list.push({
              category,
              name,
              benifits,
              tips,
              nameOfNutrition,
              amountOfNutrition,
            });
          });
        });

      setNutriFacts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('NutriFacts: ', nutriFacts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.textCategory}>{item.name}</Text>
        <Text style={styles.textCategory}>{}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{margin: 20}}>
        <FlatList
          data={nutriFacts}
          keyExtractor={item => item.userId}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default EditNutritionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pickerStyle: {
    height: 150,
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
  },
  textCategory: {
    fontSize: 30,
  },
});
