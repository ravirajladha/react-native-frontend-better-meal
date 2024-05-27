import React from 'react';
import {images, theme} from '../../constants';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
const {COLORS, FONTS, SIZES} = theme;
import TextComp from '../../component/text';
import Header from '../../component/header';
import InputField from '../../component/textinput_validation';
import {forgotPassword} from '../../redux/forgotpassword/components/forgotpass.action';
import {MButton} from '../../component/button';
const Forgotpassword = ({
  navigation,
  showSpinner,
  forgotPassword,
  lngMsg,
  shortMsg,
}) => {
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
      forgotPassword(values);
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
            ...FONTS.h2,
            alignSelf: 'center',
            color: COLORS.midblack,
          }}>
          Forgot Password?
        </TextComp>
      </View>
      <View>
        <InputField
          ref={inputRefs.current[0]}
          handleInputChange={handleInputChange}
          validation="required"
          placeholder="Email Id"
          name="email"
        />
      </View>
      <View style={{alignContent: 'center', paddingHorizontal: 30}}>
        <TextComp
          customeStyle={{
            ...FONTS.h3,
            textAlign: 'center',
            color: COLORS.midblack,
            paddingTop: 50,
          }}>
          we will send you a temporary link to help you reset your password
        </TextComp>
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
          title="Send"
          onPress={() => {
            onSubmit();
          }}
        />
      </View>
    </View>
  );
};
// Forgotpassword.navigationOptions = {
//   header: () => null,
// };
const mapStateToProps = (store) => {
  return store.forgotpassword;
};

export default connect(mapStateToProps, {forgotPassword})(Forgotpassword);
