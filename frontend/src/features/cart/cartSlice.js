import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: null,
    loading: false,
    error: null,
    active: false,
  },

  reducers: {
    addProductToCartRequest: (state) => {
      state.loading = true;
    },
    addProductToCartRequestSuccess: (state, action) => {
      state.cartProducts = [...state.cartProducts, action.payload];
      state.loading = false;
      state.error = null;
    },
    addProductToCartRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeProductFromCart: (state, action) => {
      const updatedCartItems = state.cartProducts.filter(
        (product) => product.id !== action.payload
      );
      state.cartProducts = updatedCartItems;
    },
    updateProductToCart: (state, action) => {
      console.log(action.payload);
      const index = JSON.parse(localStorage.getItem('cartItems')).findIndex(
        (x) => x.id === action.payload.id
      );
      if (index >= 0) {
        console.log(index);
        const x = JSON.parse(localStorage.getItem('cartItems'));
        x[index] = { ...x[index], qty: action.payload.qty };
        state.cartProducts = x;
        localStorage.setItem('cartItems', JSON.stringify(x));
      }
    },
    addShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    choosePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    openCartItemsSidebar: (state) => {
      // alert('open clicked');
      state.active = true;
    },
    closeCartItemsSidebar: (state) => {
      state.active = false;
    },
    resetCartItems: (state) => {
      alert('reset cart items clicked');
      state.cartProducts = [];
      localStorage.setItem('cartItems', []);
    },
  },
});

export const {
  addProductToCartRequest,
  addProductToCartRequestSuccess,
  addProductToCartRequestFail,
  removeProductFromCart,
  updateProductToCart,
  addShippingAddress,
  choosePaymentMethod,
  openCartItemsSidebar,
  closeCartItemsSidebar,
  resetCartItems,
} = cartSlice.actions;

//----------- ASYNC logic And actions----------
export const addToCart = (product) => async (dispatch, getState) => {
  try {
    const productsFromLocaleStorage = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];

    const productExists = productsFromLocaleStorage.find(
      (x) => x.id === product.id
    );
    if (productExists) {
      console.log('product exists');
      dispatch(addProductToCartRequestFail('Product Exists'));
    } else {
      dispatch(addProductToCartRequest());
      dispatch(addProductToCartRequestSuccess(product));
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cartProducts.cartProducts)
      );
    }
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(addProductToCartRequestFail(err));
  }
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
  try {
    dispatch(removeProductFromCart(id));
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cartProducts.cartProducts)
    );
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(addProductToCartRequestFail(err));
  }
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(addShippingAddress(data));
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (method) => (dispatch) => {
  dispatch(choosePaymentMethod(method));
};

// ------------------------------------------------------
export const cartProducts = (state) => state.cartProducts;

export default cartSlice.reducer;
