import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {addCheckboxBMMenu} from '../../../redux/nutrition/components/nutrition.action';
import {Image, SearchBar, CheckBox} from 'react-native-elements';
import {images, theme} from '../../../constants';
const {COLORS, FONTS, SIZES} = theme;
import TextComp from '../../../component/text';
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-navigation';
const ExploreMenu = (props) => {
  const [value, setValue] = useState('');
  const [isSelected, setSelection] = useState(false);
  let itemDetails = props.navigation.state.params.itemDetails;
  console.log("data",props.navigation.state.params.itemDetails);
  let color;
  if (parseInt(itemDetails.nutritionScore) >= 4) {
    color = '#609f13';
  } else if (
    parseInt(itemDetails.nutritionScore) >= 3 &&
    parseInt(itemDetails.nutritionScore) < 4
  ) {
    color = '#f7c846';
  } else if (parseInt(itemDetails.nutritionScore) < 3) {
    color = '#fd7d21';
  }
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View>
        <ImageBackground
          source={{uri: `data:image/jpeg;base64,${itemDetails.nutritionImage}`}}
          style={{
            width: '100%',
            height: SIZES.width > 350 ? SIZES.height / 1.9 : SIZES.height / 2.5,
            // width: SIZES.width / 4.5,
            //             height: SIZES.width / 4.5,
            // borderRadius: 20,1.9
          }}>
          <View
            style={{
              paddingHorizontal: 30,
              flex: 1,
              justifyContent: 'flex-end',
              bottom: SIZES.width > 350 ? SIZES.height / 10 : SIZES.height / 10,
            }}>
            <View>
              <TextComp customeStyle={styles.section1_text}>
                {itemDetails.foodName}
              </TextComp>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: SIZES.width > 350 ? 5 : 2,
                // paddingHorizontal: 10,
              }}>
              <View style={{paddingVertical: 2}}>
              <View style={{ flexDirection:'row', flexWrap:'wrap'  }}> 
                <Progress.Bar
                  progress={
                    (parseFloat(itemDetails.nutritionScore) +
                      parseFloat(itemDetails.nutritionScore)) /
                    10
                  }
                  showsText={true}
                  width={
                    SIZES.width > 350 ? SIZES.width / 10 : SIZES.width / 15
                  }
                  height={
                    SIZES.width > 350 ? SIZES.height / 60 : SIZES.height / 80
                  }
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
                right:-30,bottom:-5}}>{itemDetails.nutritionScore}</Text>
               
                                            </View>
              </View>
              <TextComp
                customeStyle={{
                  color: 'white',
                  paddingHorizontal: 33,
                  fontSize: SIZES.width > 350 ? 15 : 12,
                  // fontWeight: 'bold',
                }}>
                Nutrition Score
              </TextComp>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.section2}>
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            bottom: SIZES.height > 700 ? SIZES.height / 3.6 : SIZES.height / 3,
            // backgroundColor: 'blue',3.2
          }}>
          <MaterialCommunityIcons
            name="heart"
            size={SIZES.width > 350 ? 50 : 40}
            color="red"
          />
        </View>
        <TextComp customeStyle={styles.section2_text}>
          {itemDetails.serving}{' '}
          <TextComp
            customeStyle={{
              color: '#b0b0b0',
              fontSize: SIZES.width > 400 ? 30 : 20,
            }}>
            {itemDetails.calories}
          </TextComp>
        </TextComp>
        <TextComp customeStyle={styles.section2_text1}>
          Micronutrients Info
        </TextComp>
        <View style={styles.section3}>
          <View>
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={SIZES.width > 400 ? 30 : 20}
              color="#44a6b7"
            />
          </View>
          <TextComp customeStyle={styles.section3_text}>
            {' '}
            Protein {itemDetails.nutrition.proteins}%
          </TextComp>
        </View>
        <View style={styles.section3}>
          <View>
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={SIZES.width > 400 ? 30 : 20}
              color="#f0ab40"
            />
          </View>
          <TextComp customeStyle={styles.section3_text}>
            {' '}
            Carbohydrate {itemDetails.nutrition.carbohydrates}%
          </TextComp>
        </View>
        <View style={styles.section3}>
          <View>
            <MaterialCommunityIcons
              name="checkbox-blank-circle"
              size={SIZES.width > 400 ? 30 : 20}
              color="#b3337c"
            />
          </View>
          <TextComp customeStyle={styles.section3_text}>
            {' '}
            Fat {itemDetails.nutrition.fatTotalLipid}%
          </TextComp>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  section3_text: {
    ...FONTS.h3,
    paddingVertical: SIZES.width > 400 ? 5 : 0,
    fontSize: SIZES.width > 400 ? 20 : 15,
  },
  section3: {
    flexDirection: 'row',
    paddingTop: SIZES.width > 400 ? 7 : 7,
  },
  section2_text: {
    ...FONTS.h2,
    fontWeight: 'bold',
    color: '#b0b0b0',
    fontSize: SIZES.width > 400 ? 30 : 20,
    // paddingTop: 20,
  },
  section2_text1: {
    ...FONTS.h2,
    fontWeight: 'bold',
    color: '#b0b0b0',
    paddingVertical: 10,
    fontSize: SIZES.width > 400 ? 25 : 18,
  },
  section2: {
    paddingHorizontal: SIZES.width > 350 ? 20 : 10,
    paddingVertical: SIZES.width > 350 ? 30 : 15,
    // elevation: 1,
    // borderRadiusLeft: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: SIZES.height / 20,
    backgroundColor: 'white',
  },
  section1_text: {
    ...FONTS.h1,
    fontWeight: 'bold',
    color: 'white',
    fontSize: SIZES.width > 350 ? 35 : 25,
  },
});
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
export default connect(mapStateToProps, {addCheckboxBMMenu})(ExploreMenu);
