import apiBetterMeal, {
  RLogin,
  RSignUp,
  SocialSignIn,
  Forgotpassword,
  getFAQ,
} from '../../../api/better-meal';
import AsyncStorage from '../../../storage';
import {navigate} from '../../../navigatorRef';
import {
  SIGN_UP,
  ON_PROGRESS_SIGN_UP,
  ON_SUCCESS_SIGN_UP,
  ON_FAILURE_SIGN_UP,
  CLEAR_SIGNUP_ERROR,
  SIGN_IN,
  ON_PROGRESS_SIGN_IN,
  ON_SUCCESS_SIGN_IN,
  ON_FAILURE_SIGN_IN,
  CLEAR_SIGNIN_ERROR,
  SOCIAL_SIGN_IN,
  SOCIAL_ON_PROGRESS_SIGN_IN,
  SOCIAL_ON_SUCCESS_SIGN_IN,
  SOCIAL_ON_FAILURE_SIGN_IN,
  FORGOTPASS_EMAIL,
  ON_PROGRESS_FORGOTPASS,
  ON_SUCCESS_FORGOTPASS,
  ON_FAILURE_FORGOTPASS,
  GET_FAQ_LIST,
} from '../../action.list';
export const signUp = (user) => async (dispatch) => {
  console.log('{name,email,number,password} frm reducer', user);
  dispatch(onProgressSignUp({}));
  dispatch(clearErrorMsgsSignUp());
  apiBetterMeal
    .post(RSignUp, {...user, email: user.email.toLowerCase()})
    .then(async (res) => {
      console.log('response', res.data.message);
      console.log('response200', res.status);
      if (res.status === 200) {
        console.log('coming inside status200');
        dispatch(onSuccessSignUp({response: res.data.message}));
        navigate('Signin');
      } else {
        dispatch(
          onFailureSignUp({
            shortMsg: 'OOPS! Try again in somtime.',
            lngMsg: null,
            code: null,
          }),
        );
      }
    })
    .catch((error) => {
      console.log('Something error');
      console.log('ERROR', error.response.data.message);
      // console.log('Something error');
      if (error.response.data.message) {
        dispatch(
          onFailureSignIn({
            shortMsg: error.response.data.message,
            lngMsg: null,
            code: error.response.status,
          }),
        );
      }
    });
};
export const onProgressSignUp = ({}) => {
  console.log('Coming inside progress siginin');
  return {type: ON_PROGRESS_SIGN_UP, payload: {showSpinner: true}};
};
export const onSuccessSignUp = ({response}) => async (dispatch) => {
  console.log('Coming inside onSuccessSignUp siginin');
  dispatch({
    type: ON_SUCCESS_SIGN_UP,
    payload: {showSpinner: false, shortMsg: response},
  });
};
export const onFailureSignUp = ({shortMsg, lngMsg, code}) => {
  console.log('Coming inside onFailureSignUp siginin');
  return {
    type: ON_FAILURE_SIGN_UP,
    payload: {showSpinner: false, shortMsg, lngMsg, code},
  };
};
export const clearErrorMsgsSignUp = () => {
  return {
    type: CLEAR_SIGNUP_ERROR,
    payload: {shortMsg: null, lngMsg: null, code: null},
  };
};
export const signIn = (values) => async (dispatch) => {
  console.log(values);
  // const {username, password} = values;
  dispatch(onProgressSignIn({}));
  dispatch(clearErrorMsgs());
  apiBetterMeal
    .post(RLogin, {
      username: values.username.toLowerCase(),
      password: values.password,
    })
    .then(async (res) => {
      console.log('Response coming during sigin========', res.data);
      if (res.status === 200) {
        await AsyncStorage.setItem('token', res.data.data.user.token);
        dispatch(onSuccessSignIn({response: res.data.data.user}));
        dispatch({
          type: SIGN_IN,
          payload: {
            signdCrd: {username, password},
          },
        });
      } else {
        dispatch(
          onFailureSignIn({
            shortMsg: 'OOPS! Try again in somtime.',
            lngMsg: null,
            code: null,
          }),
        );
      }
    })
    .catch((error) => {
      /* console.log('Error----', error.response.data); */
      if (error.response.data) {
        dispatch(
          onFailureSignIn({
            shortMsg: error.response.data.message,
            lngMsg: null,
            code: error.response.status,
          }),
        );
      }
    });
};
export const onProgressSignIn = ({}) => {
  return {type: ON_PROGRESS_SIGN_IN, payload: {showSpinner: true}};
};
export const clearErrorMsgs = () => {
  return {
    type: CLEAR_SIGNIN_ERROR,
    payload: {shortMsg: null, lngMsg: null, code: null},
  };
};
export const onSuccessSignIn = ({response}) => async (dispatch) => {
  console.log('response------for profile', response);
  if (
    response.gender === null ||
    response.height === 0 ||
    response.weight === 0 ||
    response.image === null ||
    response.dateofbirth === null
  ) {
    console.log('inside if');
    console.log('gender--', response.gender);
    console.log('image--', response.image);
    dispatch({
      type: ON_SUCCESS_SIGN_IN,
      payload: {showSpinner: false, user: response},
    });
    navigate('ProfileDetails');
  } else {
    console.log('inside else');
    dispatch({
      type: ON_SUCCESS_SIGN_IN,
      payload: {showSpinner: false, user: response},
    });
    console.log('=============', user);
    // if(user.gender === null){
    //   console.log('hello world Inside signIn')
    //   // navigate('ProfileDetails')
    // }
    // // navigate to main flow
    // else {
    //   navigate('mainFlow');
    // }
    navigate('mainFlow');
  }
};
export const onFailureSignIn = ({shortMsg, lngMsg, code}) => {
  return {
    type: ON_FAILURE_SIGN_IN,
    payload: {showSpinner: false, shortMsg, lngMsg, code},
  };
};
export const socialSigin = (values) => async (dispatch) => {
  console.log('Values deom redux', values);
  const {email, name, image, platform} = values;
  console.log(email, name, image, platform);
  if (email && name && image && platform) {
    console.log(email, name, image, platform);
    dispatch(onProgressSocialSignIn({}));
    dispatch(clearErrorMsgs());
    apiBetterMeal
      .post(SocialSignIn, {email, name, image, platform})
      .then(async (res) => {
        console.log('Response coming during sigin', res.data);
        if (res.data.success) {
          console.log('coming inside token');
          await AsyncStorage.setItem('token', res.data.token);
          dispatch(onSuccessSocialSignIn({response: res.data.user}));
          // dispatch({
          //   type: SOCIAL_SIGN_IN,
          //   // payload: {
          //   //   signdCrd: {},
          //   // },
          // });
        } else {
          dispatch(
            onFailureSignIn({
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
            onFailureSocialSignIn({
              shortMsg: error.response.data.message,
              lngMsg: null,
              code: error.response.status,
            }),
          );
        }
      });
  } else {
    alert('Something went wrong plz try again');
  }
};
export const onProgressSocialSignIn = ({}) => {
  return {type: SOCIAL_ON_PROGRESS_SIGN_IN, payload: {showSpinner: true}};
};
export const onSuccessSocialSignIn = ({response}) => async (dispatch) => {
  dispatch({
    type: SOCIAL_ON_SUCCESS_SIGN_IN,
    payload: {showSpinner: false, user: response},
  });
  //   // navigate to main flow
  navigate('mainFlow');
};
export const onFailureSocialSignIn = ({shortMsg, lngMsg, code}) => {
  return {
    type: SOCIAL_ON_FAILURE_SIGN_IN,
    payload: {showSpinner: false, shortMsg, lngMsg, code},
  };
};

export const onFaqList = () => async (dispatch) => {
  console.log('FAQ Called redux');
  apiBetterMeal
    .get(getFAQ)
    .then(async (response) => {
      console.log('response', response.data.FAQ);
      await dispatch({
        type: GET_FAQ_LIST,
        payload: {faqList: response.data.FAQ},
      });
    })
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response', error.response.message);
      } else {
        console.log('Something went wrong, Please try again later');
      }
    });
}

export const defaultState = {
  user: null,
  showSpinner: false,
  shortMsg: null,
  lngMsg: null,
  code: null,
  signdCrd: {username: '0ye raju'}, // holds username,password entered during logged in e.g {username:'',password:''}
};
