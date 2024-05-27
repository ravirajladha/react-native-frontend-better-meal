import React, { useState, useEffect } from 'react';
import AsyncStorage from '../../../storage';

import { Text, View, StyleSheet, ImageBackground, Image, FlatList, TouchableOpacity, Modal, Alert, Platform } from 'react-native';
import { Card, ListItem, Button, Header } from 'react-native-elements';
import { images, theme } from '../../../constants';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker, { types }  from 'react-native-document-picker';
import BioMarkerReport from './BioMarkerReport';
import axios from 'axios';
import { androidCameraPermission } from './Permissions';

import {
  uploadImages,
} from '../../../redux/healthsurvey/components/healthsurvey.action';

const { COLORS, FONTS, SIZES } = theme;
import * as Progress from 'react-native-progress';
import { editProfileDetailsImage } from '../../../redux/editProfilePage/components/editprofile.action';
import { imageUpload } from '../../../api/better-meal';
import { connect } from 'react-redux';
const UploadPopup = (
  { navigation, user, uploadImages, uploadReportResult, uploadImageProfile }

) => {

  const [model, setModel] = useState(false);


  async function upload() {

    // const permissionStatus =  await androidCameraPermission()
    // if(permissionStatus|| Platform.OS==='ios'){
    //     Alert.alert(
    //         'photo upload',
    //         'How would you like to upload',
    //         [
    //             {text:'Camera', onPress:onCamera},
    //             {text:'Gallery', onPress:onGallery},

    //         ]


    //     )
    // }

    console.log("user....", user.id)
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
      // includeBase64:true,
    }).then(image => {
      console.log("--->", image);
      imageUploaded(image);
    });


  };

  const imageUploaded = (image) => {
    // alert(image)
    //   console.log("-------->>%<<-------",data)   
    const imageData = new FormData()
    //   imageData.append("fileUpload",{
    //     userID:user.id,
    //     uri:image,
    //     CreatedAt:new Date()+'_profile',
    //     type:'image/png'
    // })

    imageData.append("userid", user.id)
    imageData.append("fileUpload", { type: image.mime, uri: image.path, name: image.path.split("/").pop() })
    //console.log("from data---->>>",imageData)
    // console.log("upload images---",image)
    // console.log("userid",user)
    uploadImages(imageData)

    // if(uploadReportResult && uploadReportResult.length){

    setTimeout(() => {
      if (uploadReportResult) {
        setModel(true)
      }
    }, 8000);
    //  setModel(true);      
    // }
  }

  const imageUploadedpdf = (image) => {
    // alert(image)
       console.log("-------->>%<<-------",image)   
    const imageData = new FormData()
    //   imageData.append("fileUpload",{
    //     userID:user.id,
    //     uri:image,
    //     CreatedAt:new Date()+'_profile',
    //     type:'image/png'
    // })

    imageData.append("userid", user.id)
    imageData.append("fileUpload", { type: image[0].type, uri: image[0].uri, name: image[0].name})
    //console.log("from data---->>>",imageData)
    // console.log("upload images---",image)
   console.log("userid",imageData._parts[1])
    uploadImages(imageData)

    // if(uploadReportResult && uploadReportResult.length){

    setTimeout(() => {
      if (uploadReportResult) {
        setModel(true)
      }
    }, 8000);
    //  setModel(true);      
    // }
  }
  // useEffect(()=>{
  //   if(uploadReportResult){
  //     setModel(true);      
  //     }
  // },[uploadReportResult])



  function Camera() {
    console.log("upload pdf")
    // DocumentPicker.pickSingle({
    //   type:[DocumentPicker.types.pdf],
    // }).then(image => {
    //   console.log(image);
    //   imageUploaded(image);
    // });
    DocumentPicker.pick({
      type: types.pdf,
    }).then(image => {
        console.log(image);
        imageUploadedpdf(image);
     });

    //setModel(true);
  }


  return (
    <>

      <Modal
        transparent={true}
        visible={model}
        onRequestClose={() => {
          setModel(false);
        }}
      >

        <BioMarkerReport
          navigation={navigation}
        />


      </Modal>
      <View
        style={styles.container}>

        <ImageBackground style={styles.backgroundImage} source={require('../../../assets/images/XMLID_209_.png')} >


          <Text style={styles.headText}>
            How would you like to upload
          </Text>
          <View style={styles.separator} />
          <Button
            title="Upload PDF"
            buttonStyle={{
              borderRadius: 10,
              borderWidth: 2,

              borderColor: "#01b9c6",
            }}
            type="outline"
            onPress={() => { Camera() }}
            titleStyle={{ ...FONTS.h2, fontWeight: "bold", color: "#01b9c6" }}
            containerStyle={{
              height: 60,
              width: 300,
              marginVertical: 5,
            }}
          ></Button>
          <Button
            title="Gallery"
            buttonStyle={{
              borderRadius: 10,
              borderColor: "#01b9c6",
              borderWidth: 2,
            }}
            type="outline"
            onPress={() => { upload() }}
            titleStyle={{ ...FONTS.h2, fontWeight: "bold", color: "#01b9c6" }}
            containerStyle={{
              height: 60,
              width: 300,
              marginVertical: 5,
            }}

          ></Button>
          {/* <Button
                title="Patient Portal"
                buttonStyle={{
                    borderRadius: 10,
                    alignSelf: 'center',
                  backgroundColor: '#01b9c6',
                   borderColor:'#1a51f0',
                    width:250,
                    height: 55,
                }}     
                 onPress={()=>{  upload()}}
                titleStyle={{...FONTS.h2,fontWeight: "bold"}}
                containerStyle={{
                  height: 60,
                  // marginVertical: 60,                 
                }}
                ></Button> */}
        </ImageBackground>

      </View>
      {/* 
            </View> */}

    </>
  );
};



const styles = StyleSheet.create({
  // outsidecontainer:   {
  //     backgroundColor: '#C0C0C0',
  //     flex: 1,
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  container: {
    backgroundColor: '#FAF9F6',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
  },
  headText: {
    ...FONTS.h2,
    color: '#858686',
    fontWeight: "bold",
    // fontFamily: "Verdana",
    // textAlign: 'center',
    marginVertical: 40,
    // marginHorizontal: 160,

  },

  backgroundImage: {
    // flex: 1,
    height: 340,
    // position: 'absolute',
    // left: 0,
    //  marginHorizontal: 50,
    // marginVertical: 4,
    // justifyContent: "center",
    // alignItems: "center",

  },
});


const mapStateToProps = (store) => {
  console.log('user-=== from upload--', store.healthsurvey.uploadReportResult);
  return {
    user: store.user.user,
    uploadReportResult: store.healthsurvey.uploadReportResult
  };
};

export default connect(mapStateToProps, { uploadImages })(UploadPopup);
