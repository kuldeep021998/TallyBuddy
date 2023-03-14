import {useState, useEffect} from 'react';
import {View, Dimensions, StyleSheet, Text, ToastAndroid} from 'react-native';
import AppButton from '../../uicomponent/AppButton';
import {postData, postDataAxios} from '../../connection/FetchServices';
import DocumentPicker from 'react-native-document-picker';
import {Image} from 'react-native-elements';
import Input from '../../uicomponent/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const {height, width} = Dimensions.get('window');

export default function CreateAdmin({navigation}) {
  const [inputs, setInputs] = useState({
    fullname: '',
    mobile: '',
    emailid: '',
    username: '',
    password: '',
  });

  const [error, setError] = useState({});
  const [singleFile, setSingleFile] = useState([]);

  const validate = () => {
    var isValid = true;
    if (!inputs.fullname) {
      handleErrors('Please Input Name', 'fullname');
      isValid = false;
    }
    if (!inputs.mobile) {
      handleErrors('Please Input Mobile', 'mobile');
      isValid = false;
    }
    if (!inputs.emailid) {
      handleErrors('Please Input Email', 'emailid');
      isValid = false;
    }
    if (!inputs.username) {
      handleErrors('Please Input Name', 'username');
      isValid = false;
    }
    if (!inputs.password) {
      handleErrors('Please Input Password', 'password');
      isValid = false;
    }
    console.log(isValid);
    return isValid;
  };

  const selectFile = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('response: ' + JSON.stringify(response));
      setSingleFile(response);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const handleClick = async () => {
    if (validate()) {
      // if (singleFile != null) {
      //If file selected then create FormData
      // const image = singleFile;
      // const formData = new FormData();
      // formData.append('name', inputs.name);
      // formData.append('mobile', inputs.mobile);
      // formData.append('emailid', inputs.emailid);
      // formData.append('address', inputs.username);
      // formData.append('password', inputs.password);
      // singleFile.map(item => {
      //   formData.append('image', item);
      // });
      let body = {
        name: inputs.fullname,
        mobileno: inputs.mobile,
        emailid: inputs.emailid,
        username: inputs.username,
        password: inputs.password,
      };
      const result = await postData('admins', body);
      // alert(result.status);
      if (result.status) {
        ToastAndroid.showWithGravityAndOffset(
          'Created Successfully',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        navigation.goBack();
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Not Created',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
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
    <View
      style={{
        margin: height * 0.001,
        backgroundColor: '#dfe6e9',
        height: '99.8%',
        justifyContent: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <Input
          error={error.fullname}
          onFocus={() => handleErrors(null, 'fullname')}
          onChangeText={txt => handleValues(txt, 'fullname')}
          placeholder="Full Name"
        />
        <Input
          error={error.mobile}
          onFocus={() => handleErrors(null, 'mobile')}
          onChangeText={txt => handleValues(txt, 'mobile')}
          placeholder="Mobile Number"
        />
        <Input
          error={error.emailid}
          onFocus={() => handleErrors(null, 'emailid')}
          onChangeText={txt => handleValues(txt, 'emailid')}
          placeholder="Email ID"
        />
        <Input
          error={error.address}
          onFocus={() => handleErrors(null, 'username')}
          onChangeText={txt => handleValues(txt, 'username')}
          placeholder="Create Username"
        />
        <Input
          error={error.password}
          onFocus={() => handleErrors(null, 'password')}
          onChangeText={txt => handleValues(txt, 'password')}
          placeholder="Password"
          iconName={'eye-with-line'}
        />
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        {singleFile.map(item => {
          return (
            <Image
              source={{uri: item.uri}}
              style={{
                width: 80,
                height: 80,
                marginRight: 20,
                resizeMode: 'contain',
              }}
            />
          );
        })}

        <View style={{alignItems: 'center'}}>
          <Icon
            name={'camera'}
            size={50}
            color="#4171E1"
            onPress={selectFile}
            buttonText={'Select File'}
            bgColor="#95a5a6"
            btnWidth={0.4}
          />
          <Text
            style={{
              color: '#4171E1',
              fontSize: 16,
              fontFamily: 'Montserrat',
              marginTop: 20,
            }}>
            Take Picture
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <AppButton
          onPress={handleClick}
          buttonText={'Sign up'}
          bgColor="#FC6011"
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
    backgroundColor: '#307ecc',
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
