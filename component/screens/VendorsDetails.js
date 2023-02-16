/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {View, Dimensions, Image, Text, FlatList, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Input from '../uicomponents/Input';
const {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';

import {TouchableOpacity} from 'react-native';
// import { useState, useEffect } from 'react';
import {getData} from '../connection/FetchServices';

export default function VendorDetails({navigation}) {
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    var result = await getData('vendor');
    // console.log(result);
    setVendors(result.data);
    // console.log(setVendors);
  };

  useEffect(function () {
    fetchVendors();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchVendors();
    }, []),
  );

  //   const data = [
  //     {
  //       id: 1,
  //       type: 'Admin',
  //       source: require('../assets/boy.png'),
  //       name: 'Rohit Yaduvanshi',
  //       username: 'Rohit@12345',
  //       password: 'ry@354321',
  //       mobile: '+91 93002 38772',
  //       email: 'rohit32@gmail.com',
  //     },
  //   ];

  const Boxes = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          borderRadius: 10,
          overflow: 'hidden',
          marginVertical: 5,
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#24313F33',
            // opacity: 0.7,
            height: '100%',
            padding: 10,
            flexDirection: 'row',
            // justifyContent: 'space-between',
          }}>
          <View style={{marginTop: 5, width: '50%'}}>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>Firm Name:</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>
              {item.firm_name}
            </Text>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>Firm Type</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>
              {item.type_of_firm}
            </Text>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>GST:</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.gstno}</Text>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>Status:</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.status}</Text>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>Country:</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.country}</Text>
          </View>

          <View style={{marginTop: 4, width: '50%'}}>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>Mobile:</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>
              {item.mobileno}
            </Text>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>Email ID:</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.emailid}</Text>

            <Text style={{fontSize: 10, color: '#8E8E8E'}}>Adress:</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.address}</Text>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>City:</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.city}</Text>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>State:</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.state}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Edit Vendor', {id: item.vendors_id})
            }
            style={{
              backgroundColor: 'white',
              width: 30,
              height: 30,
              borderRadius: 50,
              margin: 10,
              position: 'absolute',
              right: 0,
              top: 0,
            }}>
            <Icon
              name={'edit'}
              size={20}
              style={{alignSelf: 'center', marginTop: 5}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{alignItems: 'center'}}>
        <Input placeholder="Search" iconName={'magnifying-glass'} />
        <View style={{width: width, marginTop: 10}}>
          <FlatList
            data={vendors}
            renderItem={({item}) => <Boxes item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
}
