/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Dicon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RadioButton} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppButton from '../../uicomponent/AppButton';
import Icon from 'react-native-vector-icons/Entypo';
import Input from '../../uicomponent/Input';
import SweetAlert from 'react-native-sweet-alert';
import {
  getData,
  deleteData,
  putDataAxios,
  ServerURL,
} from '../../connection/FetchServices';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import stateCity from '../assets/StateCity.json';
import AnimatedLottieView from 'lottie-react-native';

const {width} = Dimensions.get('window');
export default function EditServiceMan({navigation, route}) {
  const [inputs, setInputs] = useState({
    name: '',
    emailid: '',
    mobileno: '',
    address: '',
    addhar_no: '',
    password: '',
    state: '',
    city: '',
    status: '',
    picture: '',
  });

  const [error, setError] = useState({});

  const validate = () => {
    var isValid = true;
    if (!inputs.name) {
      handleErrors('Please Input name', 'name');
      console.log(1);
      isValid = false;
    }
    if (!inputs.mobileno) {
      handleErrors('Please Input mobileno', 'mobileno');
      isValid = false;
      console.log(2);
    }
    if (!inputs.emailid) {
      handleErrors('Please Input emailid', 'emailid');
      isValid = false;
      console.log(3);
    }
    if (!inputs.password) {
      handleErrors('Please Input password', 'password');
      isValid = false;
      console.log(4);
    }
    if (!inputs.addhar_no) {
      handleErrors('Please Input addhar no.', 'addhar_no');
      isValid = false;
      console.log(5);
    }
    if (!inputs.address) {
      handleErrors('Please Input address', 'address');
      isValid = false;
      console.log(7);
    }
    console.log(isValid);
    return isValid;
  };

  const states = Object.keys(stateCity);
  const [getCities, setCities] = useState([]);

  const handleState = state => {
    const cities = stateCity[state];
    setCities(cities);
  };

  const handleCity = city => {};

  const [filePath, setFilePath] = useState(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        } else {
          const source = {
            base64: 'data:image/jpeg;base64,' + response.assets[0].base64,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
            uri: response.assets[0].uri,
          };
          setFilePath(source);
        }
      });
    }
  };

  // eslint-disable-next-line no-unused-vars
  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  const [checked, setChecked] = React.useState('first');
  const [loader, setLoader] = useState(true);
  const [servicearea, setServiceArea] = useState([]);

  const handleDeleteInput = index => {
    const deletename = [...servicearea];
    deletename.splice(index, 1);
    setServiceArea([...deletename]);
  };

  const handleInputChange = (index, text) => {
    const newInputs = [...servicearea];
    newInputs[index] = text;
    setServiceArea(newInputs);
  };

  const handleAddInput = () => {
    const newInputs = [...servicearea];
    newInputs.push('');
    setServiceArea(newInputs);
  };

  const handleDelete = async () => {
    const result = await deleteData('serviceman/' + route.params.id);
    if (result.status) {
      SweetAlert.showAlertWithOptions({
        title: 'Deleted Successfully',
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancel',
        otherButtonColor: '#dedede',
        style: 'success',
        cancellable: true,
      });
      navigation.goBack();
    } else {
      SweetAlert.showAlertWithOptions({
        title: 'Server Error',
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#000',
        otherButtonTitle: 'Cancel',
        otherButtonColor: '#dedede',
        style: 'success',
        cancellable: true,
      });
    }
  };
  // alert(result.status);

  const fetchServiceMan = async () => {
    setLoader(true);
    console.log(route.params.id);
    var result = await getData('serviceman/' + route.params.id);
    console.log(result);
    if (result.status) {
      console.log(result.data.state);
      handleState(result.data.state);
      setInputs({
        name: result.data.name,
        mobileno: result.data.mobileno,
        emailid: result.data.emailid,
        address: result.data.address,
        password: result.data.password,
        addhar_no: result.data.addhar_no,
        state: result.data.state,
        city: result.data.city,
        status: result.data.status,
        picture: result.data.picture,
        // name, emailid, mobileno, address, addhar_no, state, city, servicearea, password, picture, status
      });
      setServiceArea(result.data.servicearea);
    }
    setLoader(false);
  };

  useEffect(function () {
    fetchServiceMan();
  }, []);

  const handleEdit = async () => {
    if (validate()) {
      let formdata = new FormData();
      formdata.append('name', inputs.name);
      formdata.append('mobileno', inputs.mobileno);
      formdata.append('emailid', inputs.emailid);
      formdata.append('address', inputs.address);
      formdata.append('password', inputs.password);
      formdata.append('addhar_no', inputs.addhar_no);
      formdata.append('state', inputs.state);
      formdata.append('city', inputs.city);
      formdata.append('status', inputs.status);
      formdata.append('servicearea', JSON.stringify(servicearea));
      if (filePath) {
        formdata.append('picture', {
          ...filePath,
        });
      }
      //   name, emailid, mobileno, address, addhar_no, state, city, servicearea, password, picture, status

      const result = await putDataAxios(
        'serviceman/' + route.params.id,
        formdata,
      );
      if (result.status) {
        SweetAlert.showAlertWithOptions({
          title: 'Serviceman Edited Successfully',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          otherButtonTitle: 'Cancel',
          otherButtonColor: '#dedede',
          style: 'success',
          cancellable: true,
        });
        navigation.goBack();
      } else {
        SweetAlert.showAlertWithOptions({
          title: 'Server Error',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          otherButtonTitle: 'Cancel',
          otherButtonColor: '#dedede',
          style: 'success',
          cancellable: true,
        });
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
    <ScrollView style={{flex: 1}}>
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
                fontWeight: 'bold',
                color: '#2C2C2C',
                marginLeft: 20,
                marginTop: 10,
              }}>
              Service Man
            </Text>
            <View
              style={{
                alignItems: 'center',
              }}>
              {/* // name, emailid, mobileno, address, addhar_no, state, city, servicearea, password, picture, status */}
              <Input
                error={error.name}
                onFocus={() => handleErrors(null, 'name')}
                onChangeText={txt => handleValues(txt, 'name')}
                placeholder="Name"
                value={inputs.name}
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
                placeholder="Address"
                multiline
                numberOfLines={5}
                height={120}
                value={inputs.address}
              />
              <Input
                error={error.addhar_no}
                onFocus={() => handleErrors(null, 'addhar_no')}
                onChangeText={txt => handleValues(txt, 'addhar_no')}
                placeholder="Addhar No."
                value={inputs.addhar_no}
              />
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
                    height: 50,
                    width: '90%',
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    paddingLeft: 20,
                    marginTop: 10,
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
                    height: 50,
                    width: '90%',
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    paddingLeft: 20,
                    marginTop: 15,
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
              <Input
                error={error.password}
                onFocus={() => handleErrors(null, 'password')}
                onChangeText={txt => handleValues(txt, 'password')}
                placeholder="Password"
                value={inputs.password}
              />
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: width * 0.87,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#2C2C2C',
                  }}>
                  Service Area
                </Text>
                <TouchableOpacity onPress={handleAddInput}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#2C2C2C',
                    }}>
                    ADD MORE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <>
                {servicearea.map((item, index) => (
                  <>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: '100%',
                        margin: 10,
                        gap: 4,
                      }}>
                      <View
                        style={{
                          width: width * 0.8,
                          height: 40,
                          backgroundColor: '#bdc3c7',
                          borderRadius: 10,
                        }}>
                        <TextInput
                          name="Product"
                          value={item}
                          placeholder="PinCode"
                          onChangeText={txt => handleInputChange(index, txt)}
                          style={{
                            width: width * 0.8,
                            backgroundColor: 'white',
                            borderColor: '#f2f2f2',
                            borderRadius: 10,
                            padding: 10,
                            height: 50,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() => handleDeleteInput(index)}>
                          <Dicon name="delete" size={40} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                ))}
              </>
            </View>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: 'bold',
                  color: '#2C2C2C',
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
            <View style={{alignItems: 'center'}}>
              <Icon
                name={'camera'}
                size={50}
                color="#4171E1"
                buttonText={'Select File'}
                bgColor="#95a5a6"
                btnWidth={0.4}
                marginTop={20}
                onPress={() => captureImage('photo')}
              />
              <Text
                style={{
                  color: '#4171E1',
                  fontSize: 16,
                  marginTop: 20,
                }}>
                Take Picture
              </Text>
            </View>
            <View
              style={{marginTop: 10, alignItems: 'center', marginBottom: 10}}>
              {filePath ? (
                <Image
                  source={{uri: filePath.uri}}
                  style={{width: 100, height: 100}}
                />
              ) : (
                <Image
                  source={{uri: `${ServerURL}/images/${inputs.picture}`}}
                  style={{width: 100, height: 100}}
                />
              )}
            </View>
            <View style={{alignItems: 'center'}}>
              <AppButton onPress={handleEdit} buttonText={'Edit'} />
              <AppButton onPress={handleDelete} buttonText={'Delete'} />
            </View>
            <View style={{marginTop: 10}} />
          </View>
        )}
      </>
    </ScrollView>
  );
}
