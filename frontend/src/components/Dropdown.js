import React, { useRef } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';
import { PersonSharp, Settings, ExitToApp, Edit } from '@material-ui/icons';

import { userLogout } from '../features/user/userLoginSlice.js';
import { useDispatch } from 'react-redux';

function Dropdown({ userInfo, openDropdown }) {
  const dispatch = useDispatch();
  // const dropdownRef = useRef(true);
  // console.log(userInfo);
  // console.log(openDropdown);

  const handleLogout = () => {
    dispatch(userLogout());
  };
  return (
    <div
      // ref={dropdownRef}
      className={`dropdown ${openDropdown ? 'showDropdown' : ''}`}>
      <div className='dropdown__username'>
        <p>
          Welcome <span>{userInfo.name}</span>
        </p>
      </div>
      <Link to='/profile' className='dropdown__item'>
        <PersonSharp />
        <p>Profile</p>
      </Link>
      <Link to='/' className='dropdown__item'>
        <Settings />
        <p>Settings</p>
      </Link>
      <Link to='/' className='dropdown__item'>
        <Edit />
        <p>Edit</p>
      </Link>
      <button
        onClick={handleLogout}
        className='dropdown__item dropdown__button '>
        <ExitToApp />
        <p>Log Out</p>
      </button>
    </div>
  );
}

export default Dropdown;
