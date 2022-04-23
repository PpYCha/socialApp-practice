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

const AddNutritionScreen = ({navigation}) => {
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

  const [image, setImage] = useState(null);

  // const openImagePicker = () => {
  //   let imageList = [];
  //   ImageCropPicker.openPicker({
  //     multiple: true,
  //     waitAnimationEnd: false,
  //     includeExif: true,
  //     forceJpg: true,
  //     compressImageQuality: 0.8,
  //     maxFiles: 4,
  //     mediaType: 'any',
  //     includeBase64: true,
  //   })
  //     .then(response => {
  //       // console.log('Response:', response);

  //       // response.map(image => {
  //       //   imageList.push({
  //       //     // filename: image.filename,
  //       //     filename: image.path.substring(image.path.lastIndexOf('/') + 1),
  //       //     path: image.path,
  //       //     // data: image.data,
  //       //   });
  //       // });
  //       setImage(response);
  //       console.log(response);
  //     })
  //     .catch(e => console.log('Error:', e.message));
  // };

  // const uploadImage = async () => {
  //   if (image == null) {
  //     return null;
  //   }

  //   let filename = image.filename;
  //   console.log(filename);
  //   const extension = filename.split('.').pop();
  //   const name = filename.split('.').slice(0, -1).join('.');
  //   filename = name + Date.now() + '.' + extension;

  //   setUploading(true);
  //   setTransferred(0);

  //   const storageRef = storage().ref(`photos/nutrition/${filename}`);

  //   const task = storageRef.putFile(file.path);

  //   task.on('state_changed', taskSnapshot => {
  //     console.log(
  //       `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
  //     );

  //     setTransferred(
  //       Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
  //         100,
  //     );
  //   });

  //   try {
  //     await task;

  //     const url = storageRef.getDownloadURL();

  //     setUploading(false);
  //     // setImage(null);
  //     //show url of picture uploaded
  //     console.log(url);
  //     return url;
  //   } catch (e) {
  //     console.log(e);
  //     return null;

  //     setImage(null);

  //     console.log('urls', urls);
  //   }
  // };

  // const uploadImage = async () => {
  //   if (image == null) {
  //     return null;
  //   }
  //   const uploadUri = image;
  //   let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

  //   // Add timestamp to File Name
  //   const extension = filename.split('.').pop();
  //   const name = filename.split('.').slice(0, -1).join('.');
  //   filename = name + Date.now() + '.' + extension;

  //   setUploading(true);
  //   setTransferred(0);

  //   const storageRef = storage().ref(`photos/nutri/${filename}`);
  //   const task = storageRef.putFile(uploadUri);

  //   task.on('state_changed', taskSnapshot => {
  //     console.log(
  //       `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
  //     );

  //     setTransferred(
  //       Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
  //         100,
  //     );
  //   });

  //   try {
  //     await task;

  //     const url = storageRef.getDownloadURL();

  //     setUploading(false);
  //     setImage(null);

  //     return url;
  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   }

  //   setImage(null);
  // };

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

  const handleSave = async () => {
    const imageUrl = await uploadImage();
    console.log(imageUrl);
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
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
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
          {/* <AddImagesView newImages={image} addImage={choosePhotoFromLibrary} /> */}
          <View style={styles.containerImage}>
            {image === null ? (
              <TouchableOpacity
                onPress={choosePhotoFromLibrary}
                style={styles.noImage}>
                <Image source={require('../../assets/default-img.jpg')} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={choosePhotoFromLibrary}
                style={styles.noImage}>
                <Image
                  source={{uri: image}}
                  style={{height: 100, width: '100%'}}
                />
              </TouchableOpacity>
            )}
          </View>

          <FormButton buttonTitle="Save" onPress={handleSave} />
        </View>
      </ScrollView>
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
  noImage: {
    // height: 200,
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
});
