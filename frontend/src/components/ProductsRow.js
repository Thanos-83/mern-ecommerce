import React from 'react';
import './ProductsRow.css';
import Product from './Product';
import { useSelector } from 'react-redux';
import { productsList } from '../features/products/productsSlice';
import { CircularProgress } from '@material-ui/core';
function ProductsRow({ title, products }) {
  const { loading } = useSelector(productsList);
  console.log('Products Row: ', products);
  return (
    <div className='productsRow'>
      <h2>{title}</h2>
      {loading ? (
        <p>
          <CircularProgress />
        </p>
      ) : (
        <div className='productsRow__product'>
          {products?.map((product) => (
            <Product key={product._id} productInfo={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsRow;
