import React, { useEffect, useState, useRef } from 'react';
import './SingleProduct.css';
import { Link } from 'react-router-dom';
// import Rating from '../components/Rating';
import { Add, Euro, Favorite, Remove } from '@material-ui/icons';
import {
  productDetails,
  listProductDetails,
} from '../features/products/productSlice';
import { createProductReview } from '../features/products/createProductReviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { addToCart, cartProducts } from '../features/cart/cartSlice';
import { useHistory, useParams } from 'react-router-dom';
import RowContainer from '../components/RowContainer';
import Rating from '@mui/material/Rating';
import LeaveReview from '../components/LeaveReview';
import Reviews from '../components/Reviews';
import Currency from 'react-currency-formatter';
import moment from 'moment';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/free-mode';
import 'swiper/swiper.min.css';
// import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/thumbs/thumbs.min.css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';

function SingleProduct() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [err, setErr] = useState(false);
  const reviewRef = useRef();

  const [ratingValue, setRatingValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const productInfo = useSelector(productDetails);
  const cartProductsInfo = useSelector(cartProducts);
  useEffect(() => {
    dispatch(listProductDetails(params.id));
    // console.log(cartProductsInfo);
  }, [dispatch, params, cartProductsInfo]);

  const addToCartHandle = () => {
    const payload = {
      id: productInfo.product._id,
      name: productInfo.product.name,
      image: productInfo.product.image,
      price: productInfo.product.price,
      qty: quantity,
      added: true,
    };

    const productExist = cartProductsInfo.cartProducts.find(
      (x) => x.id === productInfo.product._id
    );

    if (productExist) {
      setErr(true);
      console.log(err);
      setTimeout(() => {
        setErr(false);
      }, 5000);
    } else {
      dispatch(addToCart(payload));
      history.push(`/`);
      setErr(false);
    }
  };

  const handleClose = () => {
    setErr(false);
  };

  const { product, error, loading } = productInfo;
  console.log('single product info: ', product);
  const handleSubmitReview = (e) => {
    e.preventDefault();

    dispatch(
      createProductReview(params.id, {
        rating: ratingValue,
        review: reviewRef.current.value,
      })
    );
    setRatingValue(0);
    reviewRef.current.value = '';
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev - 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className='singleProduct'>
      <RowContainer>
        <div className='singleProduct__nav'>
          <Link to='/'>Home</Link>
        </div>
      </RowContainer>
      <div className='singleProduct__errorExist'>
        {err ? (
          <RowContainer>
            <Alert severity='warning' variant='filled' onClose={handleClose}>
              <p>Product already exist</p>
            </Alert>
          </RowContainer>
        ) : null}
      </div>
      <RowContainer>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity='error' variant='filled'>
            {error}
          </Alert>
        ) : (
          <React.Fragment>
            <div className='singleProduct__info'>
              <div className='singleProduct__infoLeft'>
                <div className='singleProduct_imgContainer'>
                  {/* <img src={`/${product.image}`} alt='product slider' /> */}
                  <Swiper
                    style={{
                      '--swiper-navigation-color': '#fff',
                      '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={10}
                    navigation={true}
                    // thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className='mySwiper2'>
                    {[...Array(6).values()].map((img) => (
                      <SwiperSlide key={img}>
                        <img src={`${product.image}`} alt='product gallery' />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className='mySwiper'>
                    {[...Array(6).values()].map((img) => (
                      <SwiperSlide key={img}>
                        <img src={`/${product.image}`} alt='product gallery' />
                      </SwiperSlide>
                    ))}
                  </Swiper> */}
                </div>
              </div>
              <div className='singleProduct__infoRight mt-8 md:mt-0 pl-0 md:pl-4'>
                <h2 className='text-xl lg:text-3xl font-bold text-emerald-900'>
                  {product.name}
                </h2>
                <div className='singleProduct__rating flex-wrap gap-4'>
                  <div className='singleProduct__brand'>
                    <h4>Brand: </h4> <p>Brandname</p>
                  </div>
                  <div className='singleProduct__brand flex-wrap'>
                    <Rating
                      name='product rating'
                      value={product.rating}
                      readOnly
                    />
                    <p> ( {product.reviews.length} Reviews )</p>
                  </div>
                </div>
                <h2 className='singleProduct__price text-lg font-semibold'>
                  Price: <Currency quantity={product.price} currency='EUR' />
                </h2>
                <p className='singleProduct__description '>
                  {product.description}
                </p>
                <small>
                  Availability:
                  {product.countInStock > 0 ? ' In Sotck' : ' Out of Stock'}
                </small>
                <div className='singleProduct__actions'>
                  <div className='singleProduct__controlQuantity'>
                    <button
                      disabled={quantity <= 1 ? true : false}
                      onClick={handleIncreaseQuantity}
                      type='button'
                      className='singleProduct__increment'>
                      <Remove />
                    </button>
                    <span className='singleProduct__quantity'>{quantity}</span>
                    <button
                      onClick={handleDecreaseQuantity}
                      type='button'
                      className='singleProduct__decrement'>
                      <Add />
                    </button>
                  </div>
                  <button
                    onClick={addToCartHandle}
                    className='add-to-card-btn'
                    disabled={product.countInStock === 0}>
                    Add to card
                  </button>
                  <Favorite />
                </div>
              </div>
            </div>
            <div className='singleProduct__reviews'>
              <h1 className='text-2xl xl:text-3xl'>
                Total Reviews <span>( {product.reviews.length} )</span>
              </h1>
              <div className='singleProduct__reviewsContainer'>
                <div className='singleProduct_leaveReview'>
                  <LeaveReview
                    reviewRef={reviewRef}
                    handleSubmitReview={handleSubmitReview}
                    ratingValue={ratingValue}
                    setRatingValue={setRatingValue}
                  />
                </div>
                <div className='singleProduct_displayReviews'>
                  <Reviews reviews={product?.reviews} />
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </RowContainer>
    </div>
  );
}

export default SingleProduct;
