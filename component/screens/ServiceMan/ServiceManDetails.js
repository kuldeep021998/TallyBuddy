import {
  View,
  Dimensions,
  Image,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import {getData, ServerURL} from '../../connection/FetchServices';
import Input from '../../uicomponent/Input';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

export default function ServiceManDetails({navigation}) {
  const [serviceMans, setServiceMans] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchServiceMan = async () => {
    setLoader(true);
    var result = await getData('serviceman');
    if (result.status) {
      setServiceMans(result.data);
    }
    setLoader(false);
  };

  useEffect(function () {
    fetchServiceMan();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchServiceMan();
    }, []),
  );

  const Boxes = ({item}) => {
    return (
      <ScrollView style={{flex: 1}}>
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
            <View style={{marginTop: 5, width: '29%'}}>
              <Image
                source={{uri: `${ServerURL}/images/${item.picture}`}}
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
              />
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  // alignSelf: 'auto',
                  // marginLeft: 15,\
                  alignSelf: 'center',
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.name}
              </Text>
            </View>
            <View style={{marginTop: 4, width: '45%'}}>
              <Text
                style={{
                  fontSize: 10,
                  color: '#8E8E8E',
                  fontFamily: 'Poppins-Bold',
                }}>
                Email
              </Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.emailid}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: '#8E8E8E',
                  fontFamily: 'Poppins-Bold',
                }}>
                Mobile
              </Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.mobileno}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: '#8E8E8E',
                  fontFamily: 'Poppins-Bold',
                }}>
                Address
              </Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.address}
              </Text>
            </View>
            <View style={{marginTop: 4, width: '50%'}}>
              <Text
                style={{
                  fontSize: 10,
                  color: '#8E8E8E',
                  fontFamily: 'Poppins-Bold',
                }}>
                Aadhar No:
              </Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.addhar_no}
              </Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                  fontSize: 10,
                  color: '#8E8E8E',
                  fontFamily: 'Poppins-Bold',
                }}>
                Service Area
              </Text>
              <Text
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.servicearea}
              </Text>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={{
                  fontSize: 10,
                  color: '#8E8E8E',
                  fontFamily: 'Poppins-Bold',
                }}>
                Status
              </Text>
              <Text
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                }}>
                {item.status}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Edit Service Man', {
                  id: item.serviceman_id,
                })
              }
              style={{
                // backgroundColor: 'white',
                width: 30,
                height: 30,
                borderRadius: 50,
                // margin: 10,
                position: 'absolute',
                right: 0,
                top: 0,
              }}>
              <Icon
                name={'edit'}
                size={20}
                style={{alignSelf: 'center', marginTop: 5, color: '#2C2C2C'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View
      style={{
        margin: height * 0.001,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
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
            data={serviceMans}
            renderItem={({item}) => <Boxes item={item} />}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
}
