import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, FlatList, TouchableOpacity } from 'react-native';
import { Card, ListItem, Button, Header } from 'react-native-elements';
import { images, theme } from '../../constants';
import {
    getSuggestedMeals,
    getDailyUserNutritionMealByDate
} from '../../redux/nutrition/components/nutrition.action';
import { connect } from 'react-redux';
import TextComp from '../../component/text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { COLORS, FONTS, SIZES } = theme;
import * as Progress from 'react-native-progress';
//import { useNavigation } from '@react-navigation/native';
const AddMealPopup = ({
    navigation,
    recieveAllFP,
    recieveNutriMeal,
    user,
    getDailyUserNutriMeal,
    recieveAddedFavMEal,
    route,
    suggestedMeal,
    getSuggestedMeals
  },props) => {
    //const navigation = useNavigation();
    useEffect(() => {
     getSuggestedMeals(user.id);
      }, []);

    function display() {
        let data;
        const day= new Date();
        var hr = day.getHours();
        console.log("hours------>",hr)
        if (hr >= 0 && hr < 12) {        
            data=0;        
        } else if (hr >= 12 && hr <= 17) {
            data=1;
        }  if (hr >= 18) {
            data=3;
        }
        console.log(data)
        return suggestedMeal[data].suggestedDailyMeal.map((item) => {
            let color;
            if (parseInt(item.nutritionScore) >= 4) {
                color = '#609f13';
            } else if (
                parseInt(item.nutritionScore) >= 3 &&
                parseInt(item.nutritionScore) < 4
            ) {
                color = '#f7c846';
            } else if (parseInt(item.nutritionScore) < 3) {
                color = '#fd7d21';
            }
            return (
                <>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 6, marginVertical: 20
                    }}>
                   <Card.Image
                            style={{
                                padding: 30, width: 90,
                                height: 90,
                                marginRight: 10, borderRadius: 15
                            }}
                            source={{
                                uri: `${item.nutritionImage}`
                            }}
                        />
                        <View
                            style={{
                                width: '55%',
                                justifyContent: 'center' ,
                            }}>
                            <TouchableOpacity
                            >
                                <View style={{}}>
                                    <TextComp
                                        customeStyle={{
                                            color: '#757575',
                                            paddingHorizontal: 10,
                                            fontSize: SIZES.width / 28,
                                            fontWeight: 'bold',
                                        }}>
                                        {item.foodName}
                                    </TextComp>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingVertical: 5,
                                        paddingHorizontal: 10,
                                    }}>
                                    <View style={{ paddingVertical: 5 }}>
                                    <View style={{ flexDirection:'row', flexWrap:'wrap'  }}> 
                                        <Progress.Bar
                                            progress={
                                                (parseFloat(item.nutritionScore) +
                                                    parseFloat(item.nutritionScore)) /
                                                10
                                            }
                                            showsText={true}
                                            width={SIZES.width / 14}
                                            height={SIZES.height / 90}
                                            borderRadius={20}
                                            unfilledColor="white"
                                            color={color}
                                            textStyle={{ fontSize: 36, color: 'black' }}
                                            style={{
                                                shadowColor: '#000',
                                                shadowOpacity: 0.8,
                                                shadowRadius: 2,
                                                elevation: 5,
                                            }}></Progress.Bar>
                                            <Text style={{...FONTS.h4 ,color:'#858686',  position: 'absolute',
                                              right:-30,bottom:-5}}>{parseFloat(item.nutritionScore)}</Text>
               
                                            </View>
                                    </View>
                                    <TextComp
                                        customeStyle={{
                                            color: '#b3b3b3',
                                            paddingHorizontal: 33,
                                            fontSize: SIZES.width / 28,
                                            // fontWeight: 'bold',
                                        }}>
                                        Nutrition Score
                                    </TextComp>
                                </View>
                                <View>
                                    <TextComp
                                        customeStyle={{
                                            color: '#b3b3b3',
                                            paddingHorizontal: 10,
                                            fontSize: SIZES.width / 28,
                                            // fontWeight: 'bold',
                                        }}>
                                        {item.serving}
                                    </TextComp>
                                </View>
                            </TouchableOpacity>
                        </View>


                        <View
                            style={{
                                width: '15%',
                            }}>
                            <TouchableOpacity>

                                <MaterialCommunityIcons
                                    name="heart"
                                    size={SIZES.width / 15}
                                    color="red"
                                />
                            </TouchableOpacity>
                        </View>

                    </View>

                </>
            );
        });
    }

    return (
        <>
            <View
                style={{ backgroundColor: '#FFFFFF', height: '100%' }}>

                <Text style={styles.headText}>
                    Hey!
                </Text>
                <Text style={styles.baseText}>Here we got some food for you which would help you in achieving your health target.</Text>
                <Card containerStyle={{
                    borderRadius: 25, shadowColor: "#000000", height: 400,
                }}>

                    <Text style={styles.cardHead}
                    >Next Meal Recommendations</Text>
                    {suggestedMeal && suggestedMeal.length ?
                        display() : null}


                </Card>

                <Button
                    title="Create Meals"
                    buttonStyle={{
                        borderRadius: 10,
                        alignSelf: 'center',
                        backgroundColor: '#2174dc',
                        width: 250,
                        height: 60,
                    }}
                    onPress={() =>  
                         navigation.navigate('MealPlannerScreen')
                    }
                    titleStyle={{ ...FONTS.h2, fontWeight: "bold", }}
                    containerStyle={{
                        ...FONTS.h1,
                        height: 60,
                        marginVertical: 40,
                    }}
                ></Button>

            </View>

        </>
    );
};



const styles = StyleSheet.create({
    headText: {
        ...FONTS.h1,
        color: "#1a51f0",
        fontWeight: "bold",
        // fontFamily: "Verdana",
        // textAlign: 'center',
        marginVertical: 30,
        marginHorizontal: 160,

    },
    cardHead: {
        ...FONTS.h2,
        color: "#1a51f0",
        // fontFamily: "Verdana",
        // textAlign: 'center',
    },
    baseText: {
        ...FONTS.h3,
        justifyContent: 'center',
        marginHorizontal: 30,
        marginVertical: 10,

    },
    backgroundImage: {
        // flex: 1,
        height: 230,
        position: 'absolute',
        left: 0,
        marginHorizontal: 100,
        marginVertical: 0,
        // justifyContent: "center",
        // alignItems: "center",

    },
});

const mapStateToProps = (store) => {
    return {
        suggestedMeal: store.nutrition.suggestedMeal,
        dailyUserMeal: store.nutrition.dailyUserMeal,
        user: store.user.user,
    };
};
export default connect(mapStateToProps, {getSuggestedMeals})(AddMealPopup);

//   export default AddMealPopup;