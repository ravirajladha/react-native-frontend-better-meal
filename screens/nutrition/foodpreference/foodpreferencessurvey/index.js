import React, {Component, useState} from 'react';
import {
  StyleSheet,
  // Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {BottomSheet, Icon, Button, Card} from 'react-native-elements';
import {SimpleSurvey} from 'react-native-simple-survey';
// import {COLORS} from '../res/validColors';
import {images, theme} from '../../../../constants';
import TextComp from '../../../../component/text';
const {COLORS, FONTS, SIZES} = theme;
import {addUserFPS} from '../../../../redux/nutrition/components/nutrition.action';
const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';

class SurveyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: PURPLE,
      answersSoFar: '',
      count: 1,
      surveyAnswer: null,
      isVisible: false,
    };
  }

  // componentDidMount() {
  //   console.log('mounted', this.props.foodpreferences);
  //   // this.setState({
  //   //   surveyAnswer: this.props.foodpreferences,
  //   // });
  // }
  onSurveyFinished(answers) {
    console.log('answers', answers);
    console.log('answers', JSON.stringify(answers));
    console.log('answers', this.props.user.id);
    this.props.addUserFPS(this.props.user.id, answers);
    this.props.callBack(true);
  }

  /**
   *  After each answer is submitted this function is called. Here you can take additional steps in response to the
   *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is
   *  is restricted (age, geo-fencing) from your app.
   */
  onAnswerSubmitted(answer) {
    this.setState({
      answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 1),
    });
    switch (answer.questionId) {
      case 'favoriteColor': {
        if (COLORS.includes(answer.value.toLowerCase())) {
          this.setState({backgroundColor: answer.value.toLowerCase()});
        }
        break;
      }
      default:
        break;
    }
  }

  // renderPreviousButton(onPress, enabled) {
  //   return (
  //     <View
  //       style={{flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10}}>
  //       <Button
  //         color={GREEN}
  //         onPress={onPress}
  //         disabled={!enabled}
  //         backgroundColor={GREEN}
  //         title={'Previous'}
  //       />
  //     </View>
  //   );
  // }

  renderNextButton(onPress, enabled, answer) {
    // console.log('Answered', answer);
    return (
      // <TouchableOpacity
      //   onPress={() => {
      //     this.setState({count: this.state.count + 1});
      //     console.log('this', this.state.count);
      //   }}>
      <View
        style={{flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10}}>
        {/* <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={'Next'}
        /> */}
        <Button
          buttonStyle={{borderRadius: 30, backgroundColor: '#1a51f0'}}
          onPress={onPress}
          disabled={!enabled}
          icon={
            <Icon
              name="arrow-forward-outline"
              type="ionicon"
              size={SIZES.width / 15}
              color="#ffffff"
            />
          }
        />
      </View>
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <View
        style={{flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10}}>
        <Button
          title={'Finished'}
          onPress={onPress}
          disabled={!enabled}
          color={GREEN}
        />
      </View>
    );
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <TouchableOpacity
        key={`selection_button_view_${index}`}
        style={{
          borderRadius: 18,
          borderColor: '#3364f1',
          borderWidth: 1,
          backgroundColor: isSelected ? '#3364f1' : 'white',
          marginTop: 20,
          // marginHorizontal: 30,
          //   alignContent: 'center',
          // width: SIZES.width / 2,
          // alignItems: 'center',
          alignSelf: 'center',
          // paddingHorizontal
          marginHorizontal: 10,
          //   flex: 1,
        }}
        onPress={onPress}>
        <Text
          style={{
            color: isSelected ? 'white' : '#3364f1',
            textAlign: 'center',
            fontSize: SIZES.width / 25,
            padding: 5,
            paddingHorizontal: 10,
            fontWeight: 'bold',
          }}
          key={`button_${index}`}>
          {data.optionText}
        </Text>
      </TouchableOpacity>
    );
  }

  renderQuestionText(questionText, index) {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}>
          <TextComp
            customeStyle={{
              ...FONTS.h2,
              // alignSelf: 'center',
              fontWeight: 'bold',
              color: '#3364f1',
              fontSize: SIZES.width / 20,
            }}>
            Food Preferences
          </TextComp>
          <TextComp>{index} of 14</TextComp>
        </View>
        <View style={{height: 2, backgroundColor: '#cacaca'}} />
        <View style={{paddingHorizontal: 15}}>
          <TextComp
            customeStyle={{
              ...FONTS.h2,
              // alignSelf: 'center',
              fontWeight: 'bold',
              color: '#535353',
              fontSize: SIZES.width / 25,
            }}>
            {questionText}
          </TextComp>
        </View>
        {/* <Text>{count}</Text> */}
      </View>
    );
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={(text) => onChange(text)}
          numberOfLines={1}
          underlineColorAndroid={'white'}
          placeholder={placeholder}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType="done"
        />
      </View>
    );
  }

  //   renderNumericInput(onChange, value, placeholder, onBlur) {
  //     return (
  //       <TextInput
  //         style={styles.numericInput}
  //         onChangeText={(text) => {
  //           onChange(text);
  //         }}
  //         underlineColorAndroid={'white'}
  //         placeholderTextColor={'rgba(184,184,184,1)'}
  //         value={String(value)}
  //         placeholder={placeholder}
  //         keyboardType={'numeric'}
  //         onBlur={onBlur}
  //         maxLength={3}
  //       />
  //     );
  //   }

  renderInfoText(infoText) {
    return (
      <View style={{marginLeft: 10, marginRight: 10}}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }

  render() {
    return (
      // <View
      //   style={[
      //     styles.background,
      //     {backgroundColor: this.state.backgroundColor},
      //   ]}>
      <View style={styles.container}>
        <SimpleSurvey
          ref={(s) => {
            this.surveyRef = s;
          }}
          survey={this.props.foodpreferences}
          renderSelector={this.renderButton.bind(this)}
          containerStyle={styles.surveyContainer}
          selectionGroupContainerStyle={styles.selectionGroupContainer}
          navButtonContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
          // renderPrevious={this.renderPreviousButton.bind(this)}
          renderNext={this.renderNextButton.bind(this)}
          renderFinished={this.renderFinishedButton.bind(this)}
          renderQuestionText={this.renderQuestionText}
          onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
          onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
          // renderTextInput={this.renderTextBox}
          // renderNumericInput={this.renderNumericInput}
          // renderInfo={this.renderInfoText}
        />
      </View>

      // </View>
    );
  }
}

