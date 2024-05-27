import AsyncStorage from '../../../storage';
import {navigate} from '../../../navigatorRef';
import {score} from '../../../constants';
const {SCORES} = score;
import {
  GETALLFOODPREFERENCES,
  ADDUSERPFS,
  RECIEVE_NUTRITION_MEAL,
  ADD_NUTRITION_MEAL_BLD,
  UPDATE_NUTRITION_MEAL_BLD,
  EMPTY_NUTRITION_MEAL_BLD,
  REMOVE_NUTRITION_MEAL,
  RECEIVE_DAILY_NUTRITION_MEAL,
  LOADING_DAILY_NUTRITION_MEAL,
  GET_DAILY_NUTRITION_MEAL_DATE,
  UPDATE_WHILE_CHECKBOX,
  FAV_MEAL,
  ADDED_FAV_MEAL,
  ADD_NUTRITION_MEAL_FROM_BM,
  GET_SUGGESTED_MEAL,
  FILTER_TAGS,
  SORTBY_FILTERING_DATA,
  TAGS_FILTERING_DATA,
} from '../../action.list';
import betterMeal, {
  getAllFP,
  addUserFP,
  recieveNutritionMeal,
  addUserNutritionMeal,
  getDailyUserNutritionMeal,
  getDailyUserNutriMealByDate,
  userFavMeal,
  selectedFavMeal,
  getSuggestedMeal,
  getFilterTags,
  getFilteredData,
} from '../../../api/better-meal';
export const recieveAllFP = () => async (dispatch) => {
  console.log('GET ALL FOOD PRE');
  betterMeal
    .get(getAllFP)
    .then(async (response) => {
      console.log('response', response.data.message);
      // console.log('response', response.data.foodpreferences);
      await dispatch({
        type: GETALLFOODPREFERENCES,
        payload: {allFoodPreferences: response.data.foodpreferences},
      });
    })
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response', error.response.message);
      } else {
        console.log('Oops! internet disconected');
      }
    });
};
export const addUserFPS = (id, valueSelected) => async (dispatch) => {
  console.log('GET ALL FOOD PRE==============', id, valueSelected);
  betterMeal
    .post(addUserFP, {id, valueSelected})
    .then(async (response) => {
      console.log('response=================', response.status);
      // console.log('response', response.data.foodpreferences);
      // await dispatch({
      //   type: ADDUSERPFS,
      //   payload: {addFPSStatus: response.status},
      // });
      dispatch(statusFPS(response.status));
    })
    .catch((error) => {
      if (error.response) {
        console.log(
          '[FETCH] errror-> error.response',
          error.response.data.message,
          error.response.status,
        );

        dispatch(statusFPS(error.response.status));
      } else {
        console.log('Oops! internet disconected');
      }
    });
};
export const statusFPS = (value) => {
  return {
    type: ADDUSERPFS,
    payload: {addFPSStatus: value},
  };
};
export const recieveNutriMeal = () => async (dispatch) => {
  console.log('recieveNutritionMeal');
  betterMeal
    .get(recieveNutritionMeal)
    .then(async (response) => {
      console.log('response', response.data.message);
      // console.log('response', response.data.foodpreferences);
      await dispatch({
        type: RECIEVE_NUTRITION_MEAL,
        payload: {nutritionMeal: response.data.nutritionMeal},
      });
      await dispatch({
        type: FAV_MEAL,
        payload: {favMeal: response.data.nutritionMeal},
      });
    })
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response', error.response.message);
      } else {
        console.log('Oops! internet disconected');
      }
    });
};
export const addSelectedMeal = (values) => async (dispatch) => {
  console.log('addSelectedMeal', values);
  dispatch({
    type: ADD_NUTRITION_MEAL_BLD,
    payload: {
      mealSelected: values,
    },
  });
};
export const updateSelectedMeal = (values) => async (dispatch) => {
  // console.log('updateSelectedMeal', values);
  dispatch({
    type: UPDATE_NUTRITION_MEAL_BLD,
    payload: {
      index: values.index,
      value: values.value,
    },
  });
};
export const addUserNutriMeal = (
  dailyMeal,
  userId,
  period,
  date,
  avgNutriScore,
) => async (dispatch) => {
  await dispatch(addMealLoading(true));
  betterMeal
    .post(addUserNutritionMeal, {
      userId,
      dailyMeal,
      period,
      date,
      avgNutriScore,
    })
    .then(async (response) => {
      console.log('response', response.data);
      if (response.status == 200) {
        dispatch({
          type: EMPTY_NUTRITION_MEAL_BLD,
          payload: {
            mealSelected: [],
          },
        });
        await dispatch(getDailyUserNutriMeal(userId, date));
        await dispatch(addMealLoading(false));
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(
          '[FETCH] errror-> error.response',
          error.response.data.message,
        );
      } else {
        console.log('Oops! internet disconected');
      }
    });
};
export const addUserNutriMealFromSuggested = (val, id, date) => async (
  dispatch,
) => {
  console.log('QEFWEFWE', val, id, date);
  await dispatch(addMealLoading(true));
  betterMeal
    .post(addUserNutritionMeal, {
      userId: id,
      dailyMeal: val.suggestedDailyMeal,
      period: val.typeofMeal,
      date: date,
      avgNutriScore: val.avgNutriScore,
      mealDescription: val.mealDescription,
    })
    .then(async (response) => {
      console.log('response', response.data);
      await dispatch(getDailyUserNutriMeal(id, date));
      // if (response.status == 200) {
      //   dispatch({
      //     type: EMPTY_NUTRITION_MEAL_BLD,
      //     payload: {
      //       mealSelected: [],
      //     },
      //   });

      // }
    })
    .catch((error) => {
      if (error.response) {
        console.log(
          '[FETCH] errror-> error.response',
          error.response.data.message,
        );
      } else {
        console.log('Oops! internet disconected');
      }
    });
};
export const removeMeal = (values) => async (dispatch) => {
  console.log(values);
  await dispatch({
    type: REMOVE_RECORD,
    payload: {
      mealSelected: values,
    },
  });
};

