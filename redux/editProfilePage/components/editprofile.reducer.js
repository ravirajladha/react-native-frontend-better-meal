import {
    FETCH_IMAGE_TO_EDIT,
    FETCH_GENDER_DETAILS_TO_EDIT,
    FETCH_WEIGHT_DEAILS_TO_EDIT,
    FETCH_HEIGHT_DETAILS_TO_EDIT,
    FETCH_DOB_DETAILS_TO_EDIT,
    FETCH_NUMBER_DETAILS_TO_EDIT,
    FETCH_EMAIL_DETAILS_TO_EDIT,
    FORGOTPASS_EMAIL,
  } from '../../action.list';
  let defaultState = {
  succesMS:null,
  };
  
  export default editprofileredux = (state = defaultState, action) => {
    //console.log('[REDUCER] User', action);
    const {type, payload} = action;
    switch (type) {
      case FORGOTPASS_EMAIL:
        return {...state, ...payload};
         default:
        return state;
    }
  };
  