import React from 'react';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import DrawerCustomize from '../screens/drawernavigation/drawercustomize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Support from '../screens/drawernavigation/drawercontent/support';
import MyAccount from '../screens/drawernavigation/drawercontent/myaccount';
import FAQ from '../screens/drawernavigation/drawercontent/faq';
import ChangePassword from '../screens/drawernavigation/drawercontent/changepassword';
import Logout from '../screens/drawernavigation/drawercontent/logout';
import Payment from '../screens/drawernavigation/drawercontent/payment';
import TearmsConditions from '../screens/drawernavigation/drawercontent/terms_conditions';
import Header from '../component/headers';
import {images, SIZES, theme} from '../constants';
const {left1, left2, center, right1, right2} = images;
import BottomTabNavigation from './BottomTabNavigator';

const DrawerNavigator = createDrawerNavigator(
  {
    TrackCreate: {
      screen: BottomTabNavigation,
      navigationOptions: {
        drawerLabel: () => null,
        navigationOptions: {
          drawerLabel: () => null,
        },
      },
    },

    MyAccount: {
      screen: MyAccount,
      navigationOptions: {
        drawerLabel: 'My Account',
        drawerIcon: () => (
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={SIZES.width / 15}
            style={{width: SIZES.width / 15}}
            color="#2e7cde"
          />
        ),
      },
    },
    Faq: {
      screen: FAQ,
      navigationOptions: {
        drawerLabel: 'FAQ',
        drawerIcon: () => (
          <MaterialCommunityIcons
            name="wechat"
            size={SIZES.width / 15}
            style={{width: SIZES.width / 15}}
            color="#2e7cde"
          />
        ),
      },
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: {
        drawerIcon: () => (
          <MaterialCommunityIcons
            name="lock-outline"
            size={SIZES.width / 15}
            style={{width: SIZES.width / 15}}
            color="#2e7cde"
          />
        ),
      },
    },
    Support: {
      screen: Support,
      navigationOptions: {
        drawerLabel: 'Support',
        drawerIcon: () => (
          <MaterialCommunityIcons
            name="headset"
            size={SIZES.width / 15}
            style={{width: SIZES.width / 15}}
            color="#2e7cde"
          />
        ),
      },
    },
    Termsandconditions: {
      screen: TearmsConditions,
      navigationOptions: {
        drawerLabel: 'Terms and Conditions',
        drawerIcon: () => (
          <MaterialCommunityIcons
            name="file-document-outline"
            size={SIZES.width / 15}
            style={{width: SIZES.width / 15}}
            color="#2e7cde"
          />
        ),
      },
    },
    Payment: {
      screen: Payment,
      navigationOptions: {
        drawerLabel: 'Payment',
        drawerIcon: () => (
          <MaterialCommunityIcons
            name="cash-multiple"
            size={SIZES.width / 15}
            style={{width: SIZES.width / 15}}
            color="#2e7cde"
          />
        ),
      },
    },
    //   Logout: {
    //     screen: Logout,
    //     navigationOptions: {
    //       drawerLabel: 'Logout',
    //       drawerIcon: () => (
    //         <MaterialCommunityIcons
    //           name="logout"
    //           size={SIZES.width / 15}
    //           style={{width: SIZES.width / 15}}
    //           color="#2e7cde"
    //         />
    //       ),
    //     },
    //   },
  },
  {
    initialRouteName: 'TrackCreate',
    contentComponent: DrawerCustomize,
    contentOptions: {
      labelStyle: {fontSize: SIZES.width / 30},
    },
  },
);
export default DrawerNavigator;
