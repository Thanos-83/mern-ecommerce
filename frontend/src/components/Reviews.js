import React from 'react';
import Review from './Review';

function Reviews({ reviews }) {
  return (
    <React.Fragment>
      <h2>Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => <Review key={review._id} review={review} />)
      ) : (
        <p>No reviews! </p>
      )}
    </React.Fragment>
  );
}

export default Reviews;
