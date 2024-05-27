import React from 'react';
import {StyleSheet, View, Text, StatusBar,ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {images, theme} from '../../constants';
const {COLORS, FONTS, SIZES} = theme;
const Headers = (props) => {
  return (
    // <ImageBackground style= { styles.backgroundImage } source={require('../../assets/images/Image 82.png')}>
    <View>
      <Text
        style={{
          fontSize: SIZES.width / 25,
          fontWeight: 'bold',
          color: 'white',
        }}>
        {props.title}
      </Text>
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage:{
    // flex: 1,
    height: 230,
    width:100,
    justifyContent: "center",
    alignItems: "center",
  
},
});

export default Headers;
