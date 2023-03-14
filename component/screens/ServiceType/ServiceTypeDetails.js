import {View, Dimensions, Text, FlatList, ScrollView} from 'react-native';
import {getData} from '../../connection/FetchServices';
import Input from '../../uicomponent/Input';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

export default function ServiceTypeDetails({navigation}) {
  const [banks, setBanks] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchBanks = async () => {
    setLoader(true);
    var result = await getData('typesofservice');
    if (result.status) {
      setBanks(result.data);
    }
    setLoader(false);
  };

  useEffect(function () {
    fetchBanks();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchBanks();
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
            {/* <View
              style={{
                marginTop: 5,
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/user.png')}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}
              />
            </View> */}
            <View>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Name:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.name}</Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Service Charge:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.servicecharge}</Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Status</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.status == '1' ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Edit Service Type', {id: item.typesofservice_id})
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
            data={banks}
            renderItem={({item}) => <Boxes item={item} />}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
}
