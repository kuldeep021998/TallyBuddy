/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import {getData, ServerURL} from '../../connection/FetchServices';
import AppButton from '../../uicomponent/AppButton';
import Input from '../../uicomponent/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import MCI from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');

export default function ProductDetails({navigation}) {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchProducts = async () => {
    setLoader(true);
    var result = await getData('product');
    if (result.status) {
      setProducts(result.data);
    }
    setLoader(false);
    console.log(result);

    console.log(setProducts);
  };

  useEffect(function () {
    fetchProducts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();
    }, []),
  );

  const Boxes = ({item}) => (
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 10,
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
        <View style={{marginTop: 5, width: '25%', alignSelf: 'center'}}>
          <Image
            source={{uri: `${ServerURL}/images/${item.picture}`}}
            style={{
              width: 120,
              height: 120,
              // resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{marginTop: 4, width: width * 0.45}}>
          <Text
            style={{
              fontSize: 10,
              color: '#8E8E8E',
              fontFamily: 'Poppins-Bold',
            }}>
            Category
          </Text>
          <Text
            style={{
              color: '#2C2C2C',
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
            }}>
            {item.category_name}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: '#8E8E8E',
              fontFamily: 'Poppins-Bold',
            }}>
            Brand
          </Text>
          <Text
            style={{
              color: '#2C2C2C',
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
            }}>
            {item.brand_name}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: '#8E8E8E',
              fontFamily: 'Poppins-Bold',
            }}>
            Model:
          </Text>
          <Text
            style={{
              color: '#2C2C2C',
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
            }}>
            {item.model_name}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: '#8E8E8E',
              fontFamily: 'Poppins-Bold',
            }}>
            Vendor:
          </Text>
          <Text
            style={{
              color: '#2C2C2C',
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
            }}>
            {item.vendor_name}
          </Text>
        </View>
        <View style={{marginTop: 4, width: '40%'}}>
          <Text
            style={{
              fontSize: 10,
              color: '#8E8E8E',
              fontFamily: 'Poppins-Bold',
            }}>
            Price:
          </Text>

          <Text
            style={{
              color: '#2C2C2C',
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
            }}>
            <MCI name="rupee">{item.costprice}</MCI>
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: '#8E8E8E',
              fontFamily: 'Poppins-Bold',
            }}>
            Sub Items
          </Text>
          <Text
            style={{
              color: '#2C2C2C',
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
            }}>
            {item.subitemscount}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: '#8E8E8E',
              fontFamily: 'Poppins-Bold',
            }}>
            Color
          </Text>
          <Text
            style={{
              color: '#2C2C2C',
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
            }}>
            {item.color}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Edit Product', {id: item.product_id})
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

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <Input placeholder="Search" iconName={'magnifying-glass'} />
          <View style={{width: width, marginTop: 10}}>
            {loader ? (
              <AnimatedLottieView
                source={require('../assets/Tally Buddy Loader.json')}
                autoPlay
                loop
                style={{height: 100, alignSelf: 'center', display: 'flex'}}
              />
            ) : (
              <FlatList
                data={products}
                renderItem={({item}) => <Boxes item={item} />}
                keyExtractor={item => item.id}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
