import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {getData, postData, putData} from '../connection/FetchServices';
import Geolocation from '@react-native-community/geolocation';
const {height, width} = Dimensions.get('window');
import Map from './Map';
import {getStoreData} from '../Storage/AsyncStorage';
import moment from 'moment';

export default function EmployeeClock({navigation}) {
  const [status, setStatus] = useState();
  const [checkInTime, setCheckInTime] = useState('00:00:00');
  const [checkOutTime, setCheckOutTime] = useState('00:00:00');
  const [timer, setTimer] = useState('');

  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  const [checkEmployee, setCheckEmployee] = useState(false);

  const d = new Date();

  const handleStartTime = async () => {
    const asyncData = getStoreData('EMPLOYEE');
    // console.log(asyncData);
    setStatus(!status);
    // setCheckInTime(d.toLocaleTimeString());
    // setTimes(new Date());
    const body = {
      employee_id: asyncData.employee_id,
      store_id: asyncData.store_id,
      checkin_date: new Date().toISOString(),
      checkin_location: currentLatitude + ' ' + currentLongitude,
    };
    console.log(body);
    const result = await postData('employeeLoginDetail', body);
    console.log(result);
  };

  const handleEndTime = async () => {
    setStatus(!status);
    // setCheckOutTime(d.toLocaleTimeString());
    // TimeCal(new Date());
    const body = {
      checkout_date: new Date().toISOString(),
      checkin_location: currentLatitude + ' ' + currentLongitude,
    };

    const result = await putData(
      'employeeLoginDetail/' + checkEmployee.eld_id,
      body,
    );
    if (result.status) {
      // navigation.navigate('Employee Login');
      checkLogin();
    }
  };

  const checkLogin = async () => {
    const asyncData = await getStoreData('EMPLOYEE');
    // console.log(asyncData);
    const result = await getData(
      'employeeLoginDetail/' +
        asyncData.employee_id +
        '?date=' +
        new Date().toISOString(),
    );
    console.log(result);
    if (result.status) {
      setStatus(result.status);
      setCheckEmployee(result.data);
    } else {
      setStatus(result.status);
    }
  };

  useEffect(function () {
    checkLogin();
  }, []);

  // const TimeCal = et => {
  //   const startTime = new Date(times);
  //   const endTime = new Date(et);
  //   const diff = Math.abs(endTime - startTime);
  //   var second = Math.floor(diff / 1000);
  //   var min = Math.floor(second / 60);
  //   var hrs = Math.floor(min / 3600);
  //   TimeDiff(hrs, min, second);
  // };

  // const TimeDiff = (hrs, min, second) => {
  //   setTime(hrs + ':' + min + ':' + second);
  // };

  const DateDiff = (time1, time2) => {
    var Startday = new Date(time1).getTime();
    var Endday = new Date(time2).getTime();
    var diff = Endday - Startday;
    const differenceInMinutes = diff / 1000 / 60;
    let hours = Math.floor(differenceInMinutes / 60);
    if (hours < 0) {
      hours = 24 + hours;
    }
    let minutes = Math.floor(differenceInMinutes % 60);
    if (minutes < 0) {
      minutes = 60 + minutes;
    }
    const hoursAndMinutes = hours + ':' + (minutes < 10 ? '0' : '') + minutes;
    return hoursAndMinutes;
  };

  const Timer = setInterval(() => {
    const timer = new Date();
    setTimer(timer.toLocaleTimeString());
  }, 1000);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    // setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = position.coords.longitude;

        //getting the Latitude from the location json
        const currentLatitude = position.coords.latitude;

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        // setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude from the location json
        const currentLongitude = position.coords.longitude;

        //getting the Latitude from the location json
        const currentLatitude = position.coords.latitude;

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };

  return (
    <View
      style={{
        margin: height * 0.001,
        height: '99.8%',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <View>
        <View style={{alignItems: 'center', margin: 20}}>
          <Text style={{fontSize: 40, fontWeight: 800}}>{timer}</Text>
          <Text style={{fontSize: 14}}>
            {new Date().toDateString('en-US', {day: 'long'})}
          </Text>
        </View>

        <View style={{alignItems: 'center'}}>
          {status ? (
            checkEmployee.checkOut_date != null ? (
              <Text>disabled</Text>
            ) : (
              <TouchableOpacity onPress={() => handleEndTime()}>
                <View
                  style={{
                    backgroundColor: '#FE2424',
                    alignItems: 'center',
                    borderRadius: 200,
                    height: 250,
                    width: 250,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('./assets/FingerPrint.png')}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Monteserrat',
                      fontWeight: 600,
                      marginTop: 30,
                      color: 'white',
                    }}>
                    CHECK OUT
                  </Text>
                </View>
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity onPress={() => handleStartTime()}>
              <View
                style={{
                  backgroundColor: '#A4BEF9',
                  alignItems: 'center',
                  borderRadius: 200,
                  height: 250,
                  width: 250,
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('./assets/FingerPrint.png')}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Monteserrat',
                    fontWeight: 600,
                    marginTop: 30,
                    color: 'white',
                  }}>
                  CHECK IN
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={{alignItems: 'center', margin: 20}}>
          <TouchableOpacity>
            <View
              style={{
                height: 100,
                width: 200,
                alignItems: 'center',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 10,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Current Location
                </Text>
                <Icon
                  name={'location-pin'}
                  size={20}
                  color="red"
                  style={{marginRight: 10}}
                />
              </View>
              <View>
                <Text
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 16,
                  }}>
                  Longitude: {currentLongitude}
                </Text>
                <Text
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 16,
                  }}>
                  Latitude: {currentLatitude}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
          }}>
          <View style={{alignItems: 'center', height: 100, width: 100}}>
            <Image
              source={require('./assets/Clockin.png')}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'Monetserrat',
                fontSize: 18,
                fontWeight: 800,
              }}>
              {checkEmployee.checkin_date
                ? moment(checkEmployee.checkin_date).format('hh:mm:ss A')
                : '--'}
            </Text>
            <Text
              style={{
                fontFamily: 'Monetserrat',
                fontSize: 12,
                fontWeight: 800,
              }}>
              Check In
            </Text>
          </View>
          <View style={{alignItems: 'center', height: 100, width: 100}}>
            <Image
              source={require('./assets/Clockout.png')}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'Monetserrat',
                fontSize: 18,
                fontWeight: 800,
              }}>
              {checkEmployee.checkout_date
                ? moment(checkEmployee.checkout_date).format('hh:mm:ss A')
                : '--'}
            </Text>
            <Text
              style={{
                fontFamily: 'Monetserrat',
                fontSize: 12,
                fontWeight: 800,
              }}>
              Check Out
            </Text>
          </View>
          <View style={{alignItems: 'center', height: 100, width: 100}}>
            <Image
              source={require('./assets/Clockin.png')}
              style={{
                height: 40,
                width: 40,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'Monetserrat',
                fontSize: 18,
                fontWeight: 800,
              }}>
              {DateDiff(
                checkEmployee.checkin_date,
                checkEmployee.checkout_date,
              )}
            </Text>
            <Text
              style={{
                fontFamily: 'Monetserrat',
                fontSize: 12,
                fontWeight: 800,
              }}>
              Working hrs
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
