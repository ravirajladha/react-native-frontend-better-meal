import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import TextComp from '../../component/text';
import {images, theme} from '../../constants';
const {COLORS, FONTS, SIZES} = theme;
const Coach = () => {
  return (
    <ScrollView>
      <TextComp
        customeStyle={{
          ...FONTS.h2,
          fontWeight: 'bold',
          color: '#282828',
          paddingHorizontal: SIZES.width/6,
          paddingVertical: 60,
         // fontSize: SIZES.width > 350 ? 15 : 12,
        }}>Screen is coming soon... </TextComp>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Coach;
