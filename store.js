import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import user from './redux/user/components/user.reducer';
import splash from './redux/splash/components/splash.reducer';
import forgotpassword from './redux/forgotpassword/components/forgotpass.reducer';
import healthsurvey from './redux/healthsurvey/components/healthsurvey.reducer';
// import adduserprofile from './redux/addUserProfileDetails/components/adduserprofile.reducer';
import userprofileupdate from './redux/userprofileupdate/components/userprofileupdate.reducer';
import editprofileredux from './redux/editProfilePage/components/editprofile.reducer'
import medication from './redux/medication/components/medication.reducer'

let reducers = combineReducers({user, splash, forgotpassword, healthsurvey, nutrition, userprofileupdate, editprofileredux, medication });
import nutrition from './redux/nutrition/components/nutrition.reducer';
// let reducers = combineReducers({
//   user,
//   splash,
//   forgotpassword,
//   healthsurvey,
 
// });
export default store = createStore(reducers, {}, applyMiddleware(thunk));
