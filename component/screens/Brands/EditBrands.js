/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Dimensions} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {getData, deleteData, putData} from '../../connection/FetchServices';
import AnimatedLottieView from 'lottie-react-native';
// import {SelectList} from 'react-native-dropdown-select-list';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');
export default function EditBrands({navigation, route}) {
  const [inputs, setInputs] = useState({
    category_id: '',
    brand_name: '',
    discount: '',
    status: '',
  });

  const {width} = Dimensions.get('window');
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
    if (!inputs.discount) {
      handleErrors('Please Input Discount', 'discount');
      isValid = false;
    }
    console.log(isValid);
    return isValid;
  };

  const [checked, setChecked] = React.useState('first');

  const handleDelete = async () => {
    const result = await deleteData('brand/' + route.params.id);
    if (result.status) {
      navigation.goBack();
    }
  };

  const fetchBrands = async () => {
    setLoader(true);
    console.log(route.params.id);
    var result = await getData('brand/' + route.params.id);
    console.log(result);
    if (result.status) {
      setInputs({
        category_id: result.data.category_id,
        brand_name: result.data.brand_name,
        discount: result.data.discount,
        status: result.data.status,
      });
    }
    setLoader(false);
  };

  const fetchCategory = async () => {
    console.log(result);
    const result = await getData('category/' + route.params.category_id);
    setCategories(result.data.category_id);
  };

  // const fillCategoryDropDown = () => {
  //   return categories.map(item => {
  //     return(
  //       <SelectDropdown value={item.category_id}>
  //         {item.category_name}
  //       </SelectDropdown>
  //     )
  //   });
  // };

  // const Category = Object.keys(fetchCategory);

  // const handleCategory = Category => {
  //   const data = fetchCategory[Category];
  //   setData(data)
  // };

  // const[ data, setData] = useState([]);

  // const states = Object.keys(stateCity);

  // const handleStates = state => {
  //   const cities = stateCity[state];
  //   setCities(cities);
  // };

  useEffect(function () {
    fetchBrands();
    // fetchCategory();
  }, []);

  const handleEdit = async () => {
    if (validate()) {
      const body = {
        name: inputs.name,
        status: inputs.status,
      };
      const result = await putData('brand/' + route.params.id, body);
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
    <View
      style={{
        margin: height * 0.001,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
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
                marginLeft: 40,
                marginTop: 10,
              }}>
              Edit
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
                {/* <SelectList
                  data={categories.map(item => ({
                    key: item.category_id,
                    value: item.name,
                  }))}
                  save="value"
                /> */}
                <SelectDropdown
                  data={categories}
                  // defaultValue={inputs.category_id}
                  // value={inputs.category_id}
                  onSelect={(selectedItem, index) => {
                    handleState(selectedItem);
                    handleValues(selectedItem, 'category');
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={{
                    height: 50,
                    width: '90%',
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    paddingLeft: 20,
                    marginTop: 10,
                    alignSelf: 'center',
                  }}
                  buttonTextStyle={{color: '#2C2C2C', textAlign: 'left'}}
                  defaultButtonText="Select Category"
                  renderDropdownIcon={isOpened => {
                    return (
                      <FontAwesome
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={'#444'}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition="right"
                />
              </View>
              <Input
                error={error.brand_name}
                onFocus={() => handleErrors(null, 'brand_name')}
                onChangeText={txt => handleValues(txt, 'brand_name')}
                placeholder="Brand Name"
                value={inputs.brand_name}
              />
              <Input
                error={error.discount}
                onFocus={() => handleErrors(null, 'discount')}
                onChangeText={txt => handleValues(txt, 'discount')}
                placeholder="Discount"
                value={inputs.discount}
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
                  marginLeft: 40,
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
                  justifyContent: 'center',
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
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <AppButton
                onPress={handleEdit}
                buttonText={'Edit'}
                btnWidth={0.4}
              />
              <AppButton
                onPress={handleDelete}
                buttonText={'Delete'}
                btnWidth={0.4}
              />
            </View>
          </View>
        )}
      </>
    </View>
  );
}
