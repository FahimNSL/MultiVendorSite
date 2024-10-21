/*
 *
 * Navigation actions
 *
 */

import axios from 'axios';
import handleError from '../../utils/error';
import {
  TOGGLE_MENU,
  TOGGLE_CART,
  TOGGLE_BRAND,
  SEARCH_CHANGE,
  SUGGESTIONS_FETCH_REQUEST,
  SUGGESTIONS_CLEAR_REQUEST
} from './constants';
import { REACT_APP_API_URL } from '../../constants';

export const toggleMenu = () => {
  return {
    type: TOGGLE_MENU
  };
};

export const toggleCart = () => {
  return {
    type: TOGGLE_CART
  };
};

export const toggleBrand = () => {
  return {
    type: TOGGLE_BRAND
  };
};

export const onSearch = v => {
  return {
    type: SEARCH_CHANGE,
    payload: v
  };
};

// export const onSuggestionsFetchRequested = value => {
//   const inputValue = value.value.trim().toLowerCase();

//   return async (dispatch, getState) => {
//     try {
//       if (inputValue && inputValue.length % 3 === 0) {
//         const response = await axios.get(
//           `${REACT_APP_API_URL}/product/list/search/${inputValue}`
//         );
//         console.log("Brands", response.data.products);
//         dispatch({
//           type: SUGGESTIONS_FETCH_REQUEST,
//           payload: response.data.products
//         });
//       }
//     } catch (error) {
//       handleError(error, dispatch);
//     }
//   };
// };

// Update the onSuggestionsFetchRequested action in client
export const onSuggestionsFetchRequested = value => {
  const inputValue = value.value.trim().toLowerCase();

  return async (dispatch, getState) => {
    try {
      if (inputValue && inputValue.length % 1 === 0) {
        const response = await axios.get(
          `${REACT_APP_API_URL}/product/search/${inputValue}`
        );

        const { products, brands, categories } = response.data;

        // Combine results into a single array for display
        const combinedResults = [
          ...products.map(product => ({ ...product, type: 'Product' })),
          ...brands.map(brand => ({ ...brand, type: 'Brand' })),
          ...categories.map(category => ({ ...category, type: 'Category' }))
        ];

        dispatch({
          type: SUGGESTIONS_FETCH_REQUEST,
          payload: combinedResults
        });
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};


export const onSuggestionsClearRequested = () => {
  return {
    type: SUGGESTIONS_CLEAR_REQUEST,
    payload: []
  };
};
