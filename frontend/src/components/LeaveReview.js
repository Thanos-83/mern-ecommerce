import { InputLabel, TextField } from '@material-ui/core';
import { Rating } from '@mui/material';
import React from 'react';

function LeaveReview({
  reviewRef,
  handleSubmitReview,
  ratingValue,
  setRatingValue,
}) {
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
