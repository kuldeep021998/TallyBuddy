import {
  View,
  Dimensions,
  Image,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import {getData} from '../connection/FetchServices';
import Input from '../uicomponent/Input';
const {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export default function AdminDetails({navigation}) {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    var result = await getData('admins');
    console.log(result);
    setAdmins(result.data);
    console.log(setAdmins);
  };

  useEffect(function () {
    fetchAdmins();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchAdmins();
    }, []),
  );

  const data = [
    {
      id: 1,
      type: 'Admin',
      source: require('../assets/ad.png'),
      name: 'Kuldeep Sikarwar',
      username: 'kuldeep03',
      password: 1234,
      mobile: 7415170875,
      email: 'ks@gmail.com',
    },
  ];

  const Boxes = ({item}) => {
    return (
      <View style={{flex: 1, alignItems: 'center', margin: 5}}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#24313F33',
            margin: 10,
            height: '100%',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../assets/user.png')}
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
            />
            <Text>{item.name}</Text>
          </View>
          <View>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>Username:</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>
              {item.username}
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
            <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.emailid}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Edit', {id: item.id})}
            style={{
              backgroundColor: 'white',
              width: 30,
              height: 30,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Icon
              name={'edit'}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{margin: height * 0.001}}>
      <View style={{alignItems: 'center'}}>
        <Input placeholder="Search" iconName={'eye-with-line'} />
        <View style={{width: width, marginTop: 40}}>
          <ScrollView style={{display: 'flex'}}>
            <FlatList
              data={admins}
              renderItem={({item}) => <Boxes item={item} />}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
