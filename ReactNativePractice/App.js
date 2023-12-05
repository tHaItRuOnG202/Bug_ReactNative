import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Register from './components/Register';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import { FontAwesome5 } from '@expo/vector-icons';
import MainScreen from './components/MainScreen';
import { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyUserReducer from "./reducers/MyUserReducer";
import { createContext } from 'react';
import Login from './components/Login';

export const MyUserContext = createContext();

const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NativeRouter>
//       <NativeBaseProvider>
//         <NavigationContainer>
//           <View style={styles.container}>
//             <Routes>
//               <Route exact path='/' element={<Login />} />
//               <Route path='/register' element={<Register />} />
//             </Routes>
//           </View>
//         </NavigationContainer>
//       </NativeBaseProvider>
//     </NativeRouter>
//   );
// }

export default function App() {
  const [user, dispatch] = useReducer(MyUserReducer, AsyncStorage.getItem("user") || null)
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <NativeBaseProvider>
        <NativeRouter>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Đăng nhập" component={Login} />
              <Stack.Screen name="Trang chủ" component={MainScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Đăng ký" component={Register} />
              <Stack.Screen
                name="IMPROOK SOCIAL"
                component={Home}
                options={{
                  headerTitleAlign: 'center',
                  headerTitleStyle: {
                    color: '#2e64e5',
                    fontSize: 18,
                  },
                  headerStyle: {
                    shadowColor: '#fff',
                    elevation: 0,
                  },
                  headerRight: () => (
                    <View style={{ marginRight: 10 }}>
                      <FontAwesome5.Button
                        name="plus"
                        size={22}
                        backgroundColor="#fff"
                        color="#2e64e5"
                      />
                    </View>
                  ),
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeRouter>
      </NativeBaseProvider>
    </MyUserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
