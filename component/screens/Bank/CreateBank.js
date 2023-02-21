/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {postData} from '../../connection/FetchServices';

const {height, width} = Dimensions.get('window');

export default function CreateBank() {
  const [inputs, setInputs] = useState({
    name: '',
    status: '',
  });
  const [error, setError] = useState({});

  const validate = () => {
    var isValid = true;
    if (!inputs.name) {
      handleErrors('Please Input Name', 'name');
      isValid = false;
    }
    return isValid;
  };
  const [checked, setChecked] = React.useState('first');

  const handleSubmit = async () => {
    if (validate()) {
      let body = {
        name: inputs.name,
        status: inputs.status,
      };
      const result = await postData('banks', body);
      console.log(result);
      alert(result.status);
    }
    // }
  };

  const handleValues = (txt, attr) => {
    setInputs(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleErrors = (txt, attr) => {
    setError(prevStates => ({...prevStates, [attr]: txt}));
  };

  return (
    <View
      style={{
        margin: height * 0.001,
        justifyContent: 'center',
        height: '100%',
      }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Montserrat',
          fontWeight: 'bold',
          color: '#2C2C2C',
          marginLeft: 40,
        }}>
        Create Bank Deatails
      </Text>

      <View style={{alignItems: 'center'}}>
        <Input
          error={error.name}
          onFocus={() => handleErrors(null, 'name')}
          onChangeText={txt => handleValues(txt, 'name')}
          placeholder="Name"
        />
      </View>

      <View style={{justifyContent: 'flex-start'}}>
        <Text
          style={{
            marginTop: 10,
            fontWeight: 'bold',
            color: '#2C2C2C',
            fontSize: 16,
            marginLeft: 40,
          }}>
          Status
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
            justifyContent: 'center',
          }}>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('first');
              handleValues('first', 'status');
            }}
          />
          <Text style={{marginRight: 50}}>Yes</Text>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('second');
              handleValues('second', 'status');
            }}
          />
          <Text>No</Text>
        </View>
      </View>
      <View style={{alignSelf: 'center'}}>
        <AppButton onPress={handleSubmit} buttonText={'Create'} btnWidth={0.8}/>
      </View>
      <View style={{marginTop: 10}} />
    </View>
  );
}
