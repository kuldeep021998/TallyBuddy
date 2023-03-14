import React, {useState, useEffect} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {getData} from './connection/FetchServices';
import {ScrollView} from 'react-native';

export default function Barcode() {
  const [msg, setMsg] = useState([{data: '1234', mode: 'ab@gmail.com'}]);
  const [list, setList] = useState([]);

  const fetchProducts = async () => {
    var result = await getData('product');
    if (result.status) {
      setList(result.data);
    }
  };

  useEffect(function () {
    fetchProducts();
  }, []);

  return (
    <View style={{flex: 1}}>
      <TextInput
        placeholder="type any msg"
        onChangeText={txt => {
          if (txt == '') {
            setMsg('NA');
          } else {
            setMsg(txt);
          }
        }}
        value={msg}
        style={{
          width: '90%',
          marginTop: 50,
          height: 50,
          borderRadius: 20,
          alignSelf: 'center',
          paddingLeft: 30,
          borderWidth: 0.5,
        }}
      />
      <TouchableOpacity
        style={{
          borderRadius: 20,
          alignSelf: 'center',
          marginTop: 50,
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}> Generate QR Code</Text>
      </TouchableOpacity>

      {/* <ScrollView style={{flex: 1}}>
        {list.map(item => (
          <View style={{alignItems: 'center', marginTop: 50}}>
            <Text>{item.product_id}</Text>
            <QRCode
              value={item}
              color="white"
              backgroundColor="black"
              borderWidth="10%"
              size={200}
              enableLinearGradient={true}
              linearGradient={['rgb(255, 0, 0)', 'rgb(0, 255, 255)']}
            />
          </View>
        ))}
      </ScrollView> */}

      <ScrollView style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <FlatList
            data={list}
            renderItem={({item}) =><View style={{margin: 10}}><QRCode value={item.product_id.toString()} /></View>}
            keyExtractor={item => item.product_id}
            // style={{margin: 10}}
          />
        </View>
      </ScrollView>
    </View>
  );
}
