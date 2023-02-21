/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {postData} from '../../connection/FetchServices';

const {height, width} = Dimensions.get('window');

export default function CreateBrand({navigation}) {
  const [inputs, setInputs] = useState({
    category_id: '',
    brand_name: '',
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
        name: inputs.name,
        category_id: inputs.category_id,
        brand_name: inputs.brand_name,
        discount: inputs.discount,
        status: inputs.status,
      };
      const result = await postData('brand', body);
      console.log(result);
      navigation.goBack();
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
    <View style={{margin: height * 0.001, backgroundColor: '#dfe6e9', height: "99.8%", justifyContent: 'center'}}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Input
          error={error.brand_name}
          onFocus={() => handleErrors(null, 'brand_name')}
          onChangeText={txt => handleValues(txt, 'brand_name')}
          placeholder="Brand Name"
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
          justifyContent: 'center',
          marginTop: 5,
          marginLeft: 20,
        }}>
        <RadioButton
          value="first"
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

      <View style={{alignSelf: 'center'}}>
        <AppButton
          onPress={handleSubmit}
          buttonText={'Create'}
          btnWidth={0.8}
        />
      </View>
    </View>
  );
}
