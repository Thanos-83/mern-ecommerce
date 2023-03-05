import React, { useState, useEffect } from 'react';
import './Login.css';
import { login, userLogin } from '../features/user/userLoginSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { useLocation, useHistory } from 'react-router-dom';
import RowContainer from '../components/RowContainer';
function Login() {
  const location = useLocation();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector(userLogin);
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const [open, setOpen] = useState(error);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    if (!error) {
      setEmail('');
      setPassword('');
    }
  };

  const handleClose = () => {
    setOpen(!open);
  };

  // console.log(userInfo);
  return (
    <RowContainer>
      <div className='login'>
        {loading && <CircularProgress />}
        {open ? (
          <Alert severity='error' variant='filled' onClose={handleClose}>
            <p>{error}</p>
          </Alert>
        ) : null}

        <div className='login__container'>
          <h2>login</h2>
          <form onSubmit={handleLogin} className='login__form'>
            <div className='login__formEmail'>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                value={email}
                type='email'
                name='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='login__formPassword'>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                value={password}
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type='submit'>Login</button>
          </form>
          <div className='login__newUser'>
            New customer ?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </RowContainer>
  );
}

export default Login;
