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

const ListCategoryScreen = ({route, navigation}) => {
  const isFocused = useIsFocused();
  const [nutriFacts, setNutriFacts] = useState(null);
  const [userData, setUserData] = useState(null);
  const {user} = useContext(AuthContext);
  // const [loading, setLoading] = useState(second)

  const {categoryName} = route.params;

  console.log('Line 27', categoryName);

  const getUser = async () => {
    await firestore()
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
    console.log('line 43:', userData);
  };

  const fetchPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('facts')
        .doc(categoryName)
        .collection('subCategory')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const docId = doc.id;
            const {
              category,
              name,
              description,
              benifits,
              tips,
              nameOfNutrition,
              // amountOfNutrition,
              nutrImagUrl,
              userId,
            } = doc.data();
            list.push({
              category,
              name,
              description,
              benifits,
              tips,
              nameOfNutrition,
              // amountOfNutrition,
              nutrImagUrl,
              userId,
              docId,
            });
          });
        });

      setNutriFacts(list);

      //show list of Nutrifacts
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
    getUser();
  }, [isFocused]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.ItemContainer}
        onPress={() => {
          {
            userData.typeofUser == 'Elderly'
              ? navigation.navigate('NutritionScreen', {
                  category: item.category,
                  name: item.name,
                  description: item.description,
                  benifits: item.benifits,
                  tips: item.tips,
                  nameOfNutrition: item.nameOfNutrition,
                  // amountOfNutrition: item.amountOfNutrition,
                  nutrImagUrl: item.nutrImagUrl,
                })
              : navigation.navigate('UpdateNutritionScreen', {
                  category1: item.category,
                  name1: item.name,
                  description1: item.description,
                  benifits1: item.benifits,
                  tips1: item.tips,
                  nameOfNutrition1: item.nameOfNutrition,
                  // amountOfNutrition: item.amountOfNutrition,
                  nutrImagUrl1: item.nutrImagUrl,
                  docId: item.docId,
                });
          }
        }}>
        <Image source={{uri: item.nutrImagUrl}} style={styles.image} />
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
          keyExtractor={item => item.docId}
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

export default ListCategoryScreen;

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
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
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
});
