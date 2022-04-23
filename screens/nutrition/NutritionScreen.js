import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomTextInput from '../../components/CustomTextInput';
import {ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AddImagesView from './AddImagesView';

const NutritionScreen = ({route}) => {
  const [image, setImage] = useState(null);
  const {
    name,
    category,
    description,
    benifits,
    tips,
    nameOfNutrition,
    amountOfNutrition,
    nutrImagUrl,
  } = route.params;

  const openImagePicker = () => {
    let imageList = [];
    ImageCropPicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 4,
      mediaType: 'any',
      includeBase64: true,
    })
      .then(response => {
        // console.log('Response:', response);

        response.map(image => {
          imageList.push({
            filename: image.filename,
            path: image.path,
            // data: image.data,
          });
        });
        setImage(imageList);
        console.log(imageList);
      })
      .catch(e => console.log('Error:', e.message));
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{margin: 20}}>
          <Picker style={styles.pickerStyle} selectedValue={category}>
            <Picker.Item label="Vegetables" value={category} />
            <Picker.Item label="Fruits" value="Fruits" />
            <Picker.Item label="Drinks" value="Drinks" />
            <Picker.Item label="Meat" value="Meat" />
            <Picker.Item label="Fish" value="Fish" />
          </Picker>
          <Text>Name</Text>
          <CustomTextInput value={name} editable={false} />
          <Text>Description</Text>
          <CustomTextInput value={description} editable={false} />
          <Text>Benifits</Text>
          <CustomTextInput value={benifits} editable={false} />
          <Text>Tips</Text>
          <CustomTextInput value={tips} editable={false} />
          <Text>Name of Nutrition</Text>
          <CustomTextInput value={nameOfNutrition} editable={false} />
          <Text>Amount of Nutrition</Text>
          <CustomTextInput value={amountOfNutrition} editable={false} />

          <View style={styles.containerImage}>
            {nutrImagUrl === null ? (
              <TouchableOpacity style={styles.noImage}>
                <Image source={require('../../assets/default-img.jpg')} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.noImage}>
                <Image
                  source={{uri: nutrImagUrl}}
                  style={{height: 100, width: 100}}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NutritionScreen;

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
