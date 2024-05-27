import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, Image, Header} from 'react-native-elements';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images, theme} from '../../../constants';
import {
  recieveHS,
  getSymtomsById,
  updateGutScore,
  getExpiredDays,
} from '../../../redux/healthsurvey/components/healthsurvey.action';
import Indicator from '../../../component/stepprogressbar';
import TextComp from '../../../component/text';
import Loading from '../../../component/spinner';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {COLORS, FONTS, SIZES} = theme;
const {allergy,
   sneeze, 
   stomach1, 
   stomach2,  
   acidbloackers, 
   yoghurt,
    Allergies,
  veggies,
  antibiotics,
  birthcontrol,
  cold,
  itch,
  sugar,
  heartburn,
  ibs,
  nauseaoften,
  nausea,
  nsaids,
  rash,
  stimulant,
  stoolfoul,
  stoolmucus,
  undigested,
  tongue,
  sauerkraut} = images;

const GutSurvey = ({navigation, gutSurvey, updateGutScore, user}) => {
  const [statevalue, setStatevalue] = useState();
  const [gutSurveyQuestion, setGutSurveyQuestion] = useState([]);
  const [initialCount, setInitialCount] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [visible, setVisible] = React.useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(6);
  let gutCount = {};
  let total = 0;
  useEffect(() => {
    // console.log('gutSurvey', gutSurvey);
    setGutSurveyQuestion(gutSurvey);
    // setVisible(true);
  }, []);
  useEffect(() => {
    setVisible(true);
  }, [gutSurveyQuestion]);

  const changingValue = (leftOpenValue, id) => {
    if (leftOpenValue > 50) {
      gutCount[id] = 1;
    } else if (leftOpenValue < 50) {
      if (gutCount[id]) {
        delete gutCount[id];
      }
    }
    // console.log('results', gutCount);
    total = Object.keys(gutCount).length;
    // console.log('results', total);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gutSurveyQuestion.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  console.log(currentPage, totalCount, '[:totalCount]');
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    // console.log('total', total);
    // setInitialCount(total);
    setTotalCount(totalCount + total);
    // console.log('totalCount', totalCount);
  };
  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
  };
  const thirdIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    // horizontal line
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 0,
    stepStrokeCurrentColor: 'white',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#bfbfbf',
    stepStrokeUnFinishedColor: 'white',
    separatorFinishedColor: '#bfbfbf',
    separatorUnFinishedColor: '#9fe4e9',
    stepIndicatorFinishedColor: '#bfbfbf',
    // innercircle
    stepIndicatorUnFinishedColor: 'white',
    stepIndicatorCurrentColor: 'white',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#7eaec4',
  };
  useEffect(() => {
    if (initialCount) {
      console.log('the age has changed');
      // alert(totalCount);
      updateGutScore(user.id, totalCount);
      navigation.navigate('GutHealthScreen');
      // getExpiredDays(user.id);
      setInitialCount(false);
    }
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          statusBarProps={{
            barStyle: 'light-content',
            backgroundColor: '#01b9c6',
          }}
          backgroundColor="#01b9c6"
          containerStyle={{
            borderBottomColor: 'transparent',
          }}
          leftComponent={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                // raised
                size={25}
                name="chevron-left"
                type="font-awesome"
                color="white"
              />
            </TouchableOpacity>
          }
          centerComponent={
            <View>
              <TextComp
                customeStyle={{
                  ...FONTS.h2,
                  textAlign: 'center',
                  color: 'white',
                  // fontWeight: 'bold',
                }}
                onPress={() => setVisible(true)}>
                STAGE
              </TextComp>

              <Indicator
                thirdIndicatorStyles={thirdIndicatorStyles}
                currentPage={currentPage}
              />
            </View>
          }
        />
        {/* <ModalPopup visible={visible} callBack={callBack} /> */}
        <View>
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={visible}
            // onDismiss={hideModal}
          >
            <View
              style={{
                backgroundColor: 'rgba(52, 52, 52, .93)',
                height: '100%',
                // flex: 1,
                // flexDirection: 'column',
                // justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center', marginTop: SIZES.height / 3}}>
                <Icon
                  // raised
                  size={40}
                  name="gesture-swipe-right"
                  color="white"
                  onPress={() => navigation.navigate('GutHealth')}
                />
              </View>
              <View style={{marginTop: SIZES.height / 15}}>
                <TextComp
                  customeStyle={{
                    ...FONTS.h2,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  SLIDE RIGHT TO YES
                </TextComp>
                <View
                  style={{
                    alignSelf: 'center',
                    backgroundColor: '#07a8b4',
                    width: SIZES.width / 2,
                    height: SIZES.height / 200,
                  }}
                />
              </View>
              <View style={{marginTop: SIZES.height / 3}}>
                <TextComp
                  customeStyle={{
                    ...FONTS.h2,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  onPress={() => setVisible(false)}>
                  SKIP
                </TextComp>
              </View>
            </View>
          </Modal>
        </View>
        <View>
          <FlatList
            data={currentItems}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => {
              let imageName = stomach1;
              if (gutSurveyQuestion[0].id == item.id) {
                imageName = stomach1
              } else if (gutSurveyQuestion[1].id == item.id) {
                imageName = stomach2;
              } else if (gutSurveyQuestion[2].id == item.id) {
                imageName = sneeze;
              } else if (gutSurveyQuestion[3].id == item.id) {
                imageName = allergy;
              }
              else if (gutSurveyQuestion[4].id == item.id) {
                imageName = stoolfoul;
              }
              else if (gutSurveyQuestion[5].id == item.id) {
                imageName = Allergies;
              }
              else if (gutSurveyQuestion[6].id == item.id) {
                imageName = heartburn;
              }
              else if (gutSurveyQuestion[7].id == item.id) {
                imageName = ibs;
              }
              else if (gutSurveyQuestion[8].id == item.id) {
                imageName = stimulant;
              }
              else if (gutSurveyQuestion[9].id == item.id) {
                imageName = acidbloackers;
               }
              else if (gutSurveyQuestion[10].id == item.id) {
                 imageName = nausea;
              }else if (gutSurveyQuestion[11].id == item.id) {
                imageName = nauseaoften;
              }else if (gutSurveyQuestion[12].id == item.id) {
                imageName = rash;
              }else if (gutSurveyQuestion[13].id == item.id) {
                imageName = stoolfoul;
              }
              else if (gutSurveyQuestion[14].id == item.id) {
                imageName = undigested;
              }
              else if (gutSurveyQuestion[15].id == item.id) {
                imageName = stoolmucus;
              }
              else if (gutSurveyQuestion[16].id == item.id) {
                imageName = sugar;
              }
              else if (gutSurveyQuestion[17].id == item.id) {
                imageName = itch;
              }
              else if (gutSurveyQuestion[18].id == item.id) {
                imageName = tongue;
              }
              else if (gutSurveyQuestion[19].id == item.id) {
                imageName = nsaids;
              }
              else if (gutSurveyQuestion[20].id == item.id) {
                imageName = antibiotics;
              }
              else if (gutSurveyQuestion[21].id == item.id) {
                imageName = birthcontrol;
              }
              else if (gutSurveyQuestion[22].id == item.id) {
                imageName = cold;
              }
              else if (gutSurveyQuestion[23].id == item.id) {
                imageName = veggies;
              }
              else if (gutSurveyQuestion[24].id == item.id) {
                imageName = sauerkraut;
              }
              else if (gutSurveyQuestion[25].id == item.id) {
                imageName = Allergies;
              }
              else if (gutSurveyQuestion[26].id == item.id) {
                imageName = ibs;
              }
              else if (gutSurveyQuestion[27].id == item.id) {
                imageName = yoghurt;
              }
              return (
                <View style={styles.container}>
                  <View style={styles.standalone}>
                    <SwipeRow
                      leftOpenValue={75}
                      rightOpenValue={-75}
                      stopLeftSwipe={75}
                      stopRightSwipe={-75}
                      closeOnRowPress={false}
                      // preview={true}
                      // previewDuration={1000}
                      // previewOpenValue={75}
                      // previewOpenValue={-75}
                      // leftActivationValue={75}
                      // onLeftAction={() => console.log('left')}
                      // onRightAction={() => console.log('Right')}
                      // leftActivationValue={90}
                      // rightActivationValue={-90}
                      // onLeftAction={() => console.log('Left')}
                      // onRowDidClose={() => console.log('Closed')}
                      // onLeftActionStatusChange={() => console.log('left')}
                      // disableLeftSwipe={true}
                      onRowOpen={(leftOpenValue) => {
                        changingValue(leftOpenValue, item.id);
                      }}
                      // onRightAction={() => console.log('Right')}
                    >
                      <View style={styles.standaloneRowBack}>
                        <View
                          style={{
                            backgroundColor: '#01b8c6',
                            height: '100%',
                            width: SIZES.width / 2,
                          }}>
                          <Text style={styles.backTextWhite1}>YES</Text>
                        </View>
                        <View
                          style={{
                            backgroundColor: '#8BC645',
                            height: '100%',
                            width: SIZES.width / 2,
                          }}>
                          <Text style={styles.backTextWhite2}>NO</Text>
                        </View>
                      </View>
                      <View style={styles.standaloneRowFront}>
                        <Image
                          source={imageName}
                          style={{
                            width: SIZES.width / 8,
                            height: SIZES.height / 16,
                          }}
                        />
                        <TextComp
                          customeStyle={{
                            // ...FONTS.h2,
                            textAlign: 'center',
                            color: '#6d6d6d',
                            fontWeight: 'bold',
                            fontSize: SIZES.width / 25,
                          }}>
                        {item.question}
                        </TextComp>
                      </View>
                    </SwipeRow>
                  </View>
                </View>
              );
            }}
         //  keyExtractor={(item) => item.id}
          />
          {/* ) : (
            <Loading />
          )} */}
        </View>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 20,
            paddingBottom: 40,
          }}>
          {currentPage == 5 ? (
            <Button
              onPress={async () => {
                setTotalCount(totalCount + total);
                setInitialCount(true);
              }}
              containerStyle={{
                width: SIZES.width / 2,
                borderRadius: 20,
                alignSelf: 'center',
                // backgroundColor: 'red',
              }}
              buttonStyle={{backgroundColor: '#01b8c6'}}
              title="Calculate Gut Score"
            />
          ) : (
            <Button
              icon={
                <Icon
                  // raised
                  size={25}
                  name="chevron-right"
                  type="font-awesome"
                  color="white"
                />
              }
              onPress={() => handleNextbtn()}
              containerStyle={{
                width: SIZES.width / 4,
                borderRadius: 20,
                alignSelf: 'center',
              }}
              buttonStyle={{backgroundColor: '#01b8c6'}}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => {
  // console.log(store.healthsurvey.gutSurvey);
  return {gutSurvey: store.healthsurvey.gutSurvey, user: store.user.user};
};
GutSurvey.navigationOptions = {
  header: () => null,
};
const styles = StyleSheet.create({
  section1: {
    backgroundColor: '#01b8c6',
    // width: SIZES.width / 10,
    height: SIZES.height / 6,
    // alignSelf: 'center',
  },

  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  standalone: {
    marginTop: 10,
    // marginBottom: 30,
    paddingHorizontal: 10,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: SIZES.height / 5,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#eeeeee',
    // borderBottomWidth: 2,
    padding: 10,
    // shadowColor: '#000',
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.32,
    // shadowRadius: 5.46,
    // elevation: 9,
  },
  standaloneRowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // padding: 15,
    borderRadius: 20,
    height: SIZES.height / 5,
    overflow: 'hidden',
  },
  backTextWhite1: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
    // padding: 30,
    paddingHorizontal: SIZES.width / 23,
    paddingVertical: SIZES.height / 12,
    // backgroundColor: 'red',
  },
  backTextWhite2: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'right',
    paddingHorizontal: SIZES.width / 9,
    paddingVertical: SIZES.height / 12,
  },
});
export default connect(mapStateToProps, {
  recieveHS,
  getSymtomsById,
  updateGutScore,
  getExpiredDays,
})(GutSurvey);
