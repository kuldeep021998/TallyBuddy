/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, FC} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {getData, postData, putData, deleteData} from '../../connection/FetchServices';
import {TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AnimatedLottieView from 'lottie-react-native';

const {height, width} = Dimensions.get('window');

export default function EditModel({navigation, route}) {
  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [checked, setChecked] = useState('first');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [loader, setLoader] = useState(true);

  const [inputs, setInputs] = useState({
    category_id: '',
    brand_name: '',
    discount: '',
    status: '',
  });
  const [error, setError] = useState({});

  const validate = () => {
    var isValid = true;
    if (!inputs.name) {
      handleErrors('Please Input Brand Name', 'name');
      isValid = false;
    }
    if (!inputs.brand_id) {
      handleErrors('Please Input Category Id', 'brand_id');
      isValid = false;
    }
    if (!inputs.category_id) {
      handleErrors('Please Input Category Id', 'category_id');
      isValid = false;
    }
    if (!inputs.model_no) {
      handleErrors('Please Input Brand Name', 'model_no');
      isValid = false;
    }
    if (!inputs.discount) {
      handleErrors('Please Input Discount', 'discount');
      isValid = false;
    }
    console.log(isValid);
    return isValid;
  };

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
      navigation.goBack();
      alert(result.status);
    }
  };

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
        navigation.goBack();
      }
    }
  };

  const handleDelete = async () => {
    const result = await deleteData('model/' + route.params.id);
    if (result.status) {
      navigation.goBack();
    }
  };

  const fetchModels = async () => {
    setLoader(true);
    var result = await getData('model/' + route.params.id);
    if (result.status) {
      setInputs({
        category_id: result.data.category_id,
        brand_id: result.data.brand_id,
        name: result.data.name,
        model_no: result.data.model_no,
        discount: result.data.discount,
        status: result.data.status,
      });
      fetchBrands(result.data.category_id);
    }
    setLoader(false);
  };

  const fetchCategory = async category_id => {
    const result = await getData('category', {category_id: category_id});
    setCategory(result.data);
  };

  const fetchBrands = async category_id => {
    const result = await getData('brand/byCategory/' + category_id);
    setBrands(result.data);
    console.log('Brands', result.data);
  };

  useEffect(function () {
    fetchModels();
    fetchCategory();
  }, []);

  const DropdownComponentCategory = category_id => {
    return (
      <View>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={category}
          search
          maxHeight={300}
          labelField="name"
          valueField="category_id"
          placeholder={
            inputs.category_id
              ? category.filter(
                  item => item.category_id == inputs.category_id,
                )?.[0]?.name
              : !isFocus
              ? 'Select item'
              : '...'
          }
          searchPlaceholder="Search..."
          value={inputs.category_id}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.category_id);
            handleValues(item.category_id, 'category_id');
            setIsFocus(false);
            fetchBrands(item.category_id);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  const DropdownComponentBrands = brand_id => {
    return (
      <View>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={brands}
          search
          maxHeight={300}
          labelField="brand_name"
          valueField="brand_id"
          placeholder={
            inputs.brand_id
              ? brands.filter(item => item.brand_id == inputs.brand_id)?.[0]
                  ?.brand_name
              : !isFocus
              ? 'Select item'
              : '...'
          }
          searchPlaceholder="Search..."
          value={inputs.brand_id}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.brand_id);
            handleValues(item.brand_id, 'brand_id');
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
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
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity>{DropdownComponentCategory()}</TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', marginTop: 15}}>
              <TouchableOpacity>{DropdownComponentBrands()}</TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Input
                error={error.name}
                onFocus={() => handleErrors(null, 'name')}
                onChangeText={txt => handleValues(txt, 'name')}
                placeholder="Name"
                value={inputs.name}
              />
              <Input
                error={error.model_no}
                onFocus={() => handleErrors(null, 'model_no')}
                onChangeText={txt => handleValues(txt, 'model_no')}
                placeholder="Model No"
                value={inputs.model_no}
              />
              <Input
                error={error.discount}
                onFocus={() => handleErrors(null, 'discount')}
                onChangeText={txt => handleValues(txt, 'discount')}
                placeholder="Discount"
                value={inputs.discount}
              />
            </View>

            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                color: '#2C2C2C',
                marginTop: 10,
                fontSize: 16,
                marginLeft: 10,
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
        )}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 45,
    width: 310,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: 'grey',
    padding: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
