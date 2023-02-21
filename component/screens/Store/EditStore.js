import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Dimensions} from 'react-native';
import {ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {getData, deleteData, putData} from '../../connection/FetchServices';
import AnimatedLottieView from 'lottie-react-native';

const {height, width} = Dimensions.get('window');

export default function EditStore({navigation, route}) {
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

  const [error, setError] = useState({});
  const [loader, setLoader] = useState(true);

  const validate = () => {
    var isValid = true;
    if (!inputs.name) {
      handleErrors('Please Input name', 'name');
      console.log(1);
      isValid = false;
    }
    if (!inputs.username) {
      handleErrors('Please Input username', 'username');
      isValid = false;
    }
    if (!inputs.password) {
      handleErrors('Please Input password', 'password');
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
    if (!inputs.address) {
      handleErrors('Please Input address', 'address');
      isValid = false;
    }
    if (!inputs.gstno) {
      handleErrors('Please Input gstno', 'gstno');
      isValid = false;
    }
    if (!inputs.status) {
      handleErrors('Please Input status', 'status');
      isValid = false;
    }
    console.log(isValid);
    return isValid;
  };

  const [checked, setChecked] = React.useState('first');

  const handleDelete = async () => {
    const result = await deleteData('store/' + route.params.id);
    if (result.status) {
      navigation.goBack();
    }
  };

  const fetchStore = async () => {
    setLoader(true);
    console.log(route.params.id);
    var result = await getData('store/' + route.params.id);
    console.log(result);
    if (result.status) {
      setInputs({
        name: result.data.name,
        username: result.data.username,
        password: result.data.password,
        emailid: result.data.emailid,
        mobileno: result.data.mobileno,
        address: result.data.address,
        gstno: result.data.gstno,
        status: result.data.status,
      });
    }
    setLoader(false);
  };

  useEffect(function () {
    fetchStore();
  }, []);

  const handleEdit = async () => {
    if (validate()) {
      const body = {
        name: inputs.name,
        username: inputs.username,
        password: inputs.password,
        emailid: inputs.emailid,
        mobileno: inputs.mobileno,
        gstno: inputs.gstno,
        address: inputs.address,
        status: inputs.status,
      };
      const result = await putData('store/' + route.params.id, body);
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
    <View style={{margin: height * 0.001}}>
      <ScrollView>
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
                }}>
                Store Details
              </Text>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Input
                  error={error.name}
                  onFocus={() => handleErrors(null, 'name')}
                  onChangeText={txt => handleValues(txt, 'name')}
                  placeholder="name"
                  value={inputs.name}
                />
                <Input
                  error={error.username}
                  onFocus={() => handleErrors(null, 'username')}
                  onChangeText={txt => handleValues(txt, 'username')}
                  placeholder="UserName"
                  value={inputs.username}
                />
                <Input
                  error={error.password}
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

                <Input
                  error={error.address}
                  onFocus={() => handleErrors(null, 'address')}
                  onChangeText={txt => handleValues(txt, 'address')}
                  placeholder="Address."
                  value={inputs.address}
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
                  <Text>No</Text>
                </View>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 10,
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
              <View style={{marginTop: 10}} />
            </View>
          )}
        </>
      </ScrollView>
    </View>
  );
}
