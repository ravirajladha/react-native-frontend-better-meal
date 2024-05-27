import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TextBox from '../../component/textbox';
import Label from '../../component/text';
import {MButton, IButton} from '../../component/button';
import Spacer15 from '../../component/spacer';
import {signIn} from '../../redux/user/components/user.action';
import {View, ScrollView} from 'react-native';
import Facebook from '../../component/sociallogin/facebook';
import Google from '../../component/sociallogin/google';
import InputField from '../../component/textinput_validation';
import TextComp from '../../component/text';
import Header from '../../component/header';
import Orline from '../../component/or_line';
import {theme, images} from '../../constants';
// theme
const {COLORS, FONTS, SIZES} = theme;
const Signin = ({
  navigation,
  user,
  showSpinner,
  shortMsg,
  lngMsg,
  code,
  signdCrd,
  signIn,
  socialSignUp,
  resetemail,
  users
}) => {
  const [values, setValues] = React.useState({});

  const inputRefs = React.useRef([React.createRef(), React.createRef()]);

  const handleInputChange = (name, value) => {
    // console.log("calling ====1");
    // console.log('Values::handleInputChange', value);
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
    let navigationprofile = false;
  
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
           
      signIn(values);
   
  }
   
  };
  const navi = () => {};

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Header title1="Welcome" title2="Sign in to continue" />
      <View>
        <Label>{resetemail}</Label>
        <Label>{shortMsg}</Label>
        <View style={{marginTop: 10}}>
          <InputField
            ref={inputRefs.current[0]}
            handleInputChange={handleInputChange}
            validation="required"
            placeholder="Email"
            name="username"
          />
        </View>
        <View style={{marginTop: 5}}>
          <InputField
            ref={inputRefs.current[1]}
            handleInputChange={handleInputChange}
            validation="required"
            placeholder="Password"
            name="password"
          />
        </View>
        <View style={{marginBottom: 20}}>
          <TextComp
            customeStyle={{
              ...FONTS.h3,
              alignSelf: 'center',
              color: COLORS.lightblue,
              // fontWeight: 'bold',
            }}
            onPress={() => navigation.navigate('Forgotpass')}>
            Forgot password?
          </TextComp>
        </View>
        <View
          style={{
            marginHorizontal: 15,
            borderRadius: 7,
            overflow: 'hidden',
          }}>
          <MButton
            loading={showSpinner}
            title="Sign in"
            onPress={() => {
              onSubmit();
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <TextComp customeStyle={{...FONTS.body3, color: COLORS.lightblack}}>
            New user?
          </TextComp>
          <TextComp
            customeStyle={{...FONTS.body3, color: COLORS.lightblue}}
            onPress={() => navigation.navigate('Signup')}>
            {'  '}
            Sign Up
          </TextComp>
        </View>
        <View
          style={{
            marginTop: 50,
          }}>
          <Orline />
        </View>

        <View style={{alignItems: 'center', marginVertical: 15}}>
          <Facebook title="  Sign in with Facebook" />
        </View>
        <View style={{alignItems: 'center', marginVertical: 15}}>
          <Google title="  Sign in with Gmail" />
        </View>

        <View
          style={{
            marginHorizontal: 35,
            marginTop: 15,
            marginBottom: 10,
          }}>
          <TextComp
            customeStyle={{
              ...FONTS.body4,
              textAlign: 'center',
              color: COLORS.lightblack,
            }}>
            By signing up,you agree with our{' '}
            <TextComp
              customeStyle={{color: COLORS.lightblue}}
              onPress={() => navigation.navigate('TermConditionScreen')}>
              Terms of Use
            </TextComp>{' '}
            and{' '}
            <TextComp customeStyle={{color: COLORS.lightblue}}
             onPress={() => navigation.navigate('PrivacyPolicy')}>
              Privacy Policy
            </TextComp>
          </TextComp>
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = (store) => {
  // console.log('store---',store)
  return store.user;
};
Signin.navigationOptions = {
  header: () => null,
};
export default connect(mapStateToProps, {signIn})(Signin);
