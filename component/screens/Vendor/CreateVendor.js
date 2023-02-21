import React, {useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {postData} from '../../connection/FetchServices';
import Input from '../../uicomponent/Input';
import AppButton from '../../uicomponent/AppButton';
import StateCity from '../assets/StateCity.json';

const {height, width} = Dimensions.get('window');

export default function CreateVendor({navigation}) {
  const [getCities, setCities] = useState([]);
  const [checked, setChecked] = useState('Yes');
  const [error, setError] = useState({});
  const [inputs, setInputs] = useState({
    firm_name: '',
    type_of_firm: '',
    country: '',
    state: '',
    city: '',
    gstno: '',
    address: '',
    emailid: '',
    mobileno: '',
    status: '',
  });

  const validate = () => {
    var isValid = true;
    if (!inputs.firm_name) {
      handleErrors('Please Input Name', 'firm_name');
      isValid = false;
    }
    if (!inputs.type_of_firm) {
      handleErrors('Please Input firmname', 'type_of_firm');
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

  const states = Object.keys(StateCity);

  const handleStates = state => {
    const cities = StateCity[state];
    setCities(cities);
  };

  const handleSubmit = async () => {
    if (validate()) {
      let body = {
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
      const result = await postData('vendor', body);
      console.log(result);
      alert(result.status);
      navigation.goBack();
    }
  };

  const handleValues = (txt, attr) => {
    setInputs(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleErrors = (txt, attr) => {
    setError(prevStates => ({...prevStates, [attr]: txt}));
  };

  return (
    <View style={{margin: height * 0.001}}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'space-between',
            height: height
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
              color: '#2C2C2C',
              alignSelf: 'center',
              marginTop: 10
            }}>
            Vendor Details
          </Text>

          <View style={{display: 'flex', alignItems: 'center',}}>
            <Input
              error={error.firmname}
              onFocus={() => handleErrors(null, 'firm_name')}
              onChangeText={txt => handleValues(txt, 'firm_name')}
              placeholder="Firm Name"
            />
            <Input
              error={error.typeoffirm}
              onFocus={() => handleErrors(null, 'type_of_firm')}
              onChangeText={txt => handleValues(txt, 'type_of_firm')}
              placeholder="Type of Firm"
            />
            <Input
              error={error.country}
              onFocus={() => handleErrors(null, 'country')}
              onChangeText={txt => handleValues(txt, 'country')}
              placeholder="Country"
            />
          </View>

          <View style={{ alignItems: 'center'}}>
            <SelectDropdown
              data={states}
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
                backgroundColor: '#fff',
                paddingLeft: 10,
              }}
              buttonTextStyle={{color: '#2C2C2C', textAlign: 'left'}}
              defaultButtonText="Select State"
              dropdownIconPosition="right"
            />
            <SelectDropdown
              data={getCities}
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
                backgroundColor: '#fff',
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
            />
            <Input
              error={error.address}
              onFocus={() => handleErrors(null, 'address')}
              onChangeText={txt => handleValues(txt, 'address')}
              placeholder="Address"
            />
            <Input
              error={error.emailid}
              onFocus={() => handleErrors(null, 'emailid')}
              onChangeText={txt => handleValues(txt, 'emailid')}
              placeholder="Email Id"
            />
            <Input
              error={error.mobileno}
              onFocus={() => handleErrors(null, 'mobileno')}
              onChangeText={txt => handleValues(txt, 'mobileno')}
              placeholder="Mobile No."
            />
          </View>

          <View style={{justifyContent: 'flex-start'}}>
            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                color: '#2C2C2C',
                fontSize: 16,
                marginLeft: 40
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
          </View>

          <View style={{ margin: 5, alignItems: 'center'}}>
            <AppButton
              onPress={handleSubmit}
              buttonText={'Create'}
              btnWidth={0.8}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
