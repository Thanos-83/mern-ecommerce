import React, { useEffect } from 'react';
import './Products.css';
import {
  getAllProducts,
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
import axios from 'axios';
function Products() {
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState([]);
  const [err, setErr] = React.useState({ msg: '', status: false });
  const [Loading, setLoading] = React.useState(false);
  // const { products } = useSelector(productsList);
  // const { success } = useSelector((state) => state.deleteProduct);
  // console.log(products);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/dashboard/products`)
      .then((response) => {
        console.log('response fetching products: ', response);
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
        setErr({ msg: error.message, status: true });
      });
    // dispatch(getAllProducts());
  }, [dispatch]);

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete the product?')) {
      dispatch(deleteProduct(id));
      dispatch(deleteProductReset());
    }
  };
  return (
    <div className='products'>
      {err.status && (
        <h1 className='text-lg text-center bg-rose-600 text-white py-2 mb-4'>
          {err.msg}
        </h1>
      )}

      <div className='products__header'>
        <h2 className='text-2xl font-semibold text-cyan-900'>All Products</h2>
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
