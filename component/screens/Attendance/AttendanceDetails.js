import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {getData} from '../../connection/FetchServices';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import MCI from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';

const {height, width} = Dimensions.get('window');

export default function AttendanceDetail({navigation, route}) {
  const refRBSheet = useRef();
  const [employees, setEmployees] = useState({});
  const [loader, setLoader] = useState(true);
  const [detail, setDetails] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  function onDateSelected(event, value) {
    hideDatePicker();
    if (event.type == 'set') {
      setStartDate(value);
    }
  }

  function onDateSelected2(event, value) {
    hideDatePicker2();
    if (event.type == 'set') {
      setEndDate(value);
    }
  }

  const fetchDetail = async () => {
    var condition = [],
      str = '';
    if (startDate) {
      condition.push('startdate=' + new Date(startDate).toISOString());
    }
    if (endDate) {
      condition.push('enddate=' + new Date(endDate).toISOString());
    }
    if (startDate || endDate) {
      str = '?' + condition.join('&');
    }
    var result = await getData('employeeLoginDetail/' + route.params.id + str);
    console.log(result);
    if (result.status) {
      setDetails(result.data);
    }
  };

  const fetchEmployees = async () => {
    setLoader(true);
    var result = await getData('employee/' + route.params.id);
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
      fetchDetail();
    }, []),
  );

  const handleDone = () => {
    refRBSheet.current.close();
    fetchDetail();
  };

  const handleCross = () => {
    refRBSheet.current.close();
  };

  const Boxes = ({item}) => {
    return (
      <View
        style={{
          // flex: 1,
          // marginHorizontal: 10,
          borderRadius: 5,
          overflow: 'hidden',
          marginVertical: 5,
          // borderWidth: 0.4,
          borderColor: '#f2f2f2',
        }}>
        <ImageBackground
          // source={require('../../assets/card.jpg')}
          style={{width: width * 1, height: height * 0.3}}>
          <View
            style={{
              width: width * 1,
              // backgroundColor: '#D4B9A7',
              height: height * 0.3,
              padding: 7,
              flexDirection: 'row',
            }}>
            <View style={{width: '48%'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#2C2C2C',
                  fontFamily: 'Poppins-Bold',
                }}>
                Employee Name
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#2C2C2C',
                  fontFamily: 'Poppins-Bold',
                }}>
                Contact Number
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.mobileno}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#2C2C2C',
                  fontFamily: 'Poppins-Bold',
                }}>
                Address
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.address},{item.city}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#2C2C2C',
                  fontFamily: 'Poppins-Bold',
                }}>
                Designation
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.designation}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#2C2C2C',
                  fontFamily: 'Poppins-Bold',
                }}>
                Store
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.store_name}
              </Text>
            </View>
            <View style={{width: '53%'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#2C2C2C',
                  fontFamily: 'Poppins-Bold',
                }}>
                Email
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.emailid}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#2C2C2C',
                  fontFamily: 'Poppins-Bold',
                }}>
                Addhar Number
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.addhar_no}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#2C2C2C',
                  fontFamily: 'Poppins-Bold',
                }}>
                State
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.state}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#2C2C2C',
                  fontFamily: 'Poppins-Bold',
                }}>
                Status
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.status == '1' ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const Box = ({items}) => {
    return (
      <View
        style={{
          borderRadius: 5,
          overflow: 'hidden',
          marginVertical: 5,
          marginVertical: 5,
          borderColor: '#f2f2f2',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          width: '95%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 16,
                color: '#2C2C2C',
                fontFamily: 'Poppins-Bold',
              }}>
              {moment(items.checkin_date).format('DD-MMM-YYYY')}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              // padding: 7,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Poppins-Bold',
                }}>
                Start Time
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Bold',
                  color: '#2C2C2C',
                }}>
                {moment(items.checkin_date).format('hh:mm A')}
              </Text>
            </View>
            {items.checkout_date ? (
              <>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    End Time
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Poppins-Bold',
                      color: '#2C2C2C',
                    }}>
                    {moment(items.checkout_date).format('hh:mm A')}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Poppins-Bold',
                    }}>
                    Working Hours
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Poppins-Bold',
                      color: '#2C2C2C',
                    }}>
                    {moment
                      .duration(
                        moment(items.checkout_date).diff(
                          moment(items.checkin_date),
                        ),
                      )
                      .asHours()}{' '}
                    Hrs
                  </Text>
                </View>
              </>
            ) : (
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Bold',
                  }}>
                  Status
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Poppins-Bold',
                    color: '#2C2C2C',
                  }}>
                  {items.current_status}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{width: width}}>
        {loader ? (
          <AnimatedLottieView
            source={require('../assets/Tally Buddy Loader.json')}
            autoPlay
            loop
            style={{height: 100, alignSelf: 'center', display: 'flex'}}
          />
        ) : (
          <>
            <Boxes item={employees} />
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins-Bold',
                  color: 'black',
                  padding: 7,
                }}>
                History
              </Text>

              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <MCI name={'filter'} size={16} color="black">
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Poppins-Bold',
                      color: 'black',
                    }}>
                    Sortby
                  </Text>
                </MCI>
              </TouchableOpacity>
            </View>
            <ScrollView style={{height: height * 0.55}}>
              <View style={{width: width, marginTop: 10}}>
                <FlatList
                  data={detail}
                  renderItem={({item}) => <Box items={item} />}
                  keyExtractor={item => item.id}
                />
              </View>
            </ScrollView>
          </>
        )}
      </View>
      <RBSheet
        ref={refRBSheet}
        height={300}
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
              }}>
              Sort by date range
            </Text>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: height * 0.02,
              }}>
              <TouchableOpacity onPress={() => showDatePicker()}>
                <Text label="Date" mode="outlined" editable={false}>
                  {moment(startDate || new Date()).format('DD-MMM-YYYY')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => showDatePicker2()}>
                <Text label="Date" mode="outlined" editable={false}>
                  {moment(endDate || new Date()).format('DD-MMM-YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-Bold',
                color: 'black',
                marginTop: height * 0.008,
              }}>
              Sort by
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton
                value="first"
                status={checked === '1' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked('1');
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Bold',
                  color: 'black',
                }}>
                Sort by maximum duration
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton
                value="second"
                status={checked === '2' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked('2');
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Bold',
                  color: 'black',
                }}>
                Sort by minimum duration
              </Text>
            </View>
          </View> */}
          {/* <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-Bold',
                color: 'black',
                marginTop: 10,
              }}>
              Call Type
            </Text>
          </View> */}
          {/* <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: height * 0.009,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-Bold',
                color: 'black',
              }}>
              Incoming
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins-Bold',
                color: 'black',
                marginLeft: width * 0.2,
              }}>
              Outgoing
            </Text>
          </View> */}
        </View>
      </RBSheet>
      {isDatePickerVisible && (
        <DateTimePicker
          value={startDate || new Date()}
          mode={'date'}
          display={'default'}
          is24Hour={true}
          onChange={onDateSelected}
        />
      )}
      {isDatePickerVisible2 && (
        <DateTimePicker
          value={endDate || new Date()}
          mode={'date'}
          display={'default'}
          is24Hour={true}
          onChange={onDateSelected2}
        />
      )}
    </View>
  );
}
