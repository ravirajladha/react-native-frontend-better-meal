// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   FlatList,
//   SafeAreaView,
// } from 'react-native';
// import TextComp from '../../../component/text';
// import {FONTS, SIZES} from '../../../constants';
// import LinearGradient from 'react-native-linear-gradient';
// import * as Progress from 'react-native-progress';

// import {recieveNutriMeal} from '../../../redux/nutrition/components/nutrition.action';

// import {
//   Card,
//   ListItem,
//   Button,
//   BottomSheet,
//   SearchBar,
//   Avatar,
//   Badge,
//   Icon,
//   withBadge,
//   Image,
//   Slider,
//   Chip,
//   CheckBox,
//   Header,
// } from 'react-native-elements';
// import {useState} from 'react';
// import {connect} from 'react-redux';
// import {ScrollView} from 'react-native-gesture-handler';
// import {StatusBar} from 'react-native';
// const NutritionMenu = ({nut}) => {
//   const [isvisible, setIsVisible] = useState(true);
//   const [icon, setIcon] = useState('heart-outline');
//   const [iconColor, setIconColor] = useState('')
//   const [textValue, setTextValue ] = useState('');
//   let base64Image;
//    var base64Photo;
//   let photoId = [{}];

//   function iconPosting(ids) {
//       console.log('image---',ids);
//       for(let i=0;i<nut.length;i++){
//         //   console.log('idssss---',nut[i].id)
//         if(nut[i].nutrition_image === ids){
//             console.log('inside if---')
//             // setIcon('heart')
//             // setIconColor('red')
//             photoId.push(ids)
            
            
//         }
//         else {
//             console.log('inside else---')
//             // setIcon('heart-outline')
//             //     setIconColor('')
//         }   
//     }

//     for(let i=0;i<photoId.length;i++){
        
//         console.log(i)
//         console.log('ima',photoId[i])
//         base64Photo =  photoId[i];
//     }

//     console.log('base64--------',base64Photo)
       
      
//   }

//   const searchItems = (text) => {
//     console.log('Text=====', text);
//     if (text.length > 0) {
//       //   const newData = nut.filter((item) => {
//       //     const itemData = `${item.foodName.toUpperCase()}`;
//       //     const textData = text.toUpperCase();
//       //     console.log('Text=====', itemData.indexOf(textData) > -1);
//       //     return itemData.indexOf(textData) > -1;
//       //   });
//       // console.log('newData', newData);
//       //   setData(newData);
//       //   setValue(text);
//     } else {
//       //   setData(null);
//       //   setValue(text);
//     }
//   };

 

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#1b51f1" barStyle="dark-content" />
//       <LinearGradient
//         colors={['#1b51f1', '#1b51f1']}
//         style={{paddingTop: 30, bottom: 10, paddingBottom : 10}}>
//         <TextComp
//           customeStyle={{
//             ...FONTS.h2,
//             textAlign: 'center',
//             color: 'white',
//             bottom: 3,
//             // paddingTop : 20,
//             // top : 10
//           }}>
//           BM Menu
//         </TextComp>
//       </LinearGradient>

//       <View style={{backgroundColor: 'white', paddingBottom :20, bottom  :10}}>
//         <TextComp
//           customeStyle={{
//             ...FONTS.h3,
//             fontWeight: 'bold',
//             bottom: 30,
//             paddingLeft: 15,
//             paddingBottom : 20,
//             backgroundColor: 'white',
//             top : 8,
//             color : '#585858',
//             // paddingTop : 10,
//           }}>
//           FAVOURITES
//         </TextComp>
//         {/* <ScrollView horizontal={true} style={{left: 30, bottom: 20, top: 5, paddingBottom : 20, backgroundColor : 'white'}}> */}
//         <FlatList
//           horizontal={true}
//            keyExtractor={(item) => item.id}
//           data = {nut}
//           renderItem = {({item}) => (
//             (base64Image = item.nutrition_image),
//             <View>
//             <Avatar
//             size="large"
//             title="BM"
//             source={{
//               uri: `data:image/jpeg;base64,${base64Image}`,
//             }}
//             onPress={() =>{}}
//             activeOpacity={0.7}
//             containerStyle={{backgroundColor: 'grey', marginLeft : 20}}
//           />
//           </View>
  
//         )}
//           />
//       </View>

