/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FilePicker, {types} from 'react-native-document-picker';
import AppButton from '../uicomponents/AppButton';
// import Icon from 'react-native-vector-icons/Entypo';
import Input from '../uicomponents/Input';
import {
  getData,
  deleteData,
  putData,
} from '../connection/FetchServices';

import stateCity from './stateCity.json';
export default function EditVendor({navigation, route}) {
  const [inputs, setInputs] = useState({
    firmname: '',
    typeoffirm: '',
    country: '',
    gstno: '',
    address: '',
    emailid: '',
    mobileno: '',
    status: '',
    state: '',
    city: '',
  });
  const [error, setError] = useState({});

  //   const validate = () => {
  //     var isValid = true;
  //     if (!inputs.firmname) {
  //       handleErrors('Please Input Name', 'firmname');
  //       isValid = false;
  //     }
  //     if (!inputs.typeoffirm) {
  //       handleErrors('Please Input firmname', 'typeoffirm');
  //       isValid = false;
  //     }
  //     if (!inputs.country) {
  //       handleErrors('Please Input country name', 'country');
  //       isValid = false;
  //     }
  //     if (!inputs.gstno) {
  //       handleErrors('Please Input gstno', 'gstno');
  //       isValid = false;
  //     }
  //     if (!inputs.address) {
  //       handleErrors('Please Input address', 'address');
  //       isValid = false;
  //     }
  //     if (!inputs.emailid) {
  //       handleErrors('Please Input emailid', 'emailid');
  //       isValid = false;
  //     }
  //     if (!inputs.mobileno) {
  //       handleErrors('Please Input mobileno', 'mobileno');
  //       isValid = false;
  //     }
  //     console.log(isValid);
  //     return isValid;
  //   };

  const states = Object.keys(stateCity);
  const [getCities, setCities] = useState([]);

  const handleState = state => {
    const cities = stateCity[state];
    setCities(cities);
  };

  //   const handleCity = city => {};

  const [checked, setChecked] = React.useState('first');

  const handleEdit = async () => {
    const body = {
      firmname: inputs.firm_name,
      typeoffirm: inputs.type_of_firm,
      country: inputs.country,
      gstno: inputs.gstno,
      address: inputs.address,
      emailid: inputs.emailid,
      mobileno: inputs.mobileno,
      status: inputs.status,
      state: inputs.state,
      city: inputs.city,
    };
    const result = await putData('vendor/' + route.params.id, body);
    console.log(result);
  };
  const handleDelete = async () => {
    const result = await deleteData('vendor/' + route.params.id);
    navigation.goBack();
  };
  // }
  // }

  const handleValues = (txt, attr) => {
    setInputs(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleErrors = (txt, attr) => {
    setError(prevStates => ({...prevStates, [attr]: txt}));
  };

  const fetchVendors = async () => {
    console.log(route.params.id);
    var result = await getData('vendor/' + route.params.id);
    console.log(result);
    if (result.status) {
      console.log(result.data.state);
      handleState(result.data.state);
      setInputs({
        firmname: result.data.firm_name,
        typeoffirm: result.data.type_of_firm,
        country: result.data.country,
        gstno: result.data.gstno,
        address: result.data.address,
        emailid: result.data.emailid,
        mobileno: result.data.mobileno,
        status: result.data.status,
        state: result.data.state,

        city: result.data.city,
      });
    }
  };

  useEffect(function () {
    fetchVendors();
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
            color: '#2C2C2C',
            marginLeft: 20,
          }}>
          Vendor Details
        </Text>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Input
            error={error.firmname}
            onFocus={() => handleErrors(null, 'firmname')}
            onChangeText={txt => handleValues(txt, 'firmname')}
            placeholder="Firm Name"
            value={inputs.firmname}
          />
          <Input
            error={error.typeoffirm}
            onFocus={() => handleErrors(null, 'typeoffirm')}
            onChangeText={txt => handleValues(txt, 'typeoffirm')}
            placeholder="Type of Firm"
            value={inputs.typeoffirm}
          />
          <Input
            error={error.country}
            onFocus={() => handleErrors(null, 'country')}
            onChangeText={txt => handleValues(txt, 'country')}
            placeholder="Country"
            value={inputs.country}
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
            Status
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
              value="Yes"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked('first');
                handleValues('Yes', 'status');
              }}
            />
            <Text style={{marginRight: 50}}>Yes</Text>
            <RadioButton
              value="No"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked('second');
                handleValues('NO', 'status');
              }}
            />
            <Text>No</Text>
          </View>
        </View>

        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Input
            error={error.gstno}
            onFocus={() => handleErrors(null, 'gstno')}
            onChangeText={txt => handleValues(txt, 'gstno')}
            placeholder="GST No."
            value={inputs.gstno}
          />
          <Input
            error={error.address}
            onFocus={() => handleErrors(null, 'address')}
            onChangeText={txt => handleValues(txt, 'address')}
            placeholder="Address"
            value={inputs.address}
          />
        </View>

        <View>
          <SelectDropdown
            data={states}
            onSelect={(selectedItem, index) => {
              handleState(selectedItem);
              handleValues(selectedItem, 'state');
              handleValues('', 'city');
            }}
            defaultValue={inputs.state}
            value={inputs.state}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={{
              height: 43,
              width: '90%',
              borderRadius: 10,
              backgroundColor: '#F1F1F1',
              paddingLeft: 20,
              marginTop: 20,
              alignSelf: 'center',
            }}
            buttonTextStyle={{color: '#2C2C2C', textAlign: 'left'}}
            defaultButtonText="Select State"
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
          <SelectDropdown
            data={getCities}
            onSelect={selectedItem => {
              handleValues(selectedItem, 'city');
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={{
              height: 43,
              width: '90%',
              borderRadius: 10,
              backgroundColor: '#F1F1F1',
              paddingLeft: 20,
              marginTop: 20,
              alignSelf: 'center',
            }}
            buttonTextStyle={{color: 'black', textAlign: 'left'}}
            {...(inputs.city
              ? {defaultButtonText: inputs.city || 'Select City'}
              : {defaultButtonText: 'Select City'})}
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

        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Input
            error={error.emailid}
            onFocus={() => handleErrors(null, 'emailid')}
            onChangeText={txt => handleValues(txt, 'emailid')}
            placeholder="Email Id"
            value={inputs.emailid}
          />
          <Input
            error={error.mobileno}
            onFocus={() => handleErrors(null, 'mobileno')}
            onChangeText={txt => handleValues(txt, 'mobileno')}
            placeholder="Mobile No."
            value={inputs.mobileno}
          />
        </View>

        <View style={{marginTop: 10, alignItems: 'center', marginBottom: 10}}>
          <AppButton onPress={handleEdit} buttonText={'Edit'} />
          <AppButton onPress={handleDelete} buttonText={'Delete'} />
        </View>
      </View>
    </ScrollView>
  );
}
