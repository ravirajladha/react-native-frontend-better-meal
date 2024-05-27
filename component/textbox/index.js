import React from 'react';
// import {Input} from 'react-native-elements';
import {TextInput} from 'react-native';

const InputBox = (props) => (
  <TextInput
    style={{
      height: 40,
      borderColor: 'red',
      borderWidth: 1,
      // selectionColor: 'green',
    }}
    {...props}
  />
);

export default InputBox;
