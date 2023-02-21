import {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
const {width, height} = Dimensions.get('window');

export default function Input({labelTxt, setValue, error, iconName, ...props}) {
  return (
    <View
      style={{
        padding: 2,
        width: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 5, fontWeight: 'bold'}}>{labelTxt}</Text>
      <View style={styles.textContainer}>
        <TextInput style={{fontSize: 14, marginLeft: 20}} {...props} />
        <Entypo
          name={iconName}
          style={{
            fontSize: 22,
            color: 'blue',
            marginTop: 10,
            marginRight: 20,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    width: width * 0.8,
    backgroundColor: '#bdc3c7',
    borderRadius: 10,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
  },
});
