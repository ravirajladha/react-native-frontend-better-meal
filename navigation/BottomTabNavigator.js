import React from 'react';
import {
  ExploreStackNavigator,
  GutHealthStackNavigator,
  HomeStackNavigator,
  NutritionStackNavigator,
  CoachStackNavigator,
} from './StackNavigator';
import {Image, View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {images, SIZES, theme} from '../constants';
const {left1, left2, center, right1, right2} = images;
console.disableYellowBox = true;

const BottomTabNavigation = createBottomTabNavigator(
  {
    Explore: {
      screen: ExploreStackNavigator,
      navigationOptions: {
        tabBarIcon: ({focused, horizontal, tintColor}) => (
          <MaterialCommunityIcons
            name="apple-safari"
            size={30}
            color={tintColor}
          />
        ),

        tabBarOptions: {
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        },
      },
    },
    GutHealth: {
      screen: GutHealthStackNavigator,
      navigationOptions: {
        tabBarIcon: ({focused, horizontal, tintColor}) => (
          <MaterialCommunityIcons name="stomach" size={30} color={tintColor} />
        ),

        tabBarOptions: {
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        },
      },
    },
    MiddleIcon: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: () => (
          <View
            style={{
              backgroundColor: 'white',
              borderColor: '#e5e5e5',
              borderWidth: 3,
              borderRadius: 100,
              padding: 10,
              // paddingTop: 10,
              alignItems: 'center',
              width: SIZES.height / 10,
              height: SIZES.height > 600 ? SIZES.height / 10 : 55,
              bottom: SIZES.height > 600 ? SIZES.height / 100 : 10,
            }}>
            <Image
              source={center}
              style={{
                width: SIZES.width > 350 ? 30 : 20,
                height: SIZES.height > 600 ? 50 : 30,
              }}
            />
          </View>
        ),
      },
    },
    Nutrition: {
      screen: NutritionStackNavigator,
      navigationOptions: {
        tabBarIcon: ({focused, horizontal, tintColor}) => (
          <MaterialCommunityIcons name="spa" size={30} color={tintColor} />
        ),

        tabBarOptions: {
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        },
      },
    },
    Coach: {
      screen: CoachStackNavigator,
      navigationOptions: {
        tabBarIcon: ({focused, horizontal, tintColor}) => (
          <MaterialCommunityIcons name="account" size={30} color={tintColor} />
        ),

        tabBarOptions: {
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        },
      },
    },
  },
  {
    initialRouteName: 'MiddleIcon',
    tabBarOptions: {
      style: {
        elevation: 10,
      },
    },
  },
);
export default BottomTabNavigation;
