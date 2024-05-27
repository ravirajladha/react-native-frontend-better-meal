import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  Card,
  ListItem,
  Button,
  BottomSheet,
  SearchBar,
  Image,
} from 'react-native-elements';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  YellowBox,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import BottomNav from '../../../component/bottomnavtab';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, theme} from '../../../constants';
import {
  recieveHS,
  getSymtomsById,
} from '../../../redux/healthsurvey/components/healthsurvey.action';
import TextComp from '../../../component/text';
const {COLORS, FONTS, SIZES} = theme;
const {
  disease1,
  disease2,
  disease3,
  disease4,
  disease5,
  disease6,
  disease7,
  disease8,
  disease9,
  celiac,
  diabetes,
  hyperthyroidism,
  hypothyroidism,
  pcos,
  irritable,
} = images;

const ListDiseases = ({
  recieveHS,
  healthsurveyList,
  getSymtomsById,
  isVisible,
  callBackfn1,
  callBackfn2,
  callBackfn3,
}) => {
  const [text, setText] = useState('');
  const [renderlist, setRenderlist] = useState(false);

  let filterdData = text // based on text, filter data and use filtered data
    ? healthsurveyList.filter((item) => {
        const itemData = item.diseaseName.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.includes(textData);
      })
    : healthsurveyList; // on on text, u can return all data

  const itemSeparator = () => {
    return (
      <View
        style={{
          height: SIZES.width > 400 ? 0.5 : 0.8,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };
  const SymtomsById = (id) => {
    // console.log('hii', id);
    getSymtomsById(id);
    callBackfn1(false);
    callBackfn2(true);
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
      <View style={styles.view4}>
        <View style={styles.view5}></View>
        <View style={{paddingTop: SIZES.width > 350 ? 10 : 5}}>
          <TextComp
            customeStyle={{
              ...FONTS.h1,
              alignSelf: 'center',
              color: COLORS.white,
              fontWeight: 'bold',
              fontSize: SIZES.width > 350 ? 28 : 22,
            }}
            onPress={() => callBackfn1()}>
            DIAGNOSE
          </TextComp>
        </View>
        <View style={{paddingBottom: SIZES.width > 350 ? 15 : 10}}>
          <TextComp
            customeStyle={{
              ...FONTS.h3,
              alignSelf: 'center',
              color: COLORS.white,
              fontSize: SIZES.width > 350 ? 18 : 12,
            }}
            onPress={() => {
              setRenderlist(false);
            }}>
            my health conditions
          </TextComp>
        </View>
        <View style={{paddingHorizontal: 35}}>
          <TextComp
            customeStyle={{
              ...FONTS.h3,
              alignSelf: 'center',
              color: COLORS.white,
              textAlign: 'center',
              fontSize: SIZES.width > 350 ? 18 : 12,
            }}>
            Browse through the common health issue and check if you are...
          </TextComp>
        </View>
      </View>
      {/* 01b9c6 */}
      <View
        style={{
          backgroundColor: '#01b9c6',
          height: SIZES.width > 400 ? SIZES.height / 11.12 : SIZES.height / 8,
        }}>
        {/* <TouchableOpacity onPress={() => setRenderlist(true)}> */}
        <SearchBar
          onPress={() => setRenderlist(true)}
          placeholder="Select health issue"
          onChangeText={(text) => {
            setText(text);
            setRenderlist(true);
          }}
          value={text}
          // round={true}
          // underlineColorAndroid="black"
          containerStyle={{
            backgroundColor: 'white',
            shadowColor: 'white', //no effect 4
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            height: SIZES.height / 4,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            // marginBottom: 30,
            // height: '100%',
            // bottom: 0,
            // marginTop: 5,
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            boderColor: 'black',
            borderWidth: 1,
            borderRadius: 30,
            borderBottomWidth: 1,
          }}
          searchIcon={{size: 30}}
          // leftIconContainerStyle={{backgroundColor: 'red', size: 30}}1.8
        />
        {/* </TouchableOpacity> */}
      </View>
      {renderlist == false ? (
        <SafeAreaView
          style={{
            flex: 1,
            height: SIZES.height / 1.8,
            backgroundColor: 'white',
          }}>
          {/* <View> */}
          <FlatList
            key={'_'}
            data={
              healthsurveyList && healthsurveyList.length
                ? healthsurveyList.slice(0, 6)
                : []
            }
            keyExtractor={(item) => '#' + item.id}
            style={styles.container}
            renderItem={({item, index}) => {
              let images;
              if (index == 0) {
                images = diabetes;
              } else if (index == 1) {
                images = celiac;
              } else if (index == 2) {
                images = hyperthyroidism;
              } else if (index == 3) {
                images = hypothyroidism;
              } else if (index == 4) {
                images = pcos;
              } else if (index == 5) {
                images = irritable;
              } else if (index == 6) {
                images = disease7;
              } else if (index == 7) {
                images = disease8;
              } else if (index == 8) {
                images = disease9;
              }
              return (
                <TouchableOpacity
                  onPress={() => SymtomsById(item.id)}
                  style={styles.item}>
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={images}
                      style={{
                        width:
                          SIZES.width > 350
                            ? SIZES.width / 7
                            : SIZES.width / 10,
                        height:
                          SIZES.width > 350
                            ? SIZES.height / 14
                            : SIZES.height / 16,
                      }}
                    />
                    <TextComp
                      customeStyle={{
                        // ...FONTS.h4,
                        fontSize: SIZES.width > 350 ? 14 : 10,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {item.diseaseName}
                    </TextComp>
                    <TextComp
                      customeStyle={{
                        // ...FONTS.h4,
                        fontSize: SIZES.width > 350 ? 9 : 7.5,
                        textAlign: 'center',
                      }}>
                      click to check symtoms
                    </TextComp>
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={3}
          />
          {/* Comment by poovarasan as per the client request for version */}
          {/* <View style={{alignSelf: 'center', paddingVertical: 20}}>
            <Button
              title="VIEW ALL"
              titleStyle={{fontSize: SIZES.width > 350 ? 18 : 13}}
              type="outline"
              buttonStyle={{borderWidth: 2, width: 150}}
              onPress={() => setRenderlist(true)}
            />
          </View> */}
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{flex: 1, height: 360, backgroundColor: 'white'}}>
          <FlatList
            key={'#'}
            data={filterdData}
            numColumns={0}
            keyExtractor={(item) => '_' + item.id}
            ItemSeparatorComponent={itemSeparator}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => SymtomsById(item.id)}>
                <Text style={styles.row}>{item.diseaseName}</Text>
              </TouchableOpacity>
            )}
            style={{marginTop: 0}}
          />
        </SafeAreaView>
      )}

      {/* <View style={{height: 50}}>
        <BottomNav />
      </View> */}
    </BottomSheet>
  );
};
const mapStateToProps = (store) => {
  return store.healthsurvey;
};
ListDiseases.navigationOptions = {
  header: () => null,
};
const styles = StyleSheet.create({
  view3: {
    backgroundColor: 'white',
    width: SIZES.width / 10,
    height: SIZES.height / 200,
    alignSelf: 'center',
  },
  view4: {
    backgroundColor: '#01b9c6',
    paddingTop: SIZES.width > 350 ? 20 : 10,
    paddingBottom: SIZES.width > 350 ? 10 : 5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  view5: {
    backgroundColor: 'white',
    width: SIZES.width / 10,
    height: SIZES.height / 200,
    alignSelf: 'center',
  },
  view6: {},
  view7: {},
  row: {
    fontSize: 15,
    // padding: 12, 15
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    marginVertical: SIZES.width > 350 ? 20 : 15,
  },
  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    marginHorizontal: 9,
    marginVertical: 4,
    // width: 20,
    // borderColor: 'black',
    // borderWidth: 1,
    // width: 20,
    // width: 50,
    height: SIZES.height / 8,
    padding: 1, // approximate a square
    shadowColor: '#000',

    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});
export default connect(mapStateToProps, {recieveHS, getSymtomsById})(
  ListDiseases,
);
