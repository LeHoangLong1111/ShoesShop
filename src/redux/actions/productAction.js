import {fetchProductCategory} from '../../apis/productApi';

export const FETCH_PRODUCT_CATEGORY_SUCCESS = 'FETCH_PRODUCT_CATEGORY_SUCCESS';
export const FETCH_PRODUCT_CATEGORY_FAILED = 'FETCH_PRODUCT_CATEGORY_FAILED';

export const fetchProductCategorySuccess = payload => ({
  type: FETCH_PRODUCT_CATEGORY_SUCCESS,
  payload,
});

export const fetchProductCategoryFailed = () => ({
  type: FETCH_PRODUCT_CATEGORY_FAILED,
});

export const fetchProductCategoryAction = () => {
  return dispatch => {
    fetchProductCategory()
      .then(res => {
        console.log(res);
        dispatch(fetchProductCategorySuccess);
      })
      .catch(() => dispatch(fetchProductCategoryFailed));
  };
};