import React from 'react';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
const List = ({navigation}) => (
  <Card>
    <Card.Title onPress={() => navigation.openDrawer()}>hi</Card.Title>
  </Card>
);
export default List;
