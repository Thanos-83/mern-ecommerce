import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import productDetailsReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';
import userLoginReducer from '../features/user/userLoginSlice';
import userRegisterReducer from '../features/user/userRegisterSlice';
import userDetailsReducer from '../features/user/userDetails';
import userUpdateProfileReducer from '../features/user/userUpdateProfileSlice';
import createOrderReducer from '../features/orders/createOrderSlice';
import orderDetailsReducer from '../features/orders/orderDetailsSlice';
import orderPayReducer from '../features/orders/orderPaySlice';
import myOrdersReducer from '../features/orders/getOrdersSlice';
import createProductReducer from '../features/products/createProductSlice';
import editProductReducer from '../features/products/editProductSlice';
import deleteProductReducer from '../features/products/deleteProductSlice';
import createCategoryReducer from '../features/categories/createCategorySlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import createProductReviewReducer from '../features/products/createProductReviewSlice';

export default configureStore({
  reducer: {
    productsList: productsReducer,
    productDetails: productDetailsReducer,
    createProduct: createProductReducer,
    editProduct: editProductReducer,
    productReviews: createProductReviewReducer,
    deleteProduct: deleteProductReducer,
    cartProducts: cartReducer,
    createCategory: createCategoryReducer,
    categoriesList: categoriesReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    createOrder: createOrderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrders: myOrdersReducer,
  },
});
