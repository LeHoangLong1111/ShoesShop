import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {removeAccessToken} from '../../utils/storage';
import Svg, {Path} from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {fetchProductCategoryAction} from '../../redux/actions/productAction';
import {connect} from 'react-redux';

const HomeScreen = props => {
  const dispatch = useDispatch();

  const WIDTH = Dimensions.get('screen').width;

  const handleLogout = async () => {
    dispatch({type: 'LOGOUT'});
    await removeAccessToken(null);
  };

  const navigation = useNavigation();
  const {productReducer, fetchProductCategoryAction} = props;

  useEffect(() => {
    console.log('jello');
    fetchProductCategoryAction();
  }, []);

  const {category} = productReducer;

  console.log(category);

  return (
    <View>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="395.775"
          height="230.671"
          viewBox="0 0 395.775 230.671">
          <Path
            id="Path_2629"
            data-name="Path 2629"
            d="M1769.36-659.357h395.775v226.505s-39.065-34.376-118.93-33.335-131.517,37.5-200.532,37.5-76.311-42.271-76.311-42.271Z"
            transform="translate(-1769.36 659.357)"
            fill="black"
          />
        </Svg>
      </View>

      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.openDrawer()}>
        <Icon name="user" size={40} color="#fff" />
      </TouchableOpacity>
      <Text>----</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{color: 'red'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  fetchProductCategoryAction: () => dispatch(fetchProductCategoryAction()),
});

const mapStateToProps = state => ({
  productReducer: state.productReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
