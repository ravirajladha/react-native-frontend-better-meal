import React, {forwardRef, useImperativeHandle, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const InputField = forwardRef((props, ref) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');
  const [isDirty, setIsDirty] = React.useState(false);

  useEffect(() => {
    if (isDirty) {
      setError('');

      validate();
      props.handleInputChange(props.name, value);
    }
  }, [value]);
  const handleChange = (Text) => {
    console.log('calling ====4');
    console.log('Value inside handleChange:', Text);
    setValue(Text).then((res) => {
      console.log('Value inside handleChange222:', Text);
    });
  };

  const validate = () => {
    //return true if is valid
    //else return false

    if (props.validation) {
      const rules = props.validation.split('|');

      for (let i = 0; i < rules.length; i++) {
        const current = rules[i];

        if (current === 'required') {
          if (!value) {
            setError(`${props.name} is required`);
            return false;
          }
        }

        const pair = current.split(':');
        switch (pair[0]) {
          case 'min':
            if (value.length < pair[1]) {
              setError(
                `This field must be at least ${pair[1]} characters long`,
              );
              return false;
            }
            break;
          case 'max':
            if (value.length > pair[1]) {
              setError(
                `This ${value} must be no longer than ${pair[1]} characters long`,
              );
              return false;
            }
            break;
          case 'emailpattern':
            if (!/\S+@\S+\.\S+/.test(value)) {
              setError(` Invalid  ${props.name} id`);
              return false;
            }
            break;
          case 'userpattern':
            if (!/^[0-9a-zA-Z.: @_-]+$/.test(value)) {
              setError(
                `charcters allowed ['A-Z','a-z','0-9', '@', '.', '-', '_', ':' ]`,
              );
              return false;
            }
            break;
          case 'passwordmatch':
            // console.log('props.pass', props.password);
            if (!value) {
              setError(`Password doesn't match `);
              return false;
            } else if (value != props.password) {
              setError(`Password doesn't match `);
              return false;
            }
            break;
          case 'onlynumber':
            if (!/^[0-9]+$/.test(value)) {
              //isNaN(value)
              setError(`Please enter valid ${props.name}`);
              return false;
            }
            break;
          default:
            // return false;
            break;
        }
      }
    }

    return true;
  };

  useImperativeHandle(ref, () => {
    // console.log("calling use imperativeHandle");
    // console.log("calling ====2");

    return {
      validate: () => validate(),
    };
  });

  return (
    <View>
      <TextInput
        style={{...styles.input, ...props.customeStyle}}
        placeholder={props.placeholder}
        name={props.name}
        onChangeText={(Text) => {
          setValue(Text);
          setIsDirty(true);
        }}
      />
      <Text style={{color: 'red', fontSize: 12, textAlign: 'center'}}>
        {error}
      </Text>
    </View>
  );
});
const styles = StyleSheet.create({
  input: {
    height: 50,
    // width: "80%",
    width: width / 1.1,
    padding: 8,
    // margin: 16,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    alignSelf: 'center',
  },
});
export default InputField;
