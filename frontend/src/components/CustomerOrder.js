import React from 'react';
import './CustomerOrder.css';
import Currency from 'react-currency-formatter';
import moment from 'moment';

function CustomerOrder({ order }) {
  console.log(order);
  return (
    <div className='customerOrder relative border  rounded-md overflow-hidden bg-slate-50'>
      <div className='flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600'>
        <div>
          <p className='font-bold text-xs'>ORDER PLACED</p>
          <p>{moment(order?.createdAt).format('LL')}</p>
        </div>
        <div>
          <p className='font-bold text-xs'>TOTAL</p>
          <p>
            <Currency quantity={order.totalPrice} currency='EUR' />
          </p>
        </div>
        <p className='text-sm whitespace-normal sm:text-xl self-end flex-1 text-right text-blue-600'>
          {order.orderItems.length}{' '}
          {order.orderItems.length > 1 ? 'items' : 'item'}
        </p>
        <p className='absolute top-0 sm:top-2 right-2  truncate text-xs whitespace-normal'>
          ORDER # {order._id}
        </p>
      </div>
      <div className='p-2 sm:p-4 w-full'>
        <div className='flex gap-4 items-center overflow-x-auto w-full'>
          {order?.orderItems.map((item) => (
            <div className='aspect-square w-20 h-20 sm:w-32 sm:h-32 '>
              <img
                src={item.image}
                alt={`${item.name}`}
                className='object-contain aspect-square'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-end space-x-4 p-5 border-t border-gray-200'>
        <div className='flex items-center gap-3'>
          <p className='text-sm text-gray-600 font-semibold'>Payment: </p>
          <p
            className={`${
              order.isPaid
                ? 'bg-green-600 text-white'
                : 'bg-orange-600 text-white'
            } px-2 py-1 font-bold rounded-lg text-sm`}>
            {order.isPaid ? 'paid' : 'pending'}
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <p className='text-sm text-gray-600 font-semibold'>Delivery: </p>
          <p
            className={`${
              order.status.toLowerCase() === 'delivered'
                ? 'bg-green-600 text-white'
                : order.status.toLowerCase() === 'pending'
                ? 'bg-orange-600 text-white'
                : 'bg-red-600 text-white'
            } px-2 py-1 font-bold rounded-lg text-sm`}>
            {order.status.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrder;
