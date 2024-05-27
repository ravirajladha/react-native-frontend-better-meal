import React from 'react';
import {Button} from 'react-native-elements';
import {images, theme} from '../../constants';
import {Image} from 'react-native';
const {COLORS, FONTS, SIZES} = theme;
const IconButton = (props) => (
  <Button
    icon={<Image source={props.icon} />}
    title={props.title}
    type="outline"
    onPress={props.onPress}
    // onPress={() => {
    //   alert(props.title);
    // }}
    // containerStyle={{alignItems: 'flex-start', width: '100%'}}
    buttonStyle={{
      justifyContent: 'flex-start',
      width: SIZES.width / 1.1,
      paddingHorizontal: SIZES.width / 4.4,
      height: 45,
    }}
    titleStyle={{
      fontFamily: 'Montserrat-Regular',
      color: 'black',
    }}
  />
);

export default IconButton;
