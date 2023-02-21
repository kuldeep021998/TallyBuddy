import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Dimensions} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {getData, deleteData, putData} from '../../connection/FetchServices';
import AnimatedLottieView from 'lottie-react-native';

const {height, width} = Dimensions.get('window');

export default function EditBank({navigation, route}) {
  const [inputs, setInputs] = useState({
    name: '',
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
    if (!inputs.status) {
      handleErrors('Please Input status', 'status');
      isValid = false;
    }
    console.log(isValid);
    return isValid;
  };

  const [checked, setChecked] = React.useState('first');

  const handleDelete = async () => {
    const result = await deleteData('banks/' + route.params.id);
    if (result.status) {
      navigation.goBack();
    }
  };

  const fetchBanks = async () => {
    setLoader(true);
    console.log(route.params.id);
    var result = await getData('banks/' + route.params.id);
    console.log(result);
    if (result.status) {
      setInputs({
        name: result.data.name,
        status: result.data.status,
      });
    }
    setLoader(false);
  };

  useEffect(function () {
    fetchBanks();
  }, []);

  const handleEdit = async () => {
    if (validate()) {
      const body = {
        name: inputs.name,
        status: inputs.status,
      };
      const result = await putData('bank/' + route.params.id, body);
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
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                color: '#2C2C2C',
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
            </View>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: 'bold',
                  color: '#2C2C2C',
                  marginTop: 10,
                  fontSize: 16,
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
            <View style={{marginTop: 10}} />
          </View>
        )}
      </>
    </View>
  );
}
