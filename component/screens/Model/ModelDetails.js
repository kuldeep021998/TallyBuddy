/* eslint-disable react-native/no-inline-styles */
import {View, Dimensions, Text, FlatList, ScrollView} from 'react-native';
import {getData} from '../../connection/FetchServices';
import Input from '../../uicomponent/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

const {height, width} = Dimensions.get('window')

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
              backgroundColor: '#fff',
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: 10,
            }}>
            <View style={{marginTop: 5}}>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Name:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.name}</Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Brand Name:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.brand_id}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Brand Name:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.category_id}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Model No.</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.model_no}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Discount:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.discount}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Status</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.status == '1' ? 'Active' : 'Inactive'}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Edit Model', {id: item.model_id})
                }
                style={{
                  backgroundColor: '#F1F1F1',
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
      </View>
    </View>
  );
}
