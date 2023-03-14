import {View, Dimensions, FlatList, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {height, width} = Dimensions.get('window');

export default function Main({navigation}) {
  const data = [
    {
      id: 1,
      type: 'Admins',
      source: require('./assets/ad.png'),
      number: 15,
      route: 'Admins',
    },
    {
      id: 2,
      type: 'Vendors',
      source: require('./assets/vendor.png'),
      number: 26,
      route: 'Vendor Details',
    },
    {
      id: 3,
      type: 'Employees',
      source: require('./assets/emp.png'),
      number: 30,
      route: 'Employee Details',
    },
    {
      id: 4,
      type: 'Attendance',
      source: require('./assets/emp.png'),
      number: 30,
      route: 'Employee Attendance',
    },
    {
      id: 5,
      type: 'Employee Available',
      source: require('./assets/emp.png'),
      number: 30,
      route: 'Employee Available',
    },
    {
      id: 6,
      type: 'Category',
      source: require('./assets/category.png'),
      number: 20,
      route: 'Category Details',
    },
    {
      id: 7,
      type: 'Store',
      source: require('./assets/store.png'),
      number: 20,
      route: 'Store Details',
    },
    {
      id: 8,
      type: 'Banks',
      source: require('./assets/Bank.png'),
      number: 20,
      route: 'Bank Details',
    },
    {
      id: 9,
      type: 'Brands',
      source: require('./assets/brand.png'),
      number: 20,
      route: 'Brand Details',
    },
    {
      id: 10,
      type: 'Model',
      source: require('./assets/model.png'),
      number: 20,
      route: 'Model Details',
    },
    {
      id: 11,
      type: 'Type of Service',
      source: require('./assets/model.png'),
      number: 20,
      route: 'Service Type Details',
    },
    {
      id: 12,
      type: 'Products',
      source: require('./assets/model.png'),
      number: 20,
      route: 'Create Product',
    },
    {
      id: 12,
      type: 'ServiceMan',
      source: require('./assets/model.png'),
      number: 20,
      route: 'Service Man Details',
    },
  ];

  const Boxes = ({item}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
          <View style={{alignItems: 'center', margin: 20}}>
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
                {item.number} {item.type}
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

      <View style={{justifyContent: 'space-between', height: '92%'}}>
        <ScrollView>
          <View style={{width: width}}>
            <FlatList
              data={data}
              numColumns={2}
              renderItem={({item}) => <Boxes item={item} />}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>

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
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image
                source={require('./assets/home.png')}
                style={{
                  height: 18,
                  width: 18,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
              <Text>Home</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity>
              <Image
                source={require('./assets/user.png')}
                style={{
                  height: 18,
                  width: 18,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
              <Text>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity>
              <Image
                source={require('./assets/setting.png')}
                style={{
                  height: 18,
                  width: 18,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />
              <Text>Setting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
