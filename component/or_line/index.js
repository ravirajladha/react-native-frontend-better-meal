import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {images, theme} from '../../constants';
const {COLORS, FONTS, SIZES} = theme;
const Orline = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        marginBottom: 10,
      }}>
      <View style={{flex: 1, height: 1, backgroundColor: COLORS.lightblack}} />
      <View>
        <Text style={{width: 50, textAlign: 'center'}}>Or</Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: COLORS.lightblack}} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Orline;