const styles = StyleSheet.create({
  // button: {
  //   margin: 10,
  //   height: 30,
  //   width: 140,
  //   borderRadius: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  container: {
    // minWidth: '70%',
    // maxWidth: '90%',
    // width: 100,
    alignItems: 'stretch',
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1,
    alignSelf: 'center',
  },

  surveyContainer: {
    width: SIZES.width / 1.1,

    alignSelf: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignContent: 'center',
    padding: 5,
    flexGrow: 0,
    elevation: 20,
  },
  selectionGroupContainer: {
    // width: 200,
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 20,
    paddingHorizontal: 10,
    // backgroundColor: 'white',
    // alignContent: 'flex-end',
  },
  navButtonText: {
    margin: 10,
    fontSize: 20,
    color: 'white',

    width: 'auto',
  },
  answers: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  navigationButton: {
    minHeight: 40,
    backgroundColor: GREEN,
    padding: 0,
    borderRadius: 100,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //   background: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  questionText: {
    marginBottom: 20,
    fontSize: 20,
  },

  infoText: {
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 10,
    fontSize: SIZES.width / 25,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BCD4',
    height: 300,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 80,
    marginLeft: 40,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
});
const mapStateToProps = (store) => {
  // console.log(
  //   ' store.nutrition.allFoodPreferences',
  //   store.nutrition.allFoodPreferences,
  // );
  return {
    foodpreferences: store.nutrition.allFoodPreferences,
    user: store.user.user,
    addFPSStatus: store.nutrition.addFPSStatus,
  };
};
export default connect(mapStateToProps, {addUserFPS})(SurveyScreen);
