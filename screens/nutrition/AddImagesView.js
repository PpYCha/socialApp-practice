import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {windowWidth, windowHeight} from '../../utils/Dimensions';

const AddImagesView = ({newImages, addImage}) => {
  const _renderItem = ({item, index}) => {
    return (
      <View key={index}>
        <Image
          style={{width: windowWidth, borderRadius: 15, height: 200}}
          source={{uri: item.path}}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      {newImages?.length > 0 ? (
        <Carousel
          data={newImages}
          renderItem={_renderItem}
          onSnapToItem={index => console.log(index)}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          vertical={false}
        />
      ) : (
        <TouchableOpacity onPress={addImage} style={styles.noImage}>
          <Image source={require('../../assets/default-img.jpg')} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddImagesView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
    // paddingLeft: 20,
    // paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // header: {height: 100, justifyContent: 'flex-end'},
  noImage: {
    // height: 200,
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {},
});
