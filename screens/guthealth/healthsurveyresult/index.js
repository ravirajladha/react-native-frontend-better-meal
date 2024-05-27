import React, {useState, useEffect} from 'react';
import {Button, BottomSheet, Card, Divider} from 'react-native-elements';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';
import BottomNav from '../../../component/bottomnavtab';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, theme} from '../../../constants';
import {
  recieveHS,
  getSymtomsById,
  checkUpdate,
  resultsCalculation,
} from '../../../redux/healthsurvey/components/healthsurvey.action';
import TextComp from '../../../component/text';
const {COLORS, FONTS, SIZES} = theme;
import Spinner from '../../../component/spinner';

const HealthResult = ({isFinalResults, callBackfn3, getAllScore}) => {
  const [diseases, setDiseases] = useState();
  const [section, setSection] = useState([
    {
      content:
        'You can improve the results by implementing a few changes In you diet',
    },
    {
      content: 'You might have acid reflux or chronic Gastritis.',
    },
    {
      content: 'See how people like you have been cured using right nutrition',
    },
  ]);
  useEffect(() => {
    console.log(
      'getAllScore:==========>',
      getAllScore ? getAllScore[0].diseases : '',
    );
    if (getAllScore) {
      setDiseases(getAllScore[0].diseases);
    } else {
      ('');
    }
  });
  const DATA = [
    {
      name: 'Disease',
      score: '10',
    },
    {
      name: 'Disease2',
      score: '40',
    },
    {
      name: 'Disease5',
      score: '56',
    },
  ];

  return (
    <BottomSheet
      isVisible={isFinalResults}
      containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
      <View style={styles.view4}>
        <View style={styles.view5}></View>
        <View style={{paddingTop: SIZES.width > 350 ?  10 : 0}}>
          <TextComp
            customeStyle={{
              ...FONTS.h1,
              alignSelf: 'center',
              color: COLORS.white,
              fontWeight: 'bold',
              fontSize: SIZES.width > 350 ? 28 : 22,
            }}
            onPress={() => callBackfn3(false)}>
            Results
          </TextComp>
        </View>

        <View style={{paddingHorizontal: 5}}>
          <TextComp
            customeStyle={{
              ...FONTS.h3,
              color: COLORS.white,
              textAlign: 'center',
              fontSize: SIZES.width > 350 ? 18 : 12,
            }}>
            Based on your information provided, BetterMeal has calculated the
            probability chart
          </TextComp>
        </View>
      </View>
      <View style={{backgroundColor: '#01b9c6', overflow: 'hidden'}}>
        <View
          style={{
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            backgroundColor: 'white',
            shadowColor: 'white', //no effect
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
          }}>
          {diseases ? (
            <SafeAreaView style={styles.container}>
              <FlatList
                key={'_'}
                data={diseases.slice(0, 3)}
                keyExtractor={(item) => '#' + item.id}
                style={styles.container}
                renderItem={({item}) => {
                  let colr = '#3ec363';
                  if (item.score > 10 && item.score <= 50) {
                    colr = '#ffdd00';
                  } else if (item.score > 50) {
                    colr = '#ff8b00';
                  }
                  return (
                    <View style={styles.item}>
                      <View style={{height: SIZES.width > 400 ? 90 : 75}}>
                        <Progress.Bar
                          progress={item.score / 100}
                          width={SIZES.width > 400 ? 120 : 85}
                          height={SIZES.width > 400 ? 35 : 30}
                          borderRadius={20}
                          unfilledColor={colr}
                          color="white"
                          // borderColor="white"
                          style={{
                            transform: [{rotate: '-90deg'}],
                            shadowColor: '#000',

                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          borderWidth: 2,
                          // bottom : SIZES.width > 350 ? 0 : 10,
                          borderColor: colr,
                          borderRadius: 15,
                          width: 90,
                          // height: 20,
                          // paddingVertical: 5,
                          // paddingHorizontal: 5,
                          paddingVertical: SIZES.width > 350 ?  5 : 0,
                          paddingHorizontal: SIZES.width > 350 ? 5 : 5,
                        }}>
                        <TextComp
                          customeStyle={{
                            ...FONTS.h3,
                            alignSelf: 'center',
                            color: colr,
                            fontSize : SIZES.width > 350 ? 20 : 15
                          }}>
                          {item.score}%
                        </TextComp>
                        <TextComp
                          customeStyle={{
                            ...FONTS.h3,
                            textAlign: 'center',
                            fontSize : SIZES.width > 350 ? 18 : 12,
                          }}>
                          {item.name}
                        </TextComp>
                      </View>
                    </View>
                  );
                }}
                numColumns={3}
              />
            </SafeAreaView>
          ) : (
            <Spinner />
          )}
        </View>
      </View>
       <View style={{height: SIZES.width > 350 ? SIZES.height / 6 : SIZES.height/7, backgroundColor: 'white'}}>
        <Card
          containerStyle={{
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
            borderRadius: 15,
            height: SIZES.width > 350 ? SIZES.height / 8 : SIZES.height / 10,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: '20%'}}>
              <TextComp
                customeStyle={{
                  ...FONTS.h1,
                  lineHeight: 30,
                  fontWeight: 'bold',
                  fontSize :  SIZES.width > 350 ? 30 : 20,
                  bottom : SIZES.width > 350 ? 0 : 10,
                }}>
                869
              </TextComp>
              <TextComp
                customeStyle={{
                  ...FONTS.h2,
                  color: '#707070',
                  position: 'relative',
                  fontSize :  SIZES.width > 400 ? 20 : 15,
                  bottom : SIZES.width > 350 ? 0 : 20,
                }}>
                cases
              </TextComp>
            </View>
            <View
              style={{
                backgroundColor: 'grey',
                width: 1,
                height: 55 ,
                bottom : SIZES.width > 350 ? 0 : 8
                // width: '10%',
              }}></View>
            <View style={{width: '80%'}}>
              <TextComp
                customeStyle={{...FONTS.h3, paddingLeft: 10, color: '#8b8b8b', fontSize : SIZES.width > 400 ? 18 : 12, bottom : SIZES.width > 350 ? 0 : 10}}>
                with health condition and symptoms yours that was diagnosed
              </TextComp>
            </View>
          </View>
        </Card>
      </View>

      
      <Divider style={{backgroundColor: '#ededed', height: SIZES.width > 350 ? 3 : 1}} />

      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
          key={'#'}
          data={section}
          numColumns={0}
          keyExtractor={(item) => '_' + item.content}
          // ItemSeparatorComponent={itemSeparator}
          renderItem={({item}) => (
            <TextComp
              style={styles.row}
              customeStyle={{ 
                ...FONTS.h4,
                // textAlign: 'center',
                // padding: 2,
                
                backgroundColor: '#f7f7f7',
                color: '#9a9a9a',
                borderRadius: 15,
                marginHorizontal: 10,
                fontSize: SIZES.width > 350 ? 14 : 12,
                paddingHorizontal: 9,
                marginVertical: 5,
              }}>
              {item.content}
            </TextComp>
          )}
        />
      </SafeAreaView>
      {/* <View style={{height: 50}}>
        <BottomNav />
      </View> */}
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
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
  view6: {},
  view7: {},
  row: {
    fontSize: SIZES.width > 350 ? 15 : 10,
    // padding: 12,
    paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    // marginVertical: 20,
    height: SIZES.height / 3.3,
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
    height: SIZES.height / 2.8,
    // alignItems: 'center',
    padding: 1, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
const mapStateToProps = (store) => {
  // console.log('store.healthsurvey', store.healthsurvey.getAllScore);
  return {
    healthsurvey: store.healthsurvey,
    getAllScore: store.healthsurvey.getAllScore,
  };
};
HealthResult.navigationOptions = {
  header: () => null,
};
export default connect(mapStateToProps, {
  getSymtomsById,
  checkUpdate,
  resultsCalculation,
})(HealthResult);
