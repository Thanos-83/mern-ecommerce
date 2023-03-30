import React from 'react';
// import { useSelector } from 'react-redux';
// import { userLogin } from '../features/user/userLoginSlice';
import { Redirect } from 'react-router-dom';
function ProtectedRoute({ children, userLoggedin }) {
  //   const userDetails = useSelector(userLogin);
  if (userLoggedin) {
    return children;
  }
  return <Redirect to='/login' />;
}

export default ProtectedRoute;
