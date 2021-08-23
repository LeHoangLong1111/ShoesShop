import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {userSignUp} from '../../apis/userLoginApi';
import Icon from 'react-native-vector-icons/AntDesign';
import {Formik} from 'formik';
import * as Yup from 'yup';
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
  name: Yup.string().required('Name không được bỏ trống'),
});

const handleSubmitFormik = values => {
  const data = {...values, gender: true, phone: '0937054445'};
  userSignUp(data)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
};

const SignupScreen = ({navigation}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const dispatch = useDispatch();

  const handleSubmitFormik2 = values => {
    // console.log('handleSubmitFormik: ', values.accessToken);
    setAccessToken(values.accessToken);
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      payload: values.accessToken,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginForm}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.push('LoginScreen')}>
          <Icon style={styles.iconBack} name="back" size={40} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header1}>Create a new account</Text>
        <Formik
          validationSchema={loginSchema}
          initialValues={{email: '', password: '', name: ''}}
          onSubmit={handleSubmitFormik}>
          {({values, handleSubmit, handleChange, errors}) => (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.inputField, errors.name && styles.inputError]}
                  onChangeText={handleChange('name')}
                  placeholder="Full name"
                  value={values.name}
                />

                {errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
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
                style={styles.signUpButton}
                onPress={handleSubmit}>
                <Text style={styles.signUp}>Register Now</Text>
              </TouchableOpacity>
              <View style={styles.viewRegister}>
                <Text>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.push('LoginScreen')}>
                  <Text style={styles.textRegister}>Sign in</Text>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonBack: {paddingTop: 10},
  iconBack: {
    borderWidth: 1,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: 'black',
  },
  header1: {
    paddingTop: 40,
    fontSize: 40,
    fontFamily: 'playfair',
    paddingBottom: 10,
  },
  loginForm: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  signUpButton: {
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 18,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 10,
  },
  signUp: {
    color: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  inputField2: {
    padding: 18,
    borderRadius: 10,
    flex: 1,
  },
  iconPassword: {
    paddingTop: 22,
    paddingRight: 15,
  },
  viewRegister: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  textRegister: {
    color: '#faca3b',
    fontWeight: 'bold',
  },
  zoneTextBefore: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
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
});

export default SignupScreen;
