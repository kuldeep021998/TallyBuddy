import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import AppButton from '../../uicomponent/AppButton';
import {postData} from '../../connection/FetchServices';
import {RadioButton} from 'react-native-paper';
import Input from '../../uicomponent/Input';

const {height, width} = Dimensions.get('window');

export default function CreateStore({navigation}) {
  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    password: '',
    emailid: '',
    mobileno: '',
    address: '',
    gstno: '',
    status: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState({});
  const [checked, setChecked] = React.useState('first');

  const validate = () => {
    var isValid = true;
    if (!inputs.name) {
      handleErrors('Please Input Name', 'name');
      isValid = false;
    }
    if (!inputs.username) {
      handleErrors('Please Input UserName', 'username');
      isValid = false;
    }
    if (!inputs.password) {
      handleErrors('Please Input Password', 'password');
      isValid = false;
    }
    if (!inputs.mobileno) {
      handleErrors('Please Input Mobile', 'mobileno');
      isValid = false;
    }
    if (!inputs.emailid) {
      handleErrors('Please Input Email', 'emailid');
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
    if (!inputs.status) {
      handleErrors('Please Input status', 'status');
      isValid = false;
    }
    console.log(isValid);
    return isValid;
  };

  const handleClick = async () => {
    if (validate()) {
      let body = {
        name: inputs.name,
        username: inputs.username,
        password: inputs.password,
        emailid: inputs.emailid,
        mobileno: inputs.mobileno,
        address: inputs.address,
        gstno: inputs.gstno,
        status: inputs.status,
      };
      const result = await postData('store', body);
      // alert(result.status);
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
      <View style={{alignItems: 'center'}}>
        <Input
          error={error.name}
          onFocus={() => handleErrors(null, 'name')}
          onChangeText={txt => handleValues(txt, 'name')}
          placeholder="Name"
        />
        <Input
          error={error.username}
          onFocus={() => handleErrors(null, 'username')}
          onChangeText={txt => handleValues(txt, 'username')}
          placeholder="User Name"
        />
        <Input
          error={error.password}
          onFocus={() => handleErrors(null, 'password')}
          onChangeText={txt => handleValues(txt, 'password')}
          placeholder="Password"
          showIconName={'eye'}
          hideIconName={'eye-with-line'}
        />
        <Input
          error={error.emailid}
          onFocus={() => handleErrors(null, 'emailid')}
          onChangeText={txt => handleValues(txt, 'emailid')}
          placeholder="Email ID"
        />
        <Input
          error={error.mobileno}
          onFocus={() => handleErrors(null, 'mobileno')}
          onChangeText={txt => handleValues(txt, 'mobileno')}
          placeholder="Mobile Number"
        />
        <Input
          error={error.address}
          onFocus={() => handleErrors(null, 'address')}
          onChangeText={txt => handleValues(txt, 'address')}
          placeholder="Address"
        />
        <Input
          error={error.gstno}
          onFocus={() => handleErrors(null, 'gstno')}
          onChangeText={txt => handleValues(txt, 'gstno')}
          placeholder="Gst no"
        />
      </View>
      <View>
        <Text
          style={{
            marginTop: 10,
            fontWeight: 'bold',
            color: '#2C2C2C',
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
            justifyContent: 'center',
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

      <View style={{alignItems: 'center'}}>
        <AppButton
          onPress={handleClick}
          buttonText={'Submit'}
          bgColor="#4171E1"
          btnWidth={0.8}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#4171E1',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});
