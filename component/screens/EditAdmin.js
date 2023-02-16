import {useState, useEffect} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import AppButton from '../uicomponent/AppButton';
import {
  postData,
  postDataAxios,
  getData,
  putData,
  deleteData,
} from '../connection/FetchServices';
import DocumentPicker from 'react-native-document-picker';
import {Image} from 'react-native-elements';
import Input from '../uicomponent/Input';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const {height, width} = Dimensions.get('window');

export default function EditAdmin({navigation, route}) {
  const [inputs, setInputs] = useState({
    fullname: '',
    mobile: '',
    emailid: '',
    username: '',
    password: '',
  });

  const [error, setError] = useState({});
  const [singleFile, setSingleFile] = useState([]);

  const fetchDetails = async () => {
    var result = await getData('admins/' + route.params.id);
    console.log(result);
    if (result.status) {
      setInputs({
        fullname: result.data.name,
        mobile: result.data.mobileno,
        emailid: result.data.emailid,
        username: result.data.username,
        password: result.data.password,
      });
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

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

  const handleEdit = async () => {
    let body = {
      name: inputs.fullname,
      mobileno: inputs.mobile,
      emailid: inputs.emailid,
      username: inputs.username,
      password: inputs.password,
    };
    var result = await putData('admins/' + route.params.id, body);
    navigation.goBack();
  };

  const handleDelete = async () => {
    var result = await deleteData('admins/' + route.params.id);
    navigation.goBack();
  };

  const handleValues = (txt, attr) => {
    setInputs(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleErrors = (txt, attr) => {
    setError(prevStates => ({...prevStates, [attr]: txt}));
  };

  return (
    <View
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: height * 0.001, backgroundColor: 'red'}}>
      <Input
        error={error.mobile}
        onFocus={() => handleErrors(null, 'fullname')}
        onChangeText={txt => handleValues(txt, 'fullname')}
        placeholder="Full Name"
        value={inputs.fullname}
      />
      <Input
        error={error.mobile}
        onFocus={() => handleErrors(null, 'mobile')}
        onChangeText={txt => handleValues(txt, 'mobile')}
        placeholder="Mobile Number"
        value={inputs.mobile}
      />
      <Input
        error={error.emailid}
        onFocus={() => handleErrors(null, 'emailid')}
        onChangeText={txt => handleValues(txt, 'emailid')}
        placeholder="Email ID"
        value={inputs.emailid}
      />
      <Input
        error={error.address}
        onFocus={() => handleErrors(null, 'username')}
        onChangeText={txt => handleValues(txt, 'username')}
        placeholder="Create Username"
        value={inputs.username}
      />
      <Input
        error={error.password}
        onFocus={() => handleErrors(null, 'password')}
        onChangeText={txt => handleValues(txt, 'password')}
        placeholder="Password"
        iconName={'eye-with-line'}
        value={inputs.password}
      />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}>
        {singleFile.map(item => {
          return (
            <Image
              source={{uri: item.uri}}
              style={{width: 80, height: 80, resizeMode: 'contain'}}
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <AppButton
          onPress={handleEdit}
          buttonText={'Edit'}
          bgColor="#FC6011"
          btnWidth={0.4}
          style={{margin: 5}}
        />
        <AppButton
          onPress={handleDelete}
          buttonText={'Delete'}
          bgColor="#FC6011"
          btnWidth={0.4}
          style={{margin: 5}}
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
