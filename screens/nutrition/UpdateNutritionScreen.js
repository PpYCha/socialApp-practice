import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {Picker} from '@react-native-picker/picker';
import CustomTextInput from '../../components/CustomTextInput';
import FormButton from '../../components/FormButton';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../../navigation/AuthProvider';
import ImageCropPicker from 'react-native-image-crop-picker';
import AddImagesView from './AddImagesView';
import {ScrollView} from 'react-native';

const UpdateNutritionScreen = ({route, navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [category, setCategory] = useState('');
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [benifits, setBenifits] = useState();
  const [tips, setTips] = useState();
  const [nameOfNutrition, setNameOfNutrition] = useState();
  const [amountOfNutrition, setAmountOfNutrition] = useState();
  const [userData, setUserData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [urls, setUrls] = useState(null);
  const [nutrImageUrl, setNutrImageUrl] = useState();

  const [image, setImage] = useState(null);

  const {
    name1,
    category1,
    description1,
    benifits1,
    tips1,
    nameOfNutrition1,
    amountOfNutrition1,
    nutrImagUrl1,
    docId,
  } = route.params;

  const choosePhotoFromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: false,
    }).then(image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;

      setImage(imageUri);

      // console.log('image:', image);
    });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }

    setImage(null);
  };

  const handleFactsSave = () => {
    firestore()
      .collection('facts')
      .doc(category)
      .set({
        categoryName: category,
      })
      .then(() => {
        console.log('Save  Fact!');
      });
  };

  const handleSave = async () => {
    const imageUrl = await uploadImage();
    console.log('line 235', imageUrl);

    handleFactsSave();

    firestore()
      .collection('facts')
      .doc(category)
      .collection('subCategory')
      .doc(name)
      .set({
        category: category,
        description: description,
        benifits: benifits,
        name: name,
        tips: tips,
        nameOfNutrition: nameOfNutrition,
        // amountOfNutrition: amountOfNutrition,
        userId: user.uid,
        nutrImagUrl: imageUrl,
      })
      .then(() => {
        console.log('Save Nutrition Fact!');

        Alert.alert(
          'Nutrition Fact Save!',
          'Nutrition fact has been saved successfully.',
          [{text: 'OK', onPress: () => navigation.navigate('Nutrition Facts')}],
        );
      });
  };

  const handleDelete = async () => {
    firestore()
      .collection('facts')
      .doc(category)
      .collection('subCategory')
      .doc(docId)
      .delete()
      .then(() => {
        Alert.alert('Deleted!', 'Has been deleted Successfully!');

        navigation.navigate('Nutrition Facts');
      });
  };

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
    setName(name1);
    setCategory(category1);
    setDescription(description1);
    setBenifits(benifits1);
    setTips(tips1);
    setNameOfNutrition(nameOfNutrition1);
    setAmountOfNutrition(amountOfNutrition1);
    setNutrImageUrl(nutrImagUrl1);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{margin: 20}}>
          <View style={styles.containerImage}>
            {/* {nutrImageUrl === null ? (
              <TouchableOpacity
                onPress={choosePhotoFromLibrary}
                style={styles.noImage}>
                <Image source={require('../../assets/default-img.jpg')} />
              </TouchableOpacity>
            ) : (
              <></>
            )} */}

            <TouchableOpacity
              onPress={choosePhotoFromLibrary}
              style={styles.noImage}>
              <Image
                source={{
                  uri: nutrImageUrl,
                }}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>
          <Picker
            style={styles.pickerStyle}
            selectedValue={category}
            onValueChange={itemValue => setCategory(itemValue)}>
            <Picker.Item label="Vegetables" value="Vegetables" />
            <Picker.Item label="Fruits" value="Fruits" />
            <Picker.Item label="Drinks" value="Drinks" />
            <Picker.Item label="Meat" value="Meat" />
            <Picker.Item label="Fish" value="Fish" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
          <CustomTextInput
            placeholder="Name"
            value={name}
            onChangeText={txt => setName(txt)}
          />
          <CustomTextInput
            placeholder="Description"
            value={description}
            multiline
            numberOfLines={5}
            onChangeText={txt => setDescription(txt)}
          />
          <CustomTextInput
            placeholder="Benifits"
            value={benifits}
            multiline
            numberOfLines={5}
            onChangeText={txt => setBenifits(txt)}
          />
          <CustomTextInput
            placeholder="Tips"
            value={tips}
            multiline
            numberOfLines={5}
            onChangeText={txt => setTips(txt)}
          />
          <CustomTextInput
            placeholder="Nutrition Facts"
            value={nameOfNutrition}
            multiline
            numberOfLines={5}
            onChangeText={txt => setNameOfNutrition(txt)}
          />
          {/* <CustomTextInput
              placeholder="Amount of Nutrion"
              onChangeText={txt => setAmountOfNutrition(txt)}
            /> */}
          {/* <AddImagesView newImages={image} addImage={choosePhotoFromLibrary} /> */}

          <FormButton buttonTitle="Save" onPress={handleSave} />
          <FormButton buttonTitle="Delete" onPress={handleDelete} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateNutritionScreen;

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
  noImage: {
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImage: {
    flex: 1,
    // backgroundColor: 'blue',
    // paddingLeft: 20,
    // paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 250,
    resizeMode: 'stretch',
  },
});
