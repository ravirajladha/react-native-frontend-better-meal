import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Mbutton from '../../../component/button';
import Spacer from '../../../component/spacer';
import {resumeSession} from '../../../redux/splash/components/splash.action';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

// constants
import {FONTS, images, theme} from '../../../constants';
const {loading} = images;
// theme
const {COLORS, SIZES} = theme;
const OnBoarding = ({
  navigation,
  resumeSession,
  showSpinner,
  shortMsg,
  lngMsg,
  code,
}) => {
  // Render
  let progress = showSpinner ? 'loading' : '';
  if (!showSpinner) {
    alert(shortMsg + ' \n Try again');
  }
  useEffect(() => {
    setTimeout(() => {
      resumeSession();
    }, 500);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={loading}
        resizeMode="cover"
        style={{
          borderColor: 'red',
          width: '100%',
          height: '100%',
        }}
      />

      <View style={styles.imageAndTextContainer}>
        {!showSpinner ? (
          <Spacer>
            <Mbutton
              title={'Try again'}
              onPress={() => {
                resumeSession();
              }}
            />
          </Spacer>
        ) : null}
        <Text style={{...FONTS.h3, color: COLORS.black, textAlign: 'center'}}>
          {progress}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.red,
  },
  imageAndTextContainer: {
    bottom: 10,
    position: 'absolute',
    width: SIZES.width,
  },
});
const mapStateToProps = (reducers) => {
  console.log('[mapStateToProps] Splash', reducers.splash);
  return reducers.splash;
};
OnBoarding.navigationOptions = {
  header: () => false,
};
export default connect(mapStateToProps, {resumeSession})(OnBoarding);
