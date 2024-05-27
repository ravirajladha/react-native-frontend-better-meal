import React, { useState, useEffect } from 'react';
import { Text, View,StyleSheet,ImageBackground ,Modal,TouchableOpacity } from 'react-native';
import { Image, Header ,Button , Card,} from 'react-native-elements';
import {images, theme} from '../../../constants';
import UploadPopup from './UploadPopup';
const {COLORS, FONTS, SIZES} = theme;

const BioMarks = ({navigation}) => {
  
  
  const [model, setModel] = useState(false);

  return (
        <>
     
  <Modal
  transparent={true}
  visible={model}
  onRequestClose={() => {
    setModel(false);
  }}
  close={() => {
    setModel(false);
  }}
//enum('fullScreen', 'pageSheet', 'formSheet', 'overFullScreen')
>
  <View style={{
flex: 1,
flexDirection: 'column',
justifyContent: 'center',
alignItems: 'center'}}>
  <View style={{
    width: 370,
    height: 350,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }}>
    <UploadPopup
     navigation= {navigation} />
  </View>
  </View>


</Modal>
<TouchableOpacity></TouchableOpacity>
        <View 
         style={{ backgroundColor: model? '#858686':'#FFFFFF', height: '100%'}}>
   
         <Card containerStyle={{ backgroundColor: model? '#858686':'#FFFFFF',borderRadius: 25,  shadowColor: "#000000",height: 250,
        //  background:'../../../assets/images/XMLID_209_.png'
    // shadowOpacity: 0.8,
    // shadowOffset: {
    //   height: 1,
    //   width: 1
    // }
    }}>
     
       <ImageBackground style= { styles.backgroundImage } source={require('../../../assets/images/XMLID_209_.png')} >
         
            <View
            // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            // style={{
            //     height: 150,
            //     //borderColor: 'gray',
            //    // borderWidth: 1,
            //     paddingTop: 10,
            //     marginVertical: 30,
            //     justifyContent: "center",
            //      alignItems: "center"
            // }}
            
            >
                    <Text style={styles.headText}>
                    WHAT IS BIOMARKERS?
                    {"\n"}

                    </Text>
                    <Text style={styles.baseText}>
                    Blood, urine, and cerebrospinal fluid provide the necessary biological information for the diagnosis.
                    In these conditions, biomarkers are used as an Indicator of a biological factor that repesents either a subclinical manifestation,
                    stage of the disorder, or a surrogate manifestation of the disease.
                    </Text>

            </View>
            
            </ImageBackground>
          
            </Card>
           
            <Button
                title="Upload Document"
                buttonStyle={{
                    borderRadius: 10,
                    alignSelf: 'center',
                    backgroundColor: '#01b9c6',
                    width:330,
                    height: 55,
                }}     
                onPress={()=>{   setModel(true);}}
                titleStyle={{...FONTS.h2,fontWeight: "bold"}}
                containerStyle={{
                  height: 60,
                   marginVertical: 80,                 
                }}
                ></Button>

                  </View>
        </>
    
)};

const styles = StyleSheet.create({
    headText: {
      color:"#989898",
      ...FONTS.h3,
       fontWeight: "bold",
      textAlign: 'center',
      // fontSize: 20,
      // marginVertical: 5,
    },
    baseText: {
        color:"#989898",
        ...FONTS.h3,
         textAlign: 'center',
        // fontSize: 19,
        // marginVertical: 2,
      },
      backgroundImage:{
        // flex: 1,
        height: 230,
        position: 'absolute',   
        // justifyContent: "center",
        // alignItems: "center",
      
    },
  });

export default BioMarks;