import { useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import {TouchableOpacity} from 'react-native';


const {height, width} = Dimensions.get('window');

export default function Home({navigation}) {
  const data = [
    { id: 1, type: 'Admin', source: require('../assets/adminIcon.png'), route: 'Main'},
    {id: 2, type: 'Vendor', source: require('../assets/vendors.png'), route: 'AdminDetails' },
    {id: 3, type: 'Employee', source: require('../assets/employee.png')},
    {id: 4, type: 'Driver', source: require('../assets/employee.png')},
  ];

  const Boxes = ({item}) => {
    return (
      <View style={{flex: 1, margin: 10}}>
        <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
          <View style={{marginVertical: 10, alignItems: 'center'}}>
            <View
              style={{
                height: 125,
                width: '85%',
                borderWidth: 1,
                borderColor: '#4171E1',
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={item.source}
                style={{height: 40, width: 35, resizeMode: 'contain'}}
              />
              <Text
                style={{color: '#2C2C2C', fontSize: 20, fontWeight: 'bold'}}>
                {item.type}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  

  return (
    <View style={{margin: height * 0.001}}>
      <ImageBackground
        source={require('../assets/Mask.png')}
        style={{height: '100%', width: '100%'}}>
        <View style={{marginTop: 10, alignSelf: 'center'}}>
          <Image
            source={require('../assets/Icon.png')}
            style={{
              height: 100,
              width: 100,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <View style={{marginTop: '40%', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Montserrat',
                color: '#0A0A0A',
                fontSize: 20,
                fontWeight: 'bold',
                margin: 10,
              }}>
              Choose user type
            </Text>
            <View style={{width: width}}>
              <FlatList
                data={data}
                numColumns={2}
                renderItem={({item}) => <Boxes item={item} />}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
