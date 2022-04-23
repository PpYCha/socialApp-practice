import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AsyncStorage} from 'react-native';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import LoginScreen from '../screens/log/LoginScreen';
import SignUpScreen from '../screens/log/SignUpScreen';

const AppStack = createStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }
  return (
    <>
      <AppStack.Navigator
        initialRouteName={routeName}
        screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Onboarding" component={OnBoardingScreen} />
        <AppStack.Screen name="Signup" component={SignUpScreen} />
        <AppStack.Screen name="Login" component={LoginScreen} />
      </AppStack.Navigator>
    </>
  );
};

export default App;
