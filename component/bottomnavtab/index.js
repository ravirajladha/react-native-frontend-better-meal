import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Text,
  Alert,
} from 'react-native';

export default BottomNavigator = () => {
  const toggleOpen = () => {};

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          backgroundColor: 'white',
          width: 50,
          height: 50,
          borderRadius: 25,
          bottom: 20,
          zIndex: 10,
        }}>
        <TouchableWithoutFeedback onPress={toggleOpen()}>
          <View style={[styles.button, styles.actionBtn]}>
            <Image
              style={{width: 70, height: 70}}
              resizeMode="contain"
              source={{
                uri:
                  'https://icon-library.net/images/android-plus-icon/android-plus-icon-0.jpg',
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          border: 2,
          radius: 3,
          shadowOpacity: 0.3,
          shadowRadius: 3,
          shadowOffset: {
            height: 3,
            width: 3,
          },
          x: 0,
          y: 0,
          style: {marginVertical: 5},
          bottom: 0,
          width: '100%',
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 25,
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('click');
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={{
                uri:
                  'http://pluspng.com/img-png/home-icon-png-home-house-icon-image-202-512.png',
              }}
              onPress={() => {
                Alert.alert('');
              }}></Image>
          </TouchableOpacity>
          <Text style={{justifyContent: 'center', alignItems: 'center'}}>
            Home
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginStart: 30,
          }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('click');
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={{
                uri:
                  'http://simpleicon.com/wp-content/uploads/active-search.png',
              }}
              onPress={() => {
                Alert.alert('click');
              }}
            />
          </TouchableOpacity>
          <Text style={{justifyContent: 'center', alignItems: 'center'}}>
            search{' '}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginStart: 85,
          }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('click');
            }}>
            <Image
              source={{
                uri:
                  'http://pixsector.com/cache/a1dd5a90/av895b2bd52a42e99ee3c.png',
              }}
              onPress={() => {
                Alert.alert('click');
              }}
              style={{marginHorizontal: 16, width: 20, height: 20}}
              containerStyle={{marginHorizontal: 16}}
            />
          </TouchableOpacity>
          <Text style={{justifyContent: 'center', alignItems: 'center'}}>
            Menu{' '}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('click');
            }}>
            <Image
              source={{
                uri:
                  'https://serfob.s3.amazonaws.com/media/settings-icon-png82e-4c02-9f9a-51398c8713ae.png',
              }}
              style={{marginHorizontal: 16, width: 20, height: 20}}
              containerStyle={{marginHorizontal: 16}}
            />
          </TouchableOpacity>
          <Text style={{justifyContent: 'center', alignItems: 'center'}}>
            Setting{' '}
          </Text>
        </View>

        {/* </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOpacity: 0.1,
    shadowOffset: {x: 2, y: 0},
    shadowRadius: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 0,
    top: 5,
    left: 5,
    shadowOpacity: 5.0,
  },
  actionBtn: {
    backgroundColor: '#1E90FF',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
