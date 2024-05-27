import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import PropTypes from 'prop-types';
import TextComp from '../../component/text';
import {FONTS, SIZES} from '../../constants/';
import {
  Card,
  ListItem,
  Button,
  BottomSheet,
  SearchBar,
  Avatar,
  Badge,
  Icon,
  withBadge,
  Image,
  Slider,
  Chip,
  CheckBox,
  Header,
} from 'react-native-elements';
import {useState} from 'react';
import {connect} from 'react-redux';
import Indicator from '../../component/stepprogressbar';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-crop-picker';
import LineGauge from 'react-native-line-gauge';
import {StatusBar, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {
  updateProfile,
  uploadImageProfile,
} from '../../redux/userprofileupdate/components/userprofileupdate.action';

const AddProfileDetails = (
  {navigation, user, updateProfile, uploadImageProfile},
  props,
) => {
  //Used for modals
  const [selectGender, setGender] = useState(false);
  const [selectWeight, setWeight] = useState(false);
  const [selectHeight, setHeight] = useState(false);
  const [selectDOB, setDOB] = useState(false);

  //Used for linear gradient colors
  const [addGenderColor, setAddGenderColor] = useState('#ffffff');
  const [addGenderColor2, setAddGenderColor2] = useState('#ffffff');
  const [addPhotoColor, setAddPhotoColor] = useState('#ffffff');
  const [addPhotoColor2, setAddPhotoColor2] = useState('#ffffff');
  const [addWeightColor, setAddWeightColor] = useState('#ffffff');
  const [addWeightColor2, setAddWeightColor2] = useState('#ffffff');
  const [addHeightColor, setAddHeightColor] = useState('#ffffff');
  const [addHeightColor2, setAddHeightColor2] = useState('#ffffff');
  const [addDOBColor, setAddDOBColor] = useState('#ffffff');
  const [addDOBColor2, setAddDOBColor2] = useState('#ffffff');

  //Used for text colors
  const [phototextColor, setPhotoTextColor] = useState('#666666');
  const [gendertextColor, setGenderTextColor] = useState('#666666');
  const [weighttextColor, setWeightTextColor] = useState('#666666');
  const [heighttextColor, setHeightTextColor] = useState('#666666');
  const [dobtextColor, setDOBTextColor] = useState('#666666');

  //used in check-box to disable and enable
  const [checkColorPhoto, setCheckColorPhoto] = useState('white');
  const [checkColorGender, setCheckColorGender] = useState('white');
  const [checkColorWeight, setCheckColorWeight] = useState('white');
  const [checkColorHeight, setCheckColorHeight] = useState('white');
  const [checkColorDOB, setCheckColorDOB] = useState('white');

  //Used in nxtbtn() for enabling and disabling
  const [addPhotoPosition, setAddPhotoPosition] = useState(1);
  const [addGenderPosition, setAddGenderPosition] = useState(1);
  const [addWeightPosition, setWeightPosition] = useState(1);
  const [addHeightPosition, setHeightPosition] = useState(1);
  const [addDOBPosition, setDOBPosition] = useState(1);

  //Used for text border to transparent it
  const [photoBorderColor, setPhotoBorderColor] = useState('#848484');
  const [genderBorderColor, setGenderBorderColor] = useState('#848484');
  const [heightBorderColor, setHeightBorderColor] = useState('#848484');
  const [weightBorderColor, setWeightBorderColor] = useState('#848484');
  const [dobBorderColor, setDOBBorderColor] = useState('#848484');

  //Used for enabling button
  const [buttonVisible, setButtonVisible] = useState(true);

  //Used for step-progess-bar position
  const [currentPosition, setCurrentPosition] = useState(0);

  //for redux passing the parameter
  let photoRedux;
  let genderRedux;
  let heightRedux;
  let weightRedux;
  let dateRedux;

  console.log('width', SIZES.width);
  console.log('height', SIZES.height);

  function nxtBtn() {
    if (currentPosition === 4) {
      setButtonVisible(false);
    }
  }
  const thirdIndicatorStyles = {
    stepIndicatorSize: SIZES.width > 350 ? 15 : 10,
    currentStepIndicatorSize: SIZES.width > 350 ? 20 : 15,
    // horizontal line
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 0,
    stepStrokeCurrentColor: '#b7b7b7',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#2074dc',
    stepStrokeUnFinishedColor: '#b7b7b7',
    separatorFinishedColor: '#2074dc',
    separatorUnFinishedColor: '#b7b7b7',
    stepIndicatorFinishedColor: '#2074dc',
    // innercircle
    stepIndicatorUnFinishedColor: '#b7b7b7',
    stepIndicatorCurrentColor: '#b7b7b7',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: '#999999',
    labelSize: 113,
    currentStepLabelColor: '#7eaec4',
  };

  const choosePhotoFromLib = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setPhotoTextColor('white');
      setAddPhotoColor('#2074dc');
      setAddPhotoColor2('#50c1d3');
      setCheckColorPhoto('black');
      setPhotoBorderColor('transparent');
      setCurrentPosition(currentPosition + addPhotoPosition);

      nxtBtn();
      setAddPhotoPosition(0);
      uploadImageProfile(user.id, image.path);
    });
  };

  const AddGender = () => {
    let maleGender = 'male';
    let femaleGender = 'female';
    let otherGender = 'others';

    const [maleGenderColor, setMaleGenderColor] = useState('white');
    const [femaleGenderColor, setFemaleGenderColor] = useState('white');
    const [othersGenderColor, setOthersGenderColor] = useState('white');
    const [maleGenderIconColor, setMaleGenderIconColor] = useState('#52c3d3');
    const [femaleGenderIconColor, setFemaleGenderIconColor] = useState(
      '#52c3d3',
    );
    const [othersGenderIconColor, setOthersGenderIconColor] = useState(
      '#52c3d3',
    );

    function addGenderViewColor() {
      setAddGenderColor('#2074dc');
      setAddGenderColor2('#50c1d3');
      setGenderTextColor('white');
      setCurrentPosition(currentPosition + addGenderPosition);
      setAddGenderPosition(0);

      nxtBtn();
      setCheckColorGender('black');
      setGenderBorderColor('transparent');
      setGender(false);

      console.log('id---', user.id);
    }

    function malegender() {
      setMaleGenderColor('blue');
      setMaleGenderIconColor('white');
      setFemaleGenderColor('white');
      setFemaleGenderIconColor('#52c3d3');
      setOthersGenderColor('white');
      setOthersGenderIconColor('#52c3d3');
      // setGenderRedux(maleGender)
      genderRedux = maleGender;
      updateProfile(
        user.id,
        photoRedux,
        genderRedux,
        heightRedux,
        weightRedux,
        dateRedux,
      );
    }
    function othersgender() {
      setOthersGenderColor('blue');
      setOthersGenderIconColor('white');
      setMaleGenderColor('white');
      setMaleGenderIconColor('#52c3d3');
      setFemaleGenderColor('white');
      setFemaleGenderIconColor('#52c3d3');
      // setGenderRedux(otherGender)
      genderRedux = otherGender;

      updateProfile(
        user.id,
        photoRedux,
        genderRedux,
        heightRedux,
        weightRedux,
        dateRedux,
      );
    }
    function femalegender() {
      setFemaleGenderColor('blue');
      setFemaleGenderIconColor('white');
      setOthersGenderColor('white');
      setOthersGenderIconColor('#52c3d3');
      setMaleGenderColor('white');
      setMaleGenderIconColor('#52c3d3');
      // setGenderRedux(femaleGender)
      genderRedux = femaleGender;
      updateProfile(
        user.id,
        photoRedux,
        genderRedux,
        heightRedux,
        weightRedux,
        dateRedux,
      );
    }
    return (
      <View style={styles.compo}>
        <Modal animationType="none" transparent={true} visible={selectGender}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000AA',
            }}>
            <View
              style={{
                flex: SIZES.height > 700 ? 0.55 : 0.65,
                backgroundColor: '#ffffff',
                borderRadius: 30,
                marginLeft: 20,
                marginRight: 20,
                marginTop: '50%',
              }}>
              <TextComp
                customeStyle={{
                  ...FONTS.h2,
                  fontSize: SIZES.width > 350 ? 22 : 15,
                  textAlign: 'center',
                  color: '#666666',
                  marginTop: SIZES.width > 350 ? 18 : 5,
                }}>
                Select your Gender
              </TextComp>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: '10%',
                }}>
                <TouchableOpacity>
                  <View
                    style={{
                      borderWidth: 3,
                      padding: 10,
                      borderRadius: 50,
                      borderColor: '#0694de',
                      backgroundColor: femaleGenderColor,
                    }}>
                    <Icon
                      name="female-sharp"
                      type="ionicon"
                      color={femaleGenderIconColor}
                      size={SIZES.width > 350 ? 40 : 25}
                      // style = {{fontSize : 30}}
                      onPress={() => {
                        femalegender();
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      borderWidth: 3,
                      padding: 10,
                      borderRadius: 50,
                      borderColor: '#0694de',
                      backgroundColor: maleGenderColor,
                    }}>
                    <Icon
                      name="male-sharp"
                      type="ionicon"
                      color={maleGenderIconColor}
                      // size={40}
                      size={SIZES.width > 350 ? 40 : 25}
                      onPress={() => {
                        malegender();
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      borderWidth: 3,
                      padding: 10,
                      borderRadius: 50,
                      borderColor: '#0694de',
                      backgroundColor: othersGenderColor,
                    }}>
                    <Icon
                      name="transgender-outline"
                      type="ionicon"
                      color={othersGenderIconColor}
                      // size={40}
                      size={SIZES.width > 350 ? 40 : 25}
                      onPress={() => {
                        othersgender();
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: SIZES.width > 350 ? 10 : 5,
                }}>
                <TextComp
                  customeStyle={{
                    ...FONTS.h2,
                    fontSize: SIZES.width > 350 ? 22 : 15,
                    color: '#666666',
                  }}>
                  Female
                </TextComp>
                <TextComp
                  customeStyle={{
                    ...FONTS.h2,
                    fontSize: SIZES.width > 350 ? 22 : 15,
                    color: '#666666',
                  }}>
                  Male
                </TextComp>
                <TextComp
                  customeStyle={{
                    ...FONTS.h2,
                    fontSize: SIZES.width > 350 ? 22 : 15,
                    color: '#666666',
                  }}>
                  others
                </TextComp>
              </View>
              <View style={{marginTop: SIZES.width > 400 ? '7%' : '3%'}}>
                <Button
                  title="Save"
                  titleStyle={{fontSize: SIZES.width > 350 ? 18 : 13}}
                  onPress={() => {
                    addGenderViewColor();
                  }}
                  // size = {SIZES.width > 350 ? 20 : 5}
                  buttonStyle={{
                    borderRadius: 20,
                    alignSelf: 'center',
                    padding: SIZES.width > 350 ? 10 : 5,
                    paddingLeft: SIZES.width > 350 ? 20 : 12,
                    paddingRight: SIZES.width > 350 ? 20 : 12,
                    backgroundColor: '#2174dc',
                  }}></Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const AddWeight = () => {
    const [weightGuage, setWeightGuage] = useState(0);

    function addWeightViewColor() {
      setAddWeightColor('#2074dc');
      setAddWeightColor2('#50c1d3');

      setWeightTextColor('white');
      setCurrentPosition(currentPosition + addWeightPosition);

      nxtBtn();
      setCheckColorWeight('black');
      setWeightPosition(0);
      setWeightBorderColor('transparent');
      setWeight(false);
      // setWeightRedux(weightGuage);
      weightRedux = weightGuage;
      updateProfile(
        user.id,
        photoRedux,
        genderRedux,
        heightRedux,
        weightRedux,
        dateRedux,
      );
    }

    return (
      <View style={styles.compo}>
        <Modal animationType="none" transparent={true} visible={selectWeight}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000AA',
            }}>
            <View
              style={{
                flex: SIZES.height > 700 ? 0.65 : 0.8,
                backgroundColor: '#ffffff',
                borderRadius: 30,
                marginLeft: 20,
                marginRight: 20,
                marginTop: '50%',
              }}>
              <TextComp
                customeStyle={{
                  ...FONTS.h2,
                  fontSize: SIZES.width > 350 ? 22 : 15,
                  textAlign: 'center',
                  marginTop: SIZES.width > 350 ? '5%' : 5,
                  color: '#666666',
                }}>
                Weight in lbs
              </TextComp>
              <View
                style={{
                  alignself: 'center',
                  marginTop: SIZES.width > 350 ? '5%' : 5,
                }}>
                <View>
                  <TextComp
                    customeStyle={{
                      fontSize: SIZES.width > 350 ? 60 : 40,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      // marginTop: '5%',
                    }}>
                    {weightGuage}
                  </TextComp>
                  <TextComp
                    customeStyle={{
                      ...FONTS.h3,
                      fontSize: SIZES.width > 350 ? 22 : 15,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: '#1c2742',
                      marginBottom: 2,
                    }}>
                    Lbs
                  </TextComp>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: SIZES.width > 400 ? '5%' : 5,
                  }}>
                  <ScrollView>
                    <LineGauge
                      min={0}
                      max={500}
                      size={10}
                      width={10}
                      value={weightGuage}
                      containerStyle={{backgroundColor: 'red'}}
                      onChange={(e) => {
                        setWeightGuage(e);
                      }}
                    />
                  </ScrollView>
                </View>
              </View>

              <View
                style={{
                  // marginBottom: 10,
                  marginTop: SIZES.width > 400 ? '5%' : '2%',
                }}>
                <Button
                  title="Save"
                  titleStyle={{fontSize: SIZES.width > 350 ? 18 : 13}}
                  onPress={() => {
                    addWeightViewColor();
                  }}
                  buttonStyle={{
                    borderRadius: 20,
                    alignSelf: 'center',
                    // padding: 10,
                    // paddingLeft: 20,
                    // paddingRight: 20,
                    padding: SIZES.width > 350 ? 10 : 5,
                    paddingLeft: SIZES.width > 350 ? 20 : 12,
                    paddingRight: SIZES.width > 350 ? 20 : 12,
                    backgroundColor: '#2174dc',
                  }}></Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const AddHeight = () => {
    const [heightGuage, setHeightGuage] = useState(0);

    function addHeightViewColor() {
      setAddHeightColor('#2074dc');
      setAddHeightColor2('#50c1d3');
      setHeightTextColor('white');
      setCurrentPosition(currentPosition + addHeightPosition);

      nxtBtn();
      setCheckColorHeight('black');
      setHeightPosition(0);
      setHeightBorderColor('transparent');
      setHeight(false);
      // setHeightRedux(heightGuage);
      heightRedux = heightGuage;
      updateProfile(
        user.id,
        photoRedux,
        genderRedux,
        heightRedux,
        weightRedux,
        dateRedux,
      );
    }

    return (
      <View style={styles.compo}>
        <Modal animationType="none" transparent={true} visible={selectHeight}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000AA',
            }}>
            <View
              style={{
                flex: SIZES.height > 700 ? 0.65 : 0.8,
                backgroundColor: '#ffffff',
                borderRadius: 30,
                marginLeft: 20,
                marginRight: 20,
                marginTop: '50%',
              }}>
              <TextComp
                customeStyle={{
                  ...FONTS.h2,
                  textAlign: 'center',
                  marginTop: SIZES.width > 350 ? '5%' : 5,
                  color: '#666666',
                  fontSize: SIZES.width > 350 ? 22 : 15,
                }}>
                Height in cm
              </TextComp>
              <View style={{flexDirection: 'column'}}>
                <TextComp
                  customeStyle={{
                    fontWeight: 'bold',
                    // fontSize: 60,
                    fontSize: SIZES.width > 350 ? 60 : 40,
                    textAlign: 'center',
                    marginTop: SIZES.width > 350 ? '5%' : 5,
                    color: '#1c2742',
                  }}>
                  {heightGuage}
                </TextComp>
                <TextComp
                  customeStyle={{
                    ...FONTS.h3,
                    fontSize: SIZES.width > 350 ? 22 : 15,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#1c2742',
                    marginTop: 5,
                  }}>
                  CM
                </TextComp>
              </View>
              <View
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: SIZES.width > 400 ? '5%' : 5,
                }}>
                <ScrollView>
                  <LineGauge
                    mediumInterval={3}
                    // largeInterval={0}

                    min={0}
                    max={300}
                    value={heightGuage}
                    onChange={(e) => {
                      setHeightGuage(e);
                    }}
                  />
                </ScrollView>
              </View>
              <View style={{marginTop: SIZES.width > 400 ? '5%' : '2%'}}>
                <Button
                  title="Save"
                  titleStyle={{fontSize: SIZES.width > 350 ? 18 : 13}}
                  onPress={() => {
                    // setHeight(false);
                    addHeightViewColor();
                  }}
                  buttonStyle={{
                    borderRadius: 20,
                    alignSelf: 'center',
                    // padding: 10,
                    // paddingLeft: 20,
                    // paddingRight: 20,
                    padding: SIZES.width > 350 ? 10 : 5,
                    paddingLeft: SIZES.width > 350 ? 20 : 12,
                    paddingRight: SIZES.width > 350 ? 20 : 12,
                    backgroundColor: '#2174dc',
                  }}></Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const AddDOB = () => {
    const [dateValue, setDateValue] = useState('');

    function addDOBViewColor() {
      setAddDOBColor('#2074dc');
      setAddDOBColor2('#50c1d3');
      setDOBTextColor('white');
      setCurrentPosition(currentPosition + addDOBPosition);

      nxtBtn();
      setCheckColorDOB('black');
      setDOBPosition(0);
      setDOB(false);
      setDOBBorderColor('transparent');
      // setDateValRed(dateValue);
      dateRedux = dateValue;
      updateProfile(
        user.id,
        photoRedux,
        genderRedux,
        heightRedux,
        weightRedux,
        dateRedux,
      );
    }

    return (
      <View style={styles.compo}>
        <Modal
          animationType="none"
          transparent={true}
          visible={selectDOB}
          statusBarTranslucent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000AA',
            }}>
            <View
              style={{
                flex: SIZES.height > 700 ? 0.5 : 0.55,
                backgroundColor: '#ffffff',
                borderRadius: 30,
                marginLeft: 20,
                marginRight: 20,
                marginTop: '50%',
              }}>
              <TextComp
                customeStyle={{
                  ...FONTS.h2,
                  fontSize: SIZES.width > 350 ? 22 : 15,
                  textAlign: 'center',
                  marginTop: 10,
                  color: '#666666',
                }}>
                Date of birth
              </TextComp>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#666666',
                  borderRadius: 30,
                  alignItems: 'center',
                  marginLeft: 30,
                  marginRight: 30,
                  marginTop: SIZES.width > 350 ? 55 : 40,
                  // backgroundColor : 'red'
                }}>
                <DatePicker
                  hideText={false}
                  disabled={false}
                  showIcon={false}
                  androidMode="spinner"
                  format="DD / MM / YYYY"
                  mode="date"
                  date={dateValue}
                  // value = {dateValue}
                  style={{alignSelf: 'center', justifyContent: 'center'}}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                    },
                    dateText: {
                      ...FONTS.h2,
                      fontSize: SIZES.width > 350 ? 22 : 16,
                      textAlign: 'center',
                      color: '#696969',
                      fontWeight: 'bold',
                      // backgroundColor : 'green'
                    },
                  }}
                  onDateChange={(e) => {
                    setDateValue(e);
                  }}
                />
              </View>

              <View style={{marginTop: SIZES.height > 700 ? '23%' : '10%'}}>
                <Button
                  title="Save"
                  titleStyle={{fontSize: SIZES.width > 350 ? 18 : 13}}
                  onPress={() => {
                    addDOBViewColor();
                  }}
                  buttonStyle={{
                    borderRadius: 20,
                    alignSelf: 'center',
                    // padding: 10,
                    // paddingLeft: 20,
                    // paddingRight: 20,
                    padding: SIZES.width > 350 ? 10 : 5,
                    paddingLeft: SIZES.width > 350 ? 20 : 12,
                    paddingRight: SIZES.width > 350 ? 20 : 12,
                    backgroundColor: '#2174dc',
                  }}></Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#50c1d3" barStyle="dark-content" />
        <View style={{}}>
          <LinearGradient
            colors={['#50c1d3', '#2e8ada']}
            style={{width: '100%', paddingTop: '5%'}}>
            <TextComp
              customeStyle={{
                ...FONTS.h2,
                fontSize: SIZES.width > 350 ? 22 : 15,
                textAlign: 'center',
                color: 'white',
                bottom: SIZES.width > 350 ? 15 : 10,
                paddingTop: '8%',
                // marginTop: '5%',
              }}>
              Welcome {user.name} !
            </TextComp>
          </LinearGradient>
        </View>

        <View style={{marginTop: '15%'}}>
          <TextComp
            customeStyle={{
              ...FONTS.h3,
              textAlign: 'center',
              marginRight: 30,
              marginLeft: 30,
              fontSize: SIZES.width > 350 ? 19 : 13,
              bottom: SIZES.width > 350 ? 50 : 40,
              color: '#646464',
            }}>
            Please Fill in the following information to build your profile
          </TextComp>
        </View>

        <View
          style={{alignSelf: 'center', bottom: SIZES.width > 350 ? 40 : 35}}>
          <Indicator
            thirdIndicatorStyles={thirdIndicatorStyles}
            currentPosition={currentPosition}
          />
        </View>
        
        <View style={{bottom: 30}}>
          <TouchableOpacity
            onPress={() => {
              choosePhotoFromLib();
            }}>
            <View
              style={{
                marginTop: 10,
                borderWidth: 2,
                borderRadius: 50,
                flexDirection: 'row',
                borderColor: photoBorderColor,
                // backgroundColor: addPhotoColor,
                marginLeft: 20,
                marginRight: 20,
                bottom: 10,
              }}>
              <LinearGradient
                colors={[addPhotoColor2, addPhotoColor]}
                style={{flexDirection: 'row', width: '100%', borderRadius: 50}}>
                <TextComp
                  customeStyle={{
                    ...FONTS.h2,
                    color: phototextColor,
                    marginLeft: 30,
                    // marginTop: 5,
                    top: SIZES.width > 350 ? 6 : 3,
                    fontSize: SIZES.width > 350 ? 22 : 15,
                  }}>
                  Add your Image
                </TextComp>

                <View style={{marginLeft: SIZES.width > 400 ? '34%' : '20%'}}>
                  <CheckBox
                    containerStyle={{
                      borderRadius: 30,
                      backgroundColor: 'white',
                      marginLeft: SIZES.width > 350 ? 5 : 40,
                      // marginRight : 35
                    }}
                    // size={20}
                    size={SIZES.width > 350 ? 20 : 10}
                    checked={true}
                    iconType="material-community"
                    checkedIcon="check-bold"
                    checkedColor={checkColorPhoto}
                  />
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setGender(true);
            }}>
            <View
              style={{
                marginTop: 20,
                borderWidth: 2,
                borderRadius: 50,
                flexDirection: 'row',
                borderColor: genderBorderColor,
                // backgroundColor: addGenderColor,
                // marginLeft: 20,
                // marginRight: 20,
                marginLeft: 20,
                marginRight: 20,
                bottom: 12,
              }}>
              <LinearGradient
                colors={[addGenderColor2, addGenderColor]}
                style={{flexDirection: 'row', width: '100%', borderRadius: 50}}>
                <TextComp
                  customeStyle={{
                    ...FONTS.h2,
                    color: gendertextColor,
                    marginLeft: 30,
                    marginTop: 5,
                    top: SIZES.width > 350 ? 3 : 0,
                    fontSize: SIZES.width > 350 ? 22 : 15,
                  }}>
                  Gender
                </TextComp>
                <View style={{marginLeft: SIZES.width > 400 ? '55%' : '45%'}}>
                  <CheckBox
                    containerStyle={{
                      borderRadius: 30,
                      backgroundColor: 'white',
                      marginLeft: SIZES.width > 350 ? 10 : 30,
                    }}
                    // size={20}
                    size={SIZES.width > 350 ? 20 : 10}
                    checked={true}
                    iconType="material-community"
                    checkedIcon="check-bold"
                    checkedColor={checkColorGender}
                  />
                </View>
              </LinearGradient>
              <AddGender />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setWeight(true);
            }}>
            <View
              style={{
                marginTop: 20,
                borderWidth: 2,
                borderRadius: 50,
                flexDirection: 'row',
                borderColor: weightBorderColor,
                // backgroundColor: addWeightColor,
                marginLeft: 20,
                marginRight: 20,
                bottom: 12,
              }}>
              <LinearGradient
                colors={[addWeightColor2, addWeightColor]}
                style={{flexDirection: 'row', width: '100%', borderRadius: 50}}>
                <TextComp
                  customeStyle={{
                    ...FONTS.h2,
                    color: weighttextColor,
                    marginLeft: 30,
                    marginTop: SIZES.width > 350 ? 5 : 2,
                    top: SIZES.width > 350 ? 3 : 0,
                    fontSize: SIZES.width > 350 ? 22 : 15,
                  }}>
                  Weight
                </TextComp>
                <View
                  style={{
                    // marginLeft: '55%'
                    marginLeft: SIZES.width > 400 ? '55%' : '45%',
                  }}>
                  <CheckBox
                    containerStyle={{
                      borderRadius: 30,
                      backgroundColor: 'white',
                      marginLeft: SIZES.width > 350 ? 10 : 30,
                    }}
                    size={SIZES.width > 350 ? 20 : 10}
                    checked={true}
                    iconType="material-community"
                    checkedIcon="check-bold"
                    checkedColor={checkColorWeight}
                  />
                </View>
              </LinearGradient>
              <AddWeight />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setHeight(true);
            }}>
            <View
              style={{
                marginTop: 20,
                borderWidth: 2,
                borderRadius: 50,
                flexDirection: 'row',
                borderColor: heightBorderColor,
                // backgroundColor: addHeightColor,
                marginLeft: 20,
                marginRight: 20,
                bottom: 12,
              }}>
              <LinearGradient
                colors={[addHeightColor2, addHeightColor]}
                style={{flexDirection: 'row', width: '100%', borderRadius: 50}}>
                <TextComp
                  customeStyle={{
                    ...FONTS.h2,
                    color: heighttextColor,
                    marginLeft: 30,
                    marginTop: 5,
                    top: SIZES.width > 350 ? 3 : 0,
                    fontSize: SIZES.width > 350 ? 22 : 15,
                  }}>
                  Height
                </TextComp>
                <View
                  style={{
                    // marginLeft: '56%'
                    marginLeft: SIZES.width > 400 ? '56%' : '46%',
                  }}>
                  <CheckBox
                    containerStyle={{
                      borderRadius: 30,
                      backgroundColor: 'white',
                      marginLeft: SIZES.width > 350 ? 10 : 30,
                    }}
                    // size={20}
                    size={SIZES.width > 350 ? 20 : 10}
                    iconType="material-community"
                    checkedIcon="check-bold"
                    checked={true}
                    checkedColor={checkColorHeight}
                  />
                </View>
              </LinearGradient>
              <AddHeight />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setDOB(true);
            }}>
            <View
              style={{
                marginTop: 20,
                borderWidth: 2,
                // padding: 5,
                borderRadius: 50,
                flexDirection: 'row',
                borderColor: dobBorderColor,
                // backgroundColor: addDOBColor,
                marginLeft: 20,
                marginRight: 20,
                bottom: 12,
              }}>
              <LinearGradient
                colors={[addDOBColor2, addDOBColor]}
                style={{flexDirection: 'row', width: '100%', borderRadius: 50}}>
                <TextComp
                  customeStyle={{
                    ...FONTS.h2,
                    color: dobtextColor,
                    marginLeft: 30,
                    marginTop: 5,
                    top: SIZES.width > 350 ? 3 : 0,
                    fontSize: SIZES.width > 350 ? 22 : 15,
                  }}>
                  Date of Birth
                </TextComp>
                {/* <CheckBox style={{marginLeft: 120}} /> */}
                <View
                  style={{
                    // marginLeft: '40%'
                    marginLeft: SIZES.width > 400 ? '40%' : '27%',
                    // marginRight : 30
                  }}>
                  <CheckBox
                    containerStyle={{
                      borderRadius: 30,
                      backgroundColor: 'white',
                      marginLeft: SIZES.width > 350 ? 10 : 40,
                      borderColor: 'white',
                    }}
                    // size={20}
                    size={SIZES.width > 350 ? 20 : 10}
                    checked={true}
                    iconType="material-community"
                    checkedIcon="check-bold"
                    checkedColor={checkColorDOB}
                  />
                </View>
              </LinearGradient>
              <AddDOB />
            </View>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 40,
              marginLeft: SIZES.width > 400 ? 140 : 100,
              marginRight: SIZES.width > 400 ? 140 : 100,
              bottom: 25,
            }}>
            <Button
              disabled={buttonVisible}
              icon={
                <Icon
                  name="arrow-forward-outline"
                  type="ionicon"
                  color="#ffffff"
                  size={SIZES.width > 350 ? 25 : 15}
                />
              }
              buttonStyle={{
                borderRadius: 30,
                backgroundColor: '#2074dc',
                padding: 10,
              }}
              onPress={() => {
                navigation.navigate('MiddleIcon');
              }}></Button>
          </View>
          <View style={{alignItems: 'center', marginTop: 5, bottom: 25}}>
            <TouchableOpacity>
              <TextComp
                style={{
                  ...FONTS.h2,
                  fontSize: SIZES.width > 350 ? 22 : 10,
                  color: '#666666',
                }}
                onPress={() => {
                  navigation.navigate('MiddleIcon');
                }}>
                Skip
              </TextComp>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
});

AddProfileDetails.navigationOptions = {
  header: () => null,
};

// AddProfileDetails.prototypes = {
//   uploadImageProfile: PropTypes.func.isRequired,
// };

const mapStateToProps = (store) => {
  console.log('user-===--', store.user.user);
  return {user: store.user.user};
};

export default connect(mapStateToProps, {updateProfile, uploadImageProfile})(
  AddProfileDetails,
);
