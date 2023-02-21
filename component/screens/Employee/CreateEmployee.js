/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Image,
  alert,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppButton from '../../uicomponent/AppButton';
import Icon from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
import Input from '../../uicomponent/Input';
import stateCity from '../assets/StateCity.json';
import { postDataAxios } from '../../connection/FetchServices';

const {height, width} = Dimensions.get('window');
export default function CreateEmployee() {
  const [error, setError] = useState({});
  const [inputs, setInputs] = useState({
    name: '',
    mobileno: '',
    address: '',
    store_id: '',
    emailid: '',
    password: '',
    aadharno: '',
    state: '',
    city: '',
    status: '',
    designation: '',
  });

  const validate = () => {
    var isValid = true;
    if (!inputs.store_id) {
      handleErrors('Please Input id', 'store_id');
      isValid = false;
      console.log(8);
    }
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
    if (!inputs.designation) {
      handleErrors('Please Input designation', 'designation');
      isValid = false;
      console.log(6);
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
    if (!inputs.aadharno) {
      handleErrors('Please Input gstno', 'aadharno');
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

  // const [filePath, setFilePath] = useState(null);

  // const requestCameraPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Camera Permission',
  //           message: 'App needs camera permission',
  //         },
  //       );
  //       // If CAMERA Permission is granted
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  // };

  // const requestExternalWritePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'External Storage Write Permission',
  //           message: 'App needs write permission',
  //         },
  //       );
  //       // If WRITE_EXTERNAL_STORAGE Permission is granted
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       alert('Write permission err', err);
  //     }
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const captureImage = async type => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //     videoQuality: 'low',
  //     durationLimit: 30, //Video max duration in seconds
  //     saveToPhotos: true,
  //   };
  //   let isCameraPermitted = await requestCameraPermission();
  //   let isStoragePermitted = await requestExternalWritePermission();
  //   if (isCameraPermitted && isStoragePermitted) {
  //     launchCamera(options, response => {
  //       console.log('Response = ', response);

  //       if (response.didCancel) {
  //         alert('User cancelled camera picker');
  //         return;
  //       } else if (response.errorCode == 'camera_unavailable') {
  //         alert('Camera not available on device');
  //         return;
  //       } else if (response.errorCode == 'permission') {
  //         alert('Permission not satisfied');
  //         return;
  //       } else if (response.errorCode == 'others') {
  //         alert(response.errorMessage);
  //         return;
  //       } else {
  //         const source = {
  //           base64: 'data:image/jpeg;base64,' + response.assets[0].base64,
  //           name: response.assets[0].fileName,
  //           type: response.assets[0].type,
  //           uri: response.assets[0].uri,
  //         };
  //         setFilePath(source);
  //       }
  //     });
  //   }
  // };

  // const chooseFile = type => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //   };
  //   launchImageLibrary(options, response => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       alert('User cancelled camera picker');
  //       return;
  //     } else if (response.errorCode == 'camera_unavailable') {
  //       alert('Camera not available on device');
  //       return;
  //     } else if (response.errorCode == 'permission') {
  //       alert('Permission not satisfied');
  //       return;
  //     } else if (response.errorCode == 'others') {
  //       alert(response.errorMessage);
  //       return;
  //     }
  //     console.log('base64 -> ', response.base64);
  //     console.log('uri -> ', response.uri);
  //     console.log('width -> ', response.width);
  //     console.log('height -> ', response.height);
  //     console.log('fileSize -> ', response.fileSize);
  //     console.log('type -> ', response.type);
  //     console.log('fileName -> ', response.fileName);
  //     setFilePath(response);
  //   });
  // };

  const [checked, setChecked] = React.useState('Yes');
  const [singleFile, setSingleFile] = useState([]);

  const handleSubmit = async () => {
    if (validate()) {
      let formdata = new FormData();
      formdata.append('store_id', inputs.store_id);
      formdata.append('name', inputs.name);
      formdata.append('mobileno', inputs.mobileno);
      formdata.append('emailid', inputs.emailid);
      formdata.append('password', inputs.password);
      formdata.append('addhar_no', inputs.aadharno);
      formdata.append('state', inputs.state);
      formdata.append('city', inputs.city);
      formdata.append('address', inputs.address);
      formdata.append('status', inputs.status);
      formdata.append('designation', inputs.designation);
      // formdata.append('picture', {
      //   ...filePath,
      // });

      const result = await postDataAxios('employee', formdata);
      if (result.status) {
        alert('Data inserted successfully');
        NavigationContainer.goBack();
      }
    }
  };

  const handleValues = (txt, attr) => {
    setInputs(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleErrors = (txt, attr) => {
    setError(prevStates => ({...prevStates, [attr]: txt}));
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
        alert('Cancelled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View style={{margin: height * 0.001}}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          {/* <Text
            style={{
              fontSize: 16,
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
              color: '#2C2C2C',
              alignSelf: 'center',
              marginTop: 10
            }}>
            Employee
          </Text> */}
          <View
            style={{
              alignItems: 'center',
              display: 'flex',
              marginBottom: 10,
            }}>
            <Input
              error={error.password}
              onFocus={() => handleErrors(null, 'store_id')}
              onChangeText={txt => handleValues(txt, 'store_id')}
              placeholder="Store Id"
            />
            <Input
              error={error.name}
              onFocus={() => handleErrors(null, 'name')}
              onChangeText={txt => handleValues(txt, 'name')}
              placeholder="Name"
            />
            <Input
              error={error.mobileno}
              onFocus={() => handleErrors(null, 'mobileno')}
              onChangeText={txt => handleValues(txt, 'mobileno')}
              placeholder="Mobile No."
            />
            <Input
              error={error.emailid}
              onFocus={() => handleErrors(null, 'emailid')}
              onChangeText={txt => handleValues(txt, 'emailid')}
              placeholder="Email Id"
            />
            <Input
              error={error.password}
              onFocus={() => handleErrors(null, 'password')}
              onChangeText={txt => handleValues(txt, 'password')}
              placeholder="Password"
            />
            <Input
              error={error.aadharno}
              onFocus={() => handleErrors(null, 'aadharno')}
              onChangeText={txt => handleValues(txt, 'aadharno')}
              placeholder="Aadhar No."
            />
            <Input
              error={error.address}
              onFocus={() => handleErrors(null, 'address')}
              onChangeText={txt => handleValues(txt, 'address')}
              placeholder="Address"
            />
          </View>
          <View style={{alignItems: 'center'}}>
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
                width: '80%',
                borderRadius: 10,
                backgroundColor: '#fff',
                paddingLeft: 20,
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
                width: '80%',
                borderRadius: 10,
                backgroundColor: '#fff',
                paddingLeft: 10,
                marginTop: 20,
              }}
              buttonTextStyle={{color: 'black', textAlign: 'left'}}
              dropdownIconPosition="right"
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
              <Text style={{color: 'black'}}>No</Text>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
            }}>
            <Input
              error={error.designation}
              onFocus={() => handleErrors(null, 'designation')}
              onChangeText={txt => handleValues(txt, 'designation')}
              placeholder="Designation"
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
          <View style={{margin: 5, alignItems: 'center'}}>
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
