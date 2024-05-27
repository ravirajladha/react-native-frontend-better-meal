import AsyncStorage from '../../../storage';
import {navigate} from '../../../navigatorRef';
import {score} from '../../../constants';
const {SCORES} = score;
import {
  FETCH_HEALTHSURVEY,
  ON_PROGRESS_HEALTHSURVEY,
  FETCH_SYMTOMS_BY_ID,
  CAL_AGE_SCORE,
  CAL_SYMPTOMS_SCORE,
  CAL_WEIGHT_SCORE,
  CAL_SMOKER_SCORE,
  CAL_ALCOHOLDRINKER_SCORE,
  SYMPTOMS_CHECK_UPDATE,
  CALL_SUM,
  STORE_HS_SCORE,
  GET_HS_SCORE,
  FETCH_GUTSURVEYQUESTION,
  FETCH_GUTSURVEYEXPIREDDATE,
  FLAGVALUEADDGS,
  UPLOAD_REPORT_RESULT,
  GETGUTGRAPHVALUE,
} from '../../action.list';
import betterMeal, {
  HealthSurvey,
  uploadReportResult,
  GetSymtomsById,
  GetHsScore,
  AddScoreHS,
  uploadImage,
  RSessionActive,
  GutSurveyQuestion,
  UpdateGutScore,
  getGutexpiredDays,
  getGutGraph,
} from '../../../api/better-meal';
export const recieveHS = () => async (dispatch) => {
  console.log('health survey');
  betterMeal
    .get(HealthSurvey)
    .then(async (response) => {
      console.log('response', response.data.message);
      await dispatch({
        type: FETCH_HEALTHSURVEY,
        payload: {healthsurveyList: response.data.HealthSurvey},
      });
    })
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response', error.response.message);
      } else {
        console.log('Oops! internet disconected');
      }
    });
};

export const getSymtomsById = (value) => async (dispatch) => {
  console.log('getSymtomsById', value);
  // dispatch(onProgress());
  betterMeal
    .post(GetSymtomsById, {id: value})
    .then(async (response) => {
      console.log('response', response.data.message);
      await dispatch({
        type: FETCH_SYMTOMS_BY_ID,
        payload: {symtomsList: response.data.records},
      });
      await dispatch(listSymptoms(response.data.records.symptoms));
    })  
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response', error.response.message);
      }
    });
};
// export const onFailureResume = ({shortMsg, lngMsg, code}) => {
//   return {
//     type: ON_FAIL_RESUME_SESSION,
//     payload: {showSpinner: false, shortMsg, lngMsg, code},
//   };
// };
export const checkUpdate = (value) => {
  return {
    type: SYMPTOMS_CHECK_UPDATE,
    payload: {symChecVal: value},
  };
};
export const listSymptoms = (value) => {
  return {
    type: SYMPTOMS_CHECK_UPDATE,
    payload: {symChecVal: value},
  };
};

export const resultsCalculation = (symptoms, age, weight) => async (
  dispatch,
) => {
  console.log('getSymtomsById', symptoms);
  console.log('getSymtomsById', age);
  console.log('getSymtomsById', weight);
  let count = 0;
  for (let i = 0; i < symptoms.length; i++) {
    if (symptoms[i].isSelected == true) {
      count = count + 1;
    }
  }
  console.log(count);
  await dispatch(getScore_Symptoms(count));
  await dispatch(getScore_Age(age));
  await dispatch(getScore_Weight(weight));
  await dispatch(flagValue(true));
};
export const flagValue = (value) => async (dispatch) => {
  console.log('flagValue call_sum', value);
  return dispatch({
    type: CALL_SUM,
    payload: {call_sum: value},
  });
};

