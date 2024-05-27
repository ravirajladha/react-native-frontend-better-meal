import React, {useState, useEffect} from 'react';

import {
  View,
  CheckBox,
  StyleSheet,
  ProgressBarAndroid,
  Text,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
  Pressable,
  FlatList,
  // Button,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import FoodPreference1 from './foodpreferencessurvey';
import {BottomSheet, Icon, Card, Button} from 'react-native-elements';
// import foodPreferences from '../../FoodPreferences.json';
import {images, theme} from '../../../constants';
const {COLORS, FONTS, SIZES} = theme;
const {remuneration} = images;
import TextComp from '../../../component/text';
import {statusFPS} from '../../../redux/nutrition/components/nutrition.action';
const FoodPreference = ({
  foodpreferences,
  navigation,
  addFPSStatus,
  statusFPS,
}) => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(0);
  const [storeIndex, setStoreIndex] = useState({});
  const [isSelected, setIsSelected] = useState();
  const [isSelectedColor, setIsSelectedColor] = useState();
  const [modalFagValue, setmodalFagValue] = useState(false);

  let selectedValue = [];
  function countOn() {
    setCount(count + 1);
  }

  const close = () => {
    setIsVisible(false);
  };

  // const optionSelect = (item, index) => {
  //   console.log('OPTIONSELECT:', item, index);
  //   selectedValue.push({index: item});
  //   // if()
  //   console.log('selectedValue', selectedValue);
  // };
  useEffect(() => {
    setIsSelected(foodpreferences);
    // console.log('foodpreferences', foodpreferences);
  }, []);
  useEffect(() => {
    console.log('addFPSStatus', addFPSStatus, modalFagValue);
    if (modalFagValue == true) {
      if (addFPSStatus == 200) {
        setIsVisible1(false);
        setIsVisible(true);
        setmodalFagValue(false);
        statusFPS(null);
      } else if (addFPSStatus == 422) {
        setIsVisible1(false);
        setmodalFagValue(false);
        statusFPS(null);
        alert('You have already taken Food Prefernences Survey');
      }
    }
  });

  const ModalPopup = () => {
    return (
      // <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View
          style={{
            width: '100%',
            height: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(52, 52, 52, .5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: SIZES.width / 1.1,
              height: SIZES.height / 1.5,
              padding: 40,
            }}>
            <View>
              <ImageBackground
                source={remuneration}
                style={{
                  width: SIZES.width / 3,
                  height: SIZES.height / 4.2,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 40,
                    textAlign: 'center',
                    top: SIZES.height / 18,
                    color: '#ffef94',
                    fontWeight: 'bold',
                  }}>
                  10
                </Text>
              </ImageBackground>
            </View>
            <View style={{marginVertical: 30}}>
              <TextComp
                customeStyle={{
                  ...FONTS.h2,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#7d8182',
                }}>
                Food Preferences
              </TextComp>
              <TextComp
                customeStyle={{
                  ...FONTS.h2,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#7d8182',
                }}>
                Survey is completed
              </TextComp>
            </View>
            <View>
              <TextComp customeStyle={{textAlign: 'center', ...FONTS.h3}}>
                You have earned 10 BM Points
              </TextComp>
            </View>
            <View style={{alignItems: 'center', paddingTop: 40}}>
              <Button
                title="Home"
                buttonStyle={{
                  backgroundColor: '#1b51ef',
                  width: SIZES.width / 2.5,
                  borderRadius: 10,
                }}
                onPress={() => navigation.navigate('Nutrition')}
              />
            </View>
            <View style={{paddingVertical: 20}}>
              <TextComp
                customeStyle={{
                  textAlign: 'center',
                  ...FONTS.h3,
                  color: '#1b51ef',
                  fontWeight: 'bold',
                }}
                onPress={() => setIsVisible(false)}>
                Close
              </TextComp>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const callBack = async (value) => {
    console.log('addFPSStatus', addFPSStatus);
    setmodalFagValue(value);
  };
  
  return (
    <View style={styles.container}>
      <View>
        <Card containerStyle={{borderRadius: 20, padding: 25}}>
          <View style={styles.textView}>
            <Text
              style={{
                textAlign: 'center',
                // justifyContent: 'center',
                alignSelf: 'center',
                fontSize: SIZES.width / 28,
              }}>
              Food preferences are a primary determinent of dietary intake and
              behaviors, and they persist from early childhood into later life.
            </Text>
            <Text
              style={{
                textAlign: 'center',
                alignSelf: 'center',
                padding: 10,
                fontSize: SIZES.width / 28,
              }}>
              On the basis of the date you will provide us. It would help us to
              generate customised food recommendations and undderstand your meal
              better
            </Text>
          </View>
        </Card>
      </View>
      <View style={{marginTop: 10, marginRight: 15, marginLeft: 15}}>
        <TouchableOpacity
          onPress={() => setIsVisible1(true)}
          style={{
            padding: 15,
            backgroundColor: '#1b51f1',
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#ffffff',
              fontSize: SIZES.width / 28,
              fontWeight: 'bold',
            }}>
            Add Preferences
          </Text>
        </TouchableOpacity>
      </View>
      <ModalPopup />

      <View>
        <BottomSheet
          isVisible={isVisible1}
          containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}
          onPress={() => setIsVisible1(false)}>
          <FoodPreference1 callBack={callBack} />
        </BottomSheet>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  textView: {
    borderColor: 'blue',
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bottomSheetHeaderRight: {
    marginTop: 10,
    // marginLeft: 70,
    color: '#656565',
  },
  // content: {
  //   marginLeft: 40,
  // },
  question: {
    alignContent: 'center',
    justifyContent: 'center',
    // marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  nextButton: {
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
  },
});

const mapStateToProps = (store) => {
  // console.log(
  //   ' store.nutrition.allFoodPreferences',
  //   store.nutrition.allFoodPreferences,
  // );
  return {
    foodpreferences: store.nutrition.allFoodPreferences,
    addFPSStatus: store.nutrition.addFPSStatus,
    user: store.user.user,
  };
};

export default connect(mapStateToProps, {statusFPS})(FoodPreference);
