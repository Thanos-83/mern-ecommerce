import React, { useEffect } from 'react';
import './Homepage.css';
import ProductsRow from '../components/ProductsRow';
import { useSelector, useDispatch } from 'react-redux';
import {
  listProducts,
  productsList,
} from '../features/products/productsSlice.js';
import Alert from '@material-ui/lab/Alert';

import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import Newsletter from '../components/Newsletter';
import ShoppingInfo from '../components/ShoppingInfo';
// import Footer from '../components/Footer';
import RowContainer from '../components/RowContainer';
// import BlogSection from '../components/BlogSection';

function Homepage({ frontpage }) {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const { products, error } = useSelector(productsList);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className='homepage'>
      <Hero isFrontpage={frontpage} />
      <div className='homepage__categories'>
        <FeaturedCategories />
      </div>
      {error && open ? (
        <Alert severity='error' variant='filled' onClose={handleClose}>
          {error}
        </Alert>
      ) : (
        <RowContainer>
          <ProductsRow title='Latest Products' products={products} />
        </RowContainer>
      )}

      <div className='homepage__newsletter'>
        <Newsletter />
      </div>
      <div className='homepage__shoppingInfo'>
        <ShoppingInfo />
      </div>
    </div>
  );
}

export default Homepage;
