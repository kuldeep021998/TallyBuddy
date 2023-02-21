import {
  View,
  Dimensions,
  Image,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Input from '../../uicomponent/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {getData} from '../../connection/FetchServices';

const {height, width} = Dimensions.get('window');

export default function VendorDetails({navigation}) {
  const [vendors, setVendors] = useState([]);
  const fetchVendors = async () => {
    var result = await getData('vendor');
    console.log(result);
    setVendors(result.data);
    console.log(setVendors);
  };

  useEffect(function () {
    fetchVendors();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchVendors();
    }, []),
  );

  const Boxes = ({item}) => {
    return (
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            margin: 5,
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#24313F33',
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: 10,
            }}>
            <View>
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
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.status}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Country:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.country}
              </Text>
            </View>

            <View style={{alignSelf: 'center'}}>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Mobile:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.mobileno}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Email ID:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.emailid}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Adress:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.address}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>City:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.city}</Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>State:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.state}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditVendors', {id: item.vendors_id})
                }
                style={{
                  backgroundColor: 'white',
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'edit'} size={20} color="black" />
              </TouchableOpacity>
            </View>
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
        <FlatList
          data={vendors}
          renderItem={({item}) => <Boxes item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}
