import React from 'react';

function Order({ order }) {
  return (
    <div className='adminOrder'>
      <p>{order.user.name}</p>
    </div>
  );
}

export default Order;
