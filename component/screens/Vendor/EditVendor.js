import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {getData, deleteData, putData} from '../../connection/FetchServices';
import stateCity from '../assets/StateCity.json';

const {height, width} = Dimensions.get('window');

export default function EditVendor({navigation, route}) {
  const [error, setError] = useState({});
  const [getCities, setCities] = useState([]);

  const [inputs, setInputs] = useState({
    firm_name: '',
    type_of_firm: '',
    country: '',
    gstno: '',
    address: '',
    emailid: '',
    mobileno: '',
    status: '',
    state: '',
    city: '',
  });

  const validate = () => {
    var isValid = true;
    if (!inputs.firm_name) {
      handleErrors('Please Input Name', 'firmname');
      isValid = false;
    }
    if (!inputs.type_of_firm) {
      handleErrors('Please Input firmname', 'typeoffirm');
      isValid = false;
    }
    if (!inputs.country) {
      handleErrors('Please Input country name', 'country');
      isValid = false;
    }
    if (!inputs.gstno) {
      handleErrors('Please Input gstno', 'gstno');
      isValid = false;
    }
    if (!inputs.address) {
      handleErrors('Please Input address', 'address');
      isValid = false;
    }
    if (!inputs.emailid) {
      handleErrors('Please Input emailid', 'emailid');
      isValid = false;
    }
    if (!inputs.mobileno) {
      handleErrors('Please Input mobileno', 'mobileno');
      isValid = false;
    }
    console.log(isValid);
    return isValid;
  };

  const states = Object.keys(stateCity);

  const handleStates = state => {
    const cities = stateCity[state];
    setCities(cities);
  };

  const [checked, setChecked] = useState('');

  const handleEdit = async () => {
    if (validate()) {
      const body = {
        firm_name: inputs.firm_name,
        type_of_firm: inputs.type_of_firm,
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
      //console.log(result);
      navigation.goBack();
    }
  };

  const handleDelete = async () => {
    const result = await deleteData('vendor/' + route.params.id);
    //console.log(result);
    navigation.goBack();
  };

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
      handleStates(result.data.state);
      setInputs({
        firm_name: result.data.firm_name,
        type_of_firm: result.data.type_of_firm,
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
    <View style={{margin: height * 0.001, backgroundColor: 'grey'}}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'space-between',
            height: height,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
              color: '#2C2C2C',
              marginLeft: 40,
            }}>
            Vendor Details
          </Text>

          <View style={{display: 'flex', alignItems: 'center'}}>
            <Input
              error={error.firmname}
              onFocus={() => handleErrors(null, 'firm_name')}
              onChangeText={txt => handleValues(txt, 'firm_name')}
              placeholder="Firm Name"
              value={inputs.firm_name}
            />
            <Input
              error={error.typeoffirm}
              onFocus={() => handleErrors(null, 'type_of_firm')}
              onChangeText={txt => handleValues(txt, 'type_of_firm')}
              placeholder="Type of Firm"
              value={inputs.type_of_firm}
            />
            <Input
              error={error.country}
              onFocus={() => handleErrors(null, 'country')}
              onChangeText={txt => handleValues(txt, 'country')}
              placeholder="Country"
              value={inputs.country}
            />
          </View>

          <View style={{alignItems: 'center'}}>
            <SelectDropdown
              data={states}
              value={inputs.state}
              defaultValue={inputs.state}
              onSelect={(selectedItem, index) => {
                handleStates(selectedItem);
                handleValues(selectedItem, 'state');
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              buttonStyle={{
                height: 40,
                width: '82%',
                borderRadius: 10,
                backgroundColor: '#F1F1F1',
                paddingLeft: 10,

              }}
              buttonTextStyle={{color: '#2C2C2C', textAlign: 'left'}}
              defaultButtonText="Select State"
              dropdownIconPosition="right"
            />
            <SelectDropdown
              data={getCities}
              value={inputs.city}
              defaultValue={inputs.city}
              onSelect={(selectedItem, index) => {
                handleValues(selectedItem, 'city');
              }}
              defaultButtonText={'Select city'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              buttonStyle={{
                height: 40,
                width: '82%',
                borderRadius: 10,
                backgroundColor: '#F1F1F1',
                paddingLeft: 10,
                marginTop: 20,
              }}
              buttonTextStyle={{color: 'black', textAlign: 'left'}}
              dropdownIconPosition="right"
            />
          </View>

          <View style={{alignItems: 'center'}}>
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
                justifyContent: 'center',
              }}>
              <RadioButton
                value={inputs.checked}
                status={checked === 'Yes' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked('Yes');
                  handleValues('Yes', 'status');
                }}
              />
              <Text style={{marginRight: 50, color: 'black'}}>Yes</Text>
              <RadioButton
                value={inputs.checked}
                status={checked === 'No' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked('No');
                  handleValues('No', 'status');
                }}
              />
              <Text style={{color: 'black'}}>No</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 5,
              alignItems: 'center',
            }}>
            <AppButton
              onPress={handleEdit}
              buttonText={'Edit'}
              bgColor="#FC6011"
              btnWidth={0.4}
            />
            <AppButton
              onPress={handleDelete}
              buttonText={'Delete'}
              bgColor="#FC6011"
              btnWidth={0.4}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
