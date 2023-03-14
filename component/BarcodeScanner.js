import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default function BarcodeScanner() {
  const onSuccess = async e => {
    try {
      // alert('done');
      console.log(e);
      await Linking.openURL(e.data);
    } catch (err) {
      console.log(err);
    }
  };

  const scanQrCode = () => {
    return (
      <QRCodeScanner
        onRead={e => onSuccess(e)}
        // flashMode={RNCamera.Constants.FlashMode.torch}
      />
    );
  };

  useEffect(function () {
    scanQrCode();
  }, []);

  return (
    <View>
      <View></View>
    </View>
  );
}
