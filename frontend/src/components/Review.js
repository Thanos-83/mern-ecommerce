import { Avatar } from '@material-ui/core';
import { Rating } from '@mui/material';
import './Review.css';
import React from 'react';
import moment from 'moment';
function Review({ review }) {
  return (
    <div className='review'>
      <div className='review__avatar'>
        <Avatar sx={{ width: 56, height: 56 }} alt='customer avatar' />
        <p>{review.name}</p>
      </div>
      <div className='review__right '>
        <div className='review__rightRating flex-col-reverse items-start space-y-reverse space-y-1 sm:flex-row sm:items-center sm:space-y-0'>
          <Rating name='product rating' value={review.rating} readOnly />
          <p>{moment(review.createdAt).format('LL')}</p>
        </div>
        <p>{review.review}</p>
      </div>
    </div>
  );
}

export default Review;
