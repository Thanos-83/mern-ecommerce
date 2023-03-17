import React from 'react';
import './Product.css';
// import Rating from './Rating';
import { CompareArrows, Visibility, FavoriteBorder } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { addToCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { Rating } from '@mui/material';
function Product({ productInfo }) {
  const dispatch = useDispatch();
  const addToCartHandle = () => {
    const payload = {
      id: productInfo._id,
      name: productInfo.name,
      image: productInfo.image,
      price: productInfo.price,
      qty: 1,
    };

    dispatch(addToCart(payload));
  };
  return (
    <div className='product shadow-lg'>
      <div className='product__infoUp'>
        <div className='product__image'>
          <img src={`${productInfo.image}`} alt='product' />
        </div>
        <div className='product__labels'>
          <span className='product__sales'>-25%</span>
          <span className='product__new'>New</span>
        </div>
        <div className='product__icons'>
          <div className='product__wishList' data-tool-tip='Add to wishlist'>
            <FavoriteBorder />
          </div>
          <div className='product__quickView' data-tool-tip='Quick view'>
            <Visibility />
          </div>
          <div className='product__compare' data-tool-tip='Compare'>
            <CompareArrows />
          </div>
        </div>
        <button
          onClick={addToCartHandle}
          className='product__btn'
          disabled={productInfo.countInStock === 0 && true}>
          {productInfo.countInStock === 0 ? 'Out Of Stock' : 'Add To Cart'}
        </button>
      </div>
      <div className='product__infoDown'>
        <div className='product__title'>
          <Link to={`/product/${productInfo._id}`}>
            <h4>{productInfo.name}</h4>
          </Link>
        </div>
        <div className='product__priceRating'>
          <p className='product__price'>$ {productInfo.price}</p>
          <p className='product__rating'>
            <Rating name='product rating' value={productInfo.rating} readOnly />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Product;
