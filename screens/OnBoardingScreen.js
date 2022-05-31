import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected, ...props}) => {
  let backGroundColor;
  backGroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backGroundColor,
      }}
      {...props}
    />
  );
};

const OnBoardingScreen = ({navigation}) => {
  const Skip = ({...props}) => (
    <Button title="Skip" color="#000000" {...props} />
  );

  const Next = ({...props}) => (
    <Button title="Next" color="#000000" {...props} />
  );

  const Done = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 8}} {...props}>
      <Text style={{fontSize: 16}}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image
              style={styles.imageBoard}
              source={require('../assets/what.jpg')}
            />
          ),
          title: 'asdasdsad',
          subtitle: 'asdad',
        },
        {
          backgroundColor: '#fdeb93',
          image: (
            <Image
              style={styles.imageBoard}
              source={require('../assets/eatur.jpg')}
            />
          ),
          title: 'Essential Nutrients',
          subtitle: 'Your Guide to a Balanced Diet ',
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              style={styles.imageBoard}
              source={require('../assets/absorption_im01.png')}
            />
          ),
          title: 'Role',
          subtitle: 'The role of nutrients and nutrient consumption',
        },
      ]}
    />
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBoard: {
    // resizeMode: 'center',
  },
});
