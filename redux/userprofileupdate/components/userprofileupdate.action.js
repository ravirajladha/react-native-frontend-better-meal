import BetterMeal, { adduserprofiledetails, uploadImage, imageUpload, RSessionActive } from '../../../api/better-meal';
import AsyncStorage from '../../../storage';
import React, { useState, useEffect } from 'react';

import RNFS from 'react-native-fs';
import { navigate } from '../../../navigatorRef';
import {
  FORGOTPASS_EMAIL,
  CLEAR_FORGOTPASS_ERROR,
  ON_PROGRESS_FORGOTPASS,
  ON_SUCCESS_FORGOTPASS,
  ON_FAILURE_FORGOTPASS,
  ON_SUCCESS_SIGN_IN,
} from '../../action.list';
// import fs from 'react-native-fs';
// import { NativeStorage } from 'redux-persist-react-native-fs'

export const updateProfile = (id, image, gender, height, weight, dateofbirth) => async (dispatch) => {
  console.log("IM Gettinkg callled gender", gender);
  console.log("IM Gettinkg callled image", image);
  console.log("Im getting called height", height);
  console.log("Im getting called weight", weight);
  console.log("Im getting called dateofbirth", dateofbirth);

  // console.log('outside...',values);
  BetterMeal
    .post(adduserprofiledetails, { id: id, image: image, gender: gender, height: height, weight: weight, dateofbirth: dateofbirth })
    .then(async (res) => {
      console.log('Response coming during sigin', res.data);
      // console.log("IM Gettinkg callled", image);
      // console.log("IM Gettinkg callled", gender);      
      // console.log("Im getting called",height);
      // console.log("Im getting called",weight);    
      if (res.status === 200) {
        BetterMeal
          .get(RSessionActive)
          .then(async (response) => {
            await dispatch({
              type: ON_SUCCESS_SIGN_IN,
              payload: { user: response.data },
            })

            // .catch((error) => {
            //   // console.log('Error----', error);
            //   if (error.response.data) {  
            //     // console.log('error');  
            //   }
            // });      
          })

      }
    })
    .catch((error) => {
      console.log('Error----', error);
      if (error.response.data) {
        console.log('hello world');
      }
    });
};
export const uploadImageProfile = (id, image) => async (dispatch) => {
  console.log('hello im in redux getting called.....', id);
  // const token = await AsyncStorage.getItem('token');
  // console.log('token--------', token);
  console.log('image in redux --------', image);
  console.log('user id=====', id)
  var data = await RNFS.readFile(image, 'base64').then(res => { return res });
  console.log("IMages====", data)
  // let uploadData = new FormData();
  // // const data = new FormData();
  // uploadData.append('name', 'avatar');
  // uploadData.append('fileData', {
  //  uri : response.image.path,
  //  type: response.image.mime,
  //  name: response.image.path.split("/").pop()
  // });

  // uploadData.append("uploadFile", fs.createReadStream(image), { knownLength: fs.statSync(image).size });
  // uploadData.append('uploadFile', { type: image.mime, uri: image.path, name: image.path.split("/").pop() });

  // console.log('hello im in redux getting called image.....',uploadData.getHeaders());
  // console.log('hello im in redux getting called image.....',uploadData.getLengthSync());

  // console.log('uploadData',uploadData);

  // console.log('hello im in redux settoing called.....',image._parts[1][1].toString());
  // const form = Object.keys(image).reduce((f, k) => {
  //   f.append(k, image[k]);
  //   return f;
  // }, new FormData());
  // let config = {
  //   headers: {
  //   'Content-Type': 'multipart/form-data',
  //   'Accept': 'application/json'
  //   }
  // }

  BetterMeal
    .post(uploadImage, { id: id, image: data })
    //{
    //  headers: { ...uploadData.getHeaders(),
    //   "Content-Length": uploadData.getLengthSync() ,
    //   'Content-Type': 'multipart/form-data',
    // // headers: uploadData.getHeaders()
    // },body: uploadData})
    .then(async (res) => {
      console.log('Response coming during sigin', res.data);
      console.log('hello im in redux posting called.....', id);
      console.log('hello im in redux posting called.....', image);
      if (res.status === 200) {
        BetterMeal
          .get(RSessionActive)
          .then(async (response) => {
            await dispatch({
              type: ON_SUCCESS_SIGN_IN,
              payload: { user: response.data },
            })

          })

      }
    })
    .catch((error) => {
      console.log('Error----image', error);
      if (error.response.data) {
        console.log('hello world-------------------');
      }
    })
};


// export const uploadImages = (formData) => async (dispatch) => {
//   console.log('heelloo calling from upload img.....', formData);

// // console.log('user id=====', image)

//   BetterMeal
//     .post(uploadImage, formData, { headers: { 'Content-Type': 'multipart/form-data',   }  })
//     .then(async (res) => {
     
//       // console.log('hello im in redux posting called.....', id);
//       // console.log('hello im in redux posting called.....', image);
//       if (res.status === 200) {
//         console.log('Response coming during PHOTO UPLOAD', res.data);
//       //  BetterMeal
//           // .get(RSessionActive)
//           // .then(async (response) => {
//           //   console.log("uuuu----->>>>",response.data);
         
//           await AsyncStorage.setItem('IMAGEDATA',  JSON.stringify(res.data));
//           const token = await AsyncStorage.getItem('IMAGEDATA');
        
//           console.log("----->>>>>>-0000",token)
//             await dispatch({
//               type: ON_SUCCESS_SIGN_IN,
//               payload: { data: res.data },
             
//           // //  })

//           // })

//       }
//     })
//     .catch((error) => {
//       console.log('Error----image', error);
//       // if (error.response.data) {
//       //  // console.log('hello world-------------------');
//       // }
//     });


// };

