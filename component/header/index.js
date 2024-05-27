import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Header = (props, {navigation}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <LinearGradient
        colors={['#6cd7cf', '#0095fc']}
        style={styles.linearGradient}>
        <StatusBar backgroundColor="#6cd7cf" barStyle="white" />
        <Text style={styles.buttonText1}>{props.title1}</Text>
        <Text style={styles.buttonText2}>{props.title2}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: 100,
  },
  buttonText1: {
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    // fontFamily: 'Montserrat-Regular',
  },
  buttonText2: {
    textAlign: 'center',
    color: 'white',
    // fontFamily: 'Montserrat-Regular',
  },
});

export default Header;
