import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

const MyImageButton = (props) => {

  return (
      <View>
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.btnColor }]}
      onPress={props.customClick}>

      <Icon style={styles.icon}
        name={props.btnIcon} size={30} color='white' />

      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    color: '#ffffff',
    padding: 5,
    marginTop: 50,
    marginLeft: 150,
    marginRight: 150,
    borderRadius: 10,
  },
  text: {
    color: '#ffffff',
  },
  icon: {
    paddingBottom: 5,
  },
});

export default MyImageButton;