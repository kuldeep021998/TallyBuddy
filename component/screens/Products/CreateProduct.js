import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import {ScrollView} from 'react-native-gesture-handler';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {getData, postDataAxios} from '../../connection/FetchServices';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dimensions} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const {width} = Dimensions.get('window');

export default function CreateProduct({navigation, route}) {
  const [inputs, setInputs] = useState({
    category_id: '',
    brand_id: '',
    model_id: '',
    vendors_id: '',
    stock: '',
    colorFields: '',
    isSelected: '',
    costprice: '',
  });
  const [subItemsList, setSubItemsList] = useState([
    {productname: '', qty: '', costprice: ''},
  ]);
  
  const [error, setError] = useState({});
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [model, setModel] = useState([]);
  const [vendor, setVendor] = useState([]);
  // const [checked, setChecked] = React.useState('first');
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusCategory, setIsFocusCategory] = useState(false);
  const [isFocusVendor, setIsFocusVendor] = useState(false);
  const [isFocusModel, setIsFocusModel] = useState(false);
  const [colorFields, setColorFields] = useState([]);
  const [isSelected, setSelection] = useState(false);
  const [filePath, setFilePath] = useState(null);
  const [checked, setChecked] = React.useState('first');

  const handleNumInputChange = text => {
    handleValues(text, 'stock');
    let arr = [];
    for (let i = 0; i < text; i++) {
      arr.push('');
    }
    setColorFields([...arr]);
  };

  const validate = () => {
    var isValid = true;
    if (!inputs.category_id) {
      handleErrors('Please Input Category Id', 'categoryid');
      isValid = false;
    }
    if (!inputs.brand_id) {
      handleErrors('Please Input Brand Name', 'brandid');
      isValid = false;
    }
    if (!inputs.modelid) {
      handleErrors('Please Input Model', 'modelid');
      isValid = false;
    }
    if (!inputs.vendorid) {
      handleErrors('Please Input Vendor', 'vendorid');
      isValid = false;
    }
    if (!inputs.stock) {
      handleErrors('Please Input Stock', 'stock');
      isValid = false;
    }
    if (!inputs.costprice) {
      handleErrors('Please Input Cost ', 'costprice');
      isValid = false;
    }
    // if (!inputs.color) {
    //   handleErrors('Please Input Color', 'color');
    //   isValid = false;
    // }
    // return isValid;
  };
  const fetchCategory = async category_id => {
    const result = await getData('category', {category_id: category_id});
    setCategory(result.data);
    // console.log('Category', result.data);
  };
  const fetchBrand = async category_id => {
    const result = await getData('brand/byCategory/' + category_id);
    setBrand(result.data);
    console.log('Brand', result.data);
  };

  const fetchModel = async brand_id => {
    const result = await getData('model/byBrand/' + brand_id);
    setModel(result.data);
    console.log('model', result.data);
  };

  const fetchVendor = async () => {
    const result = await getData('vendor/display/active');
    console.log(result);
    setVendor(result.data);
    // console.log('Category', result.data);
  };

  useEffect(function () {
    fetchCategory();
    fetchVendor();
  }, []);
  // const handleonChange=(event)=>{
  //  setBrand(event.target.value)
  // }
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

  const BrandDropdownComponent = brand_id => {
    // const renderLabel = () => {
    //   if (value || isFocus) {
    //     return (
    //       <Text style={[styles.label, isFocus && {color: 'blue'}]}>
    //         Dropdown label
    //       </Text>
    //     );
    //   }
    //   return null;
    // };
    return (
      <View>
        {/* {renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={{
            flex: 1,
            backgroundColor: '#f1f1f1',
            borderRadius: 20,
            marginTop: -20,
            padding: 10,
          }}
          data={brand}
          search
          maxHeight={200}
          labelField="brand_name"
          valueField="brand_id"
          placeholder={!isFocus ? 'Select Brand' : '...'}
          searchPlaceholder="Search..."
          value={inputs.brand_id}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            fetchModel(item.brand_id);
            handleValues(item.brand_id, 'brand_id');
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  const ModelDropdownComponent = model_id => {
    // const renderLabel = () => {
    //   if (value || isFocus) {
    //     return (
    //       <Text style={[styles.label, isFocus && {color: 'blue'}]}>
    //         Dropdown label
    //       </Text>
    //     );
    //   }
    //   return null;
    // };
    return (
      <View>
        {/* {renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocusModel && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={{
            flex: 1,
            backgroundColor: '#f1f1f1',
            borderRadius: 20,
            marginTop: -20,
            padding: 10,
          }}
          data={model}
          search
          maxHeight={200}
          labelField="name"
          valueField="model_id"
          placeholder={!isFocus ? 'Select Model' : '...'}
          searchPlaceholder="Search..."
          value={inputs.model_id}
          onFocus={() => setIsFocusModel(true)}
          onBlur={() => setIsFocusModel(false)}
          onChange={item => {
            handleValues(item.model_id, 'model_id');
            setIsFocusModel(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  const DropdownComponent = category_id => {
    // const renderLabel = () => {
    //   if (value || isFocus) {
    //     return (
    //       <Text style={[styles.label, isFocus && {color: 'blue'}]}>
    //         Dropdown label
    //       </Text>
    //     );
    //   }
    //   return null;
    // };
    return (
      <View>
        {/* {renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocusCategory && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={{
            flex: 1,
            backgroundColor: '#f1f1f1',
            borderRadius: 20,
            marginTop: -20,
            padding: 10,
          }}
          data={category}
          search
          maxHeight={200}
          labelField="name"
          valueField="category_id"
          placeholder={!isFocusCategory ? 'Select Category' : '...'}
          searchPlaceholder="Search..."
          value={inputs.category_id}
          onFocus={() => setIsFocusCategory(true)}
          onBlur={() => setIsFocusCategory(false)}
          onChange={item => {
            fetchBrand(item.category_id);
            handleValues(item.category_id, 'category_id');
            setIsFocusCategory(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocusCategory ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  const handleAddInput = () => {
    const newInputs = [...subItemsList];
    newInputs.push({productname: '', qty: '', costPrice: ''});
    setSubItemsList(newInputs);
  };
  const handleDeleteInput = index => {
    const deletename = [...subItemsList];
    deletename.splice(index, 1);
    setSubItemsList([...deletename]);
  };

  const handleInputChange = (index, text) => {
    const newInputs = [...subItemsList];
    newInputs[index].productname = text;
    setSubItemsList(newInputs);
  };

  const handleQtyChange = (index, text) => {
    const newInputs = [...subItemsList];
    newInputs[index].qty = text;
    setSubItemsList(newInputs);
  };

  const handleCostPriceChange = (index, text) => {
    const newInputs = [...subItemsList];
    newInputs[index].costprice = text;
    setSubItemsList(newInputs);
  };

  const VendorDropdownComponent = vendors_id => {
    // const renderLabel = () => {
    //   if (value || isFocus) {
    //     return (
    //       <Text style={[styles.label, isFocus && {color: 'blue'}]}>
    //         Dropdown label
    //       </Text>
    //     );
    //   }
    //   return null;
    // };
    return (
      <View>
        {/* {renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocusVendor && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={{
            flex: 1,
            backgroundColor: '#f1f1f1',
            borderRadius: 20,
            marginTop: -20,
            padding: 10,
          }}
          data={vendor}
          search
          maxHeight={200}
          labelField="firm_name"
          valueField="vendors_id"
          placeholder={!isFocusVendor ? 'Select Vendor' : '...'}
          searchPlaceholder="Search..."
          value={inputs.vendors_id}
          onFocus={() => setIsFocusVendor(true)}
          onBlur={() => setIsFocusVendor(false)}
          onChange={item => {
            handleValues(item.vendors_id, 'vendors_id');
            setIsFocusVendor(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocusVendor ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  const handleSubmit = async () => {
    console.log('hii', JSON.stringify(colorFields));
    let formdata = new FormData();

    formdata.append('categoryid', inputs.category_id);
    formdata.append('brandid', inputs.brand_id);
    formdata.append('modelid', inputs.model_id);
    formdata.append('vendorid', inputs.vendors_id);
    formdata.append('costprice', inputs.costprice);
    formdata.append('stock', inputs.stock);
    formdata.append('color', JSON.stringify(colorFields));
    formdata.append('subitems', isSelected);
    formdata.append('subitemlist', JSON.stringify(subItemsList));
    formdata.append('picture', {
      ...filePath,
    });
    // console.log('hiiiii',formdata);
    const result = await postDataAxios('product', formdata);
    // console.log('-------->',result);
    if (result.status) {
      SweetAlert.showAlertWithOptions({
        title: 'Product Created Successfully',
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

    // alert(result.status);
  };
  // }

  const handleValues = (txt, attr) => {
    setInputs(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleErrors = (txt, attr) => {
    setError(prevStates => ({...prevStates, [attr]: txt}));
  };

  const handleColorInputChange = (index, txt) => {
    const data = [...colorFields];
    data[index] = txt;
    setColorFields([...data]);
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
          }}>
          Create Product
        </Text>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View style={{marginTop: 10}}>{DropdownComponent()}</View>
          <View style={{marginTop: 10}}>{BrandDropdownComponent()}</View>
          <View style={{marginTop: 10}}>{ModelDropdownComponent()}</View>
          <View style={{marginTop: 10}}>{VendorDropdownComponent()}</View>
          <Input
            error={error.costprice}
            onFocus={() => handleErrors(null, 'costprice')}
            onChangeText={txt => handleValues(txt, 'costprice')}
            placeholder="Cost Per Unit"
            keyboardType="numeric"
          />
          <Input
            error={error.stock}
            onFocus={() => handleErrors(null, 'stock')}
            // onChangeText={txt => handleValues(txt, 'stock')}
            placeholder="Stock"
            keyboardType="numeric"
            onChangeText={handleNumInputChange}
          />
          {/* <Input
            error={error.color}
            onFocus={() => handleErrors(null, 'color')}
            onChangeText={txt => handleValues(txt, 'color')}
            placeholder="Color"
            keyboardType="numeric"
            onChangeText={handleNumInputChange}
            value={numFields.toString()}
          /> */}
          {/* {renderInputFields()} */}
          {colorFields.map((item, index) => (
            <Input
              error={error.color}
              onFocus={() => handleErrors(null, 'color')}
              placeholder="Color"
              onChangeText={text => handleColorInputChange(index, text)}
              value={colorFields[index]}
            />
          ))}
          <View style={{alignItems: 'flex-start', width: width * 0.87}}>
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
                Sub Items
              </Text>
              {isSelected ? (
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
              ) : null}
            </View>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              title="Check me"
            />
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              width: width * 0.9,
              justifyContent: 'space-between',
            }}>
            {isSelected ? (
              <>
                {subItemsList.map((item, index) => (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: width * 0.9,
                        marginTop: 15,
                        gap: 4,
                      }}>
                      <TextInput
                        name="Product"
                        placeholder="Product Name"
                        onChangeText={txt => handleInputChange(index, txt)}
                        style={{
                          width: width * 0.82,
                          backgroundColor: 'white',
                          borderColor: '#f2f2f2',
                          borderRadius: 10,
                          padding: 10,
                          height: 50,
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => handleDeleteInput(index)}>
                        <Icon name="delete" size={40} />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: width * 0.9,
                        marginTop: 5,
                        gap: 4,
                      }}>
                      <TextInput
                        name="Cost Price"
                        placeholder=" Cost Price"
                        onChangeText={txt => handleCostPriceChange(index, txt)}
                        style={{
                          width: width * 0.4,
                          backgroundColor: 'white',
                          borderColor: '#f2f2f2',
                          borderRadius: 10,
                          padding: 10,
                          height: 50,
                        }}
                      />
                      <NumericInput
                        totalWidth={170}
                        totalHeight={50}
                        onChange={txt => handleQtyChange(index, txt)}
                      />
                    </View>
                  </>
                ))}
              </>
            ) : null}
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

        <View style={{alignSelf: 'center'}}>
          <AppButton onPress={handleSubmit} buttonText={'Create'} />
        </View>
        <View style={{marginTop: 10}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: width * 0.9,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
