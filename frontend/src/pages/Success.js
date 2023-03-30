import React from 'react';
import RowContainer from '../components/RowContainer';
import { CheckCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCartItems } from '../features/cart/cartSlice';

function Success() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(resetCartItems());
  }, [dispatch]);
  return (
    <RowContainer>
      <div className='flex flex-col p-12 bg-white mt-12'>
        <div className='flex items-center space-x-2 mb-4'>
          <CheckCircle className='!h-12 !w-12 text-green-500' />
          <h1>Thank you, your order has been confirmed!</h1>
        </div>
        <p>
          Thank you for shopping with us. We'll send a confirmation once your
          item(s) has shipped, if you would like to check the status of your
          order(s) please press the link below!
        </p>
        <Link
          to='/account/orders'
          className='w-full py-3 text-center bg-yellow-500 mt-8 cursor-pointer'>
          Go to orders
        </Link>
      </div>
    </RowContainer>
  );
}

export default Success;
