import React, { useState, useEffect } from 'react';
import './Login.css';
import { login, userLogin } from '../features/user/userLoginSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { useLocation, useHistory } from 'react-router-dom';
import RowContainer from '../components/RowContainer';
import { user_data } from '../random-data/user_random_data.js';
import { Autocomplete } from '@mui/material';
// import { Box } from '@mui/system';
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
      history.goBack();
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

        <div className='login__container shadow-md bg-white rounded'>
          <h1 className='text-3xl font-bold'>login</h1>
          <div className='login_random_user'>
            <p>Choose a random user to Login!</p>
            <Autocomplete
              id='select-random-user'
              options={user_data}
              // open={true}
              autoHighlight
              size='small'
              fullWidth
              // disableCloseOnSelect
              getOptionLabel={(option) => option.name || ''}
              renderOption={(props, option) => (
                <li {...props}>
                  <img
                    loading='lazy'
                    src={`${option.avatar.toLowerCase()}`}
                    srcSet={`${option.avatar.toLowerCase()} 2x`}
                    alt='user avatar'
                  />
                  {option.name}
                </li>
              )}
              onChange={(event, value) => {
                console.log(value);
                if (value) {
                  setEmail(value.email);
                  setPassword(value.password);
                } else {
                  setEmail('');
                  setPassword('');
                }
              }}
              renderInput={(params) => (
                <TextField {...params} variant='outlined' />
              )}
            />
          </div>
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
            New customer?
            <Link
              className='ml-2'
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
