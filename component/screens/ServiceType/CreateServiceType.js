/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {postData} from '../../connection/FetchServices';

const {height, width} = Dimensions.get('window');

export default function CreateServiceType({navigation}) {
  const [inputs, setInputs] = useState({
    name: '',
    serviceCharge:'',
    status: '',
  });
  const [error, setError] = useState({});

  const validate = () => {
    var isValid = true;
    if (!inputs.name) {
      handleErrors('Please Input Name', 'name');
      isValid = false;
    }
    if (!inputs.serviceCharge) {
      handleErrors('Please Input Service Charge', 'serviceCharge');
      isValid = false;
    }
    return isValid;
  };
  const [checked, setChecked] = React.useState('first');

  const handleSubmit = async () => {
    if (validate()) {
      let body = {
        name: inputs.name,
        serviceCharge: inputs.serviceCharge,
        status: inputs.status,
      };
      const result = await postData('typesofservice', body);
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
        Create Type of Services
      </Text>

      <View style={{alignItems: 'center'}}>
        <Input
          error={error.name}
          onFocus={() => handleErrors(null, 'name')}
          onChangeText={txt => handleValues(txt, 'name')}
          placeholder="Name"
        />
        <Input
          error={error.serviceCharge}
          onFocus={() => handleErrors(null, 'serviceCharge')}
          onChangeText={txt => handleValues(txt, 'serviceCharge')}
          placeholder="Service Charge"
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
            justifyContent: 'center',
            marginTop: 5,
            marginLeft: 20,
          }}>
          <RadioButton
            value="1"
            status={checked === '1' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('1');
              handleValues('1', 'status');
            }}
          />
          <Text style={{marginRight: 50, color: 'black'}}>Yes</Text>
          <RadioButton
            value="2"
            status={checked === '2' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('2');
              handleValues('2', 'status');
            }}
          />
          <Text style={{color: 'black'}}>No</Text>
        </View>
      </View>
      <View style={{alignSelf: 'center'}}>
        <AppButton
          onPress={handleSubmit}
          buttonText={'Create'}
          btnWidth={0.8}
        />
      </View>
      <View style={{marginTop: 10}} />
    </View>
  );
}
