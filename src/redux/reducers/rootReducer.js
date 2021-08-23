// eslint-disable-next-line prettier/prettier
import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  loginReducer,
  productReducer,
});

export default rootReducer;
