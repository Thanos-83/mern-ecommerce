import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Navbar from '../admin-components/navbar/Navbar';
import Sidebar from '../admin-components/sidebar/Sidebar';
import Main from '../admin-components/main/Main';
import { useHistory } from 'react-router-dom';

function Dashboard() {
  const history = useHistory();
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  // useEffect(() => {
  //   if (true) {
  //     history.push('/login');
  //   }
  // }, [history]);
  return (
    <div className='dashboard'>
      <Navbar toggleSidebar={toggleSidebar} />
      <Main />
      <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default Dashboard;
