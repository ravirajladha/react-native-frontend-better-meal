import React, { useState, useEffect } from 'react';
import {
  Button,
  BottomSheet,
  SearchBar,
  CheckBox,
  Card,
  Avatar,
  Icon,
  ButtonGroup,
  Accessory,
  Badge,
  withBadge,
  Header,
} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import {
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ImageBackground,
  YellowBox,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { connect } from 'react-redux';
import BottomNav from '../../component/bottomnavtab';
import { images, theme } from '../../constants';
import Spinner from '../../component/spinner';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import TextComp from '../../component/text';
import AddMeal from './addMeal'
import {
  getDailyUserNutriMeal,
  getDailyUserNutritionMealByDate,
} from '../../redux/nutrition/components/nutrition.action';
import { color } from 'react-native-reanimated';
const { COLORS, FONTS, SIZES } = theme;
const MiddleIcon = ({ user, navigation, dailyUserMeals,dailyUserMeal,
  getDailyUserNutritionMealByDate,getDailyUserNutriMeal }) => {
  const base64Image = user.image;
  const [section, setSection] = useState([
    {
      tittle: 'Add Meal',
      content: 'Please add your last meal and stay updated',
    },
    {
      tittle: 'Dry Fruits',
      content: 'Learn how Fasting can Improve your overall Gut health',
    },
    {
      tittle: 'Add Weight',
      content: 'Please add your Weight into to improve your Action Score',
    },
  ]);
  const [selectedValue, setSelectedValue] = useState('java');
  const [selectedIndex, setselectedIndex] = useState(0);
  const [nutitionScores, setnutitionScores] = useState(0);
  const [gutScores, setgutScores] = useState(0);
  const [graphValue, setGraphValue] = useState([0, 0]);
  const [actioncardPer, setactioncardPer]= useState(33);
  const [selectedmonthRange, setselectedmonthRange] = useState(31);
  const [model, setModel] = useState(false);
  // const image = {uri: 'https://reactjs.org/logo-og.png'};
  const image = { uri: `data:image/jpeg;base64,${base64Image}` };
  // source={{uri: `data:image/jpeg;base64,${base64Image}`}}

  useEffect(() => {
    console.log("09",Date.now());
      getDailyUserNutriMeal(user.id, Date.now());
      getDailyUserNutritionMealByDate(user.id,Date.now());
  // console.log("00000cdailyUserMealc",dailyUserMeal)
  }, []);

  const updateIndex = (selectedIndex) => {
 //   console.log("00000cdaily",dailyUserMeal)
    console.log('selectedIndex', selectedIndex);
    setselectedIndex(selectedIndex);
    console.log("date",new Date().getDate())
    let dates= new Date().getDate();
    if(selectedIndex==0){
      if(dates>0&&dates<8){
        setselectedmonthRange(8);
      }else  if(dates>8&&dates<15){
        setselectedmonthRange(15);
      } else  if(dates>15&&dates<22){
        setselectedmonthRange(22);
      }else  if(dates>22&&dates<31){
        setselectedmonthRange(31);
      }  
    }
    else if(selectedIndex==1){
      setselectedmonthRange(32)
    }
    console.log("range--",selectedmonthRange)
  };


  const actionScore = () => {
    if(user && user.weight&& nutitionScores){
      setactioncardPer(100)
    } else if(user && user.weight||nutitionScores)
    {
      setactioncardPer(66)
    }
    return `${actioncardPer}%`;
  };
  const nutritionScore = () => {
       console.log('mealSelected------', dailyUserMeal);
       let dates= new Date().getDate();
       let nutiscore = [0];
       //console.log('mealSelected', dailyUserMeals,dates);
   
       nutiscore = dailyUserMeals.filter(
         (ele) =>     new Date(ele.date).getDate() == dates,
       );   
       if(nutiscore.length){
      var avgNutriScore1 = dailyUserMeal
       .map((item) => item.avgNutriScore)
         .reduce((prev, next) => prev + next);
      var avgNutriScore = avgNutriScore1 / dailyUserMeal.length;
       setnutitionScores(avgNutriScore)
       console.log('avgNutriScore==', avgNutriScore);       
      }
      return avgNutriScore?avgNutriScore.toFixed(2): 0;
  };
  const gutScore = () => {
    setgutScores(user.gutscore)
    return user.gutscore?user.gutscore:0;
  };
  const buttons = ['Weekly', 'Monthly'];

  useEffect(() => {
    if (dailyUserMeals) {
      filterGutGraphValue(selectedValue);
    }
  }, [dailyUserMeals,selectedIndex]);


  const filterGutGraphValue = (value) => {
    if (dailyUserMeals) {
      let months= new Date().getMonth();
      console.log('---->>>>daily',dailyUserMeal,"d", dailyUserMeals,value, months,  selectedmonthRange);
      let val = [0];
   
      val = dailyUserMeals.filter(
        (ele) =>new Date(ele.date).getMonth() == months,
      );

      if(selectedIndex==0){
      var valued  =  val.filter( (ele) =>selectedmonthRange-8 <= new Date(ele.date).getDate()&& new Date(ele.date).getDate()<=selectedmonthRange);
      }else if(selectedIndex==1){
      var valued  =  val.filter( (ele) =>new Date(ele.date).getDate()<=31);
      }
     
      // const distint=(val,ind,self)=>{
      //   return self.indexOf(val.date)===ind;
      // }
      const uniqueval=new Set();
      for(const obj of valued ){
        uniqueval.add(obj.date)
      }
      const unff= valued.map((e)=>e.date)
    //   .sort().filter(function(el,i,a) {
    //     return (i==a.indexOf(el.date));
    // });
    // var sortedd=valued.filter(distint);
      //let valued  =  val.filter( (ele) =>console.log(ele.date,selectedmonthRange,new Date(ele.date).getDate()<=selectedmonthRange));
      console.log("7777",  uniqueval,unff)
      val = valued.map((ele) => ele.avgNutriScore);
      
      console.log('SORTED ARRAYs', val.length ? val : [0]);

      setGraphValue(val.length ? val : [0]);
    }
  };
  let value = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
  ];
  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ]);
  
  console.log('width', SIZES.width);
  console.log('height', SIZES.height);
  console.log("-----,,..",user);
  const BadgedIcon = withBadge(2)(Icon);
  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient colors={['#57ccd2', '#0095fc']}>
          <Header
            statusBarProps={{
              barStyle: 'light-content',
              backgroundColor: '#57ccd2',
            }}
            backgroundColor="transparent"
            containerStyle={{
              borderBottomColor: 'transparent',
            }}
            leftComponent={
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                activeOpacity={0.9}>
                <Avatar
                  size={SIZES.width / 10}
                  title="BM"
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
            rightContainerStyle={{ right: 10 }}
            rightComponent={
              <BadgedIcon type="font-awesome" name="bell" color="white" />
            }
          />
          <Modal
            transparent={true}
            visible={model}
            onRequestClose={() => {
              setModel(false);
            }}
          >
            <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}>
            <View style={{
              width: 400,
              height: 700
            }}>
              <AddMeal navigation={navigation} />
            </View>
            </View>

          </Modal>
          <Card containerStyle={{ borderRadius: 15, marginBottom: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TextComp
                customeStyle={{
                  ...FONTS.h2,
                  fontWeight: 'bold',
                  fontSize: SIZES.width / 20,
                }}
                onPress={() => navigation.navigate('ProfileDetails')}>
                Hello, {user.name}!
              </TextComp>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  height: 20,
                  borderRadius: 9,
                  paddingVertical: 0.5,
                  elevation: 5,
                }}>
                <Badge
                  value="99+"
                  badgeStyle={{ marginRight: 20 }}
                  status="primary"
                />
                <Badge value="3" status="primary" />
              </View>
            </View>
            <View>
              <TextComp
                customeStyle={{
                  ...FONTS.h3,
                  color: '#a9a9a9',
                  // paddingBottom: 25,
                  fontSize: SIZES.width / 28,
                }}
              // onPress = {()=> navigation.navigate('EditProfile')}
              >
                You can view your BetterMeal profile level here.
              </TextComp>
            </View>
          </Card>
        </LinearGradient>
        <SafeAreaView style={styles.section2}>
          <View style={styles.section2_part1}>
            <Progress.Circle
              progress={actioncardPer/100}
              size={SIZES.width / 5.5}
              color="#ffffff"
              unfilledColor="#ff9067"
              thickness={SIZES.width / 35}
              formatText= {actionScore}
              // indeterminate={true}
              // direction="counter-clockwise"
              showsText={true}
              borderColor="#ff9067"
              textStyle={{ fontSize: SIZES.width / 28, color: 'white' }}
            />
            <TextComp
              customeStyle={{
                textAlign: 'center',
                color: 'white',
                fontSize: 10,
                paddingTop: 10,
              }}>
              Action Score
            </TextComp>
          </View>
          <View style={styles.section2_part2}>
            <Progress.Circle
              progress={nutitionScores/5}
              size={SIZES.width / 4.5}
              color="#ffffff"
              unfilledColor="#6489f4"
              thickness={SIZES.width / 30}
              formatText={nutritionScore}
              // indeterminate={true}
              // direction="counter-clockwise"
              showsText={true}
              borderColor="#6489f4"
              textStyle={{ fontSize: SIZES.width / 28, color: 'white' }}
            />
            <TextComp
              customeStyle={{
                textAlign: 'center',
                color: 'white',
                paddingTop: 10,
                fontSize: SIZES.width / 30,
              }}>
              Nutrition Scoress
            </TextComp>
          </View>
          <View style={styles.section2_part3}>
            <Progress.Circle
              progress={gutScores/5}
              size={SIZES.width / 5.5}
              color="#ffffff"
              unfilledColor="#53cfd7"
              thickness={SIZES.width / 35}
              formatText={gutScore}
              showsText={true}
              textStyle={{ fontSize: SIZES.width / 28, color: 'white' }}
              borderColor="#53cfd7"
            />
            <TextComp
              customeStyle={{
                textAlign: 'center',
                color: 'white',
                fontSize: 10,
                paddingTop: 10,
              }}>
              Gut Score
            </TextComp>
          </View>
        </SafeAreaView>
        <View style={{ backgroundColor: 'white' }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 12,
              paddingVertical: 5,
            }}>
            <View>
              <Picker
                selectedValue={selectedValue}
                style={{ width: 140 }}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item label="Nutrition" value="Nutrition" />
              </Picker>
            </View>
            <View>
              <View style={{ paddingTop: 10 }}>
                <ButtonGroup
                  onPress={updateIndex}
                  selectedIndex={selectedIndex}
                  buttons={buttons}
                  containerStyle={{
                    height: SIZES.height / 30,
                    width: SIZES.width / 3.5,
                    fontSize: 10,
                    borderRadius: 6,
                    borderColor: 'white',
                    shadowColor: '#000',
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                  }}
                  textStyle={{ fontSize: 10 }}
                  selectedButtonStyle={{
                    borderRadius: 6,
                    backgroundColor: '#2276dc',
                  }}
                  innerBorderStyle={{ color: 'white' }}
                />
              </View>
            </View>
          </View>
          <View style={{ right: 30 }}>
            <LineChart
              data={{
                labels: ['MON', 'TUE', 'WED', 'THU', 'SAT', 'SUN'],
                datasets: [{ data: graphValue }],
              }}
              width={SIZES.width} // from react-native
              height={180}
              // yAxisLabel="$"
              // yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 1) => '#3465f1',
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
                fontSize: 2,
              }}
              yLabelsOffset={-SIZES.width / 1.2}
              propsForHorizontalLabels={5}
              withInnerLines={true}
           //   yAxisInterval={1}
            />
          </View>
        </View>
        <View style={{ backgroundColor: 'white' }}>
          <SafeAreaView>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 12,
                paddingVertical: 20,
              }}>
              <View>
                <TextComp
                  customeStyle={{
                    ...FONTS.h3,
                    fontSize: SIZES.width / 28,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#5f5f5f',
                  }}>
                  My Today's Tasks
                </TextComp>
              </View>

              <TouchableOpacity onPress={()=>(navigation.navigate('ViewAll'))}>
              <View>
                <TextComp
                  customeStyle={{
                    ...FONTS.h4,
                    fontSize: 10,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#ff672e',
                  }}>
                  View All
                </TextComp>
              </View>
              </TouchableOpacity>

            </View>
            <FlatList
              data={section}
              keyExtractor={(item) => '#' + item.tittle}
              style={styles.containerFlatlist}
              renderItem={({ item, index }) => {
                const dryFruitScreen = () => {
                  navigation.navigate('DryFruitScreen');
                };

                const navigations = () => {
                  if (index === 1) {
                    dryFruitScreen();
                  }
                  else if (index === 0) {
                    console.log("add meal")
                    setModel(true);
                  }
                };

                return (
                  <TouchableOpacity
                    onPress={() => navigations()}
                    style={styles.item}>
                    <View style={{ alignItems: 'center' }}>
                      <TextComp
                        customeStyle={{
                          // ...FONTS.h4,
                          fontSize: SIZES.width / 28,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: '#ff672e',
                        }}>
                        {item.tittle}
                      </TextComp>
                      <TextComp
                        customeStyle={{
                          // ...FONTS.h4,
                          fontSize: SIZES.width / 32,
                          textAlign: 'center',
                          color: '#acacac',
                          paddingVertical: 4,
                          paddingHorizontal: 10,
                        }}>
                        {item.content}
                      </TextComp>
                    </View>
                  </TouchableOpacity>
                );
              }}
              numColumns={3}
            />
          </SafeAreaView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    // height: SIZES.height / 3.8,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    backgroundColor: 'red',
    // height: SIZES.height / 2,
  },

  section2: {
    // height: SIZES.height / 3.8,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingBottom: 6,
  },
  section2_part1: {
    backgroundColor: '#ff5d22',
    borderRadius: 20,
    width: SIZES.width / 3.5,
    height: SIZES.height > 600 ? SIZES.height / 5.5 : 130,
    alignItems: 'center',
    padding: 20,
    // marginTop: 15,
  },
  section2_part2: {
    backgroundColor: '#1b51f1',
    borderRadius: 20,
    width: SIZES.width / 3,
    // height: SIZES.height / 4.4,
    alignItems: 'center',
    padding: 20,
    // marginTop: 10,
    bottom: 10,
  },
  section2_part3: {
    backgroundColor: '#01b8c6',
    borderRadius: 20,
    width: SIZES.width / 3.5,
    height: SIZES.height > 600 ? SIZES.height / 5.5 : 130,
    alignItems: 'center',
    padding: 20,
    // marginTop: 15,
  },
  containerFlatlist: {
    flex: 1,
    // marginVertical: 20,
  },
  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    marginHorizontal: 9,
    marginVertical: 4,
    height: SIZES.height > 600 ? SIZES.height / 6 : 100,
    padding: 1, // approximate a square
    shadowColor: '#000',
    borderColor: '#ff672e',
    borderWidth: 1,
    borderRadius: 5,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

const mapStateToProps = (store) => {
  // console.log(store.healthsurvey.gutSurvey);
  return { user: store.user.user,
    dailyUserMeals: store.nutrition.dailyUserMeals,
    dailyUserMeal: store.nutrition.dailyUserMeal
  };
};
MiddleIcon.navigationOptions = {
  header: () => null,
}

export default connect(mapStateToProps, {
  getDailyUserNutriMeal,
  getDailyUserNutritionMealByDate,
})(MiddleIcon);
// export default MiddleIcon;
