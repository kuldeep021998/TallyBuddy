import {View, Dimensions, Text, FlatList, ScrollView} from 'react-native';
import {getData} from '../../connection/FetchServices';
import Input from '../../uicomponent/Input';
const {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

export default function BrandDetails({navigation}) {
  const [brands, setBrands] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchBrands = async () => {
    setLoader(true);
    var result = await getData('brand');
    if (result.status) {
      setBrands(result.data);
    }
    setLoader(false);
  };

  useEffect(function () {
    fetchBrands();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchBrands();
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
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.brand_name}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>category:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.category_id}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Discount</Text>
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
                  navigation.navigate('Edit Brands', {id: item.brand_id})
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
            data={brands}
            renderItem={({item}) => <Boxes item={item} />}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
}
