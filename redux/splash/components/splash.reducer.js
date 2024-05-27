import {
  RESUME_SESSION,
  ON_PROGRESS_RESUME_SESSION,
  ON_FAIL_RESUME_SESSION,
  ON_SUCCESS_RESUME_SESSION,
} from '../../action.list';
const defaultState = {
  showSpinner: true,
  shortMsg: null,
  lngMsg: null,
  code: null,
};
export default Splash = (state = defaultState, action) => {
  //console.log('[REDUCER] SPLASH', action);
  const {type, payload} = action;
  switch (type) {
    case RESUME_SESSION:
      return {...state, ...payload};
    case ON_PROGRESS_RESUME_SESSION:
      return {...state, ...payload};
    case ON_FAIL_RESUME_SESSION:
      return {...state, ...payload};
    case ON_SUCCESS_RESUME_SESSION:
      return {...state, ...payload};
    default:
      return state;
  }
};