export const getDailyUserNutriMeal = (userId, date) => async (dispatch) => {
  console.log('getDailyUserNutriMeal', userId, date);
  betterMeal
    .post(getDailyUserNutritionMeal, {userId, date})
    .then(async (response) => {
      console.log('response-------getDailyUserNutriMeal', response.data);
      if (response.status == 200) {
        await dispatch({
          type: RECEIVE_DAILY_NUTRITION_MEAL,
          payload: {
            dailyUserMeal: response.data.dailyUserMeal,
          },
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(
          '[FETCH] errror-> error.response',
          error.response.data.message,
        );
      } else {
        console.log('Oops! internet disconected');
      }
    });
};
export const addMealLoading = (values) => async (dispatch) => {
  console.log(values);
  await dispatch({
    type: LOADING_DAILY_NUTRITION_MEAL,
    payload: {
      addMealLoading: values,
    },
  });
};
export const getDailyUserNutritionMealByDate = (userId, date) => async (
  dispatch,
) => {
  console.log('getDailyUserNutriMeal', userId, date);
  betterMeal
    .post(getDailyUserNutriMealByDate, {userId, date})
    .then(async (response) => {
      console.log('response-->>>user.id, dateSelected', response.data.dailyUserMealByDate);
      if (response.status == 200) {
        await dispatch({
          type: GET_DAILY_NUTRITION_MEAL_DATE,
          payload: {
            dailyUserMeals: response.data.dailyUserMealByDate,
          },
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(
          '[FETCH] errror-> error.response',
          error.response.data.message,
        );
      } else {
        console.log('Oops! internet disconected');
      }
    });
};
export const addCheckboxBMMenu = (values) => async (dispatch) => {
  // console.log('updateSelectedMeal', values);
  await dispatch({
    type: UPDATE_WHILE_CHECKBOX,
    payload: {nutritionMeal: values},
  });
};
export const addUserFavMeal = (id, favourite) => async (dispatch) => {
  console.log('add Fav Meal PRE==============', id, favourite);
  betterMeal
    .post(userFavMeal, {id, favourite})
    .then(async (response) => {
      console.log('response=================', response.status);
      console.log('response', response.data.message);
      if (response.status == 200) {
        console.log('Calling the inner function');
        await dispatch(recieveAddedFavMEal(id));
      }
      // await dispatch({
      //   type: ADDUSERPFS,
      //   payload: {addFPSStatus: response.status},
      // });
    })
    .catch((error) => {
      if (error.response) {
        console.log(
          '[FETCH] errror-> error.response',
          error.response.data.message,
          error.response.status,
        );
      } else {
        console.log('Oops! internet disconected');
      }
    });
};
export const recieveAddedFavMEal = (id) => async (dispatch) => {
  console.log('selectedFavMealselectedFavMeal PRE==============', id);
  betterMeal
    .post(selectedFavMeal, {id})
    .then(async (response) => {
      // console.log('response=================', response.status);
      console.log('response', response.data.message);
      // console.log('response', response.data.favourite);
      let fav = response.data.favourite;
      // console.log('response===>>>>>', fav[0].favourite);
      await dispatch({
        type: ADDED_FAV_MEAL,
        payload: {addedFavMeal: fav[0].favourite},
      });
    })
    .catch((error) => {
      if (error.response) {
        console.log(
          '[FETCH] errror-> error.response',
          error.response.data.message,
          error.response.status,
        );
      } else {
        console.log('Oops! internet disconected');
      }
    });
};
export const addSelectedMealFromBM = (values) => async (dispatch) => {
  console.log('addSelectedMeal', values);
  dispatch({
    type: ADD_NUTRITION_MEAL_FROM_BM,
    payload: {
      mealSelected: values,
    },
  });
};
export const getSuggestedMeals = (val) => async (dispatch) => {
  betterMeal
    .post(getSuggestedMeal, {id: val})
    .then(async (response) => {
      console.log('response getSuggestedMeal', response.data);
      if (response.status == 200) {
        await dispatch({
          type: GET_SUGGESTED_MEAL,
          payload: {
            suggestedMeal: response.data.SuggestedMeal,
          },
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log(
          '[FETCH] errror-> error.response',
          error.response.data.message,
        );
      } else {
        console.log('Oops! internet disconected');
      }
    });
};

//Get Filter Tags done by poovarasan
export const get_Filter_Tags = () => async (dispatch) => {
  console.log('GET ALL FOOD PRE');
  betterMeal
    .get(getFilterTags)
    .then(async (response) => {
      console.log('response get_Filter_Tags', response.data);
      // console.log('response', response.data.foodpreferences);
      let data;
      if (response.data.tags) {
        data = response.data.tags.map((item) => {
          return {
            name: item,
            checked: false,
          };
        });
        console.log('[data]', data);
        if (data) {
          await dispatch({
            type: FILTER_TAGS,
            payload: {filterTags: data},
          });
        }
      }
    })
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response', error.response.message);
      } else {
        console.log('Oops! internet disconected');
      }
    });
};
export const get_filter_meal_data = (val) => async (dispatch) => {
  console.log('GET ALL FOOD PRE calling filter function', val);
  await dispatch({
    type: FAV_MEAL,
    payload: {favMeal: []},
  });
  const {tags, typeofmeal, nutriscore} = val;
  betterMeal
    .post(getFilteredData, {tags, typeofmeal, nutriscore})
    .then(async (response) => {
      console.log('get_filter_meal_data', response.data);
      // console.log('response', response.data.foodpreferences);
      // await dispatch({
      //   type: FILTER_TAGS,
      //   payload: {filterTags: response.data.tags},
      // });
      await dispatch({
        type: FAV_MEAL,
        payload: {favMeal: response.data.val},
      });
    })
    .catch((error) => {
      if (error.response) {
        console.log('[FETCH] errror-> error.response', error.response.message);
      } else {
        console.log('Oops! internet disconected');
      }
    });
};
export const filterSortby = (val) => async (dispatch) => {
  console.log('val', val);
  await dispatch({
    type: SORTBY_FILTERING_DATA,
    payload: {sortBy: val},
  });
};
export const filterByTag = (val) => async (dispatch) => {
  console.log('val', val);
  await dispatch({
    type: TAGS_FILTERING_DATA,
    payload: {filterTags: val},
  });
};
