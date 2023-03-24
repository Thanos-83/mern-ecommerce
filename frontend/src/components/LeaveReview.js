import { InputLabel, TextField } from '@material-ui/core';
import { Rating } from '@mui/material';
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProductReview } from '../features/products/createProductReviewSlice';
import { useHistory } from 'react-router-dom';

function LeaveReview({ params }) {
  const [ratingValue, setRatingValue] = useState(0);
  const reviewRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userLogin);
  console.log(userDetails);

  const handleSubmitReview = (e) => {
    e.preventDefault();

    console.log({
      rating: ratingValue,
      review: reviewRef.current.value,
    });
    if (!userDetails.userInfo) {
      history.push('/login');
    }
    // dispatch(
    //   createProductReview(params.id, {
    //     rating: ratingValue,
    //     review: reviewRef.current.value,
    //   })
    // );
    setRatingValue(0);
    reviewRef.current.value = '';
  };
  return (
    <React.Fragment>
      <h2>Add Review</h2>
      <form action='' onSubmit={handleSubmitReview}>
        <div>
          <InputLabel error={0 ? true : false}>Your Rating</InputLabel>
          <Rating
            name='product rating'
            precision={0.5}
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
          />
        </div>

        <div>
          <InputLabel error={0 ? true : false}>Your Review</InputLabel>
          <TextField
            inputRef={reviewRef}
            variant='outlined'
            required
            multiline
            fullWidth
            rows={5}
            id='rating area'
            helperText={`${0 ? 'Incorrect entry.' : ''}`}
            error={0 ? true : false}
          />
        </div>
        <button className='singleProduct__btn' type='submit'>
          Add Review
        </button>
      </form>
    </React.Fragment>
  );
}

export default LeaveReview;
