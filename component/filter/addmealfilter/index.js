import React from 'react';
import {images, theme} from '../../../constants';
import {connect} from 'react-redux';
import {Text, BottomSheet, Button, CheckBox, Icon} from 'react-native-elements';
import {
  View,
  // Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
const {COLORS, FONTS, SIZES} = theme;
// import TextComp from '../../component/text';
// import Header from '../../component/header';
import {Divider} from 'react-native-elements';
import TextComp from '../../../component/text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {get_Filter_Tags} from '../../../redux/nutrition/components/nutrition.action';

const Filter = (props, {navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [check4, setCheck4] = React.useState(false);
  const [tags, setTags] = React.useState([
    {name: 'vegetarian', id: 1},
    {name: 'Vegan', id: 2},
    {name: 'Meat', id: 3},
    {name: 'High Protein', id: 4},
    {name: 'Low Carbs', id: 5},
    {name: 'Paleo', id: 6},
    {name: 'Dunco', id: 7},
  ]);
  const [sortByfil, setSortBy] = React.useState([]);
  const [tagfil, setTagFil] = React.useState([]);
  const [flagVal, setFagVal] = React.useState(true);
  const [flagValTag, setFagValTag] = React.useState(true);
  const [currentPosition, setCurrentPosition] = React.useState(0);
  const [clearAll, setClearAll] = React.useState(false);
  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#2f60f4',
    stepStrokeWidth: 15,
    stepStrokeFinishedColor: '#2f60f4',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#2f60f4',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#2f60f4',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#2f60f4',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: '#2f60f4',
    stepIndicatorLabelFinishedColor: '#2f60f4',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#2f60f4',
  };
  const labels = ['any', 1, 2, 3, 4, 5];
  React.useEffect(() => {
    props.get_Filter_Tags();
  }, []);
  React.useEffect(() => {
    if (props.sortBy && props.sortBy.length && flagVal) {
      setSortBy(props.sortBy);
      setFagVal(false);
    } else if (props.sortBy && props.sortBy.length && flagVal && clearAll) {
      setSortBy(props.sortBy);
      setFagVal(false);
      setClearAll(false);
    }
  }, [props.sortBy, flagVal, clearAll]);
  React.useEffect(() => {
    if (props.filterTags && props.filterTags.length && flagValTag) {
      setTagFil(props.filterTags);
      setFagValTag(false);
    } else if (
      props.filterTags &&
      props.filterTags.length &&
      flagValTag &&
      clearAll
    ) {
      console.log('calling clear all');
      setTagFil(props.filterTags);
      setFagValTag(false);
      setClearAll(false);
    }
  }, [props.filterTags, flagValTag, clearAll]);

  const sortBySelection = (item, index) => {
    setFagVal(false);
    let selecedItemDict = item;
    if (selecedItemDict.checked) {
      selecedItemDict.checked = false;
    } else {
      selecedItemDict.checked = true;
    }
    let selectedParts = props.sortBy;
    selectedParts[index] = selecedItemDict;
    console.log('selectedParts', selectedParts);
    props.filterSortby(selectedParts);
    setFagVal(true);
  };
  const tagFilteringSelection = (item, index) => {
    setFagVal(false);
    let selecedItemDict = item;
    if (selecedItemDict.checked) {
      selecedItemDict.checked = false;
    } else {
      selecedItemDict.checked = true;
    }
    let selectedParts = props.filterTags;
    selectedParts[index] = selecedItemDict;
    console.log('selectedParts', selectedParts);
    props.filterByTag(selectedParts);
    setFagVal(true);
  };

  const onFilterPress = () => {
    let sort =
      props.sortBy && props.sortBy.length
        ? sortByfil
            .filter((item) => {
              if (item.checked == true && item.name) {
                return item.name;
              } else return;
            })
            .map((item) => item.name.toUpperCase())
        : [];
    let filter =
      props.filterTags && props.filterTags.length
        ? tagfil
            .filter((item) => {
              if (item.checked == true && item.name) {
                return item.name;
              }
            })
            .map((item) => item.name.toLowerCase())
        : [];
    let score = currentPosition ? currentPosition.toString() : '5';
    props.filterFunction({tags: filter, typeofmeal: sort, nutriscore: score});
    props.setOpenFilter(false);
  };

  const clearAllField = () => {
    props.recieveNutriMeal();
    props.get_Filter_Tags();
    props.filterSortby([
      {name: 'Popularity', id: 1, checked: false},
      {name: 'BreakFast', id: 2, checked: false},
      {name: 'Lunch', id: 3, checked: false},
      {name: 'Dinner', id: 4, checked: false},
    ]);
    setCurrentPosition(0);
    setClearAll(true);
    props.setOpenFilter(false);
  };

  return (
    <BottomSheet isVisible={props.isOpen}>
      <View style={{backgroundColor: 'white', height: SIZES.height / 1.5}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            paddingVertical: 20,
            borderBottomWidth: 2,
            borderBottomColor: '#f5f5f5',
          }}>
          <View>
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
          </View>
          <TouchableOpacity>
            <TextComp
              onPress={() => props.setOpenFilter(false)}
              customeStyle={{
                ...FONTS.h3,
                fontWeight: 'bold',
                color: '#1a51f0',
                paddingHorizontal: 20,

                fontSize: SIZES.width > 350 ? 25 : 12,
                // marginTop: 10,
              }}>
              X
            </TextComp>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#e2e2e2',
          }}>
          <View
            style={{
              width: '40%',
              backgroundColor: '#f5f5f5',
              height: '100%',
            }}>
            <View style={styles.leftSideTab}>
              <Text
                style={{
                  ...styles.leftSideTab_text,
                  ...{backgroundColor: index === 0 ? 'white' : '#f5f5f5'},
                }}
                onPress={() => setIndex(0)}>
                Sort by
              </Text>
            </View>
            <View style={styles.leftSideTab}>
              <Text
                style={{
                  ...styles.leftSideTab_text,
                  ...{backgroundColor: index === 1 ? 'white' : '#f5f5f5'},
                }}
                onPress={() => setIndex(1)}>
                Nutrition Score
              </Text>
            </View>
            <View style={styles.leftSideTab}>
              <Text
                style={{
                  ...styles.leftSideTab_text,
                  ...{backgroundColor: index === 2 ? 'white' : '#f5f5f5'},
                }}
                onPress={() => setIndex(2)}>
                Tags
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '60%',
              backgroundColor: 'white',
            }}>
            {index === 0 ? (
              <View style={{height: SIZES.height / 2}}>
                {props.sortBy && props.sortBy.length && sortByfil.length
                  ? sortByfil.map((item, index) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            // justifyContent: 'center',
                          }}>
                          <View style={{width: '30%'}}>
                            <CheckBox
                              center
                              checkedIcon={
                                <Icon
                                  name="radio-button-checked"
                                  type="material"
                                  color="#2f60f4"
                                  size={25}
                                  // iconStyle={{marginRight: 10}}
                                />
                              }
                              uncheckedIcon={
                                <Icon
                                  name="radio-button-unchecked"
                                  type="material"
                                  color="grey"
                                  size={25}
                                  // iconStyle={{marginRight: 10}}
                                />
                              }
                              checked={item.checked}
                              onPress={() => sortBySelection(item, index)}
                            />
                          </View>
                          <View
                            style={{
                              width: '70%',
                              paddingVertical: 15,
                            }}>
                            <Text style={{textAlign: 'left', ...FONTS.h3}}>
                              {item.name}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  : null}
              </View>
            ) : index === 1 ? (
              <View style={{height: SIZES.height / 2, alignItems: 'center'}}>
                <StepIndicator
                  customStyles={customStyles}
                  currentPosition={currentPosition}
                  onPress={(num) => setCurrentPosition(num)}
                  direction="vertical"
                  labels={labels}
                  stepCount={6}
                />
              </View>
            ) : index === 2 ? (
              <ScrollView style={{height: SIZES.height / 2}}>
                {/* <Text>{index}</Text> */}
                {props.filterTags && props.filterTags.length && tagfil.length
                  ? tagfil.map((item, index) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            // justifyContent: 'center',
                          }}>
                          <View style={{width: '30%'}}>
                            <CheckBox
                              center
                              checkedIcon={
                                <Icon
                                  name="radio-button-checked"
                                  type="material"
                                  color="#2f60f4"
                                  size={25}
                                  // iconStyle={{marginRight: 10}}
                                />
                              }
                              uncheckedIcon={
                                <Icon
                                  name="radio-button-unchecked"
                                  type="material"
                                  color="grey"
                                  size={25}
                                  // iconStyle={{marginRight: 10}}
                                />
                              }
                              checked={item.checked}
                              onPress={() => tagFilteringSelection(item, index)}
                            />
                          </View>
                          <View
                            style={{
                              width: '70%',
                              paddingVertical: 15,
                            }}>
                            <Text style={{textAlign: 'left', ...FONTS.h3}}>
                              {item.name}
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  : null}
              </ScrollView>
            ) : null}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            // paddingVertical: 20,
          }}>
          <View
            style={{
              width: '40%',
              // backgroundColor: '#f5f5f5',
              paddingVertical: 10,
            }}>
            <Text
              style={{...FONTS.h3, color: '#2f60f4', textAlign: 'center'}}
              onPress={() => clearAllField()}>
              Clear All
            </Text>
          </View>
          <View
            style={{
              width: '60%',
              paddingVertical: 10,
              paddingHorizontal: 10,
              // backgroundColor: '#f5f5f5',
            }}>
            <Button
              title="Apply"
              // type="outline"
              buttonStyle={{
                // borderColor: '#1b51f1',
                // borderWidth: 1,
                borderRadius: 10,
                backgroundColor: '#2f60f4',
              }}
              disabled={false}
              disabledStyle={{backgroundColor: '#b5b5b5', color: 'white'}}
              titleStyle={{
                color: 'white',
                paddingRight: 0,
                fontWeight: 'bold',
                fontSize: SIZES.width / 28,
              }}
              // containerStyle={{borderColor: 'white'}}

              onPress={() => {
                // props.filterFunction();
                onFilterPress();
              }}
            />
          </View>
        </View>
      </View>
    </BottomSheet>
  );
};
// Forgotpassword.navigationOptions = {
//   header: () => null,
// };

const styles = StyleSheet.create({
  leftSideTab: {
    // marginVertical: 10,
  },
  leftSideTab_text: {
    paddingVertical: 15,
    ...FONTS.h3,
    color: '#656565',
    textAlign: 'center',
  },
});
const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, {get_Filter_Tags})(Filter);
