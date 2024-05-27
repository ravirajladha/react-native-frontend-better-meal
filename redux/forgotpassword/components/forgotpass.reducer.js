import {
  FORGOTPASS_EMAIL,
  CLEAR_FORGOTPASS_ERROR,
  ON_PROGRESS_FORGOTPASS,
  ON_SUCCESS_FORGOTPASS,
  ON_FAILURE_FORGOTPASS,
} from '../../action.list';
let defaultState = {
  user: null,
  showSpinner: false,
  shortMsg: null,
  lngMsg: null,
  code: null,
  signdCrd: {}, // holds username,password entered during logged in e.g {username:'',password:''}
  resetemail: null,
};

export default forgotpassword = (state = defaultState, action) => {
  //console.log('[REDUCER] User', action);
  const {type, payload} = action;
  switch (type) {
    case FORGOTPASS_EMAIL:
      return {...state, ...payload};
    case CLEAR_FORGOTPASS_ERROR:
      return {...state, ...payload};
    case ON_PROGRESS_FORGOTPASS:
      return {...state, ...payload};
    case ON_SUCCESS_FORGOTPASS:
      return {...state, ...payload};
    case ON_FAILURE_FORGOTPASS:
      return {...state, ...payload};
    default:
      return state;
  }
};
