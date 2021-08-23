import AsyncStorge from '@react-native-async-storage/async-storage';

export const setAccessToken = async value => {
  try {
    // AsyncStorge.clear();
    await AsyncStorge.setItem('accessToken', value);
    // console.log(value);
  } catch (error) {
    console.err(error);
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorge.getItem('accessToken');
    // console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.error(error);
  }
};

export const removeAccessToken = async () => {
  try {
    return await AsyncStorge.removeItem('accessToken');
  } catch (error) {
    console.error(error);
  }
};
