import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  addCheckboxBMMenu,
  addUserFavMeal,
  get_filter_meal_data,
  filterSortby,
  filterByTag,
  recieveNutriMeal,
} from '../../../redux/nutrition/components/nutrition.action';
import {Image, SearchBar, CheckBox, Avatar} from 'react-native-elements';
import {images, theme} from '../../../constants';
const {COLORS, FONTS, SIZES} = theme;
import TextComp from '../../../component/text';
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Filter from '../../../component/filter/addmealfilter';

const BMMENUFAV = ({
  user,
  navigation,
  favMeal,
  addUserFavMeal,
  addedFavMeal,
  get_filter_meal_data,
  filterSortby,
  sortBy,
  filterTags,
  filterByTag,
  recieveNutriMeal,
}) => {
  const [value, setValue] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [text, setText] = useState('');
  const [renderlist, setRenderlist] = useState(false);
  const [value1, setvalue1] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  let filterdData;
  //Comparing two array and giving unselected value
  // if (addedFavMeal) {
  var unSelectedMeal = favMeal
    ? favMeal.filter(function (cv) {
        if (addedFavMeal != null) {
          return !addedFavMeal.find(function (e) {
            return e.id == cv.id;
          });
        } else {
          return favMeal;
        }
      })
    : '';
  // }

  // if (unSelectedMeal) {
  filterdData = text // based on text, filter data and use filtered data
    ? unSelectedMeal.filter((item) => {
        const itemData = item.foodName.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.includes(textData);
      })
    : unSelectedMeal; // on on text, u can return all data
  // }
  // console.log('filterdData', filterdData);
  // console.log('addedFavMeal', addedFavMeal);
  // console.log('favMeal', favMeal);

  const onCheck = (item, index) => {
    // console.log('symChecVal', symChecVal);
    // console.log('item========================', item);
    let selecedItemDict = item;
    if (selecedItemDict.isSelected) {
      selecedItemDict.isSelected = false;
    } else {
      selecedItemDict.isSelected = true;
    }
    let selectedParts = favMeal;
    selectedParts[index] = selecedItemDict;
    // console.log('hello', selectedParts);
  };

  const submitFav = () => {
    console.log('hi im getting called');
    let fav = favMeal.filter((item) => {
      return item.isSelected == true;
    });
    console.log('fav====', fav);
    console.log('fav====', fav.length);
    if (user.id && fav.length > 0) {
      addUserFavMeal(user.id, fav);
    } else {
      alert('Missing Parrameters');
    }
  };

  return (
    <View style={{backgroundColor: 'white'}}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: SIZES.height > 600 ? 15 : 10,
        }}>
        <TextComp
          customeStyle={{
            color: '#5a5a5a',
            paddingHorizontal: 10,
            fontSize: SIZES.width / 25,
            fontWeight: 'bold',
          }}>
          FAVOURITES
        </TextComp>
      </View>
      <View style={{paddingBottom: 10}}>
        {addedFavMeal ? (
          <FlatList
            horizontal
            data={addedFavMeal}
            renderItem={({item}) => (
              // (base64Image = item.nutrition_image),
              <View style={{marginLeft: 20}}>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${item.nutritionImage}`,
                  }}
                  // source={{uri: `data:image/jpeg;base64,${base64Image}`}}
                  style={{
                    width: SIZES.height > 600 ? SIZES.width / 4.5 : 60,
                    height: SIZES.height > 600 ? SIZES.width / 4.5 : 60,
                    borderRadius: 20,
                  }}
                />
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        ) : null}
      </View>
      <View style={{backgroundColor: '#f4f5f9', paddingHorizontal: 5}}>
        <View>
          <SearchBar
            // onPress={() => setRenderlist(true)}
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
              paddingTop: 15,
            }}
            inputContainerStyle={{
              backgroundColor: 'white',
              borderRadius: 30,
              elevation: 1,
            }}
            searchIcon={{size: SIZES.width / 18}}
          />
        </View>
        <View
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: 'white',
            marginHorizontal: 15,
            // paddingHorizontal: 20
            // paddingLeft: 20,
          }}>
          <View
            style={{
              paddingHorizontal: 0,
              paddingVertical: SIZES.height > 600 ? 15 : 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'blue',
                // paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              <View>
                <TextComp
                  customeStyle={{
                    color: '#1a51f0',
                    fontSize: SIZES.width / 30,
                    fontWeight: 'bold',
                  }}>
                  MENU
                </TextComp>
              </View>
              <TextComp
                onPress={() => {
                  // alert('gettting called');
                  setOpenFilter(true);
                }}
                customeStyle={{
                  ...FONTS.h3,
                  fontWeight: 'bold',
                  color: '#1a51f0',
                  paddingHorizontal: 20,
                  fontSize: SIZES.width > 350 ? 15 : 12,
                }}>
                FILTER
              </TextComp>
              <TouchableOpacity
                style={
                  {
                    // paddingRight: 3,
                    // backgroundColor: 'red'
                  }
                }
                onPress={() => submitFav()}>
                <TextComp
                  customeStyle={{
                    color: '#1a51f0',
                    fontSize: SIZES.width / 30,
                    fontWeight: 'bold',
                  }}>
                  SAVE
                </TextComp>
              </TouchableOpacity>
            </View>
          </View>
          {favMeal && favMeal.length && filterdData && filterdData.length ? (
            <FlatList
              style={{paddingHorizontal: 15}}
              data={filterdData}
              keyExtractor={(item) => '_' + item.id}
              renderItem={({item, index}) => {
                let base64Image = item.nutrition_image;

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
                        // source={{uri: `data:image/jpeg;base64,${base64Image}`}}
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
                      <CheckBox
                        onPress={() => {
                          onCheck(item, item.id);
                          setvalue1(value1 + 1);
                        }}
                        checked={item.isSelected}
                        containerStyle={{
                          padding: 0,
                          // margin: 0,
                          // alignSelf: 'center',
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </View>
      </View>
      <Filter
        isOpen={openFilter}
        setOpenFilter={setOpenFilter}
        filterFunction={get_filter_meal_data}
        filterSortby={filterSortby}
        sortBy={sortBy}
        filterTags={filterTags}
        filterByTag={filterByTag}
        recieveNutriMeal={recieveNutriMeal}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: SIZES.height,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
const mapStateToProps = (store) => {
  // console.log('store.nutrition.addedFavMeal', store.nutrition.favMeal);
  return {
    dailyUserMeal: store.nutrition.dailyUserMeal,
    user: store.user.user,
    favMeal: store.nutrition.favMeal,
    addedFavMeal: store.nutrition.addedFavMeal,
    sortBy: store.nutrition.sortBy,
    filterTags: store.nutrition.filterTags,
  };
};
export default connect(mapStateToProps, {
  addCheckboxBMMenu,
  addUserFavMeal,
  get_filter_meal_data,
  filterSortby,
  filterByTag,
  recieveNutriMeal,
})(BMMENUFAV);
