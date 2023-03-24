import { DeleteOutlined } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './CartProduct.css';
import { removeItemFromCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { updateProductToCart } from '../features/cart/cartSlice';
import Currency from 'react-currency-formatter';

function CardProduct({ img, name, price, id, qty }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(qty);
  const removeItem = (productID) => {
    dispatch(removeItemFromCart(productID));
  };

  React.useEffect(() => {
    if (quantity >= 1) {
      const payload = {
        id: id,
        qty: quantity,
      };
      // console.log(payload);
      dispatch(updateProductToCart(payload));
    }
  }, [quantity, dispatch, id]);

  return (
    <div className='cartProduct flex shadow-md rounded bg-white p-4'>
      <Link to={`/product/${id}`} className='w-32 h-32 aspect-square'>
        <img
          src={img.secureUrl}
          target={name}
          alt='productImage'
          className='aspect-square'
        />
      </Link>

      <div className='ml-4 flex-1 flex flex-col md:flex-row'>
        <div className='flex mr-2 md:mr-0 flex-col flex-1'>
          <p className='flex-1 text-md font-semibold text-slate-500'>{name}</p>
          <h3 className='text-md font-semibold mt-auto'>
            Price : <Currency quantity={price} currency='EUR' />
          </h3>
        </div>
        <div className='w-full  md:w-1/5 flex md:flex-col space-x-4 md:space-x-0 md:items-end justify-end items-center md:justify-between'>
          <div className='cartProduct__quantity space-x-2 '>
            <button
              className={`cartProduct__removeQuantity ${
                quantity === 1
                  ? 'cartProduct__quantityDisabled'
                  : 'cartProduct__quantityEnabled'
              } `}
              disabled={quantity === 1 && true}
              onClick={() => setQuantity(quantity - 1)}>
              -
            </button>
            <p>{quantity}</p>
            <button
              className='cartProduct__addQuantity'
              onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          </div>
          <DeleteOutlined
            className='cursor-pointer'
            onClick={() => removeItem(id)}
          />
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
