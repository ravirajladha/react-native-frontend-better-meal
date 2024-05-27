import {
  SIGN_IN,
  ON_FAILURE_SIGN_IN,
  ON_PROGRESS_SIGN_IN,
  ON_SUCCESS_SIGN_IN,
  CLEAR_SIGNIN_ERROR,
  SIGN_UP,
  ON_FAILURE_SIGN_UP,
  ON_PROGRESS_SIGN_UP,
  ON_SUCCESS_SIGN_UP,
  CLEAR_SIGNUP_ERROR,
  SOCIAL_SIGN_IN,
  SOCIAL_ON_PROGRESS_SIGN_IN,
  SOCIAL_ON_SUCCESS_SIGN_IN,
  SOCIAL_ON_FAILURE_SIGN_IN,
  GET_FAQ_LIST,
} from '../../action.list';
let defaultState = {
  user: null,
  showSpinner: false,
  shortMsg: null,
  lngMsg: null,
  code: null,
  signdCrd: {}, // holds username,password entered during logged in e.g {username:'',password:''}
  faqList: [],

};

export default user = (state = defaultState, action) => {
  //console.log('[REDUCER] User', action);
  const {type, payload} = action;
  switch (type) {
    case SIGN_IN:
      return {...state, ...payload};
    case ON_PROGRESS_SIGN_IN:
      return {...state, ...payload};
    case ON_FAILURE_SIGN_IN:
      return {...state, ...payload};
    case ON_SUCCESS_SIGN_IN:
      return {...state, ...payload};
    case CLEAR_SIGNIN_ERROR:
      return {...state, ...payload};
    case SIGN_UP:
      return {...state, ...payload};
    case ON_PROGRESS_SIGN_UP:
      return {...state, ...payload};
    case ON_FAILURE_SIGN_UP:
      return {...state, ...payload};
    case ON_SUCCESS_SIGN_UP:
      return {...state, ...payload};
    case CLEAR_SIGNUP_ERROR:
      return {...state, ...payload};
    case SOCIAL_SIGN_IN:
      return {...state, ...payload};
    case SOCIAL_ON_PROGRESS_SIGN_IN:
      return {...state, ...payload};
    case SOCIAL_ON_SUCCESS_SIGN_IN:
      return {...state, ...payload};
    case SOCIAL_ON_FAILURE_SIGN_IN:
      return {...state, ...payload};
    case GET_FAQ_LIST:
      return {...state, ...payload};
    default:
      return state;
  }
};
