import React, { useState } from 'react';
import './Dashboard.css';
import Navbar from '../admin-components/navbar/Navbar';
import Sidebar from '../admin-components/sidebar/Sidebar';
import Main from '../admin-components/main/Main';

function Dashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <div className='dashboard'>
      <Navbar toggleSidebar={toggleSidebar} />
      <Main />
      <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default Dashboard;
