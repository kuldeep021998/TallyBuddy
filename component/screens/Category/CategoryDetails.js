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
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

export default function CategoryDetails({navigation}) {
  const [stores, setStores] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchCategory = async () => {
    setLoader(true);
    var result = await getData('category');
    if (result.status) {
      setStores(result.data);
    }
    setLoader(false);
  };

  useEffect(function () {
    fetchCategory();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchCategory();
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
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Name:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.name}</Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Gst_Percent</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.gst_percent}
              </Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>hsn</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>{item.hsn}</Text>
              <Text style={{fontSize: 10, color: '#8E8E8E'}}>Status:</Text>
              <Text style={{color: '#2C2C2C', fontSize: 14}}>
                {item.status == '1' ? 'Active' : 'Inactive'}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Edit Category', {id: item.category_id})
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
        {loader ? (
          <AnimatedLottieView
            source={require('../assets/Tally Buddy Loader.json')}
            autoPlay
            loop
            style={{height: 100, alignSelf: 'center', display: 'flex'}}
          />
        ) : (
          <FlatList
            data={stores}
            renderItem={({item}) => <Boxes item={item} />}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
}
