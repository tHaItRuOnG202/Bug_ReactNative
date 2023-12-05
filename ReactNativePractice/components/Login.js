import { MaterialIcons } from "@expo/vector-icons";
import { Fragment } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { Link } from "react-router-native";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import Apis, { endpoints } from "../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
// import { useContext } from "react";
// import { MyUserContext } from "../App";

const Login = ({ navigation }) => {
    // const [user, dispatch] = useContext(MyUserContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // const login = (evt) => {
    //     evt.preventDefault();

    //     const process = async () => {
    //         try {
    //             setLoading(true);
    //             let res = await Apis.post(endpoints['login'], {
    //                 "username": username.trim(),
    //                 "password": password
    //             });

    //             const token = res.data

    //             await AsyncStorage.setItem('token', token);

    //             console.log(res.data)
    //             // await AsyncStorage.getItem('token')

    //             let { data } = await authApi().get(endpoints['current-user']);
    //             // const user = data;
    //             await AsyncStorage.setItem('user', JSON.stringify(data));

    //             dispatch({
    //                 "type": "login",
    //                 "payload": data
    //             });
    //             if (res.status === 200) {
    //                 navigation.navigate('Trang chủ');
    //             }
    //             setLoading(false)
    //         } catch (err) {
    //             console.error(err);
    //             console.log(err.config.headers);;
    //             setLoading(false);
    //         }
    //     }
    //     process();
    // }

    // const login = (evt) => {
    //     evt.preventDefault();

    //     const process = async () => {
    //         try {
    //             setLoading(true);
    //             let res = await Apis.post(endpoints['login'], {
    //                 "username": username.trim(),
    //                 "password": password
    //             });

    //             const token = res.data;
    //             await AsyncStorage.setItem('token', res.data);

    //             console.log(res.data);

    //             const storedToken = await AsyncStorage.getItem('token');
    //             if (res.data) {
    //                 console.log("Có token:", res.data);
    //             } else {
    //                 console.log("Không có token");
    //             }

    //             let { data } = await authApi().get(endpoints['current-user']);
    //             await AsyncStorage.setItem('user', JSON.stringify(data));

    //             dispatch({
    //                 "type": "login",
    //                 "payload": data
    //             });
    //             if (res.status === 200) {
    //                 navigation.navigate('Trang chủ');
    //             }
    //             setLoading(false);
    //         } catch (err) {
    //             console.error(err);
    //             setLoading(false);
    //         }
    //     };
    //     process();
    // };

    // const login = async (evt) => {
    //     evt.preventDefault();

    //     try {
    //         setLoading(true);

    //         const response = await fetch('http://localhost:2024//IMPROOK_CARE/api/public/login/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 username: username.trim(),
    //                 password: password,
    //             }),
    //         });

    //         const data = await response.json();

    //         if (response.status === 200) {
    //             const token = response.data;
    //             await AsyncStorage.setItem('token', token);
    //             console.log("Đăng nhập thành công");
    //         } else {
    //             console.log("Đăng nhập thất bại");
    //         }

    //         setLoading(false);
    //     } catch (error) {
    //         console.error(error);
    //         setLoading(false);
    //     }
    // };

    // const login = async (evt) => {
    //     evt.preventDefault();

    //     const process = async () => {
    //         try {
    //             setLoading(true);

    //             const response = await fetch('http://localhost:2024/IMPROOK_CARE/api/public/login/', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     username: username.trim(),
    //                     password: password,
    //                 }),
    //             });

    //             const token = await response.data; // Sử dụng response.text() để lấy dữ liệu chuỗi từ phản hồi

    //             if (response.status === 200) {
    //                 await AsyncStorage.setItem('token', token);
    //                 console.log("Đăng nhập thành công");
    //             } else {
    //                 console.log("Đăng nhập thất bại");
    //             }
    //             setLoading(false);
    //         } catch (error) {
    //             console.error(error);
    //             setLoading(false);
    //         }
    //     }
    //     process();
    // };


    // const login = async () => {
    //     try {
    //         const res = await fetch('http://localhost:2024/IMPROOK_CARE/api/public/login/', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 username: 'hieu',
    //                 password: '123',
    //             }),
    //         })

    //         if (res.status === 200) {
    //             console.log('Đăng nhập thành công', res.data);
    //             navigation.navigate('Trang chủ')
    //         } else {
    //             console.log('Đăng nhập thất bại');
    //         }
    //     } catch (error) {
    //         console.log('Lỗi mạng', error);
    //     }
    // };

    const login = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/roles/');
            const data = await res.data;
            const response = await res.json();

            console.log(data);
            console.log(response);

            // if (res.status === 200) {
            //     console.log('Đăng nhập thành công', data, response);
            //     navigation.navigate('Trang chủ')
            // } else {
            //     console.log('Đăng nhập thất bại');
            // }
        } catch (error) {
            console.log('Lỗi mạng', error);
        }
    };

    return (
        <Fragment>
            <View style={styles.container}>
                <Image source={require('../images/IMPROOK.png')} style={styles.logo} />
                <Text style={styles.text}>IM'PROOK SOCIAL APP</Text>
                <View>
                    <View style={styles.inputView}>
                        <MaterialIcons name="person" size={24} color="black" style={styles.icon} />
                        <TextInput style={styles.input}
                            placeholder="Tên người dùng"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                            numberOfLines={1} />
                    </View>
                    <View style={styles.inputView}>
                        <MaterialIcons name="https" size={24} color="black" style={styles.icon} />
                        <TextInput style={styles.input}
                            placeholder="Mật khẩu"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            numberOfLines={1}
                            secureTextEntry />
                    </View>
                    <Link to="/register">
                        <TouchableOpacity style={styles.buttonContainer} onPress={login}>
                            <Text style={styles.buttonText}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity style={styles.forgotButton}>
                        <Text style={styles.navButtonText}>Bạn quên mật khẩu ư?</Text>
                    </TouchableOpacity>
                    <Link to="/register">
                        <TouchableOpacity style={styles.buttonRegister}>
                            <Text style={styles.buttonRegisterText}>Đăng ký tài khoản mới</Text>
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
        marginTop: 20,
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
    }
});

export default Login;