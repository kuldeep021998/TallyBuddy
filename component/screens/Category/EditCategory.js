import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Dimensions} from 'react-native';
import {ScrollView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import {getData, deleteData, putData} from '../../connection/FetchServices';
import AnimatedLottieView from 'lottie-react-native';

const {height, width} = Dimensions.get('window');

export default function EditCategory({navigation, route}) {
  const [inputs, setInputs] = useState({
    name: '',
    gst_percent: '',
    status: '',
    hsn: '',
  });
  const [error, setError] = useState({});

  const validate = () => {
    var isValid = true;
    if (!inputs.name) {
      {
        handleErrors('Please Input Name', 'name');
      }
      isValid = false;
    }
    if (!inputs.gst_percent) {
      handleErrors('Please Input gstpercentage', 'gst_percent');
      isValid = false;
    }
    if (!inputs.status) {
      handleErrors('Please Input status', 'status');
      isValid = false;
    }
    if (!inputs.hsn) {
      handleErrors('Please Input hsn', 'hsn');
      isValid = false;
    }
    console.log(isValid);
    return isValid;
  };

  const [checked, setChecked] = React.useState('first');
  const [loader, setLoader] = useState(true);

  const handleDelete = async () => {
    const result = await deleteData('category/' + route.params.id);
    if (result.status) {
      navigation.goBack();
    }
  };

  const fetchCategory = async () => {
    setLoader(true);
    console.log(route.params.id);
    var result = await getData('category/' + route.params.id);
    console.log(result);
    if (result.status) {
      setInputs({
        name: result.data.name,
        gst_percent: result.data.gst_percent,
        status: result.data.status,
        hsn: result.data.hsn,
      });
    }
    setLoader(false);
  };

  useEffect(function () {
    fetchCategory();
  }, []);

  const handleEdit = async () => {
    if (validate()) {
      const body = {
        name: inputs.name,
        gst_percent: inputs.gst_percent,
        status: inputs.status,
        hsn: inputs.hsn,
      };
      const result = await putData('category/' + route.params.id, body);
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%"
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
                marginLeft: 10,
              }}>
              Category Details
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
                error={error.gst_percent}
                onFocus={() => handleErrors(null, 'gst_percent')}
                onChangeText={txt => handleValues(txt, 'gst_percent')}
                placeholder="Gst Percent"
                value={inputs.gst_percent}
              />
              <Input
                error={error.hsn}
                onFocus={() => handleErrors(null, 'hsn')}
                onChangeText={txt => handleValues(txt, 'hsn')}
                placeholder="HSN"
                value={inputs.hsn}
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
                  marginLeft: 10,
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
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                margin: 10,
              }}>
              <AppButton
                onPress={handleEdit}
                buttonText={'Edit'}
                bgColor="#FC6011"
                btnWidth={0.3}
                style={{marginRight: '10%'}}
              />
              <AppButton
                onPress={handleDelete}
                buttonText={'Delete'}
                bgColor="#FC6011"
                btnWidth={0.3}
                style={{marginLeft: '10%'}}
              />
            </View>
          </View>
        )}
      </>
    </View>
  );
}
