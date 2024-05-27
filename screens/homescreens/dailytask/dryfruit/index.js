import React from 'react';
import {images, theme} from '../../../../constants';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
const {COLORS, FONTS, SIZES} = theme;
// import TextComp from '../../component/text';
// import Header from '../../component/header';
import {Divider} from 'react-native-elements';

const DryFruit = ({navigation}) => {
  return (
    <ScrollView style={styles.section}>
      <StatusBar barStyle="light-content" backgroundColor="#8b14e2" />
      <View style={styles.section_1}>
        <Text style={styles.section_1_text}>DID YOU KNOW</Text>
      </View>
      <View style={styles.section_2}>
        <View style={styles.section_2_image}>
          <Image style={styles.dryfruitImage} source={images.dryfruit} />
        </View>
        <Text style={styles.section_2_text_1}>DRY FRUITS</Text>
        <Text style={styles.section_2_text_2}>
          DRY fruits are like watering your gut. Have em, but not loads!
        </Text>
        <View style={styles.section_2_view_1}>
          <Text style={styles.section_2_view_1_text_1}>High Vitamin</Text>
          <Text style={styles.section_2_view_1_text_1}>High Protein</Text>
        </View>
        <View style={styles.section_2_view_2}>
          <Divider />
        </View>
        <Text style={styles.section_2_text3}>
          These dry fruits are rich in vitamins and proteins; they also boost
          immunity and prevent lifestyle diseases such as cholesterol and
          diabetes. Most dry fruits are rich in minerals, proteins, fibre and
          vitamins add to that they are tasty and delicious too. Dry fruits are
          excellent and healthy substitute for daily snacks
        </Text>
        <View style={styles.section_2_view3}>
          <TouchableOpacity
            style={styles.section_2_button}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.section_2_button_text}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
// Forgotpassword.navigationOptions = {
//   header: () => null,
// };

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#8b14e2',
    paddingHorizontal: 10,
    // paddingBottom: 60,
  },
  section_1: {
    paddingVertical: 40,
    textAlign: 'center',
  },
  section_1_text: {
    textAlign: 'center',
    ...FONTS.h2,
    color: 'white',
    // fontWeight: 'bold',
  },
  section_2: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 30,
  },
  section_2_image: {
    alignItems: 'center',
    paddingTop: 50,
  },
  dryfruitImage: {
    width: SIZES.width / 2,
    height: SIZES.width / 3,
  },
  section_2_text_1: {
    textAlign: 'center',
    // paddingTop: 50,
    ...FONTS.h2,
    color: '#797979',
    fontWeight: 'bold',
    marginTop: 10,
  },
  section_2_text_2: {
    textAlign: 'center',
    // paddingTop: 50,
    ...FONTS.h3,
    color: '#797979',
    marginTop: 10,
    fontStyle: 'italic',
    paddingHorizontal: SIZES.width / 10,
  },
  section_2_view_1: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  section_2_view_1_text_1: {
    borderStyle: 'solid',
    borderColor: '#797979',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    fontSize: SIZES.width / 40,
  },
  section_2_view_2: {
    marginHorizontal: SIZES.width / 12,
    marginTop: 20,
  },
  section_2_text3: {
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: SIZES.width / 12,
    color: '#797979',
  },
  section_2_view3: {
    alignItems: 'center',
    marginVertical: 30,
  },
  section_2_button: {
    borderRadius: 10,
    backgroundColor: '#8b14e2',
    width: SIZES.width / 3,
  },
  section_2_button_text: {
    textAlign: 'center',
    paddingVertical: 8,
    color: 'white',
  },
  // section3_text: {
  //   ...FONTS.h3,
  //   paddingVertical: SIZES.width > 400 ? 5 : 0,
  //   fontSize: SIZES.width > 400 ? 20 : 15,
  // },
  // section3: {
  //   flexDirection: 'row',
  //   paddingTop: SIZES.width > 400 ? 7 : 7,
  // },
  // section2_text: {
  //   ...FONTS.h2,
  //   fontWeight: 'bold',
  //   color: '#b0b0b0',
  //   fontSize: SIZES.width > 400 ? 30 : 20,
  //   // paddingTop: 20,
  // },
  // section2_text1: {
  //   ...FONTS.h2,
  //   fontWeight: 'bold',
  //   color: '#b0b0b0',
  //   paddingVertical: 10,
  //   fontSize: SIZES.width > 400 ? 25 : 18,
  // },
  // section2: {
  //   paddingHorizontal: SIZES.width > 350 ? 20 : 10,
  //   paddingVertical: SIZES.width > 350 ? 30 : 15,
  //   // elevation: 1,
  //   // borderRadiusLeft: 30,
  //   borderTopLeftRadius: 30,
  //   borderTopRightRadius: 30,
  //   bottom: SIZES.height / 20,
  //   backgroundColor: 'white',
  // },
  // section1_text: {
  //   ...FONTS.h1,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   fontSize: SIZES.width > 350 ? 35 : 25,
  // },
});
const mapStateToProps = (store) => {
  return store.forgotpassword;
};

export default connect(mapStateToProps, {})(DryFruit);
