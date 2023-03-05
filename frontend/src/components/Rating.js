import { StarHalf, StarRate } from '@material-ui/icons';
import React from 'react';
import './Rating.css';
function Rating({ rating, reviews }) {
  return (
    <div className='rating'>
      <div className='rating__rate'>
        <span>
          {rating >= 1 ? (
            <StarRate />
          ) : rating >= 0.5 ? (
            <StarHalf />
          ) : (
            <StarRate />
          )}
        </span>
        <span>
          {rating >= 2 ? (
            <StarRate />
          ) : rating >= 1.5 ? (
            <StarHalf />
          ) : (
            <StarRate />
          )}
        </span>
        <span>
          {rating >= 3 ? (
            <StarRate />
          ) : rating >= 2.5 ? (
            <StarHalf />
          ) : (
            <StarRate />
          )}
        </span>
        <span>
          {rating >= 4 ? (
            <StarRate />
          ) : rating >= 3.5 ? (
            <StarHalf />
          ) : (
            <StarRate />
          )}
        </span>
        <span>
          {rating >= 5 ? (
            <StarRate />
          ) : rating >= 4.5 ? (
            <StarHalf />
          ) : (
            <StarRate />
          )}
        </span>
      </div>

      <span className='rating__reviews'>from {reviews} reviews</span>
    </div>
  );
}

export default Rating;
