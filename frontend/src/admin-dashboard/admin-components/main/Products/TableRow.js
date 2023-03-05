import React from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TableRow({ product, deleteProduct }) {
  // console.log(product);
  const history = useHistory();
  const handleEdit = (id) => {
    history.push(`/dashboard/products/${id}/edit`);
  };

  return (
    <tr>
      <th scope='row'>
        <img src={`/${product.image}`} alt='' />
      </th>
      <th scope='row'>{product.name}</th>
      <th scope='row'>{product.brand}</th>
      <th>{product.price}</th>
      <th scope='row'>{product.category}</th>
      <th>{product.countInStock}</th>
      <th className='row__actions'>
        <button type='button' onClick={() => handleEdit(product._id)}>
          <EditIcon />
        </button>
        <button type='button' onClick={() => deleteProduct(product._id)}>
          <DeleteIcon />
        </button>
      </th>
    </tr>
  );
}

export default TableRow;
