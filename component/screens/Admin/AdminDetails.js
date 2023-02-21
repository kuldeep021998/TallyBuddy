import {
  View,
  Dimensions,
  Image,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import {getData} from '../../connection/FetchServices';
import Input from '../../uicomponent/Input';
const {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

export default function AdminDetails({navigation}) {
  const [admins, setAdmins] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchAdmins = async () => {
    setLoader(true);
    var result = await getData('admins');
    console.log(result);
    if (result.status) {
      setAdmins(result.data);
    }
    setLoader(false);
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

  const Boxes = ({item}) => {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', margin: 5}}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#24313F33',
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: 10,
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
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.emailid}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditAdmin', {id: item.id})}
              style={{
                backgroundColor: 'white',
                width: 30,
                height: 30,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name={'edit'} size={20} color="black" />
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
      <Input placeholder="Search" iconName={'eye-with-line'} />
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
            data={admins}
            renderItem={({item}) => <Boxes item={item} />}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
}
