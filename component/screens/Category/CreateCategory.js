import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import AppButton from '../../uicomponent/AppButton';
import {postData} from '../../connection/FetchServices';
import {RadioButton} from 'react-native-paper';
import Input from '../../uicomponent/Input';

const {height, width} = Dimensions.get('window');

export default function CreateCategory({navigation}) {
  const [inputs, setInputs] = useState({
    name: '',
    gst_percent: '',
    status: '',
    hsn: '',
  });

  const [error, setError] = useState({});
  const [checked, setChecked] = React.useState('first');

  const validate = () => {
    var isValid = true;
    if (!inputs.name) {
      {
        handleErrors('Please Input Name', 'name');
      }
      isValid = false;
    }
    if (!inputs.gst_percent) {
      handleErrors('Please Input gstpercentage', 'gst_percent');
      isValid = false;
    }
    if (!inputs.status) {
      handleErrors('Please Input status', 'status');
      isValid = false;
    }
    if (!inputs.hsn) {
      handleErrors('Please Input hsn', 'hsn');
      isValid = false;
    }
    console.log(isValid);
    return isValid;
  };

  const handleClick = async () => {
    if (validate()) {
      let body = {
        name: inputs.name,
        gst_percent: inputs.gst_percent,
        status: inputs.status,
        hsn: inputs.hsn,
      };
      const result = await postData('category', body);
      navigation.goBack();
      // alert(result.status);
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
        backgroundColor: '#dfe6e9',
        height: '99.8%',
        justifyContent: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <Input
          error={error.name}
          onFocus={() => handleErrors(null, 'name')}
          onChangeText={txt => handleValues(txt, 'name')}
          placeholder="Name"
        />
        <Input
          error={error.gst_percent}
          onFocus={() => handleErrors(null, 'gst_percent')}
          onChangeText={txt => handleValues(txt, 'gst_percent')}
          placeholder="Gst Percent"
        />
        <Input
          error={error.hsn}
          onFocus={() => handleErrors(null, 'hsn')}
          onChangeText={txt => handleValues(txt, 'hsn')}
          placeholder="hsn"
        />
      </View>

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
          value="Yes"
          status={checked === 'Yes' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('Yes');
            handleValues('Yes', 'status');
          }}
        />
        <Text style={{marginRight: 50, color: 'black'}}>Yes</Text>
        <RadioButton
          value="No"
          status={checked === 'No' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('No');
            handleValues('No', 'status');
          }}
        />
        <Text style={{color: 'black'}}>No</Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <AppButton
          onPress={handleClick}
          buttonText={'Submit'}
          bgColor="#4171E1"
          btnWidth={0.8}
        />
      </View>
    </View>
  );
}
