import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RowContainer from '../components/RowContainer';
import { productsList } from '../features/products/productsSlice';
import Product from '../components/Product';
import './Shop.css';
import { listProducts } from '../features/products/productsSlice';
import Pagination from '@mui/material/Pagination';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PaginationItem, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useHistory, useLocation, useSearchParams } from 'react-router-dom';

function Shop({ match }) {
  const history = useHistory();
  const { search } = useLocation();
  const newParams = new URLSearchParams(search);
  const dispatch = useDispatch();
  const { products, loading, error, pages, page } = useSelector(productsList);

  const newPage = newParams.get('page');
  //   const pageNumber = match.params.pageNumber || 1;
  console.log(products, 'pages: ', pages, 'page: ', newPage);

  useEffect(() => {
    dispatch(listProducts(newPage));
  }, [dispatch, newPage]);

  const handleChangePagination = (e, value) => {
    if (value === 1) {
      history.push('/shop');
      window.scrollTo({
        top: 100,
        // left: 100,
        behavior: 'smooth',
      });
      return;
    }
    history.push(`/shop?page=${value}`);
    window.scrollTo({
      top: 100,
      // left: 100,
      behavior: 'smooth',
    });
  };

  return (
    <React.Fragment>
      <Header />
      <main>
        <RowContainer>
          <h1>Shop page</h1>
          <div className='shop__container'>
            <div className='shop__filters'>
              <h3>Filters</h3>
            </div>
            <div className='shop__productsArea'>
              <div className='shop__grid'>
                {loading ? (
                  <>
                    <div>
                      <Skeleton variant='rectangular' height={400} />
                      <Skeleton />
                      <Skeleton width='60%' />
                    </div>
                    <div>
                      <Skeleton variant='rectangular' height={400} />
                      <Skeleton />
                      <Skeleton width='60%' />
                    </div>
                    <div>
                      <Skeleton variant='rectangular' height={400} />
                      <Skeleton />
                      <Skeleton width='60%' />
                    </div>
                    <div>
                      <Skeleton variant='rectangular' height={400} />
                      <Skeleton />
                      <Skeleton width='60%' />
                    </div>
                    <div>
                      <Skeleton variant='rectangular' height={400} />
                      <Skeleton />
                      <Skeleton width='60%' />
                    </div>
                    <div>
                      <Skeleton variant='rectangular' height={400} />
                      <Skeleton />
                      <Skeleton width='60%' />
                    </div>
                  </>
                ) : (
                  products.map((product) => (
                    <Product key={product._id} productInfo={product} />
                  ))
                )}
              </div>
              <div className='shop__pagination'>
                <Pagination
                  count={pages}
                  // renderItem={(item) => (
                  //   <PaginationItem
                  //     component={Link}
                  //     to={`/shop/${page + 1}`}
                  //     {...item}
                  //   />
                  // )}
                  onChange={handleChangePagination}
                  showFirstButton
                  showLastButton
                  color='secondary'
                />
              </div>
            </div>
          </div>
        </RowContainer>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Shop;
