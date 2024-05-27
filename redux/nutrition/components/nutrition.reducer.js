import {
  GETALLFOODPREFERENCES,
  ADDUSERPFS,
  RECIEVE_NUTRITION_MEAL,
  ADD_NUTRITION_MEAL_BLD,
  UPDATE_NUTRITION_MEAL_BLD,
  EMPTY_NUTRITION_MEAL_BLD,
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
const defaultState = {
  allFoodPreferences: null,
  addFPSStatus: null,
  nutritionMeal: null,
  mealSelected: [],
  dailyUserMeal: [],
  dailyUserMeals:[],
  addMealLoading: true,
  getUserDailyMealBydate: null,
  favMeal: null,
  addedFavMeal: null,
  suggestedMeal: [],
  filterTags: [],
  sortBy: [
    {name: 'Popularity', id: 1, checked: false},
    {name: 'BreakFast', id: 2, checked: false},
    {name: 'Lunch', id: 3, checked: false},
    {name: 'Dinner', id: 4, checked: false},
  ],
};
export default healthsurvey = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case GETALLFOODPREFERENCES:
      return {...state, ...payload};
    case ADDUSERPFS:
      return {...state, ...payload};
    case RECIEVE_NUTRITION_MEAL:
      return {...state, ...payload};
    case ADD_NUTRITION_MEAL_BLD:
      return {
        ...state,
        mealSelected: [...state.mealSelected, action.payload.mealSelected],
      };
    case UPDATE_NUTRITION_MEAL_BLD:
      return {
        ...state,
        ...(state.mealSelected[payload.index].quantity = payload.value),
      };
    case EMPTY_NUTRITION_MEAL_BLD:
      return {...state, ...payload};
    case RECEIVE_DAILY_NUTRITION_MEAL:
      return {...state, ...payload};
    case LOADING_DAILY_NUTRITION_MEAL:
      return {...state, ...payload};
    case GET_DAILY_NUTRITION_MEAL_DATE:
      return {...state, ...payload};
    case UPDATE_WHILE_CHECKBOX:
      return {...state, ...payload};
    case FAV_MEAL:
      return {...state, ...payload};
    case ADDED_FAV_MEAL:
      return {...state, ...payload};
    case ADD_NUTRITION_MEAL_FROM_BM:
      return {...state, ...payload};
    case GET_SUGGESTED_MEAL:
      return {...state, ...payload};
    case FILTER_TAGS:
      return {...state, ...payload};
    case SORTBY_FILTERING_DATA:
      return {...state, ...payload};
    case TAGS_FILTERING_DATA:
      return {...state, ...payload};
    default:
      return state;
  }
};
