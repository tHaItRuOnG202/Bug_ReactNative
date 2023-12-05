import { Fragment } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Button, Text, View } from "react-native";
import { Link } from "react-router-native";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import { MaterialIcons } from "@expo/vector-icons";

const Register = ({ navigation }) => {
    return (
        <Fragment>
            <View style={styles.container}>
                <Image source={require('../images/IMPROOK.png')} style={styles.logo} />
                <Text style={styles.text}>TẠO TÀI KHOẢN MỚI</Text>
                <View>
                    <View style={styles.inputView}>
                        <MaterialIcons name="person" size={24} color="black" style={styles.icon} />
                        <TextInput style={styles.input} placeholder="Tên người dùng" numberOfLines={1} />
                    </View>
                    <View style={styles.inputView}>
                        <MaterialIcons name="https" size={24} color="black" style={styles.icon} />
                        <TextInput style={styles.input} placeholder="Mật khẩu" numberOfLines={1} />
                    </View>
                    <View style={styles.inputView}>
                        <MaterialIcons name="https" size={24} color="black" style={styles.icon} />
                        <TextInput style={styles.input} placeholder="Xác nhận mật khẩu" numberOfLines={1} />
                    </View>
                    <Link to="/login">
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Đăng ký</Text>
                        </TouchableOpacity>
                    </Link>
                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            Bằng việc đăng ký, bạn đã đồng ý với IMPROOK về{' '}
                        </Text>
                        <TouchableOpacity onPress={() => alert('Điều khoản dịch vụ')}>
                            <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                                Điều khoản dịch vụ
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.color_textPrivate}> & </Text>
                        <TouchableOpacity onPress={() => alert('Chính sách bảo mật')}>
                            <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                                Chính sách bảo mật
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.forgotButton}>
                        <Text style={styles.navButtonText}>Bạn đã có tài khoản ư?</Text>
                    </TouchableOpacity>
                    <Link to="/register">
                        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Đăng nhập')}>
                            <Text style={styles.buttonRegisterText}>Đăng nhập ngay</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 200,
        width: 200,
        resizeMode: 'stretch',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    inputView: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: windowHeight / 15,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
        textAlign: 'center'
    },
    forgotButton: {
        marginVertical: 25,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        textAlign: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    buttonRegister: {
        marginBottom: 20,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2e64e5'
    },
    buttonRegisterText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        textAlign: 'center'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 15,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        color: 'grey',
    },
});

export default Register;