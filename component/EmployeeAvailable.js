
import React, {useRef} from 'react';
import {
  View,
  Dimensions,
  Text,
  FlatList,
  ScrollView,
  TextInput
} from 'react-native';
import {getData, ServerURL} from './connection/FetchServices';
const {width, height} = Dimensions.get('window');
import {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import MCI from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Entypo';

export default function EmployeeAvailable({navigation}) {

  const [employees, setEmployees] = useState([]);
  const [loader, setLoader] = useState(true);
  const refRBSheet = useRef();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(null);

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

  const handleDone = () => {
    refRBSheet.current.close();
    fetchDetail();
  };

  const handleCross = () => {
    refRBSheet.current.close();
  };

  const fetchDetail = async () => {
    let str = '';
    if (startDate) {
      str = '?date=' + new Date(startDate).toISOString();
    }
    var result = await getData('employeeLoginDetail' + str);
    console.log(result);
    if (result.status) {
      setEmployees(result.data);
    }
  };

  const fetchEmployees = async () => {
    setLoader(true);
    var result = await getData('employeeLoginDetail');
    if (result.status) {
      setEmployees(result.data);
    }
    setLoader(false);
    console.log(result);

    console.log(setEmployees);
  };

  useEffect(function () {
    fetchEmployees();
    fetchDetail();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchEmployees();
    }, []),
  );

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  function onDateSelected(event, value) {
    hideDatePicker();
    if (event.type == 'set') {
      setStartDate(value);
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

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
                fontSize: 12,
                color: '#2C2C2C',
                fontFamily: 'Poppins-Bold',
              }}>
              Employee
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#2C2C2C',
                fontFamily: 'Poppins-Medium',
              }}>
              {item.ename}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#2C2C2C',
                fontFamily: 'Poppins-Bold',
              }}>
              Store
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#2C2C2C',
                fontFamily: 'Poppins-Medium',
              }}>
              {item.sname}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#2C2C2C',
                fontFamily: 'Poppins-Bold',
              }}>
              Status
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#2C2C2C',
                fontFamily: 'Poppins-Medium',
              }}>
              {item.current_status}
            </Text>
          </View>
          <View style={{width: '30%'}}>
            <Text
              style={{
                fontSize: 12,
                color: '#2C2C2C',
                fontFamily: 'Poppins-Bold',
              }}>
              Check-In
            </Text>
            <Text
              style={{
                color: '#2C2C2C',
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
              }}>
              {moment(item.checkin_date).format('hh:mm A')}
            </Text>
            {item.checkout_date?(
            <><Text
                style={{
                  fontSize: 12,
                  color: '#2C2C2C',
                  fontFamily: 'Poppins-Bold',
                }}>
                Check-Out
              </Text><Text
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>
                  {item.checkout_date
                    ? moment(item.checkout_date).format('hh:mm A')
                    : '--'}
                </Text><Text
                  style={{
                    fontSize: 12,
                    color: '#2C2C2C',
                    fontFamily: 'Poppins-Bold',
                  }}>
                  Working Hours
                </Text><Text
                  style={{
                    color: '#2C2C2C',
                    fontSize: 14,
                    fontFamily: 'Poppins-Medium',
                  }}>
                  {item.checkout_date
                    ? DateDiff(item.checkin_date, item.checkout_date)
                    : '--'}
                </Text></>
            ):null}
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '95%',
              marginTop: height * 0.02,
            }}>
            <View
              style={{
                width: width * 0.88,
                backgroundColor: '#fff',
                borderColor: '#f2f2f2',
                borderRadius: 10,
                // display: 'flex',
                flexDirection: 'row',
                height: 50,
                // justifyContent: 'space-between',
                // alignItems: 'center',
              }}>
              <TextInput
                style={{
                  fontSize: 15,
                  marginLeft: 20,
                  width: '80%',
                  // paddingTop: props.multiline ? 0 : null,
                }}
                placeholder="search"
              />
            </View>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <MCI name={'filter'} size={22} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{width: width, marginTop: 10}}>
            {loader ? (
              <AnimatedLottieView
                source={require('./screens/assets/Tally Buddy Loader.json')}
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
        <RBSheet
          ref={refRBSheet}
          height={200}
          openDuration={250}
          customStyles={{
            container: {
              // justifyContent: 'center',
            },
          }}>
          <View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 5,
              }}>
              <TouchableOpacity onPress={handleCross}>
                <Icon name="cross" size={20} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Poppins-Bold',
                  color: 'black',
                }}>
                Set Filters
              </Text>
              <TouchableOpacity onPress={handleDone}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Poppins-Bold',
                    color: 'black',
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Bold',
                  color: 'black',
                  marginTop: height * 0.01,
                  padding: 7,
                }}>
                Sort by date range
              </Text>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: height * 0.0,
                  padding: 7,
                  // backgroundColor: 'red',
                }}>
                <TouchableOpacity
                  onPress={() => showDatePicker()}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    width: '35%',
                    borderRadius: 10,
                  }}>
                  <Text label="Date" mode="inlined" editable={false}>
                    {moment(startDate || new Date()).format('DD-MMM-YYYY')}
                  </Text>
                  <MCI name="calendar" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </RBSheet>
        {isDatePickerVisible && (
          <DateTimePicker
            maximumDate={new Date()}
            value={startDate || new Date()}
            mode={'date'}
            display={'default'}
            is24Hour={true}
            onChange={onDateSelected}
          />
        )}
      </View>
    </ScrollView>
  );
}
