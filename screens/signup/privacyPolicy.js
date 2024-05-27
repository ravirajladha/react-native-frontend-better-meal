import React from 'react';
import { Text, View,StyleSheet ,ImageBackground } from 'react-native';
import {Card, ListItem, Button, Header} from 'react-native-elements';
import {images, theme} from '../../constants';
const {COLORS, FONTS, SIZES} = theme;
const PrivacyPolicy = ({navigation}) => (
<>
<View 
         style={{ backgroundColor: '#FFFFFF',height: '100%'}}>
{/* <ImageBackground style= { styles.backgroundImage } source={require('../../assets/images/Image 82.png')}> */}
<Header
           backgroundColor="#2174dc"
           centerComponent={{ text: 'Privacy Policy', style: { ...FONTS.h2,color: '#fff' } }}/>

{/* </ImageBackground> */}

<Text style={styles.headText}>
 We care about data privacy and security.By using the site, you agree to be bound by our Privacy Policy
 posted posted on the Site, which is incorporated into these Terms of Use. Please be advisied the Site is hosted in the United States. If you access the Site from any other regionof the world with laws or
 other requirements govering personal data collection, use, or disclosure that differ from applicable laws in the United States, then through
 your continued use of the Site, you are transferring your data to the United States, and you agree to have your data transferred to and processed in the United States. Further, we do not knowingly accept,
 request , or solicit information from children or knowingly market to children. Therefore, in accordance with the U.S children's Online Privacy Protection Act, if we recive actual knowledge that anyone under the age of 13 has 
 provided personal information to us without the requisite and verifiable parental consent, we will delete that information from the site as quickly as is reasonably practical. 
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
                onPress={() => navigation.goBack()}  
                titleStyle={{...FONTS.h2,fontWeight: "bold",}}
                containerStyle={{
                  ...FONTS.h1,
                  height: 60,
                  marginVertical: 40,
                }}
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
    fontSize: 16,
    marginVertical: 10,
    marginHorizontal:20
  },
  backgroundImage:{
    // flex: 1,
    height: 230,
    position: 'absolute',
    left:0,
    
    // justifyContent: "center",
    // alignItems: "center",
  
},
});

  export default PrivacyPolicy;
