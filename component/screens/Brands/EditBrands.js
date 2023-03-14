import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Dimensions, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {getData, deleteData, putData} from '../../connection/FetchServices';
import AnimatedLottieView from 'lottie-react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('window');

export default function EditBrands({navigation, route}) {
  const [inputs, setInputs] = useState({
    category_id: '',
    brand_name: '',
    discount: '',
    status: '',
  });

  const [error, setError] = useState({});
  const [loader, setLoader] = useState(true);
  const [category, setCategory] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
    // console.log(isValid);
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

  useEffect(function () {
    fetchBrands();
    fetchCategory();
  }, []);

  const fetchCategory = async category_id => {
    const result = await getData('category', {category_id: category_id});
    setCategory(result.data);
    // console.log('Category', result.data);
  };

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
            <View
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                {DropdownComponent()}
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

            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                color: '#2C2C2C',
                marginTop: 10,
                fontSize: 16,
                marginLeft: 5,
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
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <AppButton
                onPress={handleEdit}
                buttonText={'Edit'}
                btnWidth={0.3}
              />
              <AppButton
                onPress={handleDelete}
                buttonText={'Delete'}
                btnWidth={0.3}
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
    borderRadius: 10,
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
