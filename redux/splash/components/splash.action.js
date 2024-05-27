import AsyncStorage from '../../../storage';
import {navigate} from '../../../navigatorRef';
import {
  ON_SUCCESS_SIGN_IN,
  ON_PROGRESS_RESUME_SESSION,
  ON_FAIL_RESUME_SESSION,
} from '../../action.list';
import betterMeal, {RSessionActive} from '../../../api/better-meal';
export const resumeSession = () => async (dispatch) => {
  console.log('[Action] resumeSession->invoked');
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch(onProgress());
    betterMeal
      .get(RSessionActive)
      .then(async (response) => {
        // console.log('[ACTION] resumeSession->response.log', response.data);
        await dispatch({
          type: ON_SUCCESS_SIGN_IN,
          payload: {user: response.data},
        });
        navigate('mainFlow');
      })
      .catch((error) => {
        // in case of bad token
        // that tells user has alreday signed with this device
        // therefore user has alreday taken quick tour
        // this time due  to wrong token ,he  is not ble to mainFlow
        // in this case just send him login flow
        if (error.response) {
          console.log(
            '[ACTION] resumeSession-> error.response',
            error.response.data,
          );
          navigate('loginFlow');
        } else {
          dispatch(
            onFailureResume({
              shortMsg: 'Oops! internet disconected',
              lngMsg: 'Plese check your internet.',
              code: null,
            }),
          );
        }
      });
  } else {
    console.log('[Action] token not found');
    // if no token
    // that means user has never loggedin from this device
    // in case first time signIn
    // take user to quick tour
    navigate('quickTour');
  }
};

export const onFailureResume = ({shortMsg, lngMsg, code}) => {
  return {
    type: ON_FAIL_RESUME_SESSION,
    payload: {showSpinner: false, shortMsg, lngMsg, code},
  };
};

export const onProgress = () => {
  return {
    type: ON_PROGRESS_RESUME_SESSION,
    payload: {showSpinner: true, shortMsg: null, lngMsg: null, code: null},
  };
};
