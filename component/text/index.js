import React from 'react';
import {Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';

const TextComp = ({customeStyle, children, onPress}) => (
  <Text style={{...styles.text, ...customeStyle}} onPress={onPress}>
    {children}
  </Text>
);

export default TextComp;
const styles = StyleSheet.create({
  text: {
    // fontFamily: 'Montserrat-SemiBold ',
    // color: '#585858',
  },
});
