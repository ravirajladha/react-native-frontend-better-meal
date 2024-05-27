import React from 'react';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {
  Card,
  ListItem,
  Button,
  BottomSheet,
  SearchBar,
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
} from 'react-native';
const List = () => {
  return (
    <SafeAreaView 
    style={styles.section}>
    {/* //   flex: 1,
    //  height: 360,
    //   backgroundColor: 'white' */}
      
      <FlatList
        data={filterdData}
        numColumns={0}
        keyExtractor={(item) => '_' + item.id}
        ItemSeparatorComponent={itemSeparator}
        renderItem={({item}) => (
          <Text style={styles.row}>{item.diseaseName}</Text>
        )}
        style={{marginTop: 0}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section : {
    flex: 1, 
    height: 360,
    backgroundColor: 'white'
  },
})
export default List;
