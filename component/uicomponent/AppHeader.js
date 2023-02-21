import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AppHeader(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(props.route)}>
      <Icon name={'add'} size={30} color="white" />
    </TouchableOpacity>
  );
}
