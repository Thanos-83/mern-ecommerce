import React from 'react';
import './Main.css';
import { Switch, Route } from 'react-router-dom';
import Products from './Products/Products';
import DashboardMain from './DashboardMain';
import AddProduct from './Products/AddProduct';
import EditProduct from './Products/EditProduct';
import ProductCategories from './categories/ProductCategories';
import Orders from '../main/orders/Orders';
import EditOrder from './orders/EditOrder';
import Users from './users/Users.js';
import SingleUser from './users/SingleUser.js';

function Main() {
  return (
    <div className='main'>
      <Switch>
        <Route exact path='/dashboard/products/'>
          <Products />
        </Route>
        <Route exact path='/dashboard/categories/'>
          <ProductCategories />
        </Route>
        <Route exact path='/dashboard/products/add'>
          <AddProduct />
        </Route>
        <Route exact path='/dashboard/products/:id/edit'>
          <EditProduct />
        </Route>
        <Route exact path='/dashboard/orders' component={Orders} />
        <Route
          exact
          path='/dashboard/orders/:orderID/edit'
          component={EditOrder}
        />
        <Route exact path='/dashboard/users' component={Users} />
        <Route exact path='/dashboard/users/:userID' component={SingleUser} />
        <Route path='/dashboard'>
          <DashboardMain />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
