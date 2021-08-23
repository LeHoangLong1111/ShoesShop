import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {userLogin} from '../../apis/userLoginApi';
import {setAccessToken, getAccessToken} from '../../utils/storage';
import {useDispatch} from 'react-redux';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email không được bỏ trống')
    .email('Email không hợp lệ'),
  password: Yup.string()
    .min(6, 'Password Too Short!')
    .max(12, 'Password Too Long!')
    .required('Password không được bỏ trống'),
});

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const handleSubmitFormik = values => {
    userLogin(values)
      .then(async res => {
        if (res.data.statusCode === 200) {
          // console.log('handleSubmitFormik: ', res.data.content.accessToken);
          setAccessToken(res.data.content.accessToken);
          dispatch({
            type: 'SET_ACCESS_TOKEN',
            payload: res.data.content.accessToken,
          });
        }
      })
      .catch(err => console.log(err));
  };

  const handleSubmitFormik2 = values => {
    // console.log('handleSubmitFormik: ', values.accessToken);
    setAccessToken(values.accessToken);
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      payload: values.accessToken,
    });
  };

  useEffect(() => {}, []);

  const [isSecureEntry, setIsSecureEntry] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.loginForm}>
        <Image
          source={require('../../assets/pictures/icon.png')}
          style={styles.icon}
        />
        <Text style={styles.header1}>Welcome to</Text>
        <Text style={styles.header2}>BeeShoes</Text>
        <Formik
          validationSchema={loginSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={handleSubmitFormik}>
          {({values, handleSubmit, handleChange, errors}) => (
            <>
              <View style={styles.inputContainer}>
                {/* <Text>Email</Text> */}
                <TextInput
                  style={[styles.inputField, errors.email && styles.inputError]}
                  onChangeText={handleChange('email')}
                  placeholder="Email"
                  value={values.email}
                />

                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                {/* <Text>Password</Text> */}
                <View
                  style={[
                    styles.passwordContainer,
                    errors.password && styles.inputError,
                  ]}>
                  <TextInput
                    style={styles.inputField2}
                    placeholder="Password"
                    secureTextEntry={isSecureEntry}
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setIsSecureEntry(prev => !prev);
                    }}>
                    <Icon
                      style={styles.iconPassword}
                      name={isSecureEntry ? 'eye' : 'eyeo'}
                      size={22}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={handleSubmit}>
                <Text style={styles.login}>Sign in</Text>
              </TouchableOpacity>
              <View style={styles.viewJoin}>
                <Text>Not a member? </Text>
                <TouchableOpacity
                  onPress={() => navigation.push('SignupScreen')}>
                  <Text style={styles.textJoin}>Join now</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.zoneTextBefore}>
                <View style={styles.lineTextFace} />
                <View>
                  <Text> Or sign in with </Text>
                </View>
                <View style={styles.lineTextFace} />
              </View>
              <LoginButton
                style={styles.faceButton}
                onLoginFinished={(error, result) => {
                  if (error) {
                    console.log('login has error: ' + result.error);
                  } else if (result.isCancelled) {
                    console.log('login is cancelled.');
                  } else {
                    AccessToken.getCurrentAccessToken().then(data => {
                      // console.log(data);
                      handleSubmitFormik2(data);
                      // console.log(123);
                      // console.log('result:', result);
                    });
                  }
                }}
                // onLogoutFinished={() => console.log('logout.')}
              />
            </>
          )}
        </Formik>
        {/* <TouchableOpacity
          onPress={async () => {
            await getAccessToken();
            // await setAccessToken(null);
          }}>
          <Text>Get AccessToken</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loginForm: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 20,
  },
  header1: {
    paddingTop: 40,
    fontSize: 40,
    fontFamily: 'playfair',
  },
  header2: {
    // fontWeight: '100',
    color: '#faca3b',
    fontSize: 40,
    fontFamily: 'playfair',
    paddingBottom: 30,
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputField: {
    borderWidth: 1,
    padding: 18,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
  signInButton: {
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 18,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
  },

  viewJoin: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  textJoin: {
    color: '#faca3b',
    fontWeight: 'bold',
  },

  login: {
    color: 'white',
  },

  zoneTextBefore: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 10,
  },

  lineTextFace: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    opacity: 0.1,
  },

  faceButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 10,
  },

  passwordContainer: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },

  inputField2: {
    padding: 18,
    borderRadius: 10,
    // backgroundColor: '#f9f9f9',
    // backgroundColor: 'red',
    flex: 1,
  },

  iconPassword: {
    paddingTop: 22,
    paddingRight: 15,
  },
});

export default LoginScreen;