//       <View style={{marginTop: 5, paddingBottom : 10}}>
//         <SearchBar
//           onPress={() => setRenderlist(true)}
//           placeholder="Search Meal"
//           onChangeText={() => searchItems(text)}
//           value={textValue}
//           containerStyle={{
//             backgroundColor: 'transparent',
//             borderBottomColor: 'transparent',
//             borderTopColor: 'transparent',
//             // height: SIZES.height / 4,
//             //   borderTopRightRadius: 30,
//             //   borderTopLeftRadius: 30,
//             borderBottomLeftRadius: 30,
//             borderBottomRightRadius: 30,
//           }}
//           inputContainerStyle={{
//             backgroundColor: 'white',
//             borderRadius: 30,
//             elevation: 5,
//           }}
//           searchIcon={{size: 30}}
//         />
//       </View>

//       <View>
      
//         <BottomSheet
//           isVisible={true}
//           containerStyle={{
//             backgroundColor: 'white',
//             marginTop: 300,
//             flex: 1,
//             marginRight: 20,
//             marginLeft: 20,
//             borderTopRightRadius: 30,
//             borderTopLeftRadius: 30,
//           }}>
         
//           <View style = {{flexDirection : 'row', width : '100%',paddingVertical : 10}}>
                
//                 <TextComp customeStyle = {{...FONTS.h3, fontWeight : 'bold',color : 'blue', paddingHorizontal : 15, width : '72%'}}>MENU</TextComp>
               
//                 <Icon  
//                     name='filter'
//                     type='ionicon'
//                     color='#517fa4'
//                     containerStyle = {{width : '10%'}}
//                 />
                
//                 <CheckBox 
//                  containerStyle = {{borderColor : 'blue', width : '18%', bottom : 12}}
//                 />
               
//           </View>              

//           <View style={{bottom : 25}}>
//             <SafeAreaView>
//               <FlatList
//                 keyExtractor={(item) => item.id}
//                 data={nut}
//                 renderItem={({item}) => (
//                   (base64Image = item.nutrition_image),
//                   (

//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         // justifyContent: 'space-between',
//                         width : '100%',
//                         paddingVertical : 10,
//                       }}>

//                       <View style={{width : '30%',paddingHorizontal : 20 }}>
//                         <Avatar
//                           size="large"
//                           title="BM"
//                           source={{
//                             uri: `data:image/jpeg;base64,${base64Image}`,
//                           }}
//                           onPress={() =>{}}
//                           activeOpacity={0.7}
//                           containerStyle={{backgroundColor: 'grey'}}
//                         />
//                       </View>

//                       <View style={{ width : '50%'}}>
//                         <TextComp
//                           customeStyle={{...FONTS.h3, color : '#707070', marginRight : 30, alignSelf : 'flex-start'}}>
//                           {item.foodName}
//                         </TextComp>

//                         <TextComp
//                           customeStyle={{...FONTS.h4, color : '#707070',alignSelf : 'flex-start'}}>
//                           {item.serving}
//                         </TextComp>
                                          
//                         <View style = {{flexDirection : 'row'}}>
//                         <Progress.Bar
//                          progress={1}
//                          showsText={true}
//                          width={SIZES.width / 14}
//                          height={SIZES.height / 90}
//                          borderRadius={40}
//                          unfilledColor="white"
//                          color="#61a014"
//                          >
//                         {/* <TextComp
//                           customeStyle={{...FONTS.h4,color : '#707070', fontSize : 12, textAlign : 'center'}}>
//                           {item.nutritionScore}
//                         </TextComp> */}
//                         </Progress.Bar>
//                         <TextComp customeStyle={{...FONTS.h4, color : '#707070'}}> NutritionScore</TextComp>
//                         </View>
//                       </View>

//                       <View
//                         style={{
//                            width : '20%'
//                         }}>
//                         <Icon
//                           name= {icon}
//                           type="ionicon"
//                           color={iconColor}
//                           onPress = {() => {}}
//                           containerStyle={{}}
//                         />
//                       </View>
//                     </View>
//                   )
//                 )}
//               />
//             </SafeAreaView>
//           </View>
//         </BottomSheet>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // backgroundColor : 'white',
//     flex: 0.5,
//   },
// });

// NutritionMenu.navigationOptions = {
//   header: () => null,
// };

// const mapStateToProps = (store) => {
//   //   console.log('data----',store.nutrition.nutritionMeal[1].foodName)
//   return {nut: store.nutrition.nutritionMeal};
// };

// export default connect(mapStateToProps, {recieveNutriMeal})(NutritionMenu);
