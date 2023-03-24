import React from 'react';
import './ShoppingCart.css';
import CartProduct from '../components/CartProduct.js';
import Subtotal from '../components/Subtotal';

import { useSelector } from 'react-redux';
import { cartProducts } from '../features/cart/cartSlice';
import RowContainer from '../components/RowContainer';
function Card() {
  const allCartProducts = useSelector(cartProducts);

  return (
    <RowContainer>
      <div className='cart'>
        <div className='cart__content'>
          <div className='cart__contentHeader mt-10'>
            {allCartProducts.cartProducts.length === 0 ? (
              <h2 className=' pb-4 border-b-2 border-b-slate-200 text-2xl mb-8'>
                Your Shopping Cart is empty
              </h2>
            ) : (
              <>
                <h2 className=' pb-4 border-b-2 border-b-slate-200 text-2xl mb-8'>
                  Shopping cart{' '}
                  {`(${allCartProducts.cartProducts.length} items)`}
                </h2>
              </>
            )}
          </div>
          <div className='flex flex-col lg:flex-row items-start gap-4'>
            {allCartProducts.cartProducts.length > 0 && (
              <>
                <div className='w-full lg:w-[70%] space-y-6'>
                  {allCartProducts.cartProducts.map((product) => (
                    <CartProduct
                      img={product?.image}
                      name={product?.name}
                      price={product?.price}
                      id={product?.id}
                      qty={product.qty}
                      key={product?.id}
                    />
                  ))}
                </div>
                <div className=' w-full md:w-1/2 self-end lg:self-start lg:w-[30%] shadow-md bg-white p-4 rounded'>
                  <Subtotal allCartProducts={allCartProducts} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </RowContainer>
  );
}

export default Card;
