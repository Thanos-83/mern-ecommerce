import React from 'react';
import './App.css';
import Header from './components/Header';
import Orders from './components/Orders.js';
import Homepage from './pages/Homepage';
import SingleProduct from './pages/SingleProduct';
import ShoppingCart from './pages/ShoppingCart';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleOrder from './pages/SingleOrder';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';
// import ScrollButton from './components/ScrollButton';
import Dashboard from './admin-dashboard/admin-pages/Dashboard';
import Shop from './pages/Shop';
import CartItems from './components/CartItems';
import { useSelector, useDispatch } from 'react-redux';
import { cartProducts, closeCartItemsSidebar } from './features/cart/cartSlice';
import Success from './pages/Success';
import ProtectedRoute from './components/ProtectedRoute';
import { userLogin } from './features/user/userLoginSlice';

function App() {
  const dispatch = useDispatch();
  const { active } = useSelector(cartProducts);
  const { userInfo } = useSelector(userLogin);

  return (
    // BEM naming convention
    <div className='app'>
      <React.Fragment>
        <Switch>
          {/* Dashboard Route */}
          <Route path='/dashboard'>
            <ProtectedRoute userLoggedin={userInfo}>
              <Dashboard />
            </ProtectedRoute>
          </Route>

          <Route path='/shop*' component={Shop} exact />

          <Route path='/cart'>
            <Header />
            <main>
              <ShoppingCart />
            </main>
            <Footer />
          </Route>
          <Route path='/checkout'>
            <Header />
            <main>
              <Checkout />
            </main>
            <Footer />
          </Route>

          <Route exact path='/success'>
            <Header />
            <main>
              <Success />
            </main>
            <Footer />
          </Route>
          <Route path='/login'>
            <Header />
            <main>
              <Login />
            </main>
            <Footer />
          </Route>
          <Route path='/register'>
            <Header />
            <main>
              <Register />
            </main>
            <Footer />
          </Route>
          <Route exact path='/account/profile'>
            <Header />
            <main>
              <Profile />
            </main>
            <Footer />
          </Route>
          <Route exact path='/account/orders'>
            <ProtectedRoute userLoggedin={userInfo}>
              <Header />
              <main>
                <Orders />
              </main>
              <Footer />
            </ProtectedRoute>
          </Route>
          <Route path='/product/:id'>
            <Header />
            <main>
              <SingleProduct />
            </main>
            <Footer />
          </Route>
          <Route path='/order/:id'>
            <Header />
            <main>
              <SingleOrder />
            </main>
            <Footer />
          </Route>
          <Route path='/' exact>
            <Header frontpage />
            <main>
              <Homepage frontpage />
            </main>
            <Footer />
          </Route>
          <Route path='*'>
            <Header />
            <main>
              <h3>Page NOT Found</h3>
            </main>
            <Footer />
          </Route>
        </Switch>
        {/* <div className='scrollToTop'>
          <ScrollButton />
        </div> */}
      </React.Fragment>
      <div className={`cartSidebar__container ${active ? 'open' : 'close'} `}>
        <div
          className='backdrop'
          onClick={() => dispatch(closeCartItemsSidebar())}></div>
        <CartItems />
      </div>
    </div>
  );
}

export default App;
