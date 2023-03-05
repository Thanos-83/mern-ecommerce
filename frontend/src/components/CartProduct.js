import { DeleteOutlined } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './CartProduct.css';
import { removeItemFromCart } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { updateProductToCart } from '../features/cart/cartSlice';
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
    <div className='cartProduct'>
      <Link to={`/product/${id}`} className='cartProduct__img'>
        <img src={img} target={name} alt='productImage' />
      </Link>
      <p className='cartProduct__name'>{name}</p>

      <div className='cartProduct__right'>
        <h3>Price : {price} $</h3>

        {/* <p>Quantity: </p> */}
        <div className='cartProduct__quantity'>
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

        <DeleteOutlined onClick={() => removeItem(id)} />
      </div>
    </div>
  );
}

export default CardProduct;
