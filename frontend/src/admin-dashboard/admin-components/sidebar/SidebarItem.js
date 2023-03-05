import React from 'react';
import './SidebarItem.css';
import { Link } from 'react-router-dom';
function SidebarItem({ title, isLink, toggleSidebar, Icon }) {
  return (
    <div className='sidebar__item'>
      <input
        type='checkbox'
        name='item1'
        id={title}
        className='sidebar__checkbox'
        defaultChecked={false}
      />
      <label htmlFor={title}>
        <i className='far fa-envelope'></i>
        {/* <Icon /> */}
        <span> {title} </span>
        {!isLink && <i className='fas fa-chevron-down'></i>}
      </label>
      <div className='sidebar__submenu'>
        <div className='sidebar__link' onClick={() => toggleSidebar()}>
          <i className='fas fa-cart-plus'></i>{' '}
          <Link to='/dashdoard'>All Emails</Link>
        </div>
        <div className='sidebar__link' onClick={() => toggleSidebar()}>
          <i className='fas fa-cart-plus'></i>{' '}
          <Link to='/dashdoard'>Unread</Link>
        </div>
        <div className='sidebar__link' onClick={() => toggleSidebar()}>
          <i className='fas fa-cart-plus'></i> <Link to='/dashdoard'>Send</Link>
        </div>
        <div className='sidebar__link' onClick={() => toggleSidebar()}>
          <i className='fas fa-cart-plus'></i>{' '}
          <Link to='/dashdoard'>Notifications</Link>
        </div>
      </div>
    </div>
  );
}

export default SidebarItem;
