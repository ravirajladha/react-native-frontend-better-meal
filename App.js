
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SigninScreen from './screens/signin';
import SignupScreen from './screens/signup';
import OTPScreen from './screens/otp';
import ResetPassScreen from './screens/resetpasword';
import ForgotpasswordScreen from './screens/forgotpassword';
import PrivacyPolicyScreen from './screens/signup/privacyPolicy';
import TermConditionScreen from './screens/drawernavigation/drawercontent/terms_conditions';
import QuickTourScreen from './screens/quicktour';
import SplashScreen from './screens/splash/splash1';
import Header from './component/headers';
import {Provider} from 'react-redux';
import Store from './store';
// import FoodPreference from './screens/nutrition/foodpreference';
import AddProfileDetails from './screens/addProfileDetails'
import {setNavigator} from './navigatorRef';

import {images, SIZES, theme} from './constants';
const {left1, left2, center, right1, right2} = images;
console.disableYellowBox = true;
import DrawerNavigator from './navigation/DrawerNavigator';
const switchNavigator = createSwitchNavigator({
  splash: SplashScreen,
  quickTour: QuickTourScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
    Forgotpass: ForgotpasswordScreen,
    OTP: OTPScreen,
    Passwordreset: ResetPassScreen,
    ProfileDetails: AddProfileDetails,
    PrivacyPolicy: {
      screen: PrivacyPolicyScreen,
      navigationOptions: { headerShown: false,}

    },
    TermConditionScreen: {
      screen: TermConditionScreen,
     
      navigationOptions: { headerShown: false, }

    },
    // EditProfile : EditProfileDetails,
  }),
  mainFlow: DrawerNavigator,
  // healthFlow: createStackNavigator({
  // GutSurvey: GutSurveyScreen,
  // FoodPreferences: FoodPreference,
  // }),
});

let App = createAppContainer(switchNavigator);

export default () => (
  <Provider store={Store}>
    <SafeAreaProvider>
      <App
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </SafeAreaProvider>
  </Provider>
);

