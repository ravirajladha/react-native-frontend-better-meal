import apiBetterMeal, {Forgotpassword} from '../../../api/better-meal';
import AsyncStorage from '../../../storage';
import {navigate} from '../../../navigatorRef';
import {
  FORGOTPASS_EMAIL,
  CLEAR_FORGOTPASS_ERROR,
  ON_PROGRESS_FORGOTPASS,
  ON_SUCCESS_FORGOTPASS,
  ON_FAILURE_FORGOTPASS,
} from '../../action.list';

export const forgotPassword = (values) => async (dispatch) => {
  console.log('Values Email', values.email);

  dispatch(onProgressForgotPass({}));
  dispatch(clearErrorMsgsForgotPass());
  apiBetterMeal
    .post(Forgotpassword, {email: values.email})
    .then(async (res) => {
      console.log('Response coming during sigin', res.data);
      if (res.data.success) {
        console.log('coming inside token');
        await AsyncStorage.setItem('Forgotpasstoken', res.data.token);
        dispatch(
          onSuccessForgotPass({
            response: res.data.token,
            message: res.data.message,
          }),
        );
      } else {
        dispatch(
          onFailureForgotPass({
            shortMsg: 'OOPS! Try again in somtime.',
            lngMsg: null,
            code: null,
          }),
        );
      }
    })
    .catch((error) => {
      console.log('Error----', error.response);
      if (error.response.data) {
        dispatch(
          onFailureForgotPass({
            shortMsg: error.response.data.message,
            lngMsg: null,
            code: error.response.status,
          }),
        );
      }
    });
};
export const onProgressForgotPass = ({}) => {
  return {type: ON_PROGRESS_FORGOTPASS, payload: {showSpinner: true}};
};
export const onSuccessForgotPass = ({response, message}) => async (
  dispatch,
) => {
  console.log('token', response);
  dispatch({
    type: ON_SUCCESS_FORGOTPASS,
    payload: {
      showSpinner: false,
      forgotpasswordtoken: response,
      lngMsg: message,
    },
  });
  //   // navigate to main flow
  navigate('OTP');
};
export const onFailureForgotPass = ({shortMsg, lngMsg, code}) => {
  return {
    type: ON_FAILURE_FORGOTPASS,
    payload: {showSpinner: false, shortMsg, lngMsg, code},
  };
};
export const clearErrorMsgsForgotPass = () => {
  return {
    type: CLEAR_FORGOTPASS_ERROR,
    payload: {shortMsg: null, lngMsg: null, code: null},
  };
};
export const enterOTP = (values) => async (dispatch) => {
  console.log('Values Email', values.otp);
  const token = await AsyncStorage.getItem('Forgotpasstoken');
  console.log('Values Email', token);

  dispatch(onProgressForgotPass({}));
  dispatch(clearErrorMsgsForgotPass());
  apiBetterMeal
    .post(Forgotpassword, {otp: values.otp, token: token})
    .then(async (res) => {
      console.log('Response coming during sigin', res.data);
      if (res.data.success) {
        console.log('coming inside token');
        dispatch(
          onSuccessForgotPass_OTP({
            response: res.data.email,
            message: res.data.message,
          }),
        );
      } else {
        dispatch(
          onFailureForgotPass({
            shortMsg: 'OOPS! Try again in somtime.',
            lngMsg: null,
            code: null,
          }),
        );
      }
    })
    .catch((error) => {
      console.log('Error----', error);
      if (error.response.data) {
        dispatch(
          onFailureForgotPass({
            shortMsg: error.response.data.message,
            lngMsg: null,
            code: error.response.status,
          }),
        );
      }
    });
};
export const onSuccessForgotPass_OTP = ({response, message}) => async (
  dispatch,
) => {
  const token = await AsyncStorage.removeItem('Forgotpasstoken');
  console.log('removing token', token);
  console.log('token', response);
  dispatch({
    type: ON_SUCCESS_FORGOTPASS,
    payload: {showSpinner: false, resetemail: response, lngMsg: message},
  });
  //   // navigate to main flow
  navigate('Passwordreset');
};
export const passwordReset = (values, recoveryemail) => async (dispatch) => {
  console.log('Values Email', values.password);
  console.log('Values Email', recoveryemail);

  dispatch(onProgressForgotPass({}));
  dispatch(clearErrorMsgsForgotPass());
  apiBetterMeal
    .post(Forgotpassword, {
      password: values.password,
      recoveryemail: recoveryemail,
    })
    .then(async (res) => {
      console.log('Response coming during sigin', res.data);
      if (res.data.success) {
        console.log('coming inside token');
        dispatch(onSuccessForgotPass_Reset({message: res.data.message}));
      } else {
        dispatch(
          onFailureForgotPass({
            shortMsg: 'OOPS! Try again in somtime.',
            lngMsg: null,
            code: null,
          }),
        );
      }
    })
    .catch((error) => {
      console.log('Error----', error);
      if (error.response.data) {
        dispatch(
          onFailureForgotPass({
            shortMsg: error.response.data.message,
            lngMsg: null,
            code: error.response.status,
          }),
        );
      }
    });
};
export const onSuccessForgotPass_Reset = ({message}) => async (dispatch) => {
  dispatch({
    type: ON_SUCCESS_FORGOTPASS,
    payload: {showSpinner: false, lngMsg: message},
  });
  //   // navigate to main flow
  navigate('Signin');
};
export const defaultState = {
  user: null,
  showSpinner: false,
  shortMsg: null,
  lngMsg: null,
  code: null,
  signdCrd: {username: '0ye raju'}, // holds username,password entered during logged in e.g {username:'',password:''}
  resetemail: null,
};
