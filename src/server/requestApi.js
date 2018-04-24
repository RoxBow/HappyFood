const qs = require('qs');

import accountApi from './dataServer';

const method = 'POST';

let dataUrl = accountApi;

const getProductBy = (type, value) => {
  let url;

  switch (type) {
    case 'category':
      url = 'https://api.foodfacts.com/ci/api/foodfacts/food_products_per_category';
      dataUrl.category = value;
      break;
    case 'searchTerm':
      url = 'https://api.foodfacts.com/ci/api/foodfacts/food_products_per_search_term';
      dataUrl.search_term = value;
      break;
    case 'productId':
      url = 'https://api.foodfacts.com/ci/api/foodfacts/food_product_detail_information';
      dataUrl.product_id = value;
      break;
    case 'upc':
      url = 'https://api.foodfacts.com/ci/api/foodfacts/food_find_product_by_upc';
      dataUrl.upc = value;
      break;
    default:
      console.error('Please enter a correct type / value');
  }

  const options = {
    method,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(dataUrl),
    url
  };

  axios(options).then(response => {
    return response;
  });
};

const getCategoryList = () => {
  const url = 'https://api.foodfacts.com/ci/api/foodfacts/food_categories';

  const options = {
    method,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(dataUrl),
    url
  };

  axios(options).then(response => {
    return response;
  });
};

const getSubCategoryList = () => {
  const url = 'https://api.foodfacts.com/ci/api/foodfacts/food_sub_categories';

  const options = {
    method,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(dataUrl),
    url
  };

  axios(options).then(response => {
    return response;
  });
};

export { getProductBy, getCategoryList, getSubCategoryList };