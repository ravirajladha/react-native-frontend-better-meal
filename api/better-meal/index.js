import axios from 'axios';
import AsyncStorage from '../../storage';
import {
  RLogin,
  RSessionActive,
  RSignUp,
  SocialSignIn,
  Forgotpassword,
  HealthSurvey,
  GetSymtomsById,
  GetHsScore,
  AddScoreHS,
  GutSurveyQuestion,
  UpdateGutScore,
  getGutexpiredDays,
  adduserprofiledetails,
  uploadImage,
  editFile,
  editFileImage,
  getGutGraph,
  getAllFP,
  addUserFP,
  recieveNutritionMeal,
  addUserNutritionMeal,
  getDailyUserNutritionMeal,
  getDailyUserNutriMealByDate,
  userFavMeal,
  selectedFavMeal,
  getSuggestedMeal,
  getFAQ,
  getFilterTags,
  addmedications,
  fetchmedication,
  imageUpload,
  getFilteredData,
  removeMedicine,
} from './routs';


let instance = axios.create({
   baseURL: 'https://f9ca-49-206-9-235.ngrok.io/api/v1',
  // baseURL: 'http://3.80.50.58:1337/api/v1',
  // baseURL: 'http://api.bettermeal.ai:1337/api/v1',
});
export {
  RLogin,
  RSessionActive,
  RSignUp,
  SocialSignIn,
  Forgotpassword,
  HealthSurvey,
  GetSymtomsById,
  GetHsScore,
  AddScoreHS,
  GutSurveyQuestion,
  UpdateGutScore,
  getGutexpiredDays,
  adduserprofiledetails,
  uploadImage,
  imageUpload,
  editFile,
  editFileImage,
  getGutGraph,
  getAllFP,
  addUserFP,
  recieveNutritionMeal,
  addUserNutritionMeal,
  getDailyUserNutritionMeal,
  getDailyUserNutriMealByDate,
  userFavMeal,
  selectedFavMeal,
  getSuggestedMeal,
  getFAQ,
  getFilterTags,
  addmedications,
  fetchmedication,
  getFilteredData,
  removeMedicine,
};
instance.interceptors.request.use(
  async (config) => {
    // call every single time we make request through this instancere

    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authoriztion = `Bearer ${token}`;
    }
    return config;
  },
  (network_error) => {
    console.log('see your internet');
    return Promise.reject(network_error);
  },
);
export default instance;
