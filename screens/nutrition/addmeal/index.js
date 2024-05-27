import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, BottomSheet, SearchBar} from 'react-native-elements';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {images, theme} from '../../../constants';
import {
  addSelectedMeal,
  updateSelectedMeal,
  addUserNutriMeal,
} from '../../../redux/nutrition/components/nutrition.action';
import NutritionMenu from '../nutritionmenu';
import Spinner from '../../../component/spinner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TextComp from '../../../component/text';
const {COLORS, FONTS, SIZES} = theme;

import * as Progress from 'react-native-progress';
import {Picker} from '@react-native-picker/picker';
import {ScrollView} from 'react-native-gesture-handler';

const AddMeal = ({
  addMealVisible,
  addMealVisibleScreen,
  nutritionMeal,
  addSelectedMeal,
  mealSelected,
  updateSelectedMeal,
  addUserNutriMeal,
  user,
  setVisibity,
  avgNutritionScores,
  addMealLoading,
  dailyUserMeal,
  dateSelected,
  dropDownSelected,
  navigation,
}) => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState();
  const [count, setCount] = useState(0);
  const [dropDown, setDropDown] = useState(null);
  const [dropDownValue, setDropDownValue] = useState([
    // 'SELECT',
    'BREAKFAST',
    'LUNCH',
    'DINNER',
  ]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dropDownSelected) {
      // console.log('dropDownSelected from add meal', dropDownSelected);
      let array1 = dropDownValue.filter(function (val) {
        return dropDownSelected.indexOf(val) == -1;
      });
      console.log('array1', array1);
      if (dropDownSelected.length > 0) {
        setDropDownValue(array1);
      } else {
        setDropDownValue([
          // 'SELECT',
          'BREAKFAST',
          'LUNCH',
          'DINNER',
        ]);
      }
    }
  }, [dropDownSelected]);
  useEffect(() => {
    if (addMealLoading == false) {
      addMealVisibleScreen(addMealLoading);
      setVisibity(true);
    }
  }, [addMealLoading]);

  //Search functionality
  const searchItems = (text) => {
    console.log('Text=====', text);
    if (text.length > 0) {
      const newData = nutritionMeal.filter((item) => {
        const itemData = `${item.foodName.toUpperCase()}`;
        const textData = text.toUpperCase();
        console.log('Text=====', itemData.indexOf(textData) > -1);
        return itemData.indexOf(textData) > -1;
      });
      // console.log('newData', newData);
      setData(newData);
      setValue(text);
    } else {
      setData(null);
      setValue(text);
    }
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  const calNutriScore = () => {
    console.log('mealSelected', mealSelected.length);
    let avgNutriScore1 = mealSelected
      .map((item) => parseFloat(item.nutritionScore))
      .reduce((prev, next) => prev + next);
    const avgNutriScore = avgNutriScore1 / mealSelected.length;
    console.log('avgNutriScore==', avgNutriScore);
    return avgNutriScore;
  };

  const plusConsumedAmount = (index, value) => {
    // addSelectedMeal({...item, consumedAmount: 0});
    updateSelectedMeal({index: index, value: value});
  };
  const minusConsumedAmount = (index, value) => {
    updateSelectedMeal({index: index, value: value});
  };
  const submitValue = async () => {
    console.log(calNutriScore());
    console.log('dateSelected', dateSelected);
    if (selectedValue && mealSelected && dateSelected) {
      let avgNutriScore = calNutriScore();
      setIsLoading(true);

      console.log("herer is hthe", avgNutritionScores)

      await addUserNutriMeal(
        mealSelected,
        user.id,
        selectedValue,
        dateSelected,
        avgNutriScore,
      );

      //
      // setTimeout(function () {}, 2000);
    } else {
      alert('Please which type of meal period');
    }
    setIsLoading(false);
  };
  // console.log('dropdown', dropDown.includes('LUNCH'));
  // console.log('dropdown', selectedValue);
  return (
    <BottomSheet
      isVisible={addMealVisible}
      containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
      <View style={styles.view4}>
        <TouchableOpacity
          style={styles.view5}
          onPress={() => addMealVisibleScreen(false)}></TouchableOpacity>
        <View style={{paddingTop: 10}}>
          <TextComp
            customeStyle={{
              ...FONTS.h2,
              alignSelf: 'center',
              color: COLORS.white,
              fontWeight: 'bold',
              fontSize: SIZES.width / 18,
            }}
            onPress={() => addMealVisibleScreen(false)}>
            ADD MEAL
          </TextComp>
        </View>
        <View
          style={{paddingTop: 10, paddingHorizontal: 40, paddingBottom: 20}}>
          <TextComp
            customeStyle={{
              ...FONTS.h3,
              textAlign: 'center',
              color: COLORS.white,
              //   fontWeight: 'bold',
              fontSize: SIZES.width / 28,
            }}>
            Please add your past meal by manually entering the names, searching
            or adding from the BM Menu
          </TextComp>
        </View>
        <ScrollView
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: 'white',
            width: '100%',
            height: SIZES.height > 600 ? SIZES.height / 1.4 : 340,
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}>
          <View
            style={{
              // paddingHorizontal: 30,
              width: SIZES.width / 2.7,
              // paddingHorizontal: 5,
            }}>
            <Picker
              selectedValue={selectedValue}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
              }}>
              <Picker.Item label="Please select" value="" color="#717171" />
              {dropDownValue.map((item, index) => (
                <Picker.Item
                  label={item}
                  key={index}
                  value={item}
                  color="#1b51f1"
                />
              ))}
            </Picker>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{backgroundColor: 'white', width: '85%'}}>
              <SearchBar
                // onPress={() => setRenderlist(true)}
                placeholder="Search Meal"
                onChangeText={(text) => searchItems(text)}
                value={value}
                containerStyle={{
                  backgroundColor: 'white',
                  borderBottomColor: 'transparent',
                  borderTopColor: 'transparent',
                  // height: SIZES.height / 4,
                  borderTopRightRadius: 30,
                  borderTopLeftRadius: 30,
                }}
                inputContainerStyle={{
                  backgroundColor: 'white',
                  borderRadius: 30,
                  elevation: 5,
                }}
                searchIcon={{size: 30}}
              />
              {value.length > 0 && data.length > 0 ? (
                <View
                  style={{
                    bottom: 8,
                    marginHorizontal: SIZES.width / 10,
                    // elevation: 5,
                    // position: 'absolute',
                    // backgroundColor: 'white',
                    // top: 50,
                  }}>
                  <FlatList
                    style={{
                      elevation: 2,
                      height: SIZES.height / 4,
                      // borderWidth: 0.1,
                    }}
                    data={data}
                    renderItem={({item}) => (
                      <TextComp
                        onPress={() => {
                          console.log('Object', item);
                          if (mealSelected.length + 1 > 3) {
                            alert('You can add Maximum of 3 Items');
                          } else {
                            let val = {...item, quantity: 0};
                            addSelectedMeal(val);
                            setValue('');
                          }
                        }}
                        customeStyle={{
                          ...FONTS.h3,
                          // alignSelf: 'center',
                          // color: COLORS.white,
                          // fontWeight: 'bold',
                          padding: 10,
                          elevation: 1,
                          borderWidth: 0.1,
                        }}>
                        {item.foodName}
                      </TextComp>
                    )}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={renderSeparator}
                  />
                </View>
              ) : null}
            </View>
            <TouchableOpacity
              onPress={() => {
                addMealVisibleScreen(false);
                navigation.navigate('BMMENU');
              }}
              style={{
                width: '15%',
                alignItems: 'center',
                paddingVertical: SIZES.width > 350 ? 10 : 15,
              }}>
              <MaterialIcons
                name="apps"
                size={SIZES.width / 12}
                style={{
                  backgroundColor: '#1b51f1',
                  borderRadius: 30,
                  padding: 5,
                }}
                color="white"
              />
            </TouchableOpacity>
          </View>

          {mealSelected.length > 0 ? (
            <View>
              <View style={{backgroundColor: 'white', paddingHorizontal: 10}}>
                <FlatList
                  data={mealSelected}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <View style={{flexDirection: 'row'}}>
                          <View style={{width: SIZES.width / 3.2}}>
                            <TextComp
                              customeStyle={{
                                ...FONTS.h2,
                                color: '#717171',
                                fontSize: SIZES.width / 20,
                              }}>
                              {item.foodName}
                            </TextComp>
                          </View>
                          <View style={{paddingTop: 8}}>
                            <Progress.Bar
                              progress={
                                (parseFloat(item.nutritionScore) +
                                  parseFloat(item.nutritionScore)) /
                                10
                              }
                              showsText={true}
                              width={SIZES.width / 12}
                              height={SIZES.height / 60}
                              borderRadius={20}
                              unfilledColor="white"
                              color="#61a014"
                              // borderColor="white"
                              textStyle={{fontSize: 36, color: 'black'}}
                              style={{
                                // transform: [{rotate: '180deg'}],
                                shadowColor: '#000',
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5,
                              }}
                            />
                            {/* <TextComp
                        customeStyle={{
                          ...FONTS.h3,
                          color: 'black',
                          position: 'absolute',
                          left: 10,
                          top: 10,
                          opacity: 0.5,
                        }}>
                        {item.rating}
                      </TextComp> */}
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <TextComp
                            customeStyle={{
                              ...FONTS.h3,
                              color: '#808080',
                              fontSize: 11,
                              fontSize: SIZES.width / 30,
                            }}>
                            {item.calories},
                          </TextComp>
                          <TextComp
                            customeStyle={{
                              ...FONTS.h3,
                              color: '#808080',
                              fontSize: 11,
                            }}>
                            {'  '}
                            {item.serving}
                          </TextComp>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row', paddingVertical: 0}}>
                        <View
                          style={{
                            height: SIZES.height / 18,
                            width: 1,
                            backgroundColor: 'black',
                            marginHorizontal: 10,
                            marginTop: 5,
                          }}
                        />
                        <MaterialCommunityIcons
                          name="plus-circle-outline"
                          size={SIZES.width / 15}
                          style={{
                            paddingVertical: 15,
                            paddingHorizontal: 5,
                            //   backgroundColor: '#1b51f1',
                            //   borderRadius: 30,
                            //   padding: 5,
                          }}
                          color="black"
                          onPress={() => {
                            plusConsumedAmount(index, item.quantity + 1);
                            setCount(count - 1);
                          }}
                        />
                        <TextComp
                          customeStyle={{
                            // paddingVertical: 10,
                            paddingTop: 15,
                            paddingHorizontal: 5,
                            fontSize: SIZES.width / 20,
                          }}>
                          {item.quantity}
                        </TextComp>
                        <MaterialCommunityIcons
                          name="minus-circle-outline"
                          size={SIZES.width / 15}
                          style={{
                            paddingVertical: 15,
                            paddingHorizontal: 5,
                            //   backgroundColor: '#1b51f1',
                            //   borderRadius: 30,
                            //   padding: 5,
                          }}
                          color="black"
                          onPress={() => {
                            if (item.quantity - 1 >= 0) {
                              minusConsumedAmount(index, item.quantity - 1);
                              setCount(count - 1);
                            }
                          }}
                        />
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={renderSeparator}
                />
              </View>

              <View
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 30,
                  paddingVertical: 20,
                }}>
                <Button
                  loading={loading}
                  buttonStyle={{borderRadius: 10, backgroundColor: '#1a51f0'}}
                  onPress={() => {
                    submitValue();
                    // calNutriScore();
                  }}
                  title="Done"
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </BottomSheet>
  );
};
const mapStateToProps = (store) => {
  // console.log('store.nutrition.nutritionMeal', store.nutrition.addMealLoading);
  return {
    nutritionMeal: store.nutrition.nutritionMeal,
    addMealLoading: store.nutrition.addMealLoading,
    mealSelected: store.nutrition.mealSelected,
    user: store.user.user,
    dailyUserMeal: store.nutrition.dailyUserMeal,
    addMealLoading: store.nutrition.addMealLoading,
  };
};
AddMeal.navigationOptions = {
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
  view6: {},
  view7: {},
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
});
export default connect(mapStateToProps, {
  addSelectedMeal,
  updateSelectedMeal,
  addUserNutriMeal,
})(AddMeal);
