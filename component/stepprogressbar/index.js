import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import {images, theme} from '../../constants';
const {COLORS, FONTS, SIZES} = theme;
// const thirdIndicatorStyles = {
//   stepIndicatorSize: 30,
//   currentStepIndicatorSize: 30,
//   // horizontal line
//   separatorStrokeWidth: 2,
//   currentStepStrokeWidth: 0,
//   stepStrokeCurrentColor: '#b7b7b7',
//   stepStrokeWidth: 3,
//   stepStrokeFinishedColor: 'blue',
//   stepStrokeUnFinishedColor: '#b7b7b7',
//   separatorFinishedColor: 'blue',
//   separatorUnFinishedColor: '#b7b7b7',
//   stepIndicatorFinishedColor: 'blue',
//   // innercircle
//   stepIndicatorUnFinishedColor: '#b7b7b7',
//   stepIndicatorCurrentColor: '#b7b7b7',
//   stepIndicatorLabelFontSize: 0,
//   currentStepIndicatorLabelFontSize: 0,
//   stepIndicatorLabelCurrentColor: 'transparent',
//   stepIndicatorLabelFinishedColor: 'transparent',
//   stepIndicatorLabelUnFinishedColor: 'transparent',
//   labelColor: '#999999',
//   labelSize: 13,
//   currentStepLabelColor: '#7eaec4',
// };

export default function Indicator(props) {
  // console.log('[props.currentPage]', props.currentPage);
  return (
    <View style={styles.stepIndicator}>
      <StepIndicator
        stepCount={5}
        customStyles={props.thirdIndicatorStyles}
        currentPosition={props.currentPage}
        // currentPosition={props.currentPage}
        // onPress={onStepPress}
        // labels={['Approval', 'Processing', 'Shipping', 'Delivery']}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stepIndicator: {
    marginVertical: 10,
    width: SIZES.width / 1.5,
  },
});
