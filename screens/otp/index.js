import React from 'react';
import {images, theme} from '../../constants';
import {View, Text} from 'react-native';
const {COLORS, FONTS, SIZES} = theme;
import TextComp from '../../component/text';
import Header from '../../component/header';
import InputField from '../../component/textinput_validation';
import {MButton} from '../../component/button';
import {enterOTP} from '../../redux/forgotpassword/components/forgotpass.action';
import {connect} from 'react-redux';
const OTP = ({navigation, showSpinner, enterOTP, lngMsg, shortMsg}) => {
  const [values, setValues] = React.useState({});

  const inputRefs = React.useRef([React.createRef()]);

  const handleInputChange = (name, value) => {
    if (value.length > 0) {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const onSubmit = async () => {
    console.log('VAlues coming in submit', values);
    let isValid = true;
    for (let i = 0; i < inputRefs.current.length; i++) {
      if (inputRefs.current[i].current === null) {
        continue;
      }
      const valid = inputRefs.current[i].current.validate();
      console.log('onSuccessSignUp', valid);
      if (!valid) {
        isValid = false;
      }
    }
    // console.log('isValid', isValid);
    if (isValid === true) {
      enterOTP(values);
    }
  };
  return (
    <View style={{backgroundColor: 'white', height: SIZES.height}}>
      <Header />
      <View>
        <TextComp
          customeStyle={{
            ...FONTS.h2,
            alignSelf: 'center',
            color: 'red',
          }}>
          {shortMsg}
        </TextComp>
      </View>
      <View>
        <TextComp
          customeStyle={{
            ...FONTS.h2,
            alignSelf: 'center',
            color: 'green',
          }}>
          {lngMsg}
        </TextComp>
      </View>
      <View style={{marginVertical: 40}}>
        <TextComp
          customeStyle={{
            ...FONTS.h4,
            alignSelf: 'center',
            color: COLORS.midblack,
          }}>
          Enter 4 digit OTP sent to the registered Email
        </TextComp>
      </View>
      <View>
        <InputField
          ref={inputRefs.current[0]}
          handleInputChange={handleInputChange}
          validation="required"
          placeholder="OTP"
          name="otp"
        />
      </View>

      <View
        style={{
          marginHorizontal: 15,
          marginTop: 30,
          borderRadius: 7,
          overflow: 'hidden',
        }}>
        <MButton
          loading={showSpinner}
          title="Submit"
          onPress={() => {
            onSubmit();
          }}
        />
      </View>
    </View>
  );
};
OTP.navigationOptions = {
  header: () => null,
};

const mapStateToProps = (store) => {
  return store.forgotpassword;
};

export default connect(mapStateToProps, {enterOTP})(OTP);
