import React from 'react';
import {Button} from 'react-native-elements';
import {images, theme} from '../../constants';
import {StyleSheet} from 'react-native';

// theme
const {COLORS, FONTS, SIZES} = theme;
const RaisedButton = (props) => (
  <Button
    {...props}
    containerStyle={{...styles.constainer, ...props.containerStyle}}
    buttonStyle={{...props.customeStyle}}
    titleStyle={{
      ...FONTS.h2 ,
      fontSize : SIZES.width > 350 ? 22 : 15,
      color: COLORS.white,
      textAlign: 'center',
      fontFamily: 'Montserrat-Regular',
      
    }}
  />
);

export default RaisedButton;
const styles = StyleSheet.create({
  constainer: {
    height: SIZES.buttonHeight,
    backgroundColor: COLORS.darkblue,
  },
});
