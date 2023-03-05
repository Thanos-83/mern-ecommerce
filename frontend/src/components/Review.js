import { Avatar } from '@material-ui/core';
import { Rating } from '@mui/material';
import './Review.css';
import React from 'react';

function Review({ review }) {
  return (
    <div className='review'>
      <div className='review__avatar'>
        <Avatar sx={{ width: 56, height: 56 }} alt='customer avatar' />
        <p>{review.name}</p>
      </div>
      <div className='review__right'>
        <div className='review__rightRating'>
          <Rating name='product rating' value={review.rating} readOnly />
          <p>{review.createdAt}</p>
        </div>
        <p>{review.review}</p>
      </div>
    </div>
  );
}

export default Review;
