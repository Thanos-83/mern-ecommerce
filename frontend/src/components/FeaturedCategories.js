import React from 'react';
import './FeaturedCategories.css';
import img1 from '../images/categories/imani-bahati-LxVxPA1LOVM-unsplash.jpg';
import img2 from '../images/categories/irene-kredenets-dwKiHoqqxk8-unsplash.jpg';
import img3 from '../images/categories/motoculturel-7pnghPhYflk-unsplash.jpg';
import img4 from '../images/categories/lena-kudryavtseva-K89ybvMmjIc-unsplash.jpg';
function FeaturedCategories() {
  return (
    <div className='categories'>
      <h2>Featured Categories</h2>
      <div className='categories__grid'>
        <div className='categories__one'>
          <h3>Category one</h3>
          <img src={img1} alt='' />
        </div>
        <div className='categories__two'>
          <h3>Category two</h3>
          <img src={img2} alt='' />
        </div>
        <div className='categories__three'>
          <h3>Category three</h3>
          <img src={img3} alt='' />
        </div>
        <div className='categories__four'>
          <h3>Category four</h3>
          <img src={img4} alt='' />
        </div>
      </div>
    </div>
  );
}

export default FeaturedCategories;
