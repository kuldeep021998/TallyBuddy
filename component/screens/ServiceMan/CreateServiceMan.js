/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Dicon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FilePicker, {types} from 'react-native-document-picker';
import AppButton from '../../uicomponent/AppButton';
import Icon from 'react-native-vector-icons/Entypo';
import Input from '../../uicomponent/Input';
import {postDataAxios, getData} from '../../connection/FetchServices';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SweetAlert from 'react-native-sweet-alert';

import stateCity from '../assets/StateCity.json'

const {width} = Dimensions.get('window');
export default function Rough(navigation) {
  const [inputs, setInputs] = useState({
    name: '',
    emailid: '',
    mobileno: '',
    address: '',
    aadhar_no: '',
    state: '',
    city: '',
    servicearea: '',
    password: '',
    status: '',
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
    if (!inputs.aadhar_no) {
      handleErrors('Please Input aadhar no.', 'aadhar_no');
      isValid = false;
      console.log(5);
    }
    if (!inputs.address) {
      handleErrors('Please Input address', 'address');
      isValid = false;
      console.log(7);
    }
    // if (!inputs.servicearea) {
    //   handleErrors('Please Input Servicearea', 'servicearea');
    //   isValid = false;
    //   console.log(8);
    // }
    console.log(isValid);
    return isValid;
  };

  const states = Object.keys(stateCity);
  const [getCities, setCities] = useState([]);

  const handleState = state => {
    const cities = stateCity[state];
    setCities(cities);
  };

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
  };

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
  const [servicearea, setServiceArea] = useState(['']);

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

  const handleSubmit = async () => {
    if (validate()) {
      let formdata = new FormData();
      formdata.append('name', inputs.name);
      formdata.append('mobileno', inputs.mobileno);
      formdata.append('emailid', inputs.emailid);
      formdata.append('address', inputs.address);
      formdata.append('password', inputs.password);
      formdata.append('addhar_no', inputs.aadhar_no);
      formdata.append('state', inputs.state);
      formdata.append('city', inputs.city);
      formdata.append('servicearea', JSON.stringify(servicearea));
      formdata.append('status', inputs.status);
      formdata.append('picture', {
        ...filePath,
      });

      const result = await postDataAxios('serviceman', formdata);
      if (result.status) {
        SweetAlert.showAlertWithOptions({
          title: 'Serviceman Created Successfully',
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
    // alert(result.status);
  };
  // }

  const handleValues = (txt, attr) => {
    setInputs(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleErrors = (txt, attr) => {
    setError(prevStates => ({...prevStates, [attr]: txt}));
  };

  return (
    <ScrollView style={{flex: 1}}>
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
          <Input
            error={error.address}
            onFocus={() => handleErrors(null, 'address')}
            onChangeText={txt => handleValues(txt, 'address')}
            placeholder="Address"
            multiline
            numberOfLines={5}
            height={120}
          />
          <Input
            error={error.aadhar_no}
            onFocus={() => handleErrors(null, 'aadhar_no')}
            onChangeText={txt => handleValues(txt, 'aadhar_no')}
            placeholder="Aadhar No."
          />
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
                height: 50,
                width: '90%',
                borderRadius: 10,
                backgroundColor: '#fff',
                paddingLeft: 20,
                marginTop: 15,
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
          <Input
            error={error.password}
            onFocus={() => handleErrors(null, 'password')}
            onChangeText={txt => handleValues(txt, 'password')}
            placeholder="Password"
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
                    <TouchableOpacity onPress={() => handleDeleteInput(index)}>
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
              value="Yes"
              status={checked === '1' ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked('1');
                handleValues('1', 'status');
              }}
            />
            <Text style={{marginRight: 50}}>Yes</Text>
            <RadioButton
              value="No"
              status={checked === '2' ? 'checked' : 'unchecked'}
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
        <View style={{marginTop: 10, alignItems: 'center', marginBottom: 10}}>
          {filePath ? (
            <Image
              source={{uri: filePath.uri}}
              style={{width: 100, height: 100}}
            />
          ) : null}
        </View>
        <View style={{alignItems: 'center'}}>
          <AppButton onPress={handleSubmit} buttonText={'Create'} />
        </View>
        <View style={{marginTop: 10}} />
      </View>
    </ScrollView>
  );
}
