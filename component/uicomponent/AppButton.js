import { Text, TouchableOpacity, View, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

export default function AppButton({ buttonText, btnWidth, bgColor, ...props }) {
    return (
        <TouchableOpacity {...props}>
            <View style={{
                width: width * (btnWidth ? btnWidth : 1),
                backgroundColor: bgColor ? bgColor : '#3498db',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: bgColor,
                marginTop: 20,
                display: 'flex',
                alignItems: 'center',
            }} >
                <Text style={{ color: '#fff', fontSize: 14 , margin: 8, padding: 5 }} > {buttonText}</Text>
            </View >
        </TouchableOpacity >
    )
}