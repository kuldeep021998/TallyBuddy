import {View, Text, ImageBackground, Dimensions, Image} from 'react-native';
import Lottie from 'lottie-react-native';
import Input from '../uicomponent/Input';
import {useState, useEffect} from 'react';
import AppButton from '../uicomponent/AppButton';
import {postData} from '../connection/FetchServices';
import {storeData} from '../Storage/AsyncStorage';

const {height, width} = Dimensions.get('window');

export default function EmployeeLogin({navigation, props}) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({});

  const validate = () => {
    var isValid = true;
    if (!inputs.email) {
      handleErrors('Please Input Name', 'email');
      isValid = false;
    }
    if (!inputs.password) {
      handleErrors('Please Input Password', 'password');
      isValid = false;
    }
    console.log(isValid);
    return isValid;
  };

  const handleValues = (txt, attr) => {
    setInputs(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleErrors = (txt, attr) => {
    setError(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleClick = async () => {
    if (validate()) {
      var result = await postData('employee/login', {
        email: inputs.email,
        password: inputs.password,
      });
      if (result.status) {
        console.log(result.data);
        storeData('EMPLOYEE', result.data);
        navigation.navigate('EC');
      }
    }
  };

  return (
    <View style={{margin: height * 0.001}}>
      <ImageBackground
        source={require('./assets/Mask.png')}
        style={{height: '100%', width: '100%'}}>
        <View style={{justifyContent: 'space-between'}}>
          <View>
            <Image
              source={require('./assets/Icon.png')}
              style={{
                height: 100,
                width: 100,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </View>
          <View>
            <Lottie
              source={require('./assets/Hello.json')}
              autoPlay
              loop
              style={{
                height: 350,
                width: 180,
                alignSelf: 'center',
              }}
            />
          </View>
          <View style={{marginLeft: 20}}>
            <Text
              style={{
                fontSize: 25,
                color: '#4171E1',
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
              }}>
              Hello Employee !
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: '#0A0A0A',
                fontFamily: 'Montserrat',
              }}>
              Login to your account
            </Text>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Input
              error={error.email}
              onFocus={() => handleErrors(null, 'email')}
              onChangeText={txt => handleValues(txt, 'email')}
              placeholder="Email"
            />
            <Input
              error={error.password}
              onFocus={() => handleErrors(null, 'password')}
              onChangeText={txt => handleValues(txt, 'password')}
              placeholder="Password"
              iconName={'eye-with-line'}
            />
            <AppButton
              onPress={handleClick}
              buttonText={'Login'}
              bgColor="#4171E1"
              btnWidth={0.8}
            />
            <Text
              style={{
                color: '#4171E1',
                fontSize: 16,
                textAlign: 'center',
                marginTop: 5,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              Forgot Password?
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
