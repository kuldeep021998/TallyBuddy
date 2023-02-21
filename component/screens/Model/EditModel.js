/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {getData, deleteData, putData} from '../../connection/FetchServices';
import AnimatedLottieView from 'lottie-react-native';
import {SelectList} from 'react-native-dropdown-select-list';

const {width, height} = Dimensions.get('window');

export default function EditModel({navigation, route}) {
  const [inputs, setInputs] = useState({
    category_id: '',
    brand_id: '',
    name: '',
    model_no: '',
    discount: '',
    status: '',
  });

  
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(true);
  const [categories, setCategories] = useState([]);

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
    console.log(isValid);
    return isValid;
  };

  const [checked, setChecked] = React.useState('first');

  const handleDelete = async () => {
    const result = await deleteData('model/' + route.params.id);
    if (result.status) {
      navigation.goBack();
    }
  };

  const fetchModels = async () => {
    setLoader(true);
    console.log(route.params.id);
    var result = await getData('brand/' + route.params.id);
    console.log(result);
    if (result.status) {
      setInputs({
        category_id: result.data.category_id,
        brand_id: result.data.brand_id,
        name: result.data.name,
        model_no: result.data.model_no,
        discount: result.data.discount,
        status: result.data.status,
      });
    }
    setLoader(false);
  };

  const fetchCategory = async () => {
    const result = await getData('category');
    if (result.status) {
      setCategories(result.data);
    }
  };

  useEffect(function () {
    fetchModels();
    fetchCategory();
  }, []);

  const handleEdit = async () => {
    if (validate()) {
      const body = {
        category_id: inputs.category_id,
        brand_id: inputs.brand_id,
        name: inputs.name,
        model_no: inputs.model_no,
        discount: inputs.discount,
        status: inputs.status,
      };
      const result = await putData('model/' + route.params.id, body);
      if (result.status) {
        Alert.alert('Data edited successfully');
        navigation.goBack();
      }
    }
  };

  const handleValues = (txt, attr) => {
    setInputs(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleErrors = (txt, attr) => {
    setError(prevStates => ({...prevStates, [attr]: txt}));
  };

  // const data = [
  //   {key: '1', value: 'Mobiles', disabled: true},
  //   {key: '2', value: 'Appliances'},
  //   {key: '3', value: 'Cameras'},
  //   {key: '4', value: 'Computers', disabled: true},
  //   {key: '5', value: 'Vegetables'},
  //   {key: '6', value: 'Diary Products'},
  //   {key: '7', value: 'Drinks'},
  // ];

  return (
    <ScrollView style={{flex: 1}}>
      <>
        {loader ? (
          <AnimatedLottieView
            source={require('../assets/Tally Buddy Loader.json')}
            autoPlay
            loop
            style={{height: 100, alignSelf: 'center', display: 'flex'}}
          />
        ) : (
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                color: '#2C2C2C',
                marginLeft: 20,
              }}>
              Edit Model Details
            </Text>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  padding: 2,
                  width: width * 0.9,
                  justifyContent: 'center',
                }}>
                <SelectList
                  data={categories.map(item => ({
                    key: item.category_id,
                    value: item.name,
                  }))}
                  save="value"
                />
              </View>
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
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: 'bold',
                  color: '#2C2C2C',
                  marginTop: 10,
                  fontSize: 16,
                  marginLeft: 20,
                }}>
                Account Active
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  marginLeft: 20,
                }}>
                <RadioButton
                  value="1"
                  status={
                    checked == '1' || inputs.status == '1'
                      ? 'checked'
                      : 'unchecked'
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
                    checked == '2' || inputs.status == '2'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => {
                    setChecked('2');
                    handleValues('2', 'status');
                  }}
                />
                <Text>No</Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <AppButton onPress={handleEdit} buttonText={'Edit'} />
              <AppButton onPress={handleDelete} buttonText={'Delete'} />
            </View>
            <View style={{marginTop: 10}} />
          </View>
        )}
      </>
    </ScrollView>
  );
}
