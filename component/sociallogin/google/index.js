import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, Image} from 'react-native';
import {IButton} from '../../button';
import {theme, images} from '../../../constants';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  getTokens,
} from 'react-native-google-signin';
import {socialSigin} from '../../../redux/user/components/user.action';
let GoogleID =
  '763336840755-rhuvkhr7t4c3a1nk70ospegha5e10v9n.apps.googleusercontent.com';
GoogleSignin.configure({
  androidClientId: GoogleID,
});

const Google = ({socialSigin, title}) => {
  const [platform, setPlatform] = React.useState('google');
  const [loaded, setLoaded] = React.useState(false);
  const signIn = async () => {
    try {
      let userGoogleInfo;
      let image;
      console.log('asdsad');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('user details', userInfo);
      if (userInfo) {
        userGoogleInfo = userInfo.user;
        // await setUserGoogleInfo(userInfo.user);
        image = userGoogleInfo.photo;

        console.log('Usr detials', userGoogleInfo, image);
        socialSigin({...userGoogleInfo, platform, image});
      } else {
        console.log('NO Userinfo');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('e 1');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('e 2');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('e 3');
      } else {
        console.log(error.message);
      }
    }
  };
  return (
    <IButton title={title} icon={images.google} onPress={() => signIn()} />
    // <View>
    //   <GoogleSigninButton
    //     style={{width: 222, height: 48}}
    //     size={GoogleSigninButton.Size.Wide}
    //     color={GoogleSigninButton.Color.Dark}
    //     onPress={() => signIn()}
    //   />
    //   {loaded ? (
    //     <View>
    //       <Text>{userGoogleInfo.name}</Text>
    //       <Text>{userGoogleInfo.email}</Text>
    //       <Image
    //         style={{width: 100, height: 100}}
    //         source={{uri: userGoogleInfo.photo}}
    //       />
    //     </View>
    //   ) : (
    //     <Text>Not SignedIn</Text>
    //   )}
    // </View>
  );
};
const mapStateToProps = (store) => {
  return store.user;
};
const styles = StyleSheet.create({});

export default connect(mapStateToProps, {socialSigin})(Google);
