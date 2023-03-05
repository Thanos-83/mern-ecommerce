import React from 'react';
import './Footer.css';
import RowContainer from './RowContainer';
function Footer() {
  return (
    <footer className='footer'>
      <RowContainer>
        <p>
          &copy; 2023 by <span>Thanos Smponias</span>
        </p>
      </RowContainer>
    </footer>
  );
}

export default Footer;
