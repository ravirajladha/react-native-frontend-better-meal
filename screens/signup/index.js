import React, {useState, useRef} from 'react';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import TextBox from '../../component/textbox';
import {View, Text, ScrollView, Picker, StyleSheet,TouchableOpacity} from 'react-native';
import {MButton} from '../../component/button';
import Spacer15 from '../../component/spacer';
import {connect} from 'react-redux';
import {signUp} from '../../redux/user/components/user.action';
import InputField from '../../component/textinput_validation';
import Header from '../../component/header';
import Facebook from '../../component/sociallogin/facebook';
import Google from '../../component/sociallogin/google';
import TextComp from '../../component/text';
import Orline from '../../component/or_line';
import PrivacyPolicy from '../../screens/signup/privacyPolicy'
import {theme, images} from '../../constants';
// theme
const {COLORS, FONTS, SIZES} = theme;
const Signup = ({
  navigation,
  user,
  showSpinner,
  shortMsg,
  lngMsg,
  code,
  signdCrd,
  signUp,
}) => {
  const [values, setValues] = React.useState({});
  const [selectedValue, setSelectedValue] = useState('java');
  const inputRefs = React.useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const handleInputChange = (name, value) => {
    // console.log("calling ====1");
    // console.log('Values::handleInputChange', value);
    if (value.length > 0) {
      // console.log('Values.length inside');
      setValues({
        ...values,
        [name]: value,
      });
    }
  };
  const onSubmit = async () => {
    // console.log('VAlues coming in submit', values);
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
    console.log('isValid', isValid);
    if (isValid === true) {
      handle();
    }

    signUp(values);
  };
  const handle = () => {
    console.log('onSuccessSignUp');
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <Header title1="Welcome" title2="Sign up to create account" />
      <View>
        <Text>{shortMsg}</Text>
        <View style={{marginTop: 15, marginBottom: 5}}>
          <InputField
            ref={inputRefs.current[0]}
            handleInputChange={handleInputChange}
            validation="required||min:6"
            placeholder="Name"
            name="name"
          />
        </View>
        <View
          style={{
            marginVertical: 5,
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              height: 50,
              width: '25%',
              // padding: 8,
              borderColor: 'gray',
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 8,
            }}>
            <Picker
              selectedValue={selectedValue}
              style={{
                height: 50,
                width: 92,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="+91" value="java" />
              <Picker.Item label="+1" value="js" />
            </Picker>
          </View>
          <View style={{width: '75%'}}>
            <InputField
              // style={styles.input}
              ref={inputRefs.current[1]}
              handleInputChange={handleInputChange}
              // defaultValue="HI sujan"
              placeholder="Phone Number"
              validation="required|min:10|max:10|onlynumber"
              name="number"
              customeStyle={{width: SIZES.width / 1.55}}
            />
          </View>
        </View>
        <View style={{marginVertical: 5, paddingHorizontal: 15}}>
          <InputField
            ref={inputRefs.current[2]}
            handleInputChange={handleInputChange}
            placeholder="Email"
            validation="required|emailpattern"
            name="email"
          />
        </View>
        <View style={{marginVertical: 5}}>
          <InputField
            ref={inputRefs.current[3]}
            handleInputChange={handleInputChange}
            placeholder="Password"
            validation="required|min:6"
            name="password"
          />
        </View>
        <View style={{marginVertical: 5}}>
          <InputField
            ref={inputRefs.current[4]}
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
            borderRadius: 7,
            overflow: 'hidden',
          }}>
          <MButton
            loading={showSpinner}
            title="Sign Up"
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
            marginTop: 20,
          }}>
          <TextComp
            customeStyle={{...FONTS.body3, color: COLORS.lightblack}}
            onPress={() => navigation.navigate('ForgotpasswordScreen')}>
            registered user?
          </TextComp>
          <TextComp
            customeStyle={{...FONTS.body3, color: COLORS.lightblue}}
            onPress={() => navigation.navigate('Signin')}>
            {'  '}
            Sign in
          </TextComp>
        </View>
        <View
          style={{
            marginTop: 40,
          }}>
          <Orline />
        </View>

        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Facebook title="  Sign up with Facebook" />
        </View>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Google title="  Sign up with Gmail" />
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
            <TextComp customeStyle={{color: COLORS.lightblue}}
            onPress={() => navigation.navigate('TermConditionScreen')}>          
              Terms of Use
            </TextComp>{' '}
            and{' '}
            {/* <TouchableOpacity  
              // 
            > */}
            <TextComp customeStyle={{color: COLORS.lightblue}}
            onPress={() => navigation.navigate('PrivacyPolicy')}
            >
              Privacy Policy
            </TextComp>
            {/* </TouchableOpacity> */}
          </TextComp>
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = (store) => {
  return store.user;
};
// Signup.navigationOptions = {
//   header: () => null,
// };
const styles = StyleSheet.create({
  container: {},
});
export default connect(mapStateToProps, {signUp})(Signup);
