/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import MCI from 'react-native-vector-icons/MaterialIcons';
import {getData} from '../../connection/FetchServices';
import Input from '../../uicomponent/Input';

export default function EmployeeAttendance({navigation}) {
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
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          borderRadius: 10,
          overflow: 'hidden',
          marginVertical: 5,
          borderWidth: 0.4,
          borderColor: '#f2f2f2',
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#fff',
            height: '100%',
            padding: 10,
            flexDirection: 'row',
          }}>
          <View style={{marginTop: 4, width: width * 0.56}}>
            <Text
              style={{
                fontSize: 14,
                color: '#2C2C2C',
                fontFamily: 'Poppins-Medium',
              }}>
              {item.name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <MCI
                name="email"
                size={14}
                style={{marginTop: 2, color: 'black', padding: 1}}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#2C2C2C',
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.emailid}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MCI
                name="call"
                size={14}
                style={{marginTop: 2, color: 'black', padding: 1}}
              />
              <Text
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.mobileno}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MCI
                name="home"
                size={14}
                style={{marginTop: 2, color: 'black', padding: 1}}
              />
              <Text
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.address}
              </Text>
            </View>
          </View>
          <View style={{width: '30%', alignSelf: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <MCI
                name="store"
                size={14}
                style={{marginTop: 2, color: 'black', padding: 1}}
              />
              <Text
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.store_name}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <Input placeholder="Search" iconName={'magnifying-glass'} />
          <View style={{width: width, marginTop: 10}}>
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
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Attendance Details', {
                        id: item.employee_id,
                      })
                    }>
                    <Boxes item={item} />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
