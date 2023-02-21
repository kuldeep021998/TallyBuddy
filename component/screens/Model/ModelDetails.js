/* eslint-disable react-native/no-inline-styles */
import {View, Dimensions, Text, FlatList, ScrollView} from 'react-native';
import {getData} from '../../connection/FetchServices';
import Input from '../../uicomponent/Input';
const {width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

export default function ModelDetails({navigation}) {
  const [models, setModels] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchModels = async () => {
    setLoader(true);
    var result = await getData('model');
    if (result.status) {
      setModels(result.data);
    }
    setLoader(false);
  };

  useEffect(function () {
    fetchModels();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchModels();
    }, []),
  );

  const Boxes = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          borderRadius: 5,
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
          <View
            style={{
              marginTop: 5,
              justifyContent: 'center',
            }}>
            {/* <Image
                source={require('../assets/user.png')}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                }}
              /> */}
          </View>
          <View style={{marginTop: 5}}>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>Name:</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.name}</Text>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>Model No.</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>
              {item.model_no}
            </Text>
            <Text style={{fontSize: 10, color: '#8E8E8E'}}>Status</Text>
            <Text style={{color: '#2C2C2C', fontSize: 14}}>
              {item.status == '1' ? 'Active' : 'Inactive'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditModel', {id: item.brand_id})
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
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Input placeholder="Search" iconName={'magnifying-glass'} />
        <View style={{width: width, marginTop: 10}}>
          <ScrollView style={{display: 'flex'}}>
            {loader ? (
              <AnimatedLottieView
                source={require('../assets/Tally Buddy Loader.json')}
                autoPlay
                loop
                style={{height: 100, alignSelf: 'center', display: 'flex'}}
              />
            ) : (
              <FlatList
                data={models}
                renderItem={({item}) => <Boxes item={item} />}
                keyExtractor={item => item.id}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
