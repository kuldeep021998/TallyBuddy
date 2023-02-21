import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getData, ServerURL} from '../../connection/FetchServices';
import Input from '../../uicomponent/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

const {height, width} = Dimensions.get('window');

export default function EmployeeDetails({navigation}) {
  const [employees, setEmployees] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchEmployees = async () => {
    setLoader(true);
    var result = await getData('employee/');
    if (result.status) {
      setEmployees(result.data);
    }
    setLoader(false);
    console.log(result);

    console.log(setEmployees);
  };

  useEffect(function () {
    fetchEmployees();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchEmployees();
    }, []),
  );

  const Boxes = ({item}) => {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', margin: 5}}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#24313F33',
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: 10,
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={{uri: `${ServerURL}/images/${item.picture}`}}
                style={{
                  width: 100,
                  height: 120,
                  resizeMode: 'contain',
                  borderRadius: 10
                }}
              />
              <Text
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  alignSelf: 'auto',
                  alignSelf: 'center',
                  marginTop: 10
                }}>
                {item.name}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Designation:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.designation}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Password:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.password}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Mobile:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.mobileno}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Email:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.emailid}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Aadhar No:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.addhar_no}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Address</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.address}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Edit Employee', {id: item.id})}
              style={{
                backgroundColor: 'white',
                width: 30,
                height: 30,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name={'edit'} size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{margin: height * 0.001, alignItems: 'center'}}>
      <Input placeholder="Search" iconName={'magnifying-glass'} />
      <View style={{width: width, height: '85%'}}>
        {loader ? (
          <AnimatedLottieView
            source={require('../assets/Tally Buddy Loader.json')}
            autoPlay
            loop
            style={{height: 100, alignSelf: 'center', display: 'flex'}}
          />
        ) : (
          <FlatList
            data={employees}
            renderItem={({item}) => <Boxes item={item} />}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
}
