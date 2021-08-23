import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, SignupScreen, HomeScreen, UserScreen} from '../screens';
import {getAccessToken} from '../utils/storage';
import {useDispatch, useSelector} from 'react-redux';
import {getAccessTokenSelector} from '../redux/selectors/loginSelector';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerRouter = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="UserScreen" component={UserScreen} />
    </Drawer.Navigator>
  );
};

const RootNavigation = () => {
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = useSelector(getAccessTokenSelector);
  const dispatch = useDispatch();
  // console.log(getAccessTokenSelector);

  useEffect(() => {
    const setAccessToken = async () => {
      const accessTokenStorage = await getAccessToken();
      if (accessTokenStorage) {
        setIsLogin(true);
        console.log('21: ', accessTokenStorage);
        dispatch({type: 'SET_ACCESS_TOKEN', payload: accessTokenStorage});
      }
    };
    setAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log('accessToken_now: ', accessToken);
    if (accessToken) {
      setIsLogin(true);
      // console.log('abc');
    } else {
      setIsLogin(false);
    }
  }, [accessToken]);

  // console.log(isLogin);

  return (
    <NavigationContainer>
      <Stack.Navigator
        // headerMode="none"
        // mode="modal"
        screenOptions={{
          headerShown: false,
          // headerStyle: {
          //   backgroundColor: '#f4511e',
          // },
          // headerTintColor: '#fff',
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          // },
        }}>
        {!isLogin ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </>
        ) : (
          <Stack.Screen name="HomeScreen" component={DrawerRouter} />
        )}
        <Stack.Screen name="UserScreen" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
