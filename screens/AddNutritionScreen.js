import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import CustomTextInput from '../components/CustomTextInput';
import FormButton from '../components/FormButton';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../navigation/AuthProvider';

const AddNutritionScreen = () => {
  const {user, logout} = useContext(AuthContext);
  const [category, setCategory] = useState('');
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [benifits, setBenifits] = useState();
  const [tips, setTips] = useState();
  const [nameOfNutrition, setNameOfNutrition] = useState();
  const [amountOfNutrition, setAmountOfNutrition] = useState();
  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    getUser();
  }, []);

  const handleSave = async () => {
    firestore()
      .collection('facts')
      .add({
        category: category,
        description: description,
        benifits: benifits,
        name: name,
        tips: tips,
        nameOfNutrition: nameOfNutrition,
        amountOfNutrition: amountOfNutrition,
        userId: user.uid,
      })
      .then(() => {
        console.log('Save Nutrition Fact!');
        Alert.alert(
          'Nutrition Fact Save!',
          'Nutrition fact has been saved successfully.',
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={{margin: 20}}>
        <Picker
          style={styles.pickerStyle}
          selectedValue={category}
          onValueChange={itemValue => setCategory(itemValue)}>
          <Picker.Item label="Vegetables" value="Vegetables" />
          <Picker.Item label="Fruits" value="Fruits" />
          <Picker.Item label="Drinks" value="Drinks" />
          <Picker.Item label="Meat" value="Meat" />
          <Picker.Item label="Fish" value="Fish" />
        </Picker>
        <CustomTextInput
          placeholder="Name"
          onChangeText={txt => setName(txt)}
        />
        <CustomTextInput
          placeholder="Description"
          onChangeText={txt => setDescription(txt)}
        />
        <CustomTextInput
          placeholder="Benifits"
          onChangeText={txt => setBenifits(txt)}
        />
        <CustomTextInput
          placeholder="Tips"
          onChangeText={txt => setTips(txt)}
        />
        <CustomTextInput
          placeholder="Name of Nutrion"
          onChangeText={txt => setNameOfNutrition(txt)}
        />
        <CustomTextInput
          placeholder="Amount of Nutrion"
          onChangeText={txt => setAmountOfNutrition(txt)}
        />
        <FormButton buttonTitle="Save" onPress={handleSave} />
      </View>
    </View>
  );
};

export default AddNutritionScreen;

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
});
