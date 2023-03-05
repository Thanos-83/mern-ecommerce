import React, { useEffect } from 'react';
import './Products.css';
import {
  listProducts,
  productsList,
} from '../../../../features/products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import TableRow from './TableRow';
import {
  deleteProduct,
  deleteProductReset,
} from '../../../../features/products/deleteProductSlice';

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector(productsList);
  // const { success } = useSelector((state) => state.deleteProduct);
  // console.log(products);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete the product?')) {
      dispatch(deleteProduct(id));
      dispatch(deleteProductReset());
    }
  };
  return (
    <div className='products'>
      <div className='products__header'>
        <h2>All Products</h2>
        <Button variant='outlined' size='small'>
          <Link to='/dashboard/products/add'>Add Product</Link>
        </Button>
      </div>
      <div className='products__table'>
        <table>
          <thead>
            <tr>
              <th scope='col'>Image</th>
              <th scope='col'>Name</th>
              <th scope='col'>Brand</th>
              <th scope='col'>Price</th>
              <th scope='col'>Category</th>
              <th scope='col'>Stock</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <TableRow
                key={product._id}
                product={product}
                deleteProduct={handleDeleteProduct}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
