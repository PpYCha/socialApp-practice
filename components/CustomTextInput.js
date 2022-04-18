import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomTextInput = ({placeholder, fontAwesome, ...rest}) => {
  return (
    <View style={styles.action}>
      <FontAwesome name={fontAwesome} color="#333333" size={20} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#666666"
        autoCorrect={false}
        style={styles.textInput}
        {...rest}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },
});
