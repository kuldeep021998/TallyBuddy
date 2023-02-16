import {View} from 'react-native';
import Home from './component/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './component/screens/Main';
import CreateAdmin from './component/screens/CreateAdmin';
import AdminDetails from './component/screens/AdminDetails';
import Login from './component/screens/Login';
import EditAdmin from './component/screens/EditAdmin';
import CreateEmployee from './component/screens/CreateEmployee';
import CreateVendor from './component/screens/CreateVendor';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={AdminDetails} name="AdminDetails" />
        <Stack.Screen component={EditAdmin} name="Edit" />
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={CreateAdmin} name="CreateAdmin" />
        <Stack.Screen component={Main} name="Main" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
