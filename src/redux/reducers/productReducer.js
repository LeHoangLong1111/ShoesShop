import {FETCH_PRODUCT_CATEGORY_SUCCESS} from '../actions/productAction';

const initialState = {
  category: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_CATEGORY_SUCCESS:
      //   state.category = action.payload;
      console.log(action.payload);
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
