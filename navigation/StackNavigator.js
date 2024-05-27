import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {
  ExploreScreen,
  GutHealthScreen,
  MiddleIconScreen,
  NutritionScreen,
  CoachScreen,
} from '../screens/bottomtabscreen';
import GutSurveyScreen from '../screens/guthealth/gutsurvey';
import FoodPreference from '../screens/nutrition/foodpreference';
import BMMENU from '../screens/nutrition/bm_menu';
import {Image} from 'react-native-elements';
import BMMENUFAV from '../screens/nutrition/bm_menu_fav';
import Header from '../component/headers';
import ExploreMenu from '../screens/nutrition/explore_menu';
import Favourite from '../screens/nutrition/favourite';
import MealPlannerScreen from '../screens/nutrition/mealplanner/mealplannerscreen';
import DryFruit from '../screens/homescreens/dailytask/dryfruit';
import Support from '../screens/drawernavigation/drawercontent/support';
import BioMarks from '../screens/guthealth/biomarks';
// import {images, theme} from '../../../constants';
// const {COLORS, FONTS, SIZES} = theme;
import Medications from '../screens/guthealth/medications';
import ViewAll from '../screens/homescreens/viewAllScreen'
import UpdateAddMeal from '../screens/homescreens/viewAllScreen/updateAddMeal';

const ExploreStackNavigator = createStackNavigator({
  ExploreScreen: {
    screen: ExploreScreen,
    navigationOptions: {
      headerTitle: 'ExploreScreen',
    },
  },
});
const GutHealthStackNavigator = createStackNavigator({
  GutHealthScreen: {
    screen: GutHealthScreen,
  },
  GutSurveyScreen: {
    screen: GutSurveyScreen,
  },
  Medications: {
    screen: Medications,
    navigationOptions: {
      headerTitle: () => <Header title="Medication" />,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#32c6d0',
      },
      headerTintColor: 'white',
    },
  },
  BioMarks: {
    screen: BioMarks,
    navigationOptions: {
      headerTitle: () => <Header title="BIO MARKS" />,
      // headerBackground: () => (
      //   <Image
      //     // style={StyleSheet.absoluteFill}
      //     source={require('../assets/images/Image 82.png')}
      //   />
      // ),

      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#01b9c6',
      },
      headerTintColor: 'white',
    },
  },
});
const HomeStackNavigator = createStackNavigator({
  HomeScreen: {
    screen: MiddleIconScreen,
    // navigationOptions: {
    //   headerTitle: 'HomeScreen',
    // },
  },
  // AddMealScreen:{
  //   screen:AddMealScreen,
  // },
  DryFruitScreen: {
    screen: DryFruit,
    navigationOptions: {
      headerShown: false,
      tabBarVisible: false,
    },
  },
  Support: {
    screen: Support,
    navigationOptions: {
      headerTitle: () => <Header title="Support" />,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#3595d9',
      },
      headerTintColor: 'white',
    },
  },
  ViewAll: {
    screen: ViewAll,
    navigationOptions: {
      headerTitle: () => <Header title="ACTION" />,
      headerTitleAlign: 'center',

      headerStyle: {
        backgroundColor: '#ff5d21',
        // borderBottomColor : 'transparent',
      },
      headerTintColor: 'white',
      headerShown: false,
      tabBarVisible: false,
    },
  },
  UpdateAddMeal: {
    screen: UpdateAddMeal,

    navigationOptions: {
      headerTitle: () => <Header title="ADD MEAL" />,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#ff5d21',
      },
      headerTintColor: 'white',
      headerShown: false,
      tabBarVisible: false,
    },
  },
});
const NutritionStackNavigator = createStackNavigator({
  NutritionScreen: {
    screen: NutritionScreen,
  },
  BMMENUFAV: {
    screen: BMMENUFAV,
    navigationOptions: {
      headerTitle: () => <Header title="BM Menu" />,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#1b51f1',
      },
      headerTintColor: 'white',
    },
  },
  FoodPreferences: {
    screen: FoodPreference,
    navigationOptions: {
      headerTitle: () => <Header title="FoodPreference" />,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#1b51f1',
      },
      headerTintColor: 'white',
    },
  },
  BMMENU: {
    screen: BMMENU,
    navigationOptions: {
      headerTitle: () => <Header title="BM Menu" />,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#1b51f1',
      },
      headerTintColor: 'white',
    },
  },
  ExploreMenu: {
    screen: ExploreMenu,
    navigationOptions: {
      headerTitle: () => <Header title="Explore Menu" />,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#1b51f1',
      },
      headerTintColor: 'white',
    },
  },
  Favourite: {
    screen: Favourite,
    navigationOptions: {
      headerTitle: () => <Header title="Favourites" />,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#1b51f1',
      },
      headerTintColor: 'white',
    },
  },
  MealPlannerScreen: {
    screen: MealPlannerScreen,
    // navigationOptions: {
    //   headerTitle: () => <Header title="Favourites" />,
    //   headerTitleAlign: 'center',
    //   headerStyle: {
    //     backgroundColor: '#1b51f1',
    //   },
    //   headerTintColor: 'white',
    // },
  },
});
const CoachStackNavigator = createStackNavigator({
  CoachScreen: {
    screen: CoachScreen,
    navigationOptions: {
      headerTitle: 'CoachScreen',
    },
  },
});

export {
  ExploreStackNavigator,
  GutHealthStackNavigator,
  HomeStackNavigator,
  NutritionStackNavigator,
  CoachStackNavigator,
};
