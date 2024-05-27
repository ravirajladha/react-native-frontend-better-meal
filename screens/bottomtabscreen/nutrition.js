import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TextComp from '../../component/text';
import * as Progress from 'react-native-progress';
import {
  recieveAllFP,
  recieveNutriMeal,
  getDailyUserNutriMeal,
  getDailyUserNutritionMealByDate,
  recieveAddedFavMEal,
  getSuggestedMeals,
} from '../../redux/nutrition/components/nutrition.action';
import { LineChart } from 'react-native-chart-kit';
import { Button, Avatar, Card, Image, Header, ButtonGroup } from 'react-native-elements';
import {
  Alert,
  StyleSheet,
  View,
  SafeAreaView,
  YellowBox,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { images, theme } from '../../constants';
import { Picker } from '@react-native-picker/picker';
import MealPlanner from '../nutrition/mealplanner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { COLORS, FONTS, SIZES } = theme;
const { foodprefences, Dishes } = images;
import Dishes1 from '../../assets/images/dishes.svg';
import AddMeal from '../nutrition/addmeal';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import NutritionMenu from '../nutrition/nutritionmenu';
import {
  recieveHS,
  getSymtomsById,
  getGutSurveyQuestion,
  getExpiredDays,
  getGUtGraphValue,
} from '../../redux/healthsurvey/components/healthsurvey.action';

const Nutrition = ({
  navigation,
  recieveAllFP,
  recieveNutriMeal,
  user,
  getDailyUserNutriMeal,
  getDailyUserNutritionMealByDate,
  recieveAddedFavMEal,
  route,
  dailyUserMeals,
  dailyUserMeal,
  getSuggestedMeals,
  getGUtGraphValue,
  gutGraphValue,
}) => {
  // const [section, setSection] = useState('uk');
  const [isVisible, setIsVisible] = useState(false);
  const [addMealVisible, setAddMealVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(new Date().getFullYear());
  const [renderlist, setRenderlist] = useState(moment());
  const [dateSelected, setDateSelected] = useState(new Date());
  const [dropDownSelected, setDropDownSelected] = useState(null);

  const [graphValue, setGraphValue] = useState([0, 0]);
  const [flagValue, setflagValue] = useState(false);
  const [nutitionScores, setnutitionScores] = useState(0);
  const [selectedIndex, setselectedIndex] = useState(0);
  const [selectedmonthRange, setselectedmonthRange] = useState(8);
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var month = (new Date()).getMonth()
  var detmonth = []
  for (var months = 0; months <= month; months++) {
    detmonth.push(monthNames[months])
  }

  const updateIndex = (selectedIndex) => {
    console.log('selectedIndex', selectedIndex);
    setselectedIndex(selectedIndex);
    if (selectedIndex == 0) {
      setselectedmonthRange(8);
    }
    else if (selectedIndex == 1) {
      setselectedmonthRange(15)
    }
    else if (selectedIndex == 2) {
      setselectedmonthRange(22)
    }
    else if (selectedIndex == 3) {
      setselectedmonthRange(31)
    }
    console.log("hfiagvf", selectedmonthRange)
  };

  const base64Image = user.image;

  const hi = (value) => {
    return '01';
  };
  useEffect(() => {
    console.log('CAlling Nutrition');
    recieveAllFP();
    recieveNutriMeal();
    //getDailyUserNutriMeal(user.id, dateSelected);
    getDailyUserNutritionMealByDate(user.id, dateSelected)
    // getDailyUserNutriMealByDate(user.id, dateSelected);
    recieveAddedFavMEal(user.id);
    getSuggestedMeals(user.id);
    getGUtGraphValue(user.id);
    if (dailyUserMeals) {
      setflagValue(true);
    }
  }, []);

  console.log("selectedValue", selectedValue);
  const buttons = ["Week 1", "Week 2", "Week 3", "Week 4"];
  useEffect(() => {
    if (dailyUserMeals) {
      filterGutGraphValue(selectedValue);
    }
  }, [dailyUserMeals, selectedIndex]);

  const filterGutGraphValue = (value) => {
    if (dailyUserMeals) {
      console.log('---->>>>dailyUserMeal ask', dailyUserMeal, value, selectedmonthRange);
      let val = [0];
      val = dailyUserMeals.filter(
        (ele) => new Date(ele.date).getMonth() == value,

        //   console.log("dataaddaada",ele.date,   new Date(ele.date).getMonth(),value)
        // }
        //  new Date(ele.date).getFullYear() === value,
        // console.log("dataaddaada",ele)

        //    {
        //   console.log('Date:', new Date(ele.gutscoreupdatedate).getFullYear());

        //   if (new Date(ele.gutscoreupdatedate).getFullYear() === value) {
        //     return ele.gutscore;
        //   }
        // }
      );

      let valued = val.filter((ele) => selectedmonthRange - 8 <= new Date(ele.date).getDate() && new Date(ele.date).getDate() <= selectedmonthRange);
      //let valued  =  val.filter( (ele) =>console.log(ele.date,selectedmonthRange,new Date(ele.date).getDate()<=selectedmonthRange));
      console.log("dd", valued)
      val = valued.map((ele) => ele.avgNutriScore);

      console.log('SORTED ARRAY2', val.length ? val : [0]);

      setGraphValue(val.length ? val : [0]);
    }
  };

  useEffect(() => {
    let addMealVisib = navigation.getParam('popup');
    if (addMealVisib) {
      setAddMealVisible(addMealVisib);
      navigation.setParams({ popup: false });
    }
  });
  const nutitionScore = () => {
    let dates = new Date().getDate();
    let nutiscore = [0];
    console.log('mealSelected------innuti', dailyUserMeal);
    nutiscore = dailyUserMeals.filter(
      (ele) => new Date(ele.date).getDate() == dates,
    );
    if(dailyUserMeals&&dailyUserMeals.length){
    let len=dailyUserMeals.length
    var lastscore=dailyUserMeals[len-1]
    }
    if (nutiscore.length) {
      var avgNutriScore1 = dailyUserMeal
        .map((item) => item.avgNutriScore)
        .reduce((prev, next) => prev + next);
      var avgNutriScore = avgNutriScore1 / dailyUserMeal.length;
      setnutitionScores(avgNutriScore)
      console.log('avgNutriScore==in nutirtion s', avgNutriScore, lastscore.avgNutriScore);
    }
    return avgNutriScore ? avgNutriScore.toFixed(2) : lastscore.avgNutriScore?lastscore.avgNutriScore:0;
    // return '7.5';
  };
  const setVisibity = (value) => {
    setIsVisible(value);
  };
  const addMealVisibleScreen = (value) => {
    setAddMealVisible(value);
  };
  const settingDate = (value) => {
    setDateSelected(value);
  };
  const dropDownSelecteds = (value) => {
    setDropDownSelected(value);
  };
  console.log('dropDownSelected', dateSelected, user);
  // console.log('NutritionScreen', navigation.getParam('popup'));
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <ScrollView>
        <Header
          statusBarProps={{
            barStyle: 'light-content',
            backgroundColor: '#1b51f1',
          }}
          backgroundColor="#1b51f1"
          containerStyle={{
            borderBottomColor: 'transparent',
          }}
          leftComponent={
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              activeOpacity={0.9}>
              <Avatar
                size={SIZES.width / 10}
                title="BM Menu"
                source={{ uri: `data:image/jpeg;base64,${base64Image}` }}
                rounded>
                <Avatar.Accessory
                  name="bars"
                  type="font-awesome-5"
                  size={15}
                  style={{ backgroundColor: 'transparent' }}
                />
              </Avatar>
            </TouchableOpacity>
          }
          rightContainerStyle={{ right: 2 }}
          rightComponent={
            <Button
              icon={
                <MaterialIcons
                  name="apps"
                  size={25}
                  style={{ right: 5 }}
                  color="white"
                />
              }
              title="BM Menu"
              type="outline"
              buttonStyle={{
                color: 'white',
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 15,
                width: SIZES.width / 4,
              }}
              titleStyle={{
                color: 'white',
                paddingRight: 0,
                fontSize: SIZES.width / 30,
                right: 4,
                marginBottom: 2,
              }}
              containerStyle={{ borderColor: 'white' }}
              // onPress={() => setModalVisible(true)}
              onPress={() => navigation.navigate('BMMENUFAV')}
            />
          }
        />
        <Card containerStyle={{ borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <TextComp
                customeStyle={{
                  ...FONTS.h2,
                  // alignSelf: 'center',
                  fontSize: SIZES.width / 20,
                  // fontSize: 19,
                  color: '#525252',
                  fontWeight: 'bold',
                  width: SIZES.width / 2,
                }}>
                Let's talk about your nutrition.
              </TextComp>
              <TextComp
                customeStyle={{
                  ...FONTS.h3,
                  // alignSelf: 'center',
                  color: '#aeaeae',
                  fontSize: SIZES.width / 30,
                  width: SIZES.width / 1.8,
                }}>
                Here is your Nutrition Score based on the data you have shared.
              </TextComp>
            </View>
            <View>
              <Progress.Circle
                progress={nutitionScores / 5}
                size={SIZES.width / 4.5}
                color="#8ba8f8"
                unfilledColor="#edf2f8"
                thickness={SIZES.width / 35}
                formatText={nutitionScore}
                // indeterminate={true}
                // direction="counter-clockwise"
                showsText={true}
                borderColor="white"
                // textStyle={{fontSize: SIZES.width / 28, color: 'white'}}
                textStyle={{
                  fontSize: SIZES.width / 20,
                  color: '#1b51f1',
                  fontWeight: 'bold',
                }}
              />
            </View>
          </View>
        </Card>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <TextComp
              customeStyle={{
                ...FONTS.h2,
                color: '#525252',
                paddingHorizontal: 20,
                paddingTop: 10,
                fontSize: SIZES.width / 20,
              }}>
              My Progress
            </TextComp>
          </View>
          <View>
            <Picker
              selectedValue={selectedValue}
              style={{ width: 100 }}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
                filterGutGraphValue(itemValue);
              }}>
              {detmonth.map(function (month, item) {
                console.log(month, item)
                return <Picker.Item
                  label={month}
                  value={item}
                />
              })}
              {/* <Picker.Item
                label={(new Date().getMonth() - 1).toString()}
                value={new Date().getMonth() - 1}
              />
              <Picker.Item
                label={(new Date().getMonth() - 2).toString()}
                value={new Date().getMonth() - 2}
              />
              <Picker.Item
                label={(new Date().getMonth() - 3).toString()}
                value={new Date().getMonth() - 3}
              /> */}
            </Picker>
          </View>
        </View>

        <View style={{ paddingTop: 10, paddingHorizontal: 15 }}>
          <ButtonGroup
            onPress={updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{
              height: SIZES.height / 31,
              width: SIZES.width / 1.8,
              fontSize: 10,
              borderRadius: 10,
              borderColor: 'white',
              shadowColor: '#000',
              shadowOpacity: 0.8,
              shadowRadius: 4,
              elevation: 0,
            }}
            textStyle={{ fontSize: 10 }}
            selectedButtonStyle={{
              borderRadius: 6,
              backgroundColor: '#2276dc',
            }}
            innerBorderStyle={{ color: 'white' }}
          />
        </View>

        <View style={styles.sectionLineChart}>
          <View>
            <LineChart
              data={{
                // labels: ['MON', 'TUE', 'WED', 'THU', 'SAT', 'SUN'],
                datasets: [
                  {
                    data: graphValue,
                  },
                ],
              }}
              width={SIZES.width} // from react-native
              height={SIZES.height > 600 ? 180 : 100}
              // yAxisLabel="$"
              // yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => '#1b51f1',
                labelColor: (opacity = 1) => 'black',
                style: {
                  borderRadius: 20,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#e0f2fd',
                },
                propsForBackgroundLines: {
                  strokeWidth: 1,
                  stroke: '#efefef',
                  strokeDasharray: '0',
                },
              }}
              bezier
              style={{
                right: SIZES.height > 600 ? SIZES.width / 17 : SIZES.width / 10,
              }}
              yLabelsOffset={
                SIZES.height > 600 ? -SIZES.width / 1.2 : -SIZES.width / 1.24
              }
              withInnerLines={true}
            // yAxisInterval={1}
            />
          </View>
        </View>
        <View style={styles.section3Container}>
          <View style={styles.section3ContainerPart1}>
            <TouchableOpacity
              style={styles.section3}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Favourite')}>
              <Dishes1 style={styles.section3_image1} />
              <TextComp customeStyle={styles.section3_text}>
                MY FAVOURITE DISHES
              </TextComp>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.section3}
              onPress={() => navigation.navigate('FoodPreferences')}>
              <Image source={foodprefences} style={styles.section3_image} />
              <TextComp customeStyle={styles.section3_text}>
                FOOD PREFERENCES
              </TextComp>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.view4}
            // onPress={() => setIsVisible(true)
            onPress={() => navigation.navigate('MealPlannerScreen')}
            activeOpacity={1}>
            <View style={styles.view5}></View>
            <View style={styles.view6}>
              <TextComp customeStyle={styles.section3_text1}>
                {/* ...FONTS.h1,
                  alignSelf: 'center',
                  color: COLORS.white,
                  fontWeight: 'bold', */}
                {/* }} */}
                MEAL PLANNER
              </TextComp>
            </View>
            <View style={styles.view7}>
              <CalendarStrip
                scrollable
                calendarHeaderStyle={{ color: 'white' }}
                dateNumberStyle={{
                  color: 'white',
                  fontSize: 15,
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
                  console.log(date);
                  console.log(moment());
                  setRenderlist(date);
                }}
                iconContainer={{ flex: 0.1 }}
                showMonth={false}
                customDatesStyles={[
                  {
                    startDate: renderlist,
                    dateNameStyle: { color: 'blue', fontSize: SIZES.width / 30 },
                    dateNumberStyle: {
                      color: 'blue',
                      fontSize: SIZES.width / 30,
                    },
                    dateContainerStyle: { backgroundColor: '#a4baf9' },
                  },
                ]}
              />
            </View>
          </TouchableOpacity>
          <MealPlanner
            setVisibity={setVisibity}
            isVisible={isVisible}
            addMealVisibleScreen={addMealVisibleScreen}
            settingDate={settingDate}
            dropDownSelected={dropDownSelecteds}
          // callBackfn2={callBackfn2}
          />
          <AddMeal
            addMealVisible={addMealVisible}
            addMealVisibleScreen={addMealVisibleScreen}
            setVisibity={setVisibity}
            dateSelected={dateSelected}
            dropDownSelected={dropDownSelected}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  section1: {
    backgroundColor: '#1b51f1',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // width: SIZES.width / 4,
  },
  section2: {
    flex: 1,
    flexDirection: 'row',
    shadowColor: '#000',
    justifyContent: 'space-between',
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth: 5,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    // shadowRadius: 2,
    // elevation: 0.1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  section3: {
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth: 5,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    // padding: 20,
    paddingVertical: 10,
    // paddingHorizontal: 40,
    alignItems: 'center',
    width: SIZES.width / 2.2,
  },
  section3_text: {
    ...FONTS.h3,
    // alignSelf: 'center',
    fontWeight: '500',
    color: '#1b51f1',
    marginTop: 10,
    fontSize: SIZES.width / 30,
  },
  section3_image: {
    width: SIZES.width / 8,
    height: SIZES.height / 14,
  },
  section3_image1: {
    width: SIZES.width / 4,
    height: SIZES.height / 13,
  },
  view3: {
    backgroundColor: 'white',
    width: SIZES.width / 10,
    height: SIZES.height / 200,
    alignSelf: 'center',
  },
  view4: {
    backgroundColor: '#1b51f1',
    paddingTop: 20,
    paddingBottom: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  view5: {
    backgroundColor: 'white',
    width: SIZES.width / 10,
    height: SIZES.height / 200,
    alignSelf: 'center',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    padding: 100,
  },
  text: {
    color: '#3f2949',
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
    height: SIZES.height / 6,
    padding: 1, // approximate a square
    shadowColor: '#000',
    borderColor: '#ff672e',
    borderWidth: 1,
    borderRadius: 5,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  section1_part1: {
    paddingHorizontal: 0,
  },
  section2_container: {
    backgroundColor: 'white',
    padding: 10,
  },
  section1_part2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  sectionLineChart: {
    backgroundColor: 'white',
  },
  section3Container: {
    padding: 10,
    backgroundColor: 'white',
  },
  section3ContainerPart1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view6: {
    paddingTop: 10,
  },
  view7: {
    paddingVertical: 10,
  },
  section2_text1: {
    ...FONTS.h2,
    // alignSelf: 'center',
    // fontSize: 19,
    color: '#525252',
    // fontWeight: 'bold',
    // paddingHorizontal: 20,
    width: SIZES.width / 2,
  },
  section2_text2: {
    ...FONTS.h3,
    // alignSelf: 'center',
    fontSize: 15,
    color: '#aeaeae',
    width: SIZES.width / 1.6,
  },
  section2_text3: {
    ...FONTS.h2,
    // alignSelf: 'center',
    // fontSize: 19,
    color: '#525252',
    paddingHorizontal: 20,
    paddingTop: 10,
    // fontWeight: 'bold',
  },
  section3_text1: {
    ...FONTS.h1,
    alignSelf: 'center',
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.width / 12,
  },
});

const mapStateToProps = (store) => {
  // console.log(store.healthsurvey.getGutGraph);
  return {
    user: store.user.user,
    gutGraphValue: store.healthsurvey.getGutGraph,
    dailyUserMeals: store.nutrition.dailyUserMeals,
    dailyUserMeal: store.nutrition.dailyUserMeal,
  };
};
Nutrition.navigationOptions = {
  header: () => null,
};

export default connect(mapStateToProps, {
  recieveAllFP,
  recieveNutriMeal,
  getDailyUserNutriMeal,
  recieveAddedFavMEal,
  getDailyUserNutritionMealByDate,
  getSuggestedMeals,
  getGUtGraphValue,
})(Nutrition);
