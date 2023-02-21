/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Dimensions} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {postData} from '../../connection/FetchServices';

const {height, width} = Dimensions.get('window');

export default function CreateModel() {
  const [inputs, setInputs] = useState({
    category_id: '',
    brand_id: '',
    name: '',
    model_no: '',
    discount: '',
    status: '',
  });
  const [error, setError] = useState({});

  const validate = () => {
    var isValid = true;
    if (!inputs.category_id) {
      handleErrors('Please Input Category Id', 'category_id');
      isValid = false;
    }
    if (!inputs.brand_name) {
      handleErrors('Please Input Brand Name', 'brand_name');
      isValid = false;
    }
    if (!inputs.name) {
      handleErrors('Please Input Name', 'name');
      isValid = false;
    }
    if (!inputs.model_no) {
      handleErrors('Please Input Model no.', 'model_no');
      isValid = false;
    }
    if (!inputs.discount) {
      handleErrors('Please Input Discount', 'discount');
      isValid = false;
    }
    return isValid;
  };
  const [checked, setChecked] = React.useState('first');

  const handleSubmit = async () => {
    if (validate()) {
      let body = {
        category_id: inputs.category_id,
        brand_id: inputs.brand_id,
        name: inputs.name,
        model_no: inputs.model_no,
        discount: inputs.discount,
        status: inputs.status,
      };
      const result = await postData('model', body);
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
        backgroundColor: '#dfe6e9',
        height: '99.8%',
        justifyContent: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Input
          error={error.category_id}
          onFocus={() => handleErrors(null, 'category_id')}
          onChangeText={txt => handleValues(txt, 'category_id')}
          placeholder="Category_id"
        />
        <Input
          error={error.brand_id}
          onFocus={() => handleErrors(null, 'brand_id')}
          onChangeText={txt => handleValues(txt, 'brand_id')}
          placeholder="Brand_id"
        />
        <Input
          error={error.name}
          onFocus={() => handleErrors(null, 'name')}
          onChangeText={txt => handleValues(txt, 'name')}
          placeholder="Name"
        />
        <Input
          error={error.model_no}
          onFocus={() => handleErrors(null, 'model_no')}
          onChangeText={txt => handleValues(txt, 'model_no')}
          placeholder="Model NO."
        />
        <Input
          error={error.discount}
          onFocus={() => handleErrors(null, 'discount')}
          onChangeText={txt => handleValues(txt, 'discount')}
          placeholder="Discount"
        />
      </View>

      <Text
        style={{
          marginTop: 10,
          fontWeight: 'bold',
          color: '#2C2C2C',
          marginTop: 10,
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
          justifyContent: 'center'
        }}>
        <RadioButton
          value="first"
          status={checked === '1' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('1');
            handleValues('1', 'status');
          }}
        />
        <Text style={{marginRight: 50}}>Yes</Text>
        <RadioButton
          value="second"
          status={checked === '2' ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked('2');
            handleValues('2', 'status');
          }}
        />
        <Text>No</Text>
      </View>

      <View style={{alignSelf: 'center'}}>
        <AppButton onPress={handleSubmit} buttonText={'Create'} btnWidth={0.8}/>
      </View>
      <View style={{marginTop: 10}} />
    </View>
  );
}
