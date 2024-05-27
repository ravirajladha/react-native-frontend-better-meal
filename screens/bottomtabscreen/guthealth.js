import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import * as Progress from 'react-native-progress';
import {LineChart} from 'react-native-chart-kit';
import {
  Button,
  Avatar,
  Icon,
  Image,
  ButtonGroup,
  Header,
  Card,
} from 'react-native-elements';
import {
  Alert,
  StyleSheet,
  View,
  SafeAreaView,
  YellowBox,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  ActivityIndicator,
} from 'react-native';
import BottomNav from '../../component/bottomnavtab';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {images, theme} from '../../constants';
import {
  recieveHS,
  getSymtomsById,
  getGutSurveyQuestion,
  getExpiredDays,
  getGUtGraphValue,
} from '../../redux/healthsurvey/components/healthsurvey.action';
import SymtomsList from '../guthealth/symtoms_view_by_id';
import {Picker} from '@react-native-picker/picker';
import TextComp from '../../component/text';
import ListDiseases from '../guthealth/listdiseases';
import HealthResult from '../guthealth/healthsurveyresult';
import store from '../../store';
const {COLORS, FONTS, SIZES} = theme;
const {drugs, gutpopup} = images;
let expiredDays = 90;
const GutHealth = ({
  recieveHS,
  navigation,
  getGutSurveyQuestion,
  getExpiredDays,
  user,
  gutSurveyExpiredDays,
  gutSurveyflag,
  getGUtGraphValue,
  gutGraphValue,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSymtomsList, setSymtomsList] = useState(false);
  const [isFinalResults, setFinalResults] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const base64Image = user.image;
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [graphValue, setGraphValue] = useState([0, 0]);
  const [selectedValue, setSelectedValue] = useState(new Date().getFullYear());
  const [flagValue, setflagValue] = useState(false);

  const buttons = ['1Quarterly', '2Quarterly', '3Quarterly', 'Yearly'];
  useEffect(() => {
    recieveHS();
    getGutSurveyQuestion();
    getExpiredDays(user.id);
    getGUtGraphValue(user.id);

    YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);
    if (gutGraphValue) {
      setflagValue(true);
    }
  }, []);
  useEffect(() => {
    if (gutGraphValue) {
      filterGutGraphValue(selectedValue);
    }
  }, [gutGraphValue]);

  const filterGutGraphValue = (value) => {
    if (gutGraphValue) {
      console.log('gutGraphValue', gutGraphValue);
      let val = [0];
      val = gutGraphValue.filter(
        (ele) => new Date(ele.gutscoreupdatedate).getFullYear() === value,
        //    {
        //   console.log('Date:', new Date(ele.gutscoreupdatedate).getFullYear());

        //   if (new Date(ele.gutscoreupdatedate).getFullYear() === value) {
        //     return ele.gutscore;
        //   }
        // }
      );
      val = val.map((ele) => ele.gutscore);
      console.log('SORTED ARRAY2', val.length ? val : [0]);

      setGraphValue(val.length ? val : [0]);
    }
  };

  let value = [6, 10];

  const callBackfn = () => {
    setSymtomsList(false);
  };
  const callBackfn2 = (value) => {
    setSymtomsList(value);
  };
  const callBackfn3 = (value) => {
    setFinalResults(value);
  };
  const callBackfn1 = (value) => {
    setIsVisible(value);
  };
  const gutScore = () => {
    console.log("gut today",user.gutscore)
    let gutScoreper =(user.gutscore/5)*100
     console.log("gut today",user.gutscore,gutScoreper)
    return gutScoreper?`${gutScoreper}%`:0;
  };
  const calGutScore = async () => {
    // console.log(
    //   'calling useeffect gutSurveyExpiredDays---------------------------------',
    //   gutSurveyExpiredDays,
    // );
    // console.log(Date.now());
    if (gutSurveyExpiredDays === null && gutSurveyflag == false) {
      // await alert('Gut Score was not calculated please take Gut Survey');
      Alert.alert(
        'Hi ' + user.name,
        'Gut Score was not calculated please take Gut Survey',
        [{text: 'OK', onPress: () => setModalVisible(true)}],
      );
    } else {
      // alert('gutSurveyExpiredDays is not calculated');
      if (gutSurveyExpiredDays > 90) {
        // await alert('Gut Score has expired please take Gut Survey');
        Alert.alert(
          'Hi ' + user.name,
          'Gut Score has expired please take Gut Survey',
          [{text: 'OK', onPress: () => setModalVisible(true)}],
        );
      } else if (gutSurveyExpiredDays >= 0 && gutSurveyExpiredDays <= 90) {
        let remDays = expiredDays - gutSurveyExpiredDays;
        let datesTakenGS = user.gutscoreupdatedate;
        let dates = Date(datesTakenGS);

        Alert.alert(
          'Hi ' + user.name,
          ' You have Taken Gut Survey on ' +
            dates +
            ' Please take Gut survey after  ' +
            remDays +
            ' days',
          [{text: 'OK', onPress: () => console.log('Hello')}],
        );
      } else {
        alert('NO gut');
      }
    }
  };
  const updateIndex = (selectedIndex, index) => {
    setSelectedIndex(selectedIndex);
    alert('Vdfvdv', index);
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
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
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              activeOpacity={0.9}>
              <Avatar
                size={SIZES.width / 10}
                title="BM"
                source={{uri: `data:image/jpeg;base64,${base64Image}`}}
                rounded>
                <Avatar.Accessory
                  name="bars"
                  type="font-awesome-5"
                  size={15}
                  style={{backgroundColor: 'transparent'}}
                />
              </Avatar>
            </TouchableOpacity>
          }
          rightContainerStyle={{right: 10}}
          rightComponent={
            <Button
              title="GUT SURVEY"
              type="outline"
              buttonStyle={{
                color: 'white',
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 15,
                width: SIZES.width / 3.8,
              }}
              titleStyle={{
                color: 'white',
                // paddingRight: 0,
                fontSize: SIZES.width / 30,
                fontWeight: 'bold',
              }}
              // onPress={() => setModalVisible(true)}
              onPress={() => calGutScore()}
            />
          }
        />
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // console.log('Modal has been closed.');
          }}>
          {/*All views of Modal*/}
          <View style={styles.modal}>
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                width: SIZES.width / 1.1,
                height:
                  SIZES.height > 800 ? SIZES.height / 1.7 : SIZES.height / 1.6,
                // padding: 20,
                paddingHorizontal: 20,
                paddingVertical: SIZES.width > 350 ? 40 : 25,
              }}>
              <Image
                source={gutpopup}
                style={{
                  width: SIZES.height > 600 ? SIZES.width / 2 : 100,
                  height: SIZES.height > 600 ? SIZES.height / 4 : 100,
                }}
              />
              <TextComp
                customeStyle={{
                  ...FONTS.h2,
                  // alignSelf: 'center',
                  fontSize: SIZES.width / 20,
                  color: '#53c6d3',
                  fontWeight: 'bold',
                  marginTop: 30,
                }}>
                UPDATE HEALTH PROFILE!
              </TextComp>
              <TextComp
                customeStyle={{
                  ...FONTS.h4,
                  // alignSelf: 'center',
                  fontSize: SIZES.width / 30,
                  fontSize: 14.3,
                  color: '#747474',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                To continue further with the Gut information,please help us with
                filling a short survey.
              </TextComp>
              <Button
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('GutSurveyScreen');
                }}
                containerStyle={{
                  width: SIZES.width / 2,
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginTop: SIZES.height > 800 ? 40 : 20,
                  // backgroundColor: 'red',
                }}
                buttonStyle={{backgroundColor: '#53c6d3'}}
                title="Take Survey"
              />
            </View>
          </View>
        </Modal>
        <Card containerStyle={{borderRadius: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <TextComp
                customeStyle={{
                  ...FONTS.h2,
                  // alignSelf: 'center',
                  fontSize: SIZES.width / 20,
                  // fontSize: 19,
                  color: '#525252',
                  fontWeight: 'bold',
                }}>
                How is your Gut today?
              </TextComp>
              <TextComp
                customeStyle={{
                  ...FONTS.h3,
                  // alignSelf: 'center',
                  color: '#aeaeae',
                  fontSize: SIZES.width / 30,
                }}>
                You can view your Gut Score here
              </TextComp>
            </View>
            <View>
              <Progress.Circle
                progress={user.gutscore/5}
                size={SIZES.width / 4.5}
                color="#01b8c6"
                unfilledColor="#edf2f8"
                thickness={SIZES.width / 35}
                formatText={gutScore}
                // indeterminate={true}
                // direction="counter-clockwise"
                showsText={true}
                borderColor="white"
                // textStyle={{fontSize: SIZES.width / 28, color: 'white'}}
                textStyle={{
                  fontSize: SIZES.width / 20,
                  color: '#01b8c6',
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
              style={{width: 100}}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
                filterGutGraphValue(itemValue);
              }}>
              <Picker.Item
                label={new Date().getFullYear().toString()}
                value={new Date().getFullYear()}
              />
              <Picker.Item
                label={(new Date().getFullYear() - 1).toString()}
                value={new Date().getFullYear() - 1}
              />
              <Picker.Item
                label={(new Date().getFullYear() - 2).toString()}
                value={new Date().getFullYear() - 2}
              />
              <Picker.Item
                label={(new Date().getFullYear() - 3).toString()}
                value={new Date().getFullYear() - 3}
              />
            </Picker>
          </View>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <View>
            <LineChart
              data={{
                datasets: [
                  {
                    data: graphValue,
                  },
                ],
              }}
              width={SIZES.width} // from react-native
              height={SIZES.height > 600 ? 180 : 100}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => '#01b8c6',
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
        <View style={{padding: 10, backgroundColor: 'white'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.section3}
              activeOpacity={0.5}
               // onPress={() => alert('Pressed on Medication')}
              // onPress={() => alert('Pressed on Medication')}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Medications');
              }}
            >
              <Image source={drugs} style={styles.section3_image} />
              <TextComp customeStyle={styles.section3_text}>
                MEDICATIONS
              </TextComp>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.section3}
              onPress={() => navigation.navigate('BioMarks')}>
              <Image source={drugs} style={styles.section3_image} />
              <TextComp customeStyle={styles.section3_text}>
                BIOMARKERS
              </TextComp>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.view4}
            onPress={() => setIsVisible(true)}
            activeOpacity={1}>
            <View style={styles.view5}></View>
            <View style={{paddingTop: 10}}>
              <TextComp
                customeStyle={{
                  ...FONTS.h1,
                  alignSelf: 'center',
                  color: COLORS.white,
                  fontWeight: 'bold',
                  fontSize: SIZES.width / 12,
                }}>
                DIAGNOSE
              </TextComp>
            </View>
            <View style={{paddingBottom: 15}}>
              <TextComp
                customeStyle={{
                  ...FONTS.h3,
                  alignSelf: 'center',
                  color: COLORS.white,
                  fontSize: SIZES.width / 22,
                }}
                onPress={() => {
                  setRenderlist(false);
                }}>
                my health conditions
              </TextComp>
            </View>
            <View style={{paddingHorizontal: 35}}>
              <TextComp
                customeStyle={{
                  ...FONTS.h3,
                  alignSelf: 'center',
                  color: COLORS.white,
                  textAlign: 'center',
                  fontSize: SIZES.width / 25,
                }}>
                Browse through the common health issue and check if you are...
              </TextComp>
            </View>
          </TouchableOpacity>
          <ListDiseases
            callBackfn1={callBackfn1}
            isVisible={isVisible}
            callBackfn2={callBackfn2}
          />
          <SymtomsList
            isSymtomsList={isSymtomsList}
            callBackfn={callBackfn}
            callBackfn3={callBackfn3}
            callBackfn2={callBackfn2}
          />
          <HealthResult
            isFinalResults={isFinalResults}
            callBackfn3={callBackfn3}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section1: {
    backgroundColor: '#01b8c6',
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
    marginHorizontal: 10,
    width: SIZES.width > 360 ? SIZES.width / 2.4 : SIZES.width / 2.4,
  },
  section3_text: {
    ...FONTS.h3,
    // alignSelf: 'center',
    fontSize: SIZES.width / 30,
    color: '#01b8c6',
    marginTop: 10,
  },
  section3_image: {
    width: SIZES.width > 360 ? 50 : 30,
    height: SIZES.height > 600 ? 50 : 30,
  },
  view3: {
    backgroundColor: 'white',
    width: SIZES.width / 10,
    height: SIZES.height / 200,
    alignSelf: 'center',
  },
  view4: {
    backgroundColor: '#01b9c6',
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
});

const mapStateToProps = (store) => {
  // console.log(store.healthsurvey.getGutGraph);
  return {
    gutSurveyExpiredDays: store.healthsurvey.gutSurveyExpiredDays,
    gutSurveyflag: store.healthsurvey.gutSurveyflag,
    user: store.user.user,
    gutGraphValue: store.healthsurvey.getGutGraph,
  };
};
GutHealth.navigationOptions = {
  header: () => null,
};
export default connect(mapStateToProps, {
  recieveHS,
  getSymtomsById,
  getGutSurveyQuestion,
  getExpiredDays,
  getGUtGraphValue,
})(GutHealth);
