import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  SectionList,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import CustomTextInput from '../../components/CustomTextInput';
import FormButton from '../../components/FormButton';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../../navigation/AuthProvider';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import CustomFlatlist from '../../components/CustomFlatlist';
import {useIsFocused} from '@react-navigation/native';

const EditNutritionScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const [nutriFacts, setNutriFacts] = useState(null);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          //show user
          //console.log('User Data', documentSnapshot.data());
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
              description,
              benifits,
              tips,
              nameOfNutrition,
              amountOfNutrition,
              nutrImagUrl,
            } = doc.data();
            list.push({
              category,
              name,
              description,
              benifits,
              tips,
              nameOfNutrition,
              amountOfNutrition,
              nutrImagUrl,
            });
          });
        });

      setNutriFacts(list);
      //show list of Nutrifacts
      //console.log('NutriFacts: ', nutriFacts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [isFocused]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NutritionScreen', {
            category: item.category,
            name: item.name,
            description: item.description,
            benifits: item.benifits,
            tips: item.tips,
            nameOfNutrition: item.nameOfNutrition,
            amountOfNutrition: item.amountOfNutrition,
            nutrImagUrl: item.nutrImagUrl,
          });
        }}>
        <Text style={styles.textCategory}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{margin: 20}}>
        <FlatList
          data={nutriFacts}
          extraData={nutriFacts}
          keyExtractor={item => item.userId}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
        {/* <SectionList
          style={styles.container}
          sections={nutriFacts}
          keyExtractor={item => item.userId}
          renderItem={({item}) => <Text style={styles.row}>{item.name}</Text>}
          renderSectionHeader={({section}) => (
            <Text style={styles.header}>{section.category}</Text>
          )}
        /> */}
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
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
  header: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'steelblue',
    color: 'white',
    fontWeight: 'bold',
  },
});