export const storeHealthSurveyscore = (score, name, id) => async (dispatch) => {
  console.log('storeHealthSurveyscore', score);
  console.log('storeHealthSurveyscore', name);
  console.log('storeHealthSurveyscore', id);
  // dispatch(onProgress());
  betterMeal
    .post(AddScoreHS, {id: id, name: name, score: score})
    .then(async (response) => {
      console.log('response', response.data);
      console.log('response', response.data.message);
    })
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response', error.response.message);
      }
    });
};
export const getHsScore = (id) => async (dispatch) => {
  console.log('getHsScore', id);
  betterMeal
    .post(GetHsScore, {id: id})
    // .then(async (response) => {
    //   console.log('response getHsScore111', response);
    //   return response.json();
    // })
    .then(async (response) => {
      console.log('response getHsScore222', response.data);
      console.log('response', response.data.message);
      await dispatch({
        type: GET_HS_SCORE,
        payload: {getAllScore: response.data.userhsscore},
      });
    })
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response bbb', error.response);
      }
    });
};
export const getScore_Age = (value) => async (dispatch) => {
  console.log('getSymtomsById', value);
  switch (true) {
    case value <= 30:
      console.log('hi', value);
      await dispatch({
        type: CAL_AGE_SCORE,
        payload: {ageScore: SCORES.s10},
      });

      break;
    case value >= 31 && value <= 50:
      console.log('hi', value, SCORES.s15);
      await dispatch({
        type: CAL_AGE_SCORE,
        payload: {ageScore: SCORES.s15},
      });
      break;
    case value > 50:
      console.log('hi', value);
      await dispatch({
        type: CAL_AGE_SCORE,
        payload: {ageScore: SCORES.s20},
      });
      break;
    default:
      console.log('Not a valid score');
      break;
  }
};
export const getScore_Symptoms = (value) => async (dispatch) => {
  console.log('getSymtomsById', value);
  switch (true) {
    case value < 7:
      console.log('value less than seven', value);
      await dispatch({
        type: CAL_SYMPTOMS_SCORE,
        payload: {symptomScore: SCORES.s10},
      });
      break;
    case value == 7:
      console.log('hi', value, SCORES.s15);
      await dispatch({
        type: CAL_SYMPTOMS_SCORE,
        payload: {symptomScore: SCORES.s15},
      });
      break;
    case value > 7:
      console.log('hi', value);
      await dispatch({
        type: CAL_SYMPTOMS_SCORE,
        payload: {symptomScore: SCORES.s25},
      });
      break;
    default:
      console.log('Not a valid score');
      break;
  }
};
export const getScore_Weight = (value) => async (dispatch) => {
  console.log('getSymtomsById', value);
  switch (true) {
    case value >= 90 && value <= 140:
      console.log('hi', value);
      await dispatch({
        type: CAL_WEIGHT_SCORE,
        payload: {weightScore: SCORES.s7},
      });
      break;
    case value >= 141 && value <= 185:
      console.log('hi', value, SCORES.s15);
      await dispatch({
        type: CAL_WEIGHT_SCORE,
        payload: {weightScore: SCORES.s15},
      });
      break;
    case value >= 186 && value <= 210:
      console.log('hi', value);
      await dispatch({
        type: CAL_WEIGHT_SCORE,
        payload: {weightScore: SCORES.s20},
      });
      break;
    case value >= 211:
      console.log('hi', value);
      await dispatch({
        type: CAL_WEIGHT_SCORE,
        payload: {weightScore: SCORES.s25},
      });
      break;
    default:
      console.log('Not a valid score');
      break;
  }
};
export const getScore_Smoker = (value) => async (dispatch) => {
  console.log('getSymtomsById', value);
  switch (true) {
    case value > 3:
      console.log('hi', value);
      await dispatch({
        type: CAL_SMOKER_SCORE,
        payload: {smokerScore: SCORES.s15},
      });
      break;
    case value >= 1 && value <= 3:
      console.log('hi', value, SCORES.s10);
      await dispatch({
        type: CAL_SMOKER_SCORE,
        payload: {smokerScore: SCORES.s15},
      });
      break;
    case value == 0:
      console.log('hi', value);
      await dispatch({
        type: CAL_SMOKER_SCORE,
        payload: {smokerScore: SCORES.s0},
      });
      break;
    default:
      console.log('Not a valid score');
      break;
  }
};
export const getScore_AlcoholDrinker = (value) => async (dispatch) => {
  console.log('getSymtomsById', value);
  switch (true) {
    case value == 'everyday':
      console.log('hi', value);
      await dispatch({
        type: CAL_ALCOHOLDRINKER_SCORE,
        payload: {acoholScore: SCORES.s15},
      });
      break;
    case value == 'socialdrinker':
      console.log('hi', value, SCORES.s15);
      await dispatch({
        type: CAL_ALCOHOLDRINKER_SCORE,
        payload: {acoholScore: SCORES.s10},
      });
      break;
    case value == 'no':
      console.log('hi', value);
      await dispatch({
        type: CAL_ALCOHOLDRINKER_SCORE,
        payload: {acoholScore: SCORES.s0},
      });
      break;
    default:
      console.log('Not a valid score');
      break;
  }
};
export const getGutSurveyQuestion = () => async (dispatch) => {
  console.log('getGutSurveyQuestion');
  // dispatch(onProgress());
  betterMeal
    .get(GutSurveyQuestion)
    .then(async (response) => {
      console.log('response getGutSurveyQuestion', response.data.message);
      // console.log('response', response.data.GutSurvey);
      await dispatch({
        type: FETCH_GUTSURVEYQUESTION,
        payload: {gutSurvey: response.data.GutSurvey},
      });
    })
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response', error.response.message);
      }
    });
};
export const updateGutScore = (id, gutscore) => async (dispatch) => {
  console.log('getGutSurveyupdateGutScoreQuestion', id, gutscore);
  betterMeal
    .post(UpdateGutScore, {id: id, gutscore: gutscore})
    .then(async (response) => {
      console.log('response getGutSurveyQuestion', response.data.message);
      if (response.status === 200) {
        await dispatch(flagValueGutSurvey(true));
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response', error.response.message);
      }
    });
};
export const getExpiredDays = (id) => async (dispatch) => {
  console.log('getGutSurveyupdateGutScoreQuestion', id);
  betterMeal
    .post(getGutexpiredDays, {id: id})
    .then(async (response) => {
      console.log('response getGutSurveyQuestion', response.data.message);
      console.log('response getGutSurveyQuestion', response.data.days);
      let days = response.data.days;
      if (days >= 0) {
        await dispatch({
          type: FETCH_GUTSURVEYEXPIREDDATE,
          payload: {gutSurveyExpiredDays: response.data.days},
        });
      } else {
        console.log('Failed to fetch days');
      }
      // if (days > 90) {
      //   await dispatch(flagValueGutSurvey(false));
      // } else {
      //   await dispatch(flagValueGutSurvey(true));
      // }
    })
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response', error.response.message);
      }
    });
};
export const flagValueGutSurvey = (value) => async (dispatch) => {
  return dispatch({
    type: FLAGVALUEADDGS,
    payload: {gutSurveyflag: value},
  });
};
export const getGUtGraphValue = (value) => async (dispatch) => {
  console.log('getGUtGraphValue', value);
  // dispatch(onProgress());
  betterMeal
    .post(getGutGraph, {id: value})
    .then(async (response) => {
      console.log('response', response.data.message);
      await dispatch({
        type: GETGUTGRAPHVALUE,
        payload: {getGutGraph: response.data.graphValue},
      });
      await dispatch(listSymptoms(response.data.records.symptoms));
    })
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response', error.response.message);
      }
    });
};

export const uploadImages = (formData) => async (dispatch) => {
  console.log('heelloo calling from upload img.....', formData);

  betterMeal
    .post(uploadImage, formData, { headers: { 'Content-Type': 'multipart/form-data',   }  })
    .then(async (res) => {
     
      // console.log('hello im in redux posting called.....', id);
      // console.log('hello im in redux posting called.....', image);
      if (res.status === 200) {
        console.log('Response coming during PHOTO UPLOAD', res.data);
      //  BetterMeal
          // .get(RSessionActive)
          // .then(async (response) => {
          //   console.log("uuuu----->>>>",response.data);
         
          // await AsyncStorage.setItem('IMAGEDATA',  JSON.stringify(res.data));
          // const token = await AsyncStorage.getItem('IMAGEDATA');
        
          console.log("----->>>>>>-0000",res.data)
          await dispatch({
            type: UPLOAD_REPORT_RESULT,
            payload: { uploadReportResult: res.data },
             
          //  })

          })}
  })
    .catch((error) => {
      console.log('Error----image', error);
      // if (error.response.data) {
      //  // console.log('hello world-------------------');
      // }
    });


};

