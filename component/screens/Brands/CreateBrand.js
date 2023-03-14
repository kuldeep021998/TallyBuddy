/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, FC} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {getData, postData} from '../../connection/FetchServices';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {FlatList, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {height, width} = Dimensions.get('window');

export default function CreateBrand({navigation}) {
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = React.useState('first');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
    console.log(isValid);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      let body = {
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
  };

  const fetchCategory = async category_id => {
    const result = await getData('category', {category_id: category_id});
    setCategory(result.data);
    // console.log('Category', result.data);
  };

  useEffect(function () {
    fetchCategory();
  }, []);

  const DropdownComponent = category_id => {
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
          placeholder={!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={inputs.category_id}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.category_id);
            handleValues(item.category_id, 'category_id');

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
        backgroundColor: '#dfe6e9',
        height: '99.8%',
        justifyContent: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity>{DropdownComponent()}</TouchableOpacity>
      </View>
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
