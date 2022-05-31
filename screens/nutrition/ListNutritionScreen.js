import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  SectionList,
  Image,
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
            const {categoryName} = doc.data();
            list.push({
              categoryName,
            });
          });
        });

      setNutriFacts(list);
      console.log('data:', list);
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
        style={styles.ItemContainer}
        onPress={() => {
          navigation.navigate('ListCategoryScreen', {
            categoryName: item.categoryName,
          });
        }}>
        {item.categoryName == 'Vegetables' ? (
          <Image
            source={require('../../assets/Vegetables.jpg')}
            style={styles.image}
          />
        ) : (
          <></>
        )}
        {item.categoryName == 'Fruits' ? (
          <Image
            source={require('../../assets/Fruits.jpg')}
            style={styles.image}
          />
        ) : (
          <></>
        )}
        {item.categoryName == 'Drinks' ? (
          <Image
            source={require('../../assets/Drinks.jpg')}
            style={styles.image}
          />
        ) : (
          <></>
        )}
        {item.categoryName == 'Meat' ? (
          <Image
            source={require('../../assets/Meat.jpg')}
            style={styles.image}
          />
        ) : (
          <></>
        )}
        {item.categoryName == 'Fish' ? (
          <Image
            source={require('../../assets/Fish.jpg')}
            style={styles.image}
          />
        ) : (
          <></>
        )}
        {item.categoryName == 'Others' ? (
          <Image
            source={require('../../assets/Others.jpg')}
            style={styles.image}
          />
        ) : (
          <></>
        )}

        <Text style={styles.textCategory}>{item.categoryName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
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
    marginLeft: 30,
    color: 'black',
    // borderBottomColor: 'gray',
    // borderBottomWidth: 1,
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
  ItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',

    flex: 1,
    // margin: 10,
    padding: 10,

    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
