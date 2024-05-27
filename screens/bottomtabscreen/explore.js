import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Card, Button, BottomSheet} from 'react-native-elements';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Progress from 'react-native-progress';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';

import {images, theme} from '../../constants';
import {
  getDailyUserNutriMeal,
  getDailyUserNutritionMealByDate,
} from '../../redux/nutrition/components/nutrition.action';
import TextComp from '../../component/text';
const {COLORS, FONTS, SIZES} = theme;
import {ScrollView} from 'react-native-gesture-handler';

const Explore = ({dailyUserMeal, suggestedMeal}) => {
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

const mapStateToProps = (store) => {
  // console.log('store.nutrition.dailyUserMeal', store.nutrition);
  return {
    dailyUserMeal: store.nutrition.dailyUserMeal,
    suggestedMeal: store.nutrition.suggestedMeal,
    user: store.user.user,
  };
};
export default connect(mapStateToProps, {})(Explore);
