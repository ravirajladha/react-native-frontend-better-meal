import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {
  addCheckboxBMMenu,
  addSelectedMealFromBM,
} from '../../../redux/nutrition/components/nutrition.action';
import {Image, SearchBar, CheckBox, Button} from 'react-native-elements';
import {images, theme} from '../../../constants';
const {COLORS, FONTS, SIZES} = theme;
import TextComp from '../../../component/text';
import * as Progress from 'react-native-progress';

const BMMENU = ({
  nutritionMeal,
  addCheckboxBMMenu,
  addSelectedMealFromBM,
  navigation,
}) => {
  const [value, setValue] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [text, setText] = useState('');
  const [renderlist, setRenderlist] = useState(false);
  const [value1, setvalue1] = useState(0);

  let filterdData = text // based on text, filter data and use filtered data
    ? nutritionMeal.filter((item) => {
        const itemData = item.foodName.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.includes(textData);
      })
    : nutritionMeal; // on on text, u can return all data

  const onCheck = (item, index) => {
    // console.log('item========================', item);
    let selecedItemDict = item;
    if (selecedItemDict.isSelected) {
      selecedItemDict.isSelected = false;
    } else {
      selecedItemDict.isSelected = true;
      selecedItemDict.quantity = 0;
    }
    let selectedParts = nutritionMeal;
    selectedParts[index] = selecedItemDict;
    addCheckboxBMMenu(selectedParts);
  };
  const submit = () => {
    let fav = nutritionMeal.filter((item) => {
      return item.isSelected == true;
    });
    // console.log('fav====', fav);
    // console.log('fav====', fav.length);
    if (fav.length == 0) {
      alert('Add atleast one meal');
    } else if (fav.length > 3) {
      alert('Your can only 3 Meal');
    } else {
      addSelectedMealFromBM(fav);
      navigation.navigate('MealPlannerScreen', {popup: true});
    }
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <TextComp
          customeStyle={{
            color: '#5a5a5a',
            paddingHorizontal: 10,
            fontSize: SIZES.width > 350 ? 15 : 12,
            fontWeight: 'bold',
          }}>
          FAVOURITES
        </TextComp>
      </View>
      <View style={{paddingBottom: 10}}>
        <FlatList
          horizontal
          data={nutritionMeal}
          renderItem={({item}) => (
            <View style={{marginLeft: SIZES.width > 350 ? 20 : 15}}>
              <Image
                source={{uri: `data:image/jpeg;base64,${item.nutritionImage}`}}
                style={{
                  width: SIZES.width / 5.5,
                  height: SIZES.width / 5.5,
                  borderRadius: 20,
                }}
              />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          backgroundColor: '#f4f5f9',
          paddingHorizontal: SIZES.width > 350 ? 5 : 2,
        }}>
        <View>
          <SearchBar
            // onPress={() => setRenderlist(true)}#f4f5f9
            placeholder="Search Meal"
            onChangeText={(text) => {
              setText(text);
              setRenderlist(true);
            }}
            value={text}
            containerStyle={{
              backgroundColor: '#f4f5f9',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',
              // height: SIZES.height / 4,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              paddingTop: SIZES.width > 350 ? 15 : 8,
            }}
            inputContainerStyle={{
              backgroundColor: 'white',
              borderRadius: 30,
              elevation: 1,
            }}
            searchIcon={{size: 30}}
          />
        </View>
        <View
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: 'white',
            marginHorizontal: 15,
            // paddingHorizontal: 20
            paddingLeft: 20,
          }}>
          <View
            style={{
              paddingHorizontal: 0,
              paddingVertical: SIZES.width > 350 ? 15 : 8,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'blue',
                // paddingVertical: 10,
                // paddingHorizontal: 10,
              }}>
              <View>
                <TextComp
                  customeStyle={{
                    color: '#1a51f0',
                    fontSize: SIZES.width > 350 ? 15 : 12,
                    fontWeight: 'bold',
                  }}>
                  MENU
                </TextComp>
              </View>
              <View
                style={{
                  paddingRight: 3,
                  // backgroundColor: 'red'
                }}>
                {/* <Button title="SAVE" type="outline" /> */}

                <TextComp
                  onPress={() => submit()}
                  customeStyle={{
                    ...FONTS.h3,
                    fontWeight: 'bold',
                    color: '#1a51f0',
                    paddingHorizontal: 20,
                    fontSize: SIZES.width > 350 ? 15 : 12,
                  }}>
                  SAVE
                </TextComp>
                {/* <CheckBox
                  title="SAVE"
                  checked={isSelected}
                  iconRight
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    padding: 0,
                    margin: 0,
                  }}
                  textStyle={{
                    color: '#1a51f0',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                /> */}
              </View>
            </View>
          </View>
          <FlatList
            style={{height: SIZES.height / 2}}
            data={filterdData}
            renderItem={({item, index}) => {
              let color;
              if (parseInt(item.nutritionScore) >= 4) {
                color = '#609f13';
              } else if (
                parseInt(item.nutritionScore) >= 3 &&
                parseInt(item.nutritionScore) < 4
              ) {
                color = '#f7c846';
              } else if (parseInt(item.nutritionScore) < 3) {
                color = '#fd7d21';
              }
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    backgroundColor: 'white',
                    marginBottom: 20,
                  }}>
                  <View
                    style={{
                      width: '25%',
                      // backgroundColor: 'red'
                    }}>
                    <Image
                      source={{
                        uri: `data:image/jpeg;base64,${item.nutritionImage}`,
                      }}
                      style={{
                        width:
                          SIZES.width > 350
                            ? SIZES.width / 4.5
                            : SIZES.width / 5.5,
                        height:
                          SIZES.width > 350
                            ? SIZES.width / 4.5
                            : SIZES.width / 5.5,
                        borderRadius: 20,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: '55%',
                      // backgroundColor: 'blue',
                      justifyContent: 'center',
                    }}>
                    <View style={{}}>
                      <TextComp
                        customeStyle={{
                          color: '#757575',
                          paddingHorizontal: 10,
                          fontSize: SIZES.width > 350 ? 18 : 12,
                          fontWeight: 'bold',
                        }}>
                        {item.foodName}
                      </TextComp>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }}>
                      <View style={{paddingVertical: 5}}>
                      <View style={{ flexDirection:'row', flexWrap:'wrap'  }}> 
                        <Progress.Bar
                          progress={
                            (parseFloat(item.nutritionScore) +
                              parseFloat(item.nutritionScore)) /
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
                            <Text style={{...FONTS.h4 ,color:'#858686',  position: 'absolute',
                right:-30,bottom:-5}}>{item.nutritionScore}</Text>
               
                                            </View>
                      </View>
                      <TextComp
                        customeStyle={{
                          color: '#b3b3b3',
                          paddingHorizontal: 33,
                          fontSize: SIZES.width > 350 ? 15 : 10,
                          // fontWeight: 'bold',
                        }}>
                        Nutrition Score
                      </TextComp>
                    </View>
                    <View>
                      <TextComp
                        customeStyle={{
                          color: '#b3b3b3',
                          paddingHorizontal: 10,
                          fontSize: SIZES.width > 350 ? 15 : 10,
                          // fontWeight: 'bold',
                        }}>
                        {item.serving}
                      </TextComp>
                    </View>
                  </View>

                  <View
                    style={{
                      width: '15%',
                      // backgroundColor: 'red',
                    }}>
                    <CheckBox
                      size={SIZES.width > 350 ? 25 : 20}
                      onPress={() => {
                        onCheck(item, item.id);
                        setvalue1(value1 + 1);
                      }}
                      checked={item.isSelected}
                      containerStyle={{
                        padding: 0,
                        margin: 0,
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                </View>
              );
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = (store) => {
  // console.log(
  //   'store.nutrition.dailyUserMeal',
  //   store.nutrition.dailyUserMeal.length,
  // );
  return {
    dailyUserMeal: store.nutrition.dailyUserMeal,
    user: store.user.user,
    nutritionMeal: store.nutrition.nutritionMeal,
  };
};
export default connect(mapStateToProps, {
  addCheckboxBMMenu,
  addSelectedMealFromBM,
})(BMMENU);
