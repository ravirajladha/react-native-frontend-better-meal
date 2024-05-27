import React from 'react';
import {theme, images} from '../../../../constants';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  Image,
} from 'react-native';
const {COLORS, FONTS, SIZES} = theme;
const Support = () => (
  <SafeAreaView>
    <View style={styles.section_1_View}>
      <Text style={styles.section_1_View_txt1}>Having trouble?</Text>
    </View>
    <Text style={styles.section_1_txt}>Reach out to us via</Text>
    <View style={styles.section_1_View_2}>
      <Image style={styles.helpImage} source={images.help} />
    </View>
    <Text style={styles.section_1_txt_2}>help@gmail.com</Text>
  </SafeAreaView>
);
const styles = StyleSheet.create({
  section_1_View: {
    marginTop: 30,
  },
  section_1_View_txt1: {
    ...FONTS.h1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  section_1_txt: {
    ...FONTS.h3,
    textAlign: 'center',
    color: '#8d8d8d',
  },
  section_1_View_2: {
    alignItems: 'center',
    marginTop: 60,
  },
  helpImage: {
    width: SIZES.width / 2,
    height: SIZES.height / 3.5,
  },
  section_1_txt_2: {
    ...FONTS.h1,
    textAlign: 'center',
    color: '#606060',
    marginTop: 15,
  },
});
export default Support;
