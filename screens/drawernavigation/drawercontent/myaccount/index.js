import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Pickers from '@gregfrench/react-native-wheel-picker';
var PickerItem = Pickers.Item;
import {Button, Avatar, Badge, Icon} from 'react-native-elements';
import TextComp from '../../../../component/text';
import {FONTS, SIZES} from '../../../../constants';
import Label from '../../../../component/text';
import InputField from '../../../../component/textbox';
import {Picker} from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import {
  editProfileDetails,
  editProfileDetailsImage,
} from '../../../../redux/editProfilePage/components/editprofile.action';
// import {resumeSession} from '../../../../redux/splash/components/splash.action';
import EditProfileModalPopup from '../../../../component/edit_model_popup';

function numberRange(start, end) {
  return new Array(end - start).fill().map((d, i) => i + start);
}
const EditProfile = ({
  navigation,
  editProfileDetails,
  editProfileDetailsImage,
  user,
}) => {
  // console.disableYellowBox = true;

  const [FNtext, setOnChangeFirstname] = React.useState(user.name);

  const [Numtext, setOnChangeNumber] = React.useState(user.number);
  const [Emailtext, setOnChangeEmail] = React.useState(user.email);
  const [WeightText, setOnChangeWeightText] = React.useState(user.weight);
  const [HeightText, setOnChangeHeightText] = React.useState(user.height);
  const [genderText, setOnChangeGenderText] = React.useState(user.gender);
  const [dateValue, setDateValue] = useState(user.dateofbirth);

  const [selectedHeightList, setSelectedHeightList] = useState(
    user.height ? user.height : 0,
  );
  const [selectedWeightList, setSelectedWeightList] = useState(
    user.weight ? user.weight : 0,
  );
  const [weightList, setweightList] = useState(numberRange(0, 300));
  const [heightList, setheightList] = useState(numberRange(0, 500));
  const [weightOpenPopup, setWeightOpenPopup] = useState(false);
  const [heightOpenPopup, setHeightOpenPopup] = useState(false);

  let id = user.id;
  // console.log('date of birth---',user.gender)

  let photo;
  let heightval = HeightText;
  let weightval = WeightText;
  const base64Image = user.image;

  const chosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      photo = image.path;

      editProfileDetailsImage(id, photo);
    });
  };

  function postingData() {
    editProfileDetails(
      id,
      FNtext,
      Numtext,
      Emailtext,
      HeightText,
      WeightText,
      dateValue,
      genderText,
    );
    navigation.navigate('MiddleIcon');
  }

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row'}}>
        <LinearGradient
          colors={['#50c1d3', '#2e8ada']}
          style={styles.linearGradient}>
          {/* padding: 0,
            paddingBottom: 40,
            paddingLeft: 125,
            paddingRight: 125,
            marginTop: 0,
            paddingTop: 15, */}
          {/* }}> */}

          <Avatar
            size="xlarge"
            title="BM"
            icon={{name: 'home'}}
            rounded
            source={{uri: `data:image/jpeg;base64,${base64Image}`}}
            activeOpacity={0.7}
            containerStyle={{
              alignSelf: 'center',
              backgroundColor: 'white',
              marginTop: SIZES.height > 350 ? '35%' : '15%',
            }}>
            <Icon
              size={40}
              name="camera"
              type="ionicon"
              color="black"
              containerStyle={styles.cameraicon}
              // position: 'absolute', top: 120, left: 100}}
              onPress={() => chosePhoto()}
            />
          </Avatar>
          <View>
            <TextComp customeStyle={styles.section1_text1}>
              {/* // ...FONTS.h2,
                // textAlign: 'center',
                // color: 'white',
                // marginTop: 10,
              }}> */}
              {user.name}
            </TextComp>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.view1}>
        {/* //  marginTop: 20, marginLeft: 20, marginRight: 20
      // }}> */}
        <View style={styles.fullname}>
          <Label>Fullname</Label>
        </View>
        <View>
          <TextInput
            style={styles.fullname_text}
            //   height: 40,
            //   margin: 12,
            //   borderWidth: 1,
            //   borderRadius: 10,
            //   paddingLeft: 15,
            // // }}
            onChangeText={(e) => {
              setOnChangeFirstname(e);
            }}
            value={FNtext}
          />
        </View>
      </View>

      <View
        style={{
          // styles.view2}>
          marginLeft: 20,
          marginRight: 20,
        }}>
        <View
          style={{
            // styles.view2_part1}>
            flexDirection: 'row',
          }}>
          <View style={{marginLeft: 15}}>
            {/* // styles.mombileNumber}> */}
            <Label>Mobile number</Label>
          </View>
          <Icon
            name="pencil-outline"
            size={20}
            color="blue"
            type="ionicon"
            iconStyle={{marginLeft: '65%'}}
          />
        </View>
        <View>
          <TextInput
            style={{
              // styles.mobilenumber_text

              height: 40,
              margin: 12,
              borderWidth: 1,
              borderRadius: 10,
              paddingLeft: 15,
            }}
            onChangeText={(e) => {
              setOnChangeNumber(e);
            }}
            keyboardType="numeric"
            value={Numtext}
          />
        </View>
      </View>
      <View style={styles.view3}>
        {/* marginLeft: 20, marginRight: 20}> */}
        <View style={styles.view3_part1}>
          {/* flexDirection: 'row'}> */}
          <View style={styles.emailId}>
            {/* marginLeft: 15}> */}
            <Label>Email Id</Label>
          </View>
          <Icon
            name="pencil-outline"
            color="blue"
            size={20}
            type="ionicon"
            iconStyle={{marginLeft: '75%'}}
          />
        </View>
        <TextInput
          style={styles.emailId_text}
          //   height: 40,
          //   margin: 12,
          //   borderWidth: 1,
          //   borderRadius: 10,
          //   paddingLeft: 15,
          // }}
          value={Emailtext}
          onChangeText={(e) => {
            setOnChangeEmail(e);
          }}
        />
      </View>
      <View style={styles.view4}>
        {/* marginLeft: 20, marginRight: 20}}> */}
        <View style={styles.dob}>
          {/* // marginLeft: 15, marginBottom: 5}> */}
          <Label>Date of birth</Label>
        </View>
        <View style={styles.datePicker}>
          {/* marginTop: 5,
            borderWidth: 1,
            height: 40,
            marginBottom: 15,
            marginLeft: 10,
            marginRight: 12,
            borderRadius: 10,
          }}> */}
          <DatePicker
            hideText={false}
            disabled={false}
            showIcon={false}
            androidMode="spinner"
            format="DD / MM / YYYY"
            mode="date"
            date={dateValue}
            value={dateValue}
            style={{
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
              right: 3,
            }}
            customStyles={{
              dateInput: {
                borderWidth: 0,
              },
              dateText: {
                ...FONTS.h3,
                textAlign: 'center',
                color: '#696969',
              },
            }}
            onDateChange={(e) => {
              setDateValue(e);
            }}
          />
        </View>
      </View>
      <View style={styles.view5}>
        {/* marginLeft: 30, marginRight: 30}}> */}
        <View style={styles.gender}>
          {/* marginBottom: 10}}> */}
          <Label>Gender</Label>
        </View>
        <View style={{borderWidth: 1, height: 40, borderRadius: 10}}>
          <Picker
            selectedValue={genderText}
            style={{paddingLeft: 15, bottom: 8, left: 10}}
            mode="dropdown"
            onValueChange={(e) => setOnChangeGenderText(e)}>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
          {/* {console.log('date of birth---',genderText)} */}
        </View>
      </View>
      <View style={{marginLeft: 20, marginRight: 20, marginTop: 10}}>
        <View
          style={{
            // marginLeft: 15,
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Label>Weight </Label>
          </View>
          <View>
            <Icon
              name="pencil-outline"
              color="blue"
              size={20}
              type="ionicon"
              onPress={() => setWeightOpenPopup(true)}
              // iconStyle={{marginLeft: '75%'}}
            />
          </View>
        </View>
        {/* <View>
          <TextInput
            style={{
              height: 40,
              margin: 12,
              borderWidth: 1,
              borderRadius: 10,
              paddingLeft: 15,
            }}
            editable={false}
            value={weightval === null ? '0' : weightval}
            keyboardType="numeric"
          />
        </View> */}

<View  style={{borderStyle:"solid",borderWidth:1,borderColor:"black",borderRadius:12,marginTop:15,marginHorizontal:15,marginBottom:10}}>
<Text style={{paddingVertical:12,paddingLeft:12}}>{weightval}</Text>
        </View>
        <EditProfileModalPopup open={weightOpenPopup}>
          <View style={{paddingHorizontal: 40}}>
            <Pickers
              style={{width: 150, height: 180}}
              lineColor="#000000" //to set top and bottom line color (Without gradients)
              lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
              lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
              selectedValue={selectedWeightList}
              itemStyle={{color: 'black', fontSize: 26}}
              onValueChange={(value) => {
                setSelectedWeightList(value);
              }}>
              {weightList.map((value, i) => (
             
                <PickerItem
                  label={value.toString() + ' lbs'}
                  value={value}
                  key={i}
                />
              ))}
            </Pickers>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Button
              title="set"
              titleStyle={{fontSize: SIZES.width > 350 ? 18 : 12}}
              onPress={() => {
                setWeightOpenPopup(false);
                setOnChangeWeightText(selectedWeightList);
              }}
              buttonStyle={{
                borderRadius: 30,
                backgroundColor: '#2074dc',
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}></Button>
          </View>
        </EditProfileModalPopup>
      </View>

      <View style={{marginLeft: 20, marginRight: 20}}>
        <View
          style={{
            // marginLeft: 15,
            paddingHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Label>Height </Label>
          </View>
          <View>
            <Icon
              name="pencil-outline"
              color="blue"
              size={20}
              type="ionicon"
              onPress={() => setHeightOpenPopup(true)}
              // iconStyle={{marginLeft: '75%'}}
            />
          </View>
        </View>
        {/* <Text
          style={{
            paddingLeft: 15,
            height: 40,
            margin: 12,
            borderWidth: 1,
            borderRadius: 10,
          }}
          editable={false}
          keyboardType="numeric"
          value={HeightText === null ? '0' : HeightText}
          // onChangeText={(e) => {
          //   setOnChangeWeightText(e);
          // }}
        /> */}
        <View  style={{borderStyle:"solid",borderWidth:1,borderColor:"black",borderRadius:12,marginTop:15,marginHorizontal:15}}>
<Text style={{paddingVertical:12,paddingLeft:12}}>{HeightText}</Text>
        </View>
      </View>
      <EditProfileModalPopup open={heightOpenPopup}>
        <View style={{paddingHorizontal: 40}}>
          <Pickers
            style={{width: 150, height: 180}}
            lineColor="#000000" //to set top and bottom line color (Without gradients)
            lineGradientColorFrom="#008000" //to set top and bottom starting gradient line color
            lineGradientColorTo="#FF5733" //to set top and bottom ending gradient
            selectedValue={selectedHeightList}
            itemStyle={{color: 'black', fontSize: 26}}
            onValueChange={(value) => {
              setSelectedHeightList(value);
            }}>
            {heightList.map((value, i) => (
              <PickerItem
                label={value.toString() + ' cm'}
                value={value}
                key={i}
              />
            ))}
          </Pickers>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Button
            title="set"
            titleStyle={{fontSize: SIZES.width > 350 ? 18 : 12}}
            onPress={() => {
              setHeightOpenPopup(false);
              setOnChangeHeightText(selectedHeightList);
            }}
            buttonStyle={{
              borderRadius: 30,
              backgroundColor: '#2074dc',
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }}></Button>
        </View>
      </EditProfileModalPopup>

      <View
        style={{
          marginTop: 30,
          marginLeft: 100,
          marginRight: 100,
          marginBottom: 20,
        }}>
        <View
          style={{
            marginRight: SIZES.width > 350 ? 30 : 20,
            marginLeft: SIZES.width > 350 ? 30 : 20,
          }}>
          <Button
            title="save"
            titleStyle={{fontSize: SIZES.width > 350 ? 18 : 12}}
            onPress={() => {
              postingData();
            }}
            buttonStyle={{
              borderRadius: 30,
              backgroundColor: '#2074dc',
              padding: 10,
              paddingLeft: 20,
              paddingRight: 20,
            }}></Button>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  // input: {
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  //   borderRadius: 10,
  // },
  linearGradient: {
    padding: 0,
    paddingBottom: 40,
    paddingLeft: 125,
    paddingRight: 140,
    marginTop: 0,
    paddingTop: 15,
    width: '100%',
  },
  cameraicon: {
    position: 'absolute',
    top: 120,
    left: 100,
  },
  section1_text1: {
    ...FONTS.h2,
    fontSize: SIZES.width > 350 ? 22 : 12,
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
  },
  view1: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  fullname: {
    marginLeft: 15,
  },
  fullname_text: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
  },
  view2: {
    marginLeft: 20,
    marginRight: 20,
  },
  view2_part1: {
    flexDirection: 'row',
  },
  mombileNumber: {
    marginLeft: 15,
  },
  mobilenumber_text: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
  },
  view3: {
    marginLeft: 20,
    marginRight: 20,
  },
  view3_part1: {
    flexDirection: 'row',
  },
  emailId: {
    marginLeft: 15,
  },
  emailId_text: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
  },
  view4: {
    marginLeft: 20,
    marginRight: 20,
  },
  dob: {
    marginLeft: 15,
    marginBottom: 5,
  },
  datePicker: {
    marginTop: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 12,
    borderRadius: 10,
  },
  view5: {
    marginLeft: 30,
    marginRight: 30,
  },
  gender: {
    marginBottom: 10,
  },
});

EditProfile.navigationOptions = {
  header: () => null,
};

const mapStateToProps = (store) => {
  return {user: store.user.user};
};

export default connect(mapStateToProps, {
  editProfileDetails,
  editProfileDetailsImage,
  // resumeSession,
})(EditProfile);
