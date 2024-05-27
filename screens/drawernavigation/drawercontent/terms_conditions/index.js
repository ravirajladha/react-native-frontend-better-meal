import React from 'react';
import { Text, View,StyleSheet ,ImageBackground } from 'react-native';
import {Card, ListItem, Button, Icon,Header} from 'react-native-elements';
import {images, theme} from '../../../../constants';
const {COLORS, FONTS, SIZES} = theme;
const TermsConditions = ({navigation}) => (<>
<View 
         style={{ backgroundColor: '#FFFFFF',height: '100%'}}>          
          <Header
            backgroundColor="#2174dc"
           centerComponent={{ text: 'Term and Condition', style: { ...FONTS.h2,color: '#fff' } }}/>
<Text style={styles.headText}>
  These Terms of Use constitute a legally binding agreement made between you, whether personally
  or on behalf of an entity  ("you") and BetterMeal Inc ("Company", "we", "us", or "our"),
   concerning your access to use to the https://www.bettermeal.ai/website as well as any other 
   media form, media channel, moblie website or mobile form, media channel 
  , mobile website or mobile application related, linked, or otherwise connected there to
   (collectively, the "site"). You agree that by accessing the site, you have read, understood, 
  and agree that by accessing the Site, you have read, understood, 
  and agreed to be bound by all of these Terms of Use.
</Text>
<Text style={styles.headText}>
 IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
</Text>
<Button
                title="Done"
                buttonStyle={{
                    borderRadius: 10,
                    alignSelf: 'center',
                    backgroundColor: '#2174dc',
                    width:370,
                    height: 55,
                }}     
                titleStyle={{...FONTS.h2,fontWeight: "bold",}}
                containerStyle={{
                  ...FONTS.h1,
                  height: 60,
                  marginVertical: 60,
                }}
                onPress={() => navigation.goBack()}
                ></Button>

</View>
</>
);

const styles = StyleSheet.create({
  headText: {
    ...FONTS.h3,
    color:"#736F6E",
    // fontFamily: "Verdana",
   // textAlign: 'center',
    // fontSize: 16,
    marginVertical: 20,
    marginHorizontal:20
  },
  backgroundImage:{
    flex: 1,  
    height:250,
    justifyContent: "center",
    alignItems: "center",
  
},
});
export default TermsConditions;
