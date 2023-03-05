import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import {
  ShoppingCartSharp,
  PersonSharp,
  // Settings,
  // ExitToApp,
  // Edit,
} from '@material-ui/icons';
import { ChevronRight, FavoriteBorder } from '@material-ui/icons';
import { Avatar, Badge } from '@material-ui/core';
import { cartProducts } from '../features/cart/cartSlice';
import { userLogin } from '../features/user/userLoginSlice.js';
import { useSelector } from 'react-redux';
import CartItems from './CartItems';
import Dropdown from './Dropdown.js';
import RowContainer from './RowContainer';
import {
  openCartItemsSidebar,
  // closeCartItemsSidebar,
} from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

function Header({ frontpage }) {
  const dispatch = useDispatch();
  const [show, handleShow] = useState(false);
  const dropdownRef = useRef(true);
  const products = useSelector(cartProducts);
  const userDetails = useSelector(userLogin);
  const [qty, setQty] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    setQty(products.cartProducts.length);
    setUserInfo(userDetails.userInfo);
  }, [products, userDetails]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', null);
    };
  }, []);

  useEffect(() => {
    if (!openDropdown) {
      window.addEventListener('click', (e) => {
        // console.log(e.target);
        if (dropdownRef.current !== e.target) {
          setOpenDropdown(false);
        }
      });
    }
  }, [openDropdown]);

  const handleOpenCart = () => {
    // alert('clicked...');
    dispatch(openCartItemsSidebar());
  };

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <header
      className={`header ${show && 'header__backgroundColor'} ${
        frontpage && 'header__frontpage'
      }`}>
      <RowContainer>
        <div className='header__container'>
          <Link to='/'>
            <img
              src='https://www.graphicsprings.com/filestorage/stencils/1cf0e62090ebd950855b702c81587979.png?width=500&height=500'
              alt='logo'
              className='header__logo'
            />
          </Link>
          <nav>
            <ul>
              <li className='header__navItem'>
                <Link to='/'>Home</Link>
              </li>
              <li className='header__navItem'>
                <Link to='/shop'>Shop</Link>
              </li>
              {/* <li className='header__navItem'>
                <Link to='#' onClick={toggleSubmenu}>
                  Men <ChevronRight />
                </Link>
                <ul className='header__megaMenu'>
                  <ul>
                    <li>
                      <Link to='/'> Category 1</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 2</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 3</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 4</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 5</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 6</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to='/'> Category 1</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 2</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 3</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 4</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 5</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 6</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to='/'> Category 1</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 2</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 3</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 4</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 5</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 6</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to='/'> Category 1</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 2</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 3</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 4</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 5</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 6</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to='/'> Category 1</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 2</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 3</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 4</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 5</Link>
                    </li>
                    <li>
                      <Link to='/'> Category 6</Link>
                    </li>
                  </ul>
                </ul>
              </li>
              <li className='header__navItem dropdownMenu'>
                <Link to='/'>
                  Women <ChevronRight />
                </Link>

                <ul className='header__submenu'>
                  <li>
                    <Link to='/'> Category 1</Link>
                  </li>
                  <li>
                    <Link to='/'> Category 2</Link>
                  </li>
                  <li>
                    <Link to='/'> Category 3</Link>
                  </li>
                  <li>
                    <Link to='/'> Category 4</Link>
                  </li>
                  <li>
                    <Link to='/'> Category 5</Link>
                  </li>
                  <li>
                    <Link to='/'> Category 6</Link>
                  </li>
                </ul>
              </li>
              <li className='header__navItem dropdownMenu'>
                <Link to='/'>
                  Kids <ChevronRight />
                </Link>
                <ul className='header__submenu'>
                  <li>
                    <Link to='/'> Category 1</Link>
                  </li>
                  <li>
                    <Link to='/'> Category 2</Link>
                  </li>
                  <li>
                    <Link to='/'> Category 3</Link>
                  </li>
                  <li>
                    <Link to='/'> Category 4</Link>
                  </li>
                  <li>
                    <Link to='/'> Category 5</Link>
                  </li>
                  <li>
                    <Link to='/'> Category 6</Link>
                  </li>
                </ul>
              </li> */}
              <li className='header__navItem'>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
            </ul>
          </nav>
          <div className='header__right'>
            {userInfo ? (
              <div className='header__avatar'>
                {/* <Avatar /> */}
                <i
                  class='fas fa-user-circle'
                  ref={dropdownRef}
                  onClick={toggleDropdown}></i>
                <Dropdown openDropdown={openDropdown} userInfo={userInfo} />
              </div>
            ) : (
              <Link to='/login' className='header__login'>
                <PersonSharp />
              </Link>
            )}
            <FavoriteBorder className='header__favouriteIcon' />
            <div className='header_cartContainer'>
              <Badge
                badgeContent={qty}
                color='secondary'
                className='header__cartIcon'>
                <ShoppingCartSharp onClick={() => handleOpenCart()} />
              </Badge>
              {/* {openCart ? (
                <div className='header__cartItems'>
                  <CartItems handleClose={handleClose} />
                </div>
              ) : null} */}
            </div>
          </div>
        </div>
      </RowContainer>
    </header>
  );
}

export default Header;
