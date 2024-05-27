import React, { useState, useEffect } from 'react';
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
import {getDailyUserNutriMeal, getDailyUserNutritionMealByDate} from '../../../redux/nutrition/components/nutrition.action.js'
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { images, theme } from '../../../constants';
import { Button, Avatar, Badge, Icon, CheckBox } from 'react-native-elements';
import Seperator from '../../../assets/images/seperator.png'
import { TouchableHighlight } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
const { COLORS, FONTS, SIZES } = theme;


const ViewAll = ({ navigation , user, dailyMeal}) => {
  const [renderlist, setRenderlist] = useState(moment());
  const [settingDate,setsettingDate]= useState(moment());
  const [previosDate, setPreviousDate] = useState(true);
  const [dateSelected, setDateSelected] = useState(new Date());

  useEffect(()=>{
    getDailyUserNutriMeal(user.id,settingDate);
    getDailyUserNutritionMealByDate(user.id,settingDate)
  },[])


  console.log('-------[user]-----',user.weight)


  const onDateSubmit = (id, date) => {
    console.log(date);
    console.log(moment());
    setRenderlist(date);
    if (id && date) {
      getDailyUserNutritionMealByDate(id, date);
    } else {
      alert('Parameter missing');
    }
  };

console.log("mydate",settingDate)

  return (

    <View style = {{backgroundColor : 'white'}}>
      <StatusBar barStyle="light-content" backgroundColor="#ff5d21" />



      <View style={{ backgroundColor: "#ff5d21" }}>


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



        <View style={{}}>
          <CalendarStrip
            style={{ height: 100, paddingTop: 0, paddingBottom: 0, backgroundColor: '#ff5d21' }}
            scrollable
            calendarHeaderStyle={{ color: 'white' }}
            dateNumberStyle={{
              color: 'white',
              fontSize: SIZES.width / 30,
              fontWeight: 'bold',
            }}
            dateNameStyle={{
              color: 'white',
              fontSize: SIZES.width / 30,
              fontWeight: 'bold',
            }}
            highlightDateNumberStyle={{
              color: '#fa990c',
              fontSize: SIZES.width / 30,
              fontWeight: 'bold',
            }}
            highlightDateNameStyle={{
              color: '#fa990c',
              fontSize: SIZES.width / 30,
              fontWeight: 'bold',
              // padding: 0,
            }}
            daySelectionAnimation={{
              type: 'background',
              duration: 300,
              highlightColor: '#ffffff',
              borderWidth: '#fca383'
            }}
            Week Strip Animation Options={{
              type: 'sequence',
              duration: 500,
              useNativeDriver: true
            }}
            onDateSelected={(date) => {
               setsettingDate(date);
            //   onDateSubmit(user.id, date);
            //   disablePastDt(date);
            }}
            iconContainer={{ flex: 0.1 }}
            showMonth={false}
            useIsoWeekday={false}
            customDatesStyles={[
              {
                startDate: settingDate,
                dateNameStyle: {color: '#fa990c', fontSize: SIZES.width / 30},
                dateNumberStyle: {color: '#fa990c', fontSize: SIZES.width / 30},
                dateContainerStyle: {backgroundColor: '#ffffff'},          
                 },

            ]}
          />
        </View>

        <ScrollView
          style={{
            // marginTop : 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: 'white',
            width: '100%',
            height : 470,
            paddingHorizontal: 30,
            // paddingVertical : 30,
            // // paddingTop: 20,
            // paddingLeft: 30,
            // paddingRight: 30,
          }}
        >

          <View style={{ paddingTop: 20 }}>
            <Text style={styles.pendingTaskTextDec}>
              PENDING TASK
            </Text>
          </View>

          {dailyMeal && dailyMeal.length ? 
          null
          : <TouchableOpacity onPress={() => { navigation.navigate('UpdateAddMeal') }}>
          <View style={styles.viewSectionWithOrangeBorder}>
            <Text style={styles.textSectionOfView}>
              ADD MEAL
            </Text>

          </View>
        </TouchableOpacity>}

          {user && user.weight  ?
                    null
          : <TouchableOpacity onPress={() => { navigation.navigate('MyAccount') }}>
          <View style={styles.viewSectionWithOrangeBorder}>
            <Text style={styles.textSectionOfView}>
              ADD WEIGHT
            </Text>

          </View>
        </TouchableOpacity> }

            {(user && user.weight !== null && user && user.weight !== 0) && (dailyMeal && dailyMeal.length ) ?
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.noPendingTaskTextDec}>
              NO PENDING TASK
            </Text>
          </View>
        : null}




          <View style={{ paddingTop: 20 }}>
            <Text style={styles.pendingTaskTextDec}>
              COMPLETED TASK
            </Text>
          </View>

          {/* Dry fruits */}
          <TouchableOpacity onPress={() => { navigation.navigate('DryFruitScreen') }}>
            <View style={styles.viewSectionWithOrangeBorder}>
              <Text style={styles.textSectionOfView}>
                DRY FRUITS DIET
              </Text>

            </View>
          </TouchableOpacity>


          {/* ADD Meal */}
          
            {dailyMeal && dailyMeal.length  ?
            <View style={styles.viewSectionWithOrangeBorderInCOmpletedTask}>
              <View style={{}}>
                <Text style={styles.textSectionOfView}>
                  ADD MEAL
                </Text>

              </View>

              <View style={{ marginRight: 10, alignSelf: 'center' }}>
                <CheckBox
                  containerStyle={{
                    borderRadius: 30,
                    backgroundColor: 'white',
                    elevation: 5,
                  }}
                  size={20}
                  checked={true}
                  iconType="material-community"
                  checkedIcon="check-bold"
                  checkedColor="black"
                />
              </View>

            </View>
            : null}
          

          {/* ADD Weight */}

          {user && user.weight? 
          
            <View style={[styles.viewSectionWithOrangeBorderInCOmpletedTask, styles.addWeightIncompletedTask]}>

              <View style = {{}}>
                <Text style={styles.textSectionOfView}>
                  ADD WEIGHT
                </Text>
              </View>

              <View style={{ marginRight: 10, alignSelf: 'center' }}>
                <CheckBox
                  containerStyle={{
                    borderRadius: 30,
                    backgroundColor: 'white',
                    elevation: 5,
                  }}
                  size={20}
                  checked={true}
                  iconType="material-community"
                  checkedIcon="check-bold"
                  checkedColor="black"
                />
              </View>
            </View>
          
          :null}



        </ScrollView>

      </View>

    </View>
  )

}


const styles = StyleSheet.create({
  pendingTaskTextDec: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#797979'
  },
  noPendingTaskTextDec:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#797979',
    textAlign : 'center',
  },
  addWeightIncompletedTask : {
    marginBottom : 30
  },
  viewSectionWithOrangeBorder: {
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#fadfb8',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    shadowColor: 'red',
    // shadowOffset: {x : 2 , y : 0},
    // shadowOpacity: 0.8,
    // shadowRadius: 20, 
    elevation: 5,
  },
  viewSectionWithOrangeBorderInCOmpletedTask: {
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#fadfb8',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textSectionOfView: {
    paddingVertical: 20,
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#909090',
  }
});


const mapStateToProps = (store) => {
  console.log('--------[My Store]--------',store.nutrition)
  return {user: store.user.user, dailyMeal : store.nutrition.dailyUserMeal};
};

export default connect(mapStateToProps ,{getDailyUserNutriMeal,getDailyUserNutritionMealByDate})(ViewAll);