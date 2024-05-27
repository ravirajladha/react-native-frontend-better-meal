import React, {useState, useEffect} from 'react';
import {Button, BottomSheet, SearchBar, CheckBox} from 'react-native-elements';

import {
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import BottomNav from '../../../component/bottomnavtab';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, theme} from '../../../constants';
import Spinner from '../../../component/spinner';
import {
  recieveHS,
  getSymtomsById,
  checkUpdate,
  resultsCalculation,
  flagValue,
  storeHealthSurveyscore,
  getHsScore,
} from '../../../redux/healthsurvey/components/healthsurvey.action';
import TextComp from '../../../component/text';
const {COLORS, FONTS, SIZES} = theme;
import {MButton, IButton} from '../../../component/button';
import {ScrollView} from 'react-native';

const Symtoms = ({
  isSymtomsList,
  symtomsList,
  callBackfn,
  checkUpdate,
  symChecVal,
  resultsCalculation,
  user,
  ageScore,
  symptomScore,
  weightScore,
  callBackfn3,
  callBackfn2,
  flagValue,
  call_sum,
  storeHealthSurveyscore,
  getHsScore,
}) => {
  const [text, setText] = useState('');
  const [renderlist, setRenderlist] = useState(false);
  const [checkbox, setCheckbox] = useState();

  let filterdData;
  useEffect(() => {
    // console.log('symChecVal', symChecVal);
    // console.log('call_sum', call_sum);
    console.log(
      'ageScoresymptomScoreweightScore',
      ageScore,
      symptomScore,
      weightScore,
    );
    if (symChecVal) {
      setdata(symChecVal);
    } else {
    }
    if (call_sum === true) {
      sumup();
      flagValue(false);
    }
  });

  const setdata = (symptoms) => {
    setCheckbox(symptoms);
  };

  // based on text, filter data and use filtered data
  filterdData = text
    ? checkbox.filter((item) => {
        const itemData = item.name.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.includes(textData);
      })
    : checkbox;
  // on on text, u can return all data
  // console.log('filterdData', filterdData);
  const onCheck = (item, index) => {
    // console.log('symChecVal', symChecVal);
    console.log('item========================', item);
    let selecedItemDict = item;
    // console.log('check', selecedItemDict);
    if (selecedItemDict.isSelected) {
      selecedItemDict.isSelected = false;
      // console.log('check', selecedItemDict);
    } else {
      selecedItemDict.isSelected = true;
      // console.log('check', selecedItemDict);
    }
    let defectiveParts = checkbox;
    defectiveParts[index] = selecedItemDict;
    // console.log('hello', defectiveParts);
    // setCheckbox(defectiveParts);
    checkUpdate(defectiveParts);
  };
  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  const seeResults = async () => {
    console.log('See the results', checkbox);

    if (user.dateofbirth && user.weight) {
      let dateofbirth = user.dateofbirth;
      let weight = user.weight;
      // console.log('See the results', weight);
      let age = await getAge(dateofbirth);
      console.log('birthDate', age);
      await resultsCalculation(checkbox, age, weight);
    } else {
      alert(
        'User data missing . Please fill all the user data to calculate the gut score',
      );
    }
  };
  const sumup = async () => {
    await callBackfn3(true);
    await callBackfn2(false);
    let sumScore = ageScore + symptomScore + weightScore;
    let diseaseName = symtomsList.diseaseName;
    let id = user.id;
    // console.log('sumsumScore,id,diseaseName', sumScore, id, diseaseName);

    if (diseaseName && sumScore && id) {
      await storeHealthSurveyscore(sumScore, diseaseName, id);
      await getHsScore(id);
    } else {
      alert('NO sumScore no diseaseName ');
    }
  };
  return (
    <BottomSheet
      isVisible={isSymtomsList}
      containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
      <View style={styles.view4}>
        <View style={styles.view5}></View>
        <View style={{paddingTop: SIZES.width > 350 ? 10 : 5}}>
          <TextComp
            customeStyle={{
              ...FONTS.h1,
              alignSelf: 'center',
              color: COLORS.white,
              fontWeight: 'bold',
              fontSize: SIZES.width > 350 ? 28 : 22,
            }}
            onPress={() => callBackfn()}>
            Symptoms
          </TextComp>
        </View>
        <View style={{paddingBottom: SIZES.width > 350 ? 15 : 10}}>
          <TextComp
            customeStyle={{
              ...FONTS.h3,
              alignSelf: 'center',
              color: COLORS.white,
              fontSize: SIZES.width > 350 ? 18 : 12,
              bottom: SIZES.width > 350 ? 0 : 6,
            }}
            onPress={() => {
              setRenderlist(false);
            }}>
            {symtomsList ? symtomsList.diseaseName : null}
          </TextComp>
        </View>
        <View style={{paddingHorizontal: 5}}>
          <TextComp
            customeStyle={{
              ...FONTS.h3,
              color: COLORS.white,
              textAlign: 'center',
              fontSize: SIZES.width > 350 ? 16 : 12,
            }}>
            Select symptoms that you face from the list below
          </TextComp>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#01b9c6',
          height: SIZES.width > 400 ? SIZES.height / 11.12 : SIZES.height / 8,
        }}>
        {/* <TouchableOpacity onPress={() => setRenderlist(true)}> */}
        <SearchBar
          // onPress={() => setRenderlist(true)}
          placeholder="Select health issue"
          onChangeText={(text) => {
            setText(text);
          }}
          // size = {20}
          value={text}
          // round={true}
          // underlineColorAndroid="black"
          containerStyle={{
            backgroundColor: 'white',
            shadowColor: 'white', //no effect
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            height: SIZES.height / 4,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            // padding : 10,
            // height: '100%',
            // bottom: 0,
            // marginTop: 5,
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            boderColor: 'black',
            borderWidth: 1,
            borderRadius: 30,
            borderBottomWidth: 1,
          }}
          searchIcon={{size: 30}}
          // leftIconContainerStyle={{backgroundColor: 'red', size: 30}}
        />
        {/* </TouchableOpacity> */}
      </View>
      <SafeAreaView
        style={{
          flex: 1,
          height: SIZES.height > 600 ? 250 : 150,
          backgroundColor: 'white',
        }}>
        {filterdData ? (
          <FlatList
            data={filterdData}
            numColumns={0}
            keyExtractor={(item) => '%' + item.name}
            // ItemSeparatorComponent={itemSeparator} 12
            renderItem={({item, index}) => (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <CheckBox
                  checked={item.isSelected}
                  title={item.name}
                  textStyle={{fontSize: SIZES.width > 350 ? 20 : 12}}
                  size={SIZES.width > 350 ? 25 : 15}
                  onPress={() => onCheck(item, index)}
                  containerStyle={{
                    width: SIZES.width / 1.05,
                    backgroundColor: 'white',
                  }}
                />
                {/* <Text style={styles.row}>{item.name}</Text> */}
              </View>
            )}
            style={{marginTop: 0}}
          />
        ) : (
          <Spinner />
        )}
      </SafeAreaView>
      {/* <View style={{height: SIZES.width > 400 ?  50 : 30}}>
        {/* <BottomNav /> */}
      {/* </View>  */}
      <View
        style={{
          backgroundColor: 'white',
          height: SIZES.width > 400 ? SIZES.height / 7 : SIZES.height / 6,
          paddingVertical: SIZES.width > 350 ? 40 : 20,
        }}>
        <View
          style={{
            marginVertical: SIZES.width > 400 ? 0 : 5,
            marginHorizontal: 15,
            borderRadius: 7,
            overflow: 'hidden',
          }}>
          <MButton
            //   loading={showSpinner}
            title="See my results"
            // titleStyle = {{fontSize : SIZES.width > 350 ? 20 : 5}}
            onPress={() => seeResults()}
            customeStyle={{backgroundColor: '#01b9c6'}}
            // buttonStyle = {{backgroundColor : '#01b9c6'}}
          />
        </View>
      </View>
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
    // paddingTop: SIZES.width > 350 ?  20 : 10,
    // paddingBottom: SIZES.width > 350 ?  20 : 10,
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
    fontSize: 10,
    // padding: 12,
    paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    marginVertical: 20,
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
    borderColor: 'black',
    borderWidth: 1,
    // width: 20,
    // width: 50,
    height: SIZES.height / 9,
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
  // console.log('Store', store.healthsurvey);
  return {
    healthsurvey: store.healthsurvey,
    user: store.user.user,
    symptomScore: store.healthsurvey.symptomScore,
    ageScore: store.healthsurvey.ageScore,
    weightScore: store.healthsurvey.weightScore,
    symChecVal: store.healthsurvey.symChecVal,
    symtomsList: store.healthsurvey.symtomsList,
    symtomsList: store.healthsurvey.symtomsList,
    call_sum: store.healthsurvey.call_sum,
  };
};
Symtoms.navigationOptions = {
  header: () => null,
};
export default connect(mapStateToProps, {
  getSymtomsById,
  checkUpdate,
  resultsCalculation,
  flagValue,
  storeHealthSurveyscore,
  getHsScore,
})(Symtoms);
