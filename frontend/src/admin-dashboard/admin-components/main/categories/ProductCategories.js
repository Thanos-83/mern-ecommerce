import React, { useState, useEffect } from 'react';
import './ProductCategories.css';
import { addCategory } from '../../../../features/categories/createCategorySlice';
import { getCategories } from '../../../../features/categories/categoriesSlice';

import { useDispatch, useSelector } from 'react-redux';
import { InputLabel, TextField, Checkbox } from '@material-ui/core';

function ProductCategories() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [parent, setParent] = useState(false);
  const { categories } = useSelector((state) => state.categoriesList);
  console.log(categories);
  console.log(name, parent);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('category created...');
    dispatch(
      addCategory({
        name: name,
        isParent: parent,
      })
    );
    console.log(name, parent);
    setName('');
    setParent(false);
  };
  return (
    <div className='productCategories'>
      <h2>Product categories</h2>
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor='name'>Name</InputLabel>
        <TextField
          value={name}
          type='text'
          id='name'
          required
          variant='outlined'
          onChange={(e) => setName(e.target.value)}
        />
        <InputLabel htmlFor='isParent'>Is Parent</InputLabel>
        <Checkbox
          checked={parent}
          type='checkbox'
          id='isParent'
          required
          variant='outlined'
          onChange={(e) => setParent(e.target.checked)}
        />
        <button>Save</button>
      </form>
    </div>
  );
}

export default ProductCategories;
