import React, {useState} from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {postData} from '../connection/FetchServices';
import Input from '../uicomponent/Input';
import AppButton from '../uicomponent/AppButton';
import StateCity from '../assets/StateCity.json';

const {height, width} = Dimensions.get('window');

export default function CreateVendor() {
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

  const validate = () => {
    var isValid = true;
    if (!inputs.firmname) {
      handleErrors('Please Input Name', 'firmname');
      isValid = false;
    }
    if (!inputs.typeoffirm) {
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

  const states = Object.keys(StateCity);
  const [getCities, setCities] = useState([]);

  const handleState = state => {
    const cities = StateCity[state];
    setCities(cities);
  };

  const handleCity = city => {};

  const [checked, setChecked] = React.useState('first');

  const handleSubmit = async () => {
    if (validate()) {
      let body = {
        firm_name: inputs.firmname,
        type_of_firm: inputs.typeoffirm,
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
    <View style={{margin: height * 0.001, backgroundColor: 'white'}}>
      <ScrollView>
        <View>
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
            />
            <Input
              error={error.typeoffirm}
              onFocus={() => handleErrors(null, 'typeoffirm')}
              onChangeText={txt => handleValues(txt, 'typeoffirm')}
              placeholder="Type of Firm"
            />
            <Input
              error={error.country}
              onFocus={() => handleErrors(null, 'country')}
              onChangeText={txt => handleValues(txt, 'country')}
              placeholder="Country"
            />
          </View>

          <View>
            <SelectDropdown
              data={states}
              onSelect={(selectedItem, index) => {
                handleState(selectedItem);
                handleValues(selectedItem, 'state');
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                height: 40,
                width: '80%',
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
              buttonStyle={{
                height: 40,
                width: '80%',
                borderRadius: 10,
                backgroundColor: '#F1F1F1',
                paddingLeft: 20,
                marginTop: 20,
                alignSelf: 'center',
              }}
              buttonTextStyle={{color: 'black', textAlign: 'left'}}
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
            />
            <Input
              error={error.mobileno}
              onFocus={() => handleErrors(null, 'mobileno')}
              onChangeText={txt => handleValues(txt, 'mobileno')}
              placeholder="Mobile No."
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
                alignItems: 'center',
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

          <View style={{alignSelf: 'center'}}>
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
