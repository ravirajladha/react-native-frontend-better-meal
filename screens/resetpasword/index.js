import React from 'react';
import {Button} from 'react-native-elements';
import {images, theme} from '../../constants';
import {View, Text} from 'react-native';
const {COLORS, FONTS, SIZES} = theme;
import TextComp from '../../component/text';
import Header from '../../component/header';
import InputField from '../../component/textinput_validation';
import {MButton} from '../../component/button';
import {connect} from 'react-redux';
import {passwordReset} from '../../redux/forgotpassword/components/forgotpass.action';
const Resetpassword = ({
  navigation,
  showSpinner,
  resetemail,
  passwordReset,
  lngMsg,
  shortMsg,
}) => {
  const [values, setValues] = React.useState({});

  const inputRefs = React.useRef([React.createRef(), React.createRef()]);

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
    console.log('VAlues coming in submit', resetemail);
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
      passwordReset(values, resetemail);
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
          Reset your password
        </TextComp>
      </View>
      <View style={{marginVertical: 5}}>
        <InputField
          ref={inputRefs.current[1]}
          handleInputChange={handleInputChange}
          placeholder="Password"
          validation="required|min:6"
          name="password"
        />
      </View>
      <View style={{marginVertical: 5}}>
        <InputField
          ref={inputRefs.current[2]}
          handleInputChange={handleInputChange}
          placeholder="Confirm Password"
          validation="passwordmatch"
          name="confirmpassword"
          password={values.password}
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
          title="Reset"
          onPress={() => {
            onSubmit();
          }}
        />
      </View>
    </View>
  );
};
Resetpassword.navigationOptions = {
  header: () => null,
};

const mapStateToProps = (store) => {
  return store.forgotpassword;
};

export default connect(mapStateToProps, {passwordReset})(Resetpassword);
