import React, {useRef} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';

// constants
import {images, theme} from '../../constants';
// D:\better-meal\ui-better-meal\assets\images\Welcome screen.svg
import welscr from '../../assets/images/Welcome screen.svg'
// import { Path } from 'react-native-svg';
const { onboarding1, onboarding2, onboarding3, onboarding4} = images;
// theme
const {COLORS, FONTS, SIZES} = theme;



const onBoardings = [
  {
    title: 'Welcome to BetterMeal',
    description: 'Your AL Nutritionist',
    // img: onboarding1,
    img : onboarding1,
    
  },
  {
    title: 'Plan your Meals',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: onboarding2,
  },
  {
    title: 'Track your Mediation',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: onboarding3,
  },
  {
    title: 'Talk to experts',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    img: onboarding4,
  },
];

const OnBoarding = ({navigation}) => {
  const [completed, setCompleted] = React.useState(false);
  const paageScroll = useRef(null);
  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    scrollX.addListener(({value}) => {
      //console.log(`ScreenWidth ${SIZES.width} |  Scrolled ${value}`);
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

  // Render

  const renderContent = (pageScroll, navigation) => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        ref={(node) => (pageScroll = node)}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {onBoardings.map((item, index) => (
          <View
            //center
            //bottom
            key={`img-${index}`}
            style={styles.imageAndTextContainer}>
            <View
              style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={item.img}
                ref={(node) => (imgRef = node)}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
            {index === 0 ? (
              <View
                style={{
                  position: 'absolute',
                  bottom: '30%',
                  left: 20,
                  right: 20,
                }}>
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.gray,
                    textAlign: 'center',
                    // fontSize: 22,
                  }}>
                  {item.title}
                </Text>

                <Text
                  style={{
                    ...FONTS.body3,
                    textAlign: 'center',
                    marginTop: SIZES.base,
                    color: COLORS.gray,
                  }}>
                  {item.description}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  position: 'absolute',
                  bottom: '15%',
                  left: 40,
                  right: 40,
                }}>
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.gray,
                    textAlign: 'center',
                  }}>
                  {item.title}
                </Text>

                <Text
                  style={{
                    ...FONTS.body3,
                    textAlign: 'center',
                    marginTop: SIZES.base,
                    color: COLORS.gray,
                  }}>
                  {item.description}
                </Text>
              </View>
            )}
            {index === 0 ? (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: '10%',
                  width: '100%',
                  paddingVertical: 10,
                  borderRadius: 5,
                  alignSelf: 'center',
                }}
                onPress={(e) => {
                  // console.log('button cliked');
                  if (index === 0) {
                    //console.log('0 go to->', 2 * width + 1);
                    pageScroll.scrollTo({
                      x: SIZES.width,
                      y: 0,
                      animated: true,
                    });
                  } else if (index === 1) {
                    //console.log('0 go to->', 3 * e.nativeEvent.pageX);
                    pageScroll.scrollTo({
                      x: 2 * SIZES.width,
                      y: 0,
                      animated: true,
                    });
                  } else if (index === 2) {
                    //console.log('0 go to->', 3 * e.nativeEvent.pageX);
                    pageScroll.scrollTo({
                      x: 4 * SIZES.width,
                      y: 0,
                      animated: true,
                    });
                  }
                }}>
                <View
                  style={{
                    backgroundColor: COLORS.blue,
                    marginHorizontal: 30,
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      ...FONTS.h2,
                      color: COLORS.white,
                      alignSelf: 'center',
                    }}>
                    Get Started
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}

            {/* Button */}

            <TouchableOpacity
              style={{
                position: 'absolute',
                // right: 0,
                bottom: '5%',
                alignSelf: 'center',
                // width: 150,
                // height: 60,
                // paddingLeft: 20,
                // justifyContent: 'center',
                // borderTopLeftRadius: 30,
                // borderBottomLeftRadius: 30,
                // borderBottomRightRadius: 0,
                // borderTopRightRadius: 0,
                // backgroundColor: COLORS.blue,
              }}
              onPress={(e) => {
                if (index === 0 || index === 3) {
                  navigation.navigate('loginFlow');
                }
                // console.log('Button on pressed', e.nativeEvent.pageX);
                //console.log('PageIndex', width);
                if (index === 0) {
                  //console.log('0 go to->', 2 * width + 1);
                  pageScroll.scrollTo({
                    x: SIZES.width,
                    y: 0,
                    animated: true,
                  });
                } else if (index === 1) {
                  //console.log('0 go to->', 3 * e.nativeEvent.pageX);
                  pageScroll.scrollTo({
                    x: 2 * SIZES.width,
                    y: 0,
                    animated: true,
                  });
                } else if (index === 2) {
                  //console.log('0 go to->', 3 * e.nativeEvent.pageX);
                  pageScroll.scrollTo({
                    x: 4 * SIZES.width,
                    y: 0,
                    animated: true,
                  });
                }
              }}>
              <Text style={{...FONTS.h2, color: COLORS.blue}}>
                {index === 0 ? 'Signin' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotsContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[styles.dot, {width: dotSize, height: dotSize}]}
            />
          );
        })}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent(paageScroll, navigation)}</View>
      {/* <View style={styles.dotsRootContainer}>{renderDots()}</View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  imageAndTextContainer: {
    width: SIZES.width,
  },
  dotsRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '20%' : '16%',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding / 2,
    marginBottom: SIZES.padding * 3,
    height: SIZES.padding,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});

export default OnBoarding;
// SigninScreen.navigationOptions = {
//   header: () => false,
// };
OnBoarding.navigationOptions = {
  header: () => false,
};
