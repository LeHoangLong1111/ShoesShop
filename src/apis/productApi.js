import axios from 'axios';

export const fetchProductCategory = () => {
  return axios({
    url: 'http://svcy3.myclass.vn/api/Product/getAllCategory',
    method: 'GET',
  });
};
