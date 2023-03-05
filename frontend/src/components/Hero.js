import React from 'react';
import './Hero.css';

function Hero({ isFrontpage }) {
  return (
    <div className='hero'>
      <div className='hero__container'>
        <div className='hero__left'>
          <h3>hero slider</h3>
        </div>
        <div className='hero__right'>
          {/* <img src={image} alt='image' /> */}
        </div>
      </div>
    </div>
  );
}
export default Hero;
