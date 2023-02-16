import {View, Dimensions, FlatList, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {height, width} = Dimensions.get('window');

export default function Main({navigation}) {
  const data = [
    {id: 1, type: 'Admin', source: require('../assets/ad.png'), number: 15},
    {id: 2, type: 'Vendor', source: require('../assets/store.png'), number: 26},
    {id: 3, type: 'Employee', source: require('../assets/emp.png'), number: 30},
    {id: 4, type: 'Driver', source: require('../assets/dri.png'), number: 20},
  ];

  const Boxes = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminDetails')}>
          <View style={{ alignItems: 'center', margin: 20}}>
            <View
              style={{
                height: 130,
                width: 150,
                backgroundColor: '#F1F1F1',
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
              <Text style={{color: '#2C2C2C', fontSize: 12}}>
                {item.number} {item.type}s{' '}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        margin: height * 0.001,
        backgroundColor: '#FFFFFF',
        height: '99.8%',
        justifyContent: 'space-between'
      }}>

      <View
        style={{
          height: '8%',
          width: '100%',
          backgroundColor: '#4171E1',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 5,
        }}>
        <Text style={{fontSize: 25, fontFamily: 'Montserrat'}}>
          Tally Buddy
        </Text>
        <Icon name={'more-vert'} size={30} />
      </View>

      <View style={{width: width}}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({item}) => <Boxes item={item} />}
          keyExtractor={item => item.id}
        />
      </View>

      <View
        style={{
          height: '8%',
          width: '100%',
          backgroundColor: '#4171E1',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/home.png')}
            style={{height: 18, width: 18, resizeMode: 'contain'}}
          />
          <Text>Home</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/user.png')}
            style={{height: 18, width: 18, resizeMode: 'contain'}}
          />
          <Text>Profile</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/setting.png')}
            style={{height: 18, width: 18, resizeMode: 'contain'}}
          />
          <Text>Setting</Text>
        </View>
      </View>
    </View>
  );
}
