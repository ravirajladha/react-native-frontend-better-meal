import {
  FORGOTPASS_EMAIL,
  CLEAR_FORGOTPASS_ERROR,
  ON_PROGRESS_FORGOTPASS,
  ON_SUCCESS_FORGOTPASS,
  ON_FAILURE_FORGOTPASS,
} from '../../action.list';
let defaultState = {
succesMS:null,
};

export default userprofileupdate = (state = defaultState, action) => {
  //console.log('[REDUCER] User', action);
  const {type, payload} = action;
  switch (type) {
    case FORGOTPASS_EMAIL:
      return {...state, ...payload};
       default:
      return state;
  }
};
