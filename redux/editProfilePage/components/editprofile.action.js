import BetterMeal, {editFile, editFileImage,RSessionActive} from '../../../api/better-meal';
import RNFS from 'react-native-fs';
import {
  ON_SUCCESS_SIGN_IN,
  ON_PROGRESS_RESUME_SESSION,
  ON_FAIL_RESUME_SESSION,
} from '../../action.list';

export const editProfileDetails = (id, name,number, email, height,weight, date, gender) => async (dispatch) => {
    // console.log("-----Inside edit profile redux---",id)
    // console.log("-----Inside edit profile redux---",number)
    // console.log("-----Inside edit profile redux---",email)
    // console.log("-----Inside edit profile redux---",weight)
    // console.log("-----Inside edit profile redux---",height)
    // console.log("-----Inside edit profile redux---",date)
    // console.log("-----Inside edit profile redux---",name)
    // console.log("-----Inside edit profile redux---", gender)

  BetterMeal
    .post( editFile, {id : id , name:name, number: number, email : email, height : height, weight : weight, dateofbirth : date, gender : gender})
    .then(async (res) => {
      // console.log('Response coming during sigin', res.data);    
      // console.log('response---',res.status) 
              
    if(res.status === 200){
    BetterMeal
      .get(RSessionActive)
      .then(async (response) => {
          await dispatch({
          type: ON_SUCCESS_SIGN_IN,
          payload: {user: response.data},
        })
        
        // .catch((error) => {
        //   // console.log('Error----', error);
        //   if (error.response.data) {  
        //     // console.log('error');  
        //   }
        // });      
    })
  
  }
  // else {
  //   console.log('user not found')
    
  // }
  })
    .catch((error) => {
      console.log('Error----hello world', error);
      if (error.response.data) {  
        console.log('hello world');  
      }
    });
         
  };

export const editProfileDetailsImage = (id, image) => async (dispatch) => {

    // console.log("-----Inside edit profile redux---",id)
    // console.log("-----Inside edit profile redux---",image)

    var data = await RNFS.readFile(image, 'base64').then(res => { return res });
    // console.log("-----Inside edit profile redux---conversion",data)

    BetterMeal
    .post( editFileImage, {id : id , image : data})
    .then(async (res) => {
      console.log('Response coming during sigin', res.data); 
      
    if(res.status === 200){
    BetterMeal
      .get(RSessionActive)
      .then(async (response) => {
          await dispatch({
          type: ON_SUCCESS_SIGN_IN,
          payload: {user: response.data},
        })
        // .catch((error) => {
        //   console.log('Error----hello world', error);
        //   if (error.response.data) {  
        //     console.log('error');  
        //   }
        // });      
    });
  }
  })
    .catch((error) => {
      console.log('Error----', error);
      if (error.response.data) {  
        console.log('hello world');  
      }
    });

};