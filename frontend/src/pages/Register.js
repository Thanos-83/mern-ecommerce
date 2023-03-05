import React, { useState, useEffect } from 'react';
import './Register.css';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { useLocation, useHistory } from 'react-router-dom';
import {
  register,
  userRegister,
  userRegisterFail,
} from '../features/user/userRegisterSlice.js';
import RowContainer from '../components/RowContainer';
function Register() {
  const location = useLocation();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector(userRegister);
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const [open, setOpen] = useState(error);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password === confirmPassword && password !== '') {
      dispatch(register(username, email, password));
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      dispatch(userRegisterFail('Passwords do not match'));
    }
  };

  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <RowContainer>
      <div className='register'>
        {loading && <CircularProgress />}
        {error ? (
          <Alert severity='error' variant='filled' onClose={handleClose}>
            <p>{error}</p>
          </Alert>
        ) : null}
        <div className='register__container'>
          <h2>Register</h2>
          <form onSubmit={handleRegister} className='register__form'>
            <div className='register__formEmail'>
              <label htmlFor='name'>Name</label>
              <input
                id='name'
                name='name'
                value={username}
                type='text'
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='register__formEmail'>
              <label htmlFor='emain'>Email</label>
              <input
                id='emain'
                name='emai'
                value={email}
                type='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='register__formPassword'>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                name='password'
                value={password}
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='register__formPasswordRepeat'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                id='confirmPassword'
                name='confirmPassword'
                value={confirmPassword}
                type='password'
                placeholder='Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type='submit'>Register</button>
          </form>
          <div className='login__newUser'>
            Already have an account ? <Link to='/login'>Login</Link>
          </div>
        </div>
      </div>
    </RowContainer>
  );
}

export default Register;
