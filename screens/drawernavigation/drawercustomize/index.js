import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Button, Image, Avatar, Divider, Header} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '../../../storage';
// import {} from 'react-navigation';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Modal,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {images, theme} from '../../../constants';
import {
  recieveHS,
  getSymtomsById,
  updateGutScore,
  getExpiredDays,
} from '../../../redux/healthsurvey/components/healthsurvey.action';
import Indicator from '../../../component/stepprogressbar';
import TextComp from '../../../component/text';
import Loading from '../../../component/spinner';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
const {COLORS, FONTS, SIZES} = theme;
const {allergy, sneeze, stomach1, stomach2} = images;
import {DrawerItems} from 'react-navigation-drawer';

const DrawerCustomize = (props) => {
  const base64Image = props.user.image;
  const logout = () => {
    Alert.alert(
      'Log out',
      'Do you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            AsyncStorage.clear();
            props('loginFlow');
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <SafeAreaView>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#e5e5e5',
          height: SIZES.height > 600 ? SIZES.height / 3.9 : 150,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 20,
            top: 15,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Avatar
              size="large"
              title="BM"
              rounded
              source={{uri: `data:image/jpeg;base64,${base64Image}`}}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              right: 20,
            }}>
            <TextComp
              customeStyle={{
                ...FONTS.h3,
                color: '#4c4c4c',
              }}>
              HI {props.user.name}
            </TextComp>
          </View>
        </View>
      </View>
      <View>
        <DrawerItems {...props} />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => logout()}
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            paddingHorizontal: 15,
            paddingVertical: 10,
          }}>
          <MaterialCommunityIcons
            name="logout"
            size={SIZES.width / 15}
            style={{width: SIZES.width / 15}}
            color="#2e7cde"
          />
          <Text
            style={{
              marginHorizontal: 30,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => {
  // console.log(store.healthsurvey.gutSurvey);
  return {gutSurvey: store.healthsurvey.gutSurvey, user: store.user.user};
};
// DrawerCustomize.navigationOptions = {
//   header: () => null,
// };
const styles = StyleSheet.create({});
export default connect(mapStateToProps, {})(DrawerCustomize);
