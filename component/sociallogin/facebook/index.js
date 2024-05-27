import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {connect} from 'react-redux';
import {IButton} from '../../button';
import {theme, images} from '../../../constants';
import {
  permissions,
  LoginManager,
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {socialSigin} from '../../../redux/user/components/user.action';
const Facebook = ({title, socialSigin}) => {
  const [platform, setPlatform] = React.useState('facebook');
  const responseInfoCallback = async (error, result) => {
    let userFacebookInfo;
    let image;
    console.log('responseInfoCallback');
    if (error) {
      console.log(error);
      console.log('Error fetching data: ' + error.toString());
    } else {
      console.log('Coming from results', result);
      if (result) {
        // setUserFacebookInfo(result);
        userFacebookInfo = result;
        image = result.picture.data.url;
        socialSigin({...userFacebookInfo, platform, image});
      } else {
        console.log('NO Userinfo');
      }
      // console.log('Success fetching data: ' + JSON.stringify(result));
    }
  };
  const handleFacebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login Cancelled');
        } else {
          console.log(
            'Login Success permission granted:' + result.grantedPermissions,
          );
          AccessToken.getCurrentAccessToken().then((data) => {
            console.log('getCurrentAccessToken');
            let accessToken = data.accessToken;
            console.log(accessToken.toString());

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string:
                      'id, name, email, first_name, last_name, gender,picture.type(large)',
                  },
                },
              },
              responseInfoCallback,
            );

            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        console.log('some error occurred!!');
      },
    );
  };

  return (
    <IButton
      onPress={() => handleFacebookLogin()}
      title={title}
      icon={images.facebook}
    />
  );
};

const mapStateToProps = (store) => {
  return store.user;
};
const styles = StyleSheet.create({});

export default connect(mapStateToProps, {socialSigin})(Facebook);
