import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ListItem,
  TextInput,
  Image,
  Modal,
  StatusBar,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {images, theme} from '../../../../constants';
import {Card, Icon} from 'react-native-elements';
const {COLORS, FONTS, SIZES} = theme;

const UpdateAddMeal = ({navigation}) => {
  return (
    <View style = {{backgroundColor : '#ff5d21'}}>
      <View style={{ display: 'flex', flexDirection: 'row', marginTop : 30 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style = {{marginLeft : 20}}>
          <Icon
                  name="arrow-back-outline"
                  type="ionicon"
                  color="#ffffff"
                  size={30}
          />

          </TouchableOpacity>

          <View style = {{marginLeft : 85}}>

            <Text style={{ ...FONTS.h2, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
              ACTION CARDS
            </Text>
          </View>

        </View>

      <ScrollView
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          paddingHorizontal: 10,
          paddingTop: 20,
          marginTop : 30,
       }}>
        <View style={styles.aboutMealView}>
          <Text style={styles.aboutMeal}>ABOUT MEAL</Text>
        </View>

        <View style = {{elevation : 5}}>
          <Card containerStyle={{borderRadius: 20}}>
            <Text style = {styles.cardText}>
              Consuming your meals and snacks on a regular schedule can help
              keep your digistive system in top shape When you dont eat at
              consistent times each day, it can cause your stomach to overwork
              resulting in bloating and indigestion
            </Text>
          </Card>
        </View>


       <TouchableOpacity onPress={()=>{navigation.navigate('MealPlannerScreen')}}>

        <View style = {{backgroundColor : '#f4f4f4', marginTop : 30 }}>
          <Text style = {{color : '#8b8b8b', fontSize : 20, fontWeight : 'bold',textAlign : 'center',paddingVertical : 40}}>
              Update Meal
          </Text>
        </View>
       </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutMeal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#797979',
  },
  aboutMealView: {
    marginTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  cardText : {
      fontSize : 18,
      fontWeight : 'bold',
      color: '#8b8b8b',
      textAlign : 'justify'
  }
});

export default UpdateAddMeal;
