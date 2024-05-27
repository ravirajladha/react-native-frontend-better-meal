import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Card, Button, BottomSheet} from 'react-native-elements';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import * as Progress from 'react-native-progress';

import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {images, theme} from '../../../constants';
import {
  getDailyUserNutriMeal,
  getDailyUserNutritionMealByDate,
} from '../../../redux/nutrition/components/nutrition.action';
import TextComp from '../../../component/text';
const {COLORS, FONTS, SIZES} = theme;
import {ScrollView} from 'react-native-gesture-handler';
const MealPlanner = ({
  isVisible,
  getDailyUserNutriMeal,
  addMealVisibleScreen,
  setVisibity,
  dailyUserMeal,
  getDailyUserNutritionMealByDate,
  settingDate,
  user,
  dropDownSelected,
  suggestedMeal,
}) => {
  const [renderlist, setRenderlist] = useState(moment());
  const [section, setSection] = useState([1, 2, 3]);
  const [previosDate, setPreviousDate] = useState(true);
  const [prioritySorting, setPrioritySorting] = useState([
    'BREAKFAST',
    'LUNCH',
    'DINNER',
  ]);
  const renderSeparator = () => {
    return (
      <View
        style={{
          marginVertical: 10,
        }}
      />
    );
  };
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
  const settingDDValue = () => {
    if (dailyUserMeal.length > 0) {
      let arr = dailyUserMeal.map((item) => item.typeofMeal);
      console.log('arr', arr);
      dropDownSelected(arr);
    } else {
      dropDownSelected([]);
    }
  };
  const calNutriScore = () => {
    // console.log('mealSelected', dailyUserMeal.length);
    let avgNutriScore1 = dailyUserMeal
      .map((item) => item.avgNutriScore)
      .reduce((prev, next) => prev + next);
    const avgNutriScore = avgNutriScore1 / dailyUserMeal.length;
    // console.log('avgNutriScore==', dailyUserMeal);
    return avgNutriScore;
  };
  const calSuggestedScore = () => {
    // console.log('mealSelected', dailyUserMeal.length);
    let avgSuggestedScore1 = suggestedMeal
      .map((item) => item.avgNutriScore)
      .reduce((prev, next) => prev + next);
    const avgNutriScore = avgSuggestedScore1 / suggestedMeal.length;
    // console.log('avgNutriScore==', dailyUserMeal);
    return avgNutriScore;
  };
  const disablePastDt = (current) => {
    const yesterday = moment().subtract(1, 'day');
    console.log('current.isAfter(yesterday)', current.isAfter(yesterday));
    setPreviousDate(current.isAfter(yesterday));
  };
  const isFuturedate = (current) => {
    console.log('momentObj.isAfter()1234', moment().isAfter(current));
  };
  // console.log('suggestedMeal', suggestedMeal);
  const mealInfoAlert = (val) => {
    Alert.alert('Meal Info', val, [
      // {
      //   text: 'Cancel',
      //   onPress: () => console.log('Cancel Pressed'),
      //   style: 'cancel',
      // },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return (
    <BottomSheet
      // isVisible={isVisible}
      containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
      <View style={styles.view4}>
        <TouchableOpacity
          style={styles.view5}
          onPress={() => setVisibity(false)}></TouchableOpacity>
        <View style={{paddingTop: 10}}>
          <TextComp
            customeStyle={{
              ...FONTS.h1,
              fontSize: SIZES.width / 15,
              alignSelf: 'center',
              color: COLORS.white,
              fontWeight: 'bold',
            }}
            onPress={() => setVisibity(false)}>
            MEAL PLANNER
          </TextComp>
        </View>
        <View style={{paddingVertical: SIZES.height > 600 ? 20 : 10}}>
          <CalendarStrip
            scrollable
            calendarHeaderStyle={{color: 'white'}}
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
              color: 'blue',
              fontSize: SIZES.width / 30,
              fontWeight: 'bold',
            }}
            highlightDateNameStyle={{
              color: 'blue',
              fontSize: SIZES.width / 30,
              fontWeight: 'bold',
              // padding: 0,
            }}
            daySelectionAnimation={{
              type: 'background',
              duration: 300,
              highlightColor: '#a4baf9',
            }}
            useIsoWeekday={false}
            onDateSelected={(date) => {
              settingDate(date);
              onDateSubmit(user.id, date);
              disablePastDt(date);
              isFuturedate(date);
            }}
            iconContainer={{flex: 0.1}}
            showMonth={false}
            customDatesStyles={[
              {
                startDate: renderlist,
                dateNameStyle: {color: 'blue', fontSize: SIZES.width / 30},
                dateNumberStyle: {color: 'blue', fontSize: SIZES.width / 30},
                dateContainerStyle: {backgroundColor: '#a4baf9'},
              },
            ]}
          />
        </View>
        <ScrollView
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: 'white',
            width: '100%',
            height: SIZES.height > 600 ? SIZES.height / 1.4 : 350,
            paddingHorizontal: 10,
            paddingTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}>
            <View style={{width: '50%', padding: 10}}>
              <View>
                <TextComp
                  customeStyle={{
                    ...FONTS.h3,
                    color: '#1b51f1',
                    // fontWeight: 'bold',
                    fontSize: SIZES.width / 22,
                  }}>
                  Suggested Meall
                </TextComp>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 10, marginBottom: 15}}>
                <Text
                  style={{
                    backgroundColor: '#10bf00',
                    color: 'white',
                    borderRadius: 30,
                    paddingVertical: 0.5,
                    paddingHorizontal: 6,
                    fontSize: SIZES.width / 28,
                  }}>
                  {suggestedMeal && suggestedMeal.length > 0
                    ? calSuggestedScore()
                    : 0}
                </Text>
                <TextComp
                  customeStyle={{
                    color: '#929292',
                    paddingHorizontal: 10,
                    fontSize: SIZES.width / 28,
                  }}>
                  Target Score
                </TextComp>
              </View>

              <FlatList
                data={suggestedMeal}
                renderItem={({item}) => (
                  <View>
                    <View
                      elevation={5}
                      style={{
                        backgroundColor: '#cbd7fd',
                        width: '100%',
                        // height: 100,
                        padding: 10,
                        elevation: 5,
                      }}>
                      <View>
                        <TextComp
                          customeStyle={{
                            ...FONTS.h3,
                            color: '#57575a',
                            fontWeight: 'bold',
                            paddingBottom: 10,
                            // fontSize: 20,
                            fontSize: SIZES.width / 25,
                          }}>
                          {item.typeofMeal}{' '}
                          <MaterialCommunityIcons
                            name="information"
                            size={SIZES.width / 22}
                            // style={{width: SIZES.width / 15}}
                            color="#2e7cde"
                            onPress={() => mealInfoAlert(item.mealDescription)}
                          />
                        </TextComp>
                      </View>
                      {item.suggestedDailyMeal.map((record, index) => {
                        let color;
                        if (parseInt(record.nutritionScore) >= 4) {
                          color = '#609f13';
                        } else if (
                          parseInt(record.nutritionScore) >= 3 &&
                          parseInt(record.nutritionScore) < 4
                        ) {
                          color = '#f7c846';
                        } else if (parseInt(record.nutritionScore) < 3) {
                          color = '#fd7d21';
                        }
                        return (
                          <View
                            key={index}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              // paddingVertical: 10,
                            }}>
                            <View>
                              <TextComp
                                customeStyle={{
                                  ...FONTS.h3,
                                  color: '#57575a',
                                  fontWeight: 'bold',
                                  // fontSize: 20,
                                  // paddingHorizontal: 10,
                                  // width: SIZES.width / 4,
                                  fontSize:
                                    SIZES.width > 400
                                      ? SIZES.width / 22
                                      : SIZES.width / 25,
                                }}>
                                {record.foodName}
                              </TextComp>
                            </View>
                            <View
                              style={{
                                paddingTop: 8,
                                right:
                                  record.foodName.length > 10 &&
                                  SIZES.height < 900
                                    ? 30
                                    : 2,
                              }}>
                              <Progress.Bar
                                progress={
                                  (parseFloat(record.nutritionScore) +
                                    parseFloat(record.nutritionScore)) /
                                  10
                                }
                                showsText={true}
                                width={SIZES.width / 14}
                                height={SIZES.height / 90}
                                borderRadius={20}
                                unfilledColor="white"
                                color={color}
                                // borderColor="white"
                                textStyle={{fontSize: 36, color: 'black'}}
                                style={{
                                  shadowColor: '#000',
                                  shadowOpacity: 0.8,
                                  shadowRadius: 2,
                                  elevation: 5,
                                }}></Progress.Bar>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => item.id + index.toString()}
                ItemSeparatorComponent={renderSeparator}
              />
            </View>
            <View style={{width: '50%', padding: 10}}>
              <View>
                <TextComp
                  customeStyle={{
                    ...FONTS.h3,
                    color: '#1b51f1',
                    // fontWeight: 'bold',
                    fontSize: SIZES.width / 22,
                  }}>
                  My Meal
                </TextComp>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 10, marginBottom: 15}}>
                <Text
                  style={{
                    backgroundColor: '#ffb107',
                    color: 'white',
                    borderRadius: 30,
                    paddingVertical: 0.5,
                    paddingHorizontal: 6,
                    fontSize: SIZES.width / 28,
                  }}>
                  {dailyUserMeal.length > 0 ? calNutriScore() : 0}
                </Text>
                <TextComp
                  customeStyle={{
                    color: '#929292',
                    paddingHorizontal: 10,
                    fontSize: SIZES.width / 28,
                  }}>
                  My Meal
                </TextComp>
              </View>
              {dailyUserMeal.length > 0 ? (
                <FlatList
                  data={dailyUserMeal.sort(
                    (a, b) =>
                      prioritySorting.indexOf(a.typeofMeal) -
                      prioritySorting.indexOf(b.typeofMeal),
                  )}
                  renderItem={({item}) => (
                    <View
                      elevation={5}
                      style={{
                        backgroundColor: 'white',
                        width: '100%',
                        // height: 100,
                        padding: 10,
                        // elevation: 1,
                        borderColor: '#eeeeee',
                        borderWidth: 1,
                        // height: SIZES.height / 5.5,
                      }}>
                      <View>
                        <TextComp
                          customeStyle={{
                            ...FONTS.h3,
                            color: '#57575a',
                            fontWeight: 'bold',
                            paddingBottom: 10,
                            // fontSize: 20,
                            fontSize: SIZES.width / 25,
                          }}>
                          {item.typeofMeal}
                        </TextComp>
                      </View>
                      {item.dailyMeal.map((record, index) => {
                        let color;
                        if (parseInt(record.nutritionScore) >= 4) {
                          color = '#609f13';
                        } else if (
                          parseInt(record.nutritionScore) >= 3 &&
                          parseInt(record.nutritionScore) < 4
                        ) {
                          color = '#f7c846';
                        } else if (parseInt(record.nutritionScore) < 3) {
                          color = '#fd7d21';
                        }
                        return (
                          <View
                            key={index}
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              // paddingVertical: 10,
                            }}>
                            <View>
                              <TextComp
                                customeStyle={{
                                  ...FONTS.h3,
                                  color: '#57575a',
                                  fontWeight: 'bold',
                                  // fontSize: 20,
                                  // paddingHorizontal: 10,
                                  // width: SIZES.width / 4,
                                  fontSize:
                                    SIZES.width > 400
                                      ? SIZES.width / 22
                                      : SIZES.width / 25,
                                }}>
                                {record.foodName}
                              </TextComp>
                            </View>
                            <View
                              style={{
                                paddingTop: 8,
                                right:
                                  record.foodName.length > 10 &&
                                  SIZES.height < 900
                                    ? 30
                                    : 2,
                              }}>
                              <Progress.Bar
                                progress={
                                  (parseFloat(record.nutritionScore) +
                                    parseFloat(record.nutritionScore)) /
                                  10
                                }
                                showsText={true}
                                width={SIZES.width / 14}
                                height={SIZES.height / 90}
                                borderRadius={20}
                                unfilledColor="white"
                                color={color}
                                // borderColor="white"
                                textStyle={{fontSize: 36, color: 'black'}}
                                style={{
                                  shadowColor: '#000',
                                  shadowOpacity: 0.8,
                                  shadowRadius: 2,
                                  elevation: 5,
                                }}></Progress.Bar>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  )}
                  keyExtractor={(item, index) => item.id + index.toString()}
                  ItemSeparatorComponent={renderSeparator}
                />
              ) : (
                <View>
                  <Text>
                    You havent added any meal for the date you selected
                  </Text>
                </View>
              )}

              {dailyUserMeal.length < 3 && previosDate == true ? (
                <View
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                  }}>
                  <Button
                    title="Add Meal"
                    type="outline"
                    buttonStyle={{
                      borderColor: '#1b51f1',
                      borderWidth: 1,
                      borderRadius: 15,
                    }}
                    titleStyle={{
                      color: '#1b51f1',
                      paddingRight: 0,
                      fontWeight: 'bold',
                      fontSize: SIZES.width / 28,
                    }}
                    // containerStyle={{borderColor: 'white'}}

                    onPress={() => {
                      setVisibity(false);
                      addMealVisibleScreen(true);
                      settingDDValue();
                    }}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
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
MealPlanner.navigationOptions = {
  header: () => null,
};
const styles = StyleSheet.create({
  view3: {
    backgroundColor: 'white',
    width: SIZES.width / 10,
    height: SIZES.height / 200,
    alignSelf: 'center',
  },
  view4: {
    backgroundColor: '#1b51f1',
    paddingTop: 20,
    // paddingBottom: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  view5: {
    backgroundColor: 'white',
    width: SIZES.width / 10,
    height: SIZES.height / 200,
    alignSelf: 'center',
  },

  row: {
    fontSize: 15,
    // padding: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    marginHorizontal: 9,
    marginVertical: 4,
    // width: 20,
    // borderColor: 'black',
    // borderWidth: 1,
    // width: 20,
    // width: 50,
    height: SIZES.height / 8,
    padding: 1, // approximate a square
    shadowColor: '#000',

    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  // container: {
  //   width: SIZES.width / 12,
  //   height: SIZES.height / 60,
  //   borderRadius: 30,
  //   marginTop: 5,
  //   backgroundColor: '#e5e5e5',
  //   justifyContent: 'center',
  // },
  inner: {
    width: '100%',
    height: SIZES.height / 60,
    borderRadius: 15,
    backgroundColor: '#62a014',
  },
  label: {
    fontSize: 8,
    color: 'white',
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
  },
  centeredContent: {
    borderRadius: 10,
  },
  receivingZone: {
    height: SIZES.width / 4 - 12,
    borderRadius: 10,
    width: SIZES.width / 4 - 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  draggableBox: {
    width: SIZES.width / 4 - 12,
    height: SIZES.width / 4 - 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  receivingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  itemSeparator: {
    height: 15,
  },
  draxListContainer: {
    padding: 5,
    height: 350,
  },
  receivingZoneContainer: {
    padding: 5,
    height: 100,
  },
  textStyle: {
    fontSize: 18,
  },
  headerStyle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
export default connect(mapStateToProps, {
  getDailyUserNutriMeal,
  getDailyUserNutritionMealByDate,
})(MealPlanner);
