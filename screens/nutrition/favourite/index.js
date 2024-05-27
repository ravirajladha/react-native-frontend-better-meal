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
  addUserFavMeal,
} from '../../../redux/nutrition/components/nutrition.action';
import {Image, SearchBar, CheckBox} from 'react-native-elements';
import {images, theme} from '../../../constants';
const {COLORS, FONTS, SIZES} = theme;
import TextComp from '../../../component/text';
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Favourite = ({addedFavMeal, navigation}) => {
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

  return (
    <View
      style={{
        backgroundColor: 'white',
      }}>
      <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <TextComp
          customeStyle={{
            color: '#5d5d5d',
            fontSize: SIZES.width / 28,
            fontWeight: 'bold',
          }}>
          MY FAVOURITES
        </TextComp>
      </View>
      <FlatList
        style={{height: '100%', paddingHorizontal: 20}}
        data={addedFavMeal}
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
            <TouchableOpacity
              onPress={() =>
                // console.log("5", item.nutritionScore)
                navigation.navigate('ExploreMenu', {
                  itemDetails: item,
                })
              }
              activeOpacity={1}
              style={{
                flexDirection: 'row',
                width: '100%',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                backgroundColor: 'white',
                marginBottom: 20,
              }}>
              <TouchableOpacity
                style={{
                  width: '30%',
                  // backgroundColor: 'red'
                }}>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${item.nutritionImage}`,
                  }}
                  style={{
                    width: SIZES.height > 600 ? SIZES.width / 4.5 : 55,
                    height: SIZES.height > 600 ? SIZES.width / 4.5 : 55,
                    borderRadius: SIZES.height > 600 ? 20 : 15,
                  }}
                />
              </TouchableOpacity>
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
                      fontSize: SIZES.width / 28,
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
                      fontSize: SIZES.width / 28,
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
                      fontSize: SIZES.width / 28,
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
                <MaterialCommunityIcons
                  name="heart"
                  size={SIZES.width / 15}
                  color="red"
                />
              </View>
            </TouchableOpacity>
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
const mapStateToProps = (store) => {
  //   console.log('store.nutrition.nutritionMeal', store.nutrition.addMealLoading);
  return {
    dailyUserMeal: store.nutrition.dailyUserMeal,
    user: store.user.user,
    favMeal: store.nutrition.favMeal,
    addedFavMeal: store.nutrition.addedFavMeal,
  };
};

const styles = StyleSheet.create({});
export default connect(mapStateToProps, {})(Favourite);
