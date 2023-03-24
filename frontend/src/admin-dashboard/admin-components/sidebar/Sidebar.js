import React from 'react';
import './Sidebar.css';
import logo from '../../../images/logo.png';
// import SidebarItem from './SidebarItem';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import InsightsIcon from '@mui/icons-material/Insights';
import { Link } from 'react-router-dom';
function Sidebar({ openSidebar, toggleSidebar }) {
  return (
    <div className={`sidebar ${openSidebar && 'sidebar__open'}`}>
      <div className='sidebar__title'>
        <div className='sidebar__img'>
          <img src={logo} alt='logo' />
        </div>
        <i
          className='fa fa-times'
          id='sidebarIcon'
          onClick={() => toggleSidebar()}></i>
      </div>
      <div className='sidebar__menu'>
        <div className='sidebar__item'>
          <input
            type='checkbox'
            name='link1'
            id='link1'
            className='sidebar__checkbox'
            defaultChecked={false}
          />
          <label htmlFor='link1' onClick={() => toggleSidebar()}>
            <DashboardCustomizeIcon color='primary' />
            <span>Dashboard</span>
          </label>
        </div>
        <div className='sidebar__item'>
          <input
            type='checkbox'
            name='item1'
            id='item1'
            className='sidebar__checkbox'
          />
          <label htmlFor='item1'>
            <ProductionQuantityLimitsIcon color='primary' />
            <span> Products </span>
            <i className='fas fa-chevron-down'></i>
          </label>
          <div className='sidebar__submenu'>
            <Link
              to='/dashboard/products'
              className='sidebar__link'
              onClick={() => toggleSidebar()}>
              View Products
            </Link>
            <Link
              to='/dashboard/products/add'
              className='sidebar__link'
              onClick={() => toggleSidebar()}>
              Add Product
            </Link>
            <Link
              to='/dashboard/categories'
              className='sidebar__link'
              onClick={() => toggleSidebar()}>
              Categories
            </Link>
            <Link
              to='/dashboard'
              className='sidebar__link'
              onClick={() => toggleSidebar()}>
              View Categories
            </Link>
          </div>
        </div>

        <div className='sidebar__item'>
          <input
            type='checkbox'
            name='link1'
            id='link1'
            className='sidebar__checkbox'
            defaultChecked={false}
          />
          <label htmlFor='link1' onClick={() => toggleSidebar()}>
            <DashboardCustomizeIcon color='primary' />

            <Link
              to='/dashboard/orders'
              className='sidebar__link'
              onClick={() => toggleSidebar()}>
              Orders
            </Link>
          </label>
        </div>

        <div className='sidebar__item'>
          <input
            type='checkbox'
            name='link1'
            id='link1'
            className='sidebar__checkbox'
            defaultChecked={false}
          />
          <label htmlFor='link1' onClick={() => toggleSidebar()}>
            <DashboardCustomizeIcon color='primary' />

            <Link
              to='/dashboard/users'
              className='sidebar__link'
              onClick={() => toggleSidebar()}>
              Users
            </Link>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
