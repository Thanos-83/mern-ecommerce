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
import { FavoriteBorder } from '@material-ui/icons';
import { Avatar, Badge } from '@material-ui/core';
import { cartProducts } from '../features/cart/cartSlice';
import { userLogin, userLogout } from '../features/user/userLoginSlice.js';
import { useSelector } from 'react-redux';
// import CartItems from './CartItems';
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
    console.log('user jwt: ', userDetails.userInfo);

    if (userDetails.userInfo) {
      const token = userDetails.userInfo.token;
      const expiredToken = JSON.parse(atob(token.split('.')[1])).exp;
      const now = Date.now();
      console.log('expired token 1: ', expiredToken * 1000);
      console.log('expired token 2: ', now);
      if (expiredToken * 1000 < now) {
        dispatch(userLogout());
      } else {
        setQty(products.cartProducts.length);
        setUserInfo(userDetails.userInfo);
      }
    }
    setQty(products.cartProducts.length);
    // setUserInfo(userDetails.userInfo);
  }, [products, userDetails, dispatch]);

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
        // if (!dropdownRef.current) {
        //   setOpenDropdown(false);
        // }
      });
    }
  }, [openDropdown]);

  const handleOpenCart = () => {
    // alert('clicked...');
    dispatch(openCartItemsSidebar());
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();

    // console.log(e.target);
    // console.log(dropdownRef.current);
    setOpenDropdown(true);
  };
  // console.log(userInfo);
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
            <ul className='space-x-12'>
              <li className='header__navItem'>
                <Link to='/'>Home</Link>
              </li>
              <li className='header__navItem'>
                <Link to='/shop'>Shop</Link>
              </li>
              <li className='header__navItem'>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
            </ul>
          </nav>
          <div className='header__right'>
            {userInfo ? (
              <div className='header__avatar'>
                <Avatar
                  src={`${
                    userInfo?.avatar
                      ? userInfo?.avatar
                      : 'https://i.pravatar.cc/300'
                  }`}
                  ref={dropdownRef}
                  onClick={toggleDropdown}
                  alt={`${userInfo.name}`}
                />

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
            </div>
          </div>
        </div>
      </RowContainer>
    </header>
  );
}

export default Header;
