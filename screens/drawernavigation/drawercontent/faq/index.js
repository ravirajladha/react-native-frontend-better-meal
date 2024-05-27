import React from 'react';
import {useState, useEffect} from 'react';
import {Button, Image, Header, Card, Icon} from 'react-native-elements';
import {
  ListItem,
  ScrollView,
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {images, theme} from '../../../../constants';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import {onFaqList} from '../../../../redux/user/components/user.action';


const FAQ = ({navigation, onFaqList, faqList}) => {
  const [activeSections, setActiveSections] = useState([]);

  useEffect(() => {
    onFaqList();
  }, []);

  // const QuesAns = faqList ? faqList : [];


  const setSections = (sections) => {
    //setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };


  const renderHeader = (section, _, isActive) => {
    //Accordion Que view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <View style={styles.headerContainerDiv}>
          <Text style={styles.headerText}>{section.que}</Text>
            {isActive ? 
                <TouchableOpacity>
                  <Icon
                    // raised
                    size={25}
                    name="chevron-up-outline"
                    type="ionicon"
                    color="#4d4d4d"
                    style={{
                      paddingTop : 10,
                    }}
                  />
                </TouchableOpacity> 
                :
                <TouchableOpacity>
                  <Icon
                    // raised
                    size={25}
                    name="chevron-down-outline"
                    type="ionicon"
                    color="#4d4d4d"
                    style={{
                      paddingTop : 10,
                    }}
                  />
                </TouchableOpacity> }
        </View>
        
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    //Accordion Ans view
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.activeCont : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={styles.textContent}>
          {section.ans}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    <ScrollView 
      style = {{
        backgroundColor : "#fff",
      }}>
      <Header
        statusBarProps={{
          barStyle: 'light-content',
          backgroundColor: '#fff',
        }}
        backgroundColor="#fff"
        containerStyle={{
          borderBottomColor: 'transparent',
        }}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              // raised
              size={30}
              name="chevron-back-outline"
              type="ionicon"
              color="#4d4d4d"
              
            />
          </TouchableOpacity>
        }
      />

      <View style={{
        backgroundColor: "#fff"
      }}>
        <Text
          style={{
            // textAlign: 'center',
            color: '#747474',
            paddingTop: 15,
            paddingHorizontal: 18,
            fontSize: 38,
            fontWeight: '700',
            letterSpacing : 1,
          }}>
          Frequently Asked
        </Text>

        <Text
          style={{
            // textAlign: 'center',
            color: '#747474',
            // paddingVertical : 30,
            paddingHorizontal: 18,
            fontSize: 38,
            fontWeight: '700',
            letterSpacing : 1,
          }}>
          Questions
        </Text>
      </View>
      <View style={styles.mainContainer}>
          <Accordion
            activeSections={activeSections}
            sections={faqList ? faqList : []}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader}
            renderContent={renderContent}
            // duration={400}
            onChange={setSections}
          />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    width: 400,
    height: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  headerContainerDiv : {
      flex : 1,
      flexDirection : "row",
      justifyContent : "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
  },
  header: {
    backgroundColor: '#F5FCFF',
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 20,
    color : "#747474",
    fontWeight : "bold",
    paddingVertical : 15,
  },
  content: {
    paddingBottom: 10,
    paddingTop : 5,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
    borderColor: "#f5f5f5",
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderLeftWidth:5,
  },
  activeCont: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    borderColor: "#f5f5f5",
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderLeftWidth:5,
  },
  inactive: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 20
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  textContent : {
    fontSize: 20,
    color : "#747474",
  }
});
const mapStateToProps = (store) => {
  //   console.log('store.nutrition.nutritionMeal', store.nutrition.addMealLoading);
  return {
    faqList: store.user.faqList,
  };
};

export default connect(mapStateToProps, {onFaqList})(FAQ);
