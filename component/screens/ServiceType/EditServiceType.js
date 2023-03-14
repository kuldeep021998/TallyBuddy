/* eslint-disable react-native/no-inline-styles */
import React, {useFocusEffect, useState, useCallback, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {
  getData,
  postData,
  putData,
  deleteData,
} from '../../connection/FetchServices';

const {height, width} = Dimensions.get('window');

export default function EditServiceType({navigation, route}) {
  const [inputs, setInputs] = useState({
    name: '',
    servicecharge: '',
    status: '',
  });
  const [error, setError] = useState({});

  const validate = () => {
    var isValid = true;
    if (!inputs.name) {
      handleErrors('Please Input Name', 'name');
      isValid = false;
    }
    if (!inputs.servicecharge) {
      handleErrors('Please Input Service Charge', 'servicecharge');
      isValid = false;
    }
    return isValid;
  };
  const [checked, setChecked] = React.useState('first');

  const fetchServiceType = async () => {
    const result = await getData('typesofservice/' + route.params.id);
    if (result.status) {
      setInputs({
        name: result.data.name,
        servicecharge: String(result.data.servicecharge),
        status: result.data.status,
      });
    }
  };

  useEffect(function () {
    fetchServiceType();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchServiceType();
  //   }, []),
  // );

  const handleEdit = async () => {
    if (validate()) {
      const body = {
        name: inputs.name,
        servicecharge: inputs.servicecharge,
        status: inputs.status,
      };
      const result = await putData('typesofservice/' + route.params.id, body);
      if (result.status) {
        navigation.goBack();
      }
    }
  };

  const handleDelete = async () => {
    const result = await deleteData('typesofservice/' + route.params.id);
    if (result.status) {
      navigation.goBack();
    }
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
          value={inputs.name}
        />
        <Input
          error={error.servicecharge}
          onFocus={() => handleErrors(null, 'servicecharge')}
          onChangeText={txt => handleValues(txt, 'servicecharge')}
          placeholder="Service Charge"
          value={inputs.servicecharge}
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
            marginLeft: 20,
            justifyContent: 'center',
          }}>
          <RadioButton
            value="1"
            status={
              checked == '1' || inputs.status == '1' ? 'checked' : 'unchecked'
            }
            onPress={() => {
              setChecked('1');
              handleValues('1', 'status');
            }}
          />
          <Text style={{marginRight: 50}}>Yes</Text>
          <RadioButton
            value="2"
            status={
              checked == '2' || inputs.status == '2' ? 'checked' : 'unchecked'
            }
            onPress={() => {
              setChecked('2');
              handleValues('2', 'status');
            }}
          />
          <Text>No</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            margin: 10,
          }}>
          <AppButton
            onPress={handleEdit}
            buttonText={'Edit'}
            bgColor="#FC6011"
            btnWidth={0.3}
            style={{marginRight: '10%'}}
          />
          <AppButton
            onPress={handleDelete}
            buttonText={'Delete'}
            bgColor="#FC6011"
            btnWidth={0.3}
            style={{marginLeft: '10%'}}
          />
        </View>
      </View>
    </View>
  );
}
