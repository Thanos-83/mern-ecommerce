import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, QueryBuilder, Search } from '@material-ui/icons';
import './Navbar.css';
import avatar from '../../../images/avatar.svg';
function Navbar({ toggleSidebar }) {
  return (
    <div className='navbar'>
      <div className='nav_icon' onClick={() => toggleSidebar()}>
        <Menu />
      </div>
      <div className='navbar__left'>
        <Link to='/'>Home</Link>
      </div>
      <div className='navbar__right'>
        <Link to='/'>
          <Search />
        </Link>
        <Link to='/'>
          <QueryBuilder />
        </Link>
        <Link to='/' className='navbar__avatar'>
          <img src={avatar} alt='avatar' />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
