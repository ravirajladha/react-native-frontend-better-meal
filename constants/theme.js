import {
  Dimensions,
  // useWindowDimensions
} from 'react-native';
const {width, height} = Dimensions.get('window');
// const {windowWidth, windowHeight} = useWindowDimensions();
export const COLORS = {
  black: '#1E1F20',
  white: '#FFFFFF',
  gray: '#6A6A6A',
  blue: '#2074dc',
  lightblue: '#2074dc',
  lightblack: '#777672',
  midblack: '#5a5a5a',
  darkblue: '#2174dc',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  buttonHeight: 50,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  // app dimensions
  width,
  height,
  // windowHeight,
  // windowWidth,
};
export const FONTS = {
  h1: {fontFamily: 'Montserrat-Bold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Montserrat-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Montserrat-Bold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'Montserrat-Bold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {
    fontFamily: 'Montserrat-Regular',
    fontSize: SIZES.body1,
    // lineHeight: 36,
  },
  body2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Montserrat-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Montserrat-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
