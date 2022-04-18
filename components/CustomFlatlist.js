import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomFlatlist = ({item, onPress}) => {
  return (
    <View key={item.id}>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomFlatlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
