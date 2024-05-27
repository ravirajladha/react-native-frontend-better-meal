import React, { useState, useEffect } from 'react';
import AsyncStorage from '../../../storage';
import { Text, View, StyleSheet, ImageBackground,Modal, Image, FlatList,  ScrollView,TouchableOpacity } from 'react-native';
import {ListItem, Button, Header ,Card,Icon} from 'react-native-elements';
import { images, theme } from '../../../constants';

import {connect} from 'react-redux';
import UploadPopup from './UploadPopup';
import ImagePicker from 'react-native-image-crop-picker';
import userreporticon from '../../../assets/images/userreporticon.png'
import {
    uploadImages,
  } from '../../../redux/healthsurvey/components/healthsurvey.action';
const { COLORS, FONTS, SIZES } = theme;
import * as Progress from 'react-native-progress';
import { editProfileDetailsImage } from '../../../redux/editProfilePage/components/editprofile.action';
const BioMarkerReport = ({
    user,
    uploadImages,
    uploadImageProfile,
    navigation,
    uploadReportResult,
    suggestedMeal },
) => {


    useEffect(()=>{
        if(uploadReportResult && uploadReportResult.length){
        progressCard()
        }
    },[uploadReportResult])

   

   function randomIntFromInterval(min, max) { // min and max included 
   
        
        return Math.floor(Math.random() * (max - min + 1) + min)

      }
      
      const rndInt = randomIntFromInterval(0, 5)
      console.log("000000",rndInt,uploadReportResult)

    const arrayofprog =
    [
        {
         "dec":"PCOS",
          "per":[{ scoreName: "GASSY score", score: ".35" },
            { scoreName: "Metabolism index", score: ".31" },
            { scoreName: "Digestive regulation", score: ".52" },
            { scoreName: "Immune system index", score: ".86" },
            { scoreName: "Cellular vigor", score: ".46" },
            { scoreName: "Intestinal Function", score: ".54" },
            { scoreName: "Gur vigor", score: ".68" },
            { scoreName: "Inflamation", score: ".65" }]
        
        },
        {
         "dec":"Celiac",
          "per":[{ scoreName: "GASSY score", score: ".55" },
            { scoreName: "Metabolism index", score: ".41" },
            { scoreName: "Digestive regulation", score: ".42" },
            { scoreName: "Immune system index", score: ".47" },
            { scoreName: "Cellular vigor", score: ".56" },
            { scoreName: "Intestinal Function", score: ".64" },
            { scoreName: "Gur vigor", score: ".82" },
            { scoreName: "Inflamation", score: ".72" }]
        },
        {
         "dec":"Diabetes",
          "per":[{ scoreName: "GASSY score", score: ".45" },
            { scoreName: "Metabolism index", score: ".38" },
            { scoreName: "Digestive regulation", score: ".42" },
            { scoreName: "Immune system index", score: ".68" },
            { scoreName: "Cellular vigor", score: ".41" },
            { scoreName: "Intestinal Function", score: ".64" },
            { scoreName: "Gur vigor", score: ".71" },
            { scoreName: "Inflamation", score: ".65" }]
        },
        {
         "dec":"IBD",
          "per":[{ scoreName: "GASSY score", score: ".75" },
            { scoreName: "Metabolism index", score: ".57" },
            { scoreName: "Digestive regulation", score: ".52" },
            { scoreName: "Immune system index", score: ".74" },
            { scoreName: "Cellular vigor", score: ".46" },
            { scoreName: "Intestinal Function", score: ".54" },
            { scoreName: "Gur vigor", score: ".78" },
            { scoreName: "Inflamation", score: ".83" }]
        },
        {
         "dec":"Hyerthyroidism",
          "per":[{ scoreName: "GASSY score", score: ".39" },
            { scoreName: "Metabolism index", score: ".31" },
            { scoreName: "Digestive regulation", score: ".42" },
            { scoreName: "Immune system index", score: ".46" },
            { scoreName: "Cellular vigor", score: ".59" },
            { scoreName: "Intestinal Function", score: ".54" },
            { scoreName: "Gur vigor", score: ".77" },
            { scoreName: "Inflamation", score: ".75" }]
        },
        {
         "dec":"Hypothyroidism",
          "per":[{ scoreName: "GASSY score", score: ".39" },
            { scoreName: "Metabolism index", score: ".31" },
            { scoreName: "Digestive regulation", score: ".42" },
            { scoreName: "Immune system index", score: ".43" },
            { scoreName: "Cellular vigor", score: ".59" },
            { scoreName: "Intestinal Function", score: ".54" },
            { scoreName: "Gur vigor", score: ".73" },
            { scoreName: "Inflamation", score: ".75" }]
        }
        ]
        const [model, setModel] = useState(false);
        function progressCard() {
       // console.log("seleted reporte-data",uploadReportResult.data.per);
       
       // return  uploadReportResult.data && uploadReportResult.data.per.map((item) => {
        return  arrayofprog[rndInt].per.map((item) => {
            let color;
            if (item.score >= 0.6) {
                color = '#609f13';
            } else if (
                item.score >= 0.3 &&
               item.score < 0.6
            ) {
                color = '#f7c846';
            } else if (item.score < 0.3) {
                color = '#fd7d21';
            }
            console.log(color);
            return(
                
                <Card containerStyle={{borderRadius: 15,height: 60, width: 370,backgroundColor:"#f5fafa"}}>  
                  {/* <Card.Image
                            style={{
                                padding: 30, width: 20,
                                height: 20,
                            
                                marginRight: 20, borderRadius:15
                            }}
                            source={
                                userreporticon
                            }
                        />     */}
                   <View style={{ flexDirection:'row', flexWrap:'wrap'  }}>   
                <Text style={{...FONTS.h4 ,color:'#858686' }}>{item.scoreName}</Text>
                <Text style={{...FONTS.h4 ,color:'#858686',  position: 'absolute',
                right: 10}}>{item.score*100}%</Text>
                </View>  
                <View style={{  alignItems: "center",
        justifyContent: "center" }}>
                <Progress.Bar progress={item.score} width={300}
                    height={6}
                   // borderRadius={20}
                    unfilledColor="white"
                    color={color}
                   // textStyle={{ fontSize: 36, color: 'black' }}
                    style={{
                        shadowColor: '#000',
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                    }} />
                    </View>
            
            </Card>
            )
        })
    };

    return (
        <>
            <Header
            leftComponent={
                <View>
                <TouchableOpacity  onPress={() => navigation.goBack()
                  }>
                <Icon type="antdesign" name="arrowleft" color="white" />
                </TouchableOpacity>
                </View>}
                backgroundColor="#48ccd6"
                centerComponent={{ text: 'BIO MARKERS', style: { ...FONTS.h2, color: '#fff' } }} />
                 <Modal
  transparent={true}
  visible={model}
  onRequestClose={() => {
    setModel(false);
  }}
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
                <ScrollView>
            <View style={styles.container}>
                <Text style={styles.headText}>
                    Present scores are based on the report you have submitted
                </Text>

                {/* <View style={styles.separator} /> */}
                
                {progressCard()}

                <Button
                    title="Update Documents"
                    buttonStyle={{
                        borderRadius: 10,
                        alignSelf: 'center',
                        backgroundColor: '#01b9c6',
                        borderColor: '#1a51f0',
                        width: 300,
                        height: 55,
                    }}
                    onPress={()=>{   setModel(true);}}
                    titleStyle={{ ...FONTS.h2, fontWeight: "bold" }}
                    containerStyle={{
                        height: 60,
                        marginVertical: 40,
                    }}
                ></Button>


            </View>
            </ScrollView>

        </>
    );
};



const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FAF9F6',
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: "80%",
    },
    headText: {
        ...FONTS.h4,
        color: 'black',
        //fontWeight: "bold",
        // fontFamily: "Verdana",
        // textAlign: 'center',
       // marginVertical: 20,
           paddingVertical: 10,
        // marginHorizontal: 160,

    },

    backgroundImage: {
        // flex: 1,
        height: 200,
        position: 'absolute',
        left: 0,
        marginHorizontal: 50,
        marginVertical: 10,
        // justifyContent: "center",
        // alignItems: "center",

    },
});
const mapStateToProps = (store) => {
    console.log('user-===--', store.healthsurvey.uploadReportResult);
    return {uploadReportResult: store.healthsurvey.uploadReportResult};
  };
  
  export default connect(mapStateToProps, {uploadImages})(BioMarkerReport);
