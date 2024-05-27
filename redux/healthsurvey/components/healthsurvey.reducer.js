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
  GETGUTGRAPHVALUE,
  UPLOAD_REPORT_RESULT,
} from '../../action.list';
const defaultState = {
  showSpinnerHS: true,
  healthsurveyList: [],
  ageScore: null,
  symptomScore: null,
  weightScore: null,
  smokerScore: null,
  acoholScore: null,
  symtomsList: null,
  shortMsg: null,
  lngMsg: null,
  code: null,
  symChecVal: null,
  call_sum: null,
  getAllScore: null,
  gutSurvey: null,
  gutSurveyExpiredDays: null,
  gutSurveyflag: false,
  getGutGraph: null,
  uploadReportResult:[],
};
export default healthsurvey = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case FETCH_HEALTHSURVEY:
      return {...state, ...payload};
    case ON_PROGRESS_HEALTHSURVEY:
      return {...state, ...payload};
    case FETCH_SYMTOMS_BY_ID:
      return {...state, ...payload};
    case CAL_AGE_SCORE:
      return {...state, ...payload};
    case CAL_WEIGHT_SCORE:
      return {...state, ...payload};
    case CAL_SYMPTOMS_SCORE:
      return {...state, ...payload};
    case CAL_SMOKER_SCORE:
      return {...state, ...payload};
    case CAL_ALCOHOLDRINKER_SCORE:
      return {...state, ...payload};
    case SYMPTOMS_CHECK_UPDATE:
      return {...state, ...payload};
    case CALL_SUM:
      return {...state, ...payload};
    case STORE_HS_SCORE:
      return {...state, ...payload};
    case GET_HS_SCORE:
      return {...state, ...payload};
    case FETCH_GUTSURVEYQUESTION:
      return {...state, ...payload};
    case FETCH_GUTSURVEYEXPIREDDATE:
      return {...state, ...payload};
    case FLAGVALUEADDGS:
      return {...state, ...payload};
    case GETGUTGRAPHVALUE:
      return {...state, ...payload};
      case UPLOAD_REPORT_RESULT:
      return {...state, ...payload};
    default:
      return state;
  }
};
