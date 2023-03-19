import React, { useEffect, useState } from 'react';
import './Products.css';
import {
  getAllProducts,
  productsList,
} from '../../../../features/products/productsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {
  deleteProduct,
  deleteProductReset,
} from '../../../../features/products/deleteProductSlice';
import axios from 'axios';
import { Avatar, Snackbar } from '@material-ui/core';
import { Alert, Skeleton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Currency from 'react-currency-formatter';

function Products() {
  const columns = [
    {
      field: ' product',
      headerName: 'Product',
      minWidth: 500,
      flex: 1,
      // align: 'center',
      // headerAlign: 'center',
      renderCell: (params) => {
        return (
          <div className='product__name flex items-center space-x-2'>
            <div className='w-10 h-10 aspect-square overflow-hidden rounded-md border border-gray-200'>
              <img
                className='aspect-square'
                src={params.row.image}
                alt={params.row.name}
              />
            </div>
            {/* <Avatar alt='Remy Sharp' src={`${params.row.image}`} /> */}
            <p className='whitespace-normal flex-1'>{params.row.name}</p>
          </div>
        );
      },
    },
    {
      field: 'brand',
      headerName: 'Brand',
      width: 100,
      // flex: 1,
      align: 'left',
      headerAlign: 'left',
      cellClassName: 'test-class',
      // renderCell: (params) => {
      //   return <>{params.row.orders.length}</>;
      // },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 130,
      // flex: 1,
      align: 'left',
      headerAlign: 'left',
      renderCell: (params) => {
        return (
          <div>
            <Currency quantity={params.row.price} currency='EUR' />
          </div>
        );
      },
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 130,
      // flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 80,
      // flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'reviews',
      headerName: 'Reviews',
      width: 80,
      // flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      width: 100,
      // flex: 1,
      renderCell: (params) => {
        return (
          <div className='space-x-2'>
            <EditIcon
              className='cursor-pointer text-violet-700'
              onClick={(e) => handleEditProduct(e, params.row)}
              title='Edit'
            />
            <DeleteIcon
              className='cursor-pointer text-rose-800'
              onClick={(e) => handleDeleteProduct(e, params.row)}
              title='Edit'
            />
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  const [products, setProducts] = React.useState([]);
  const [err, setErr] = React.useState({ msg: '', status: false });
  const [loadingProducts, setLoadingProducts] = React.useState(false);
  // const { products } = useSelector(productsList);
  const { success, loading } = useSelector((state) => state.deleteProduct);
  const [open, setOpen] = useState(success);
  const [tableRows, setTableRows] = useState([]);
  const history = useHistory();

  const handleEditProduct = (e, rowParams) => {
    console.log('row params: ', rowParams.id);
    history.push(`/dashboard/products/${rowParams.id}/edit`);
  };

  // console.log(products);

  useEffect(() => {
    setLoadingProducts(true);
    axios
      .get(`/api/dashboard/products`)
      .then((response) => {
        let productRows = [];
        console.log('response fetching dashboard products: ', response);
        response.data.products.map((product) =>
          productRows.push({
            id: product._id,
            name: product.name,
            image: product.image.secureUrl,
            brand: product.brand,
            category: product.category,
            price: product.price,
            stock: product.countInStock,
            reviews: product.numReviews,
          })
        );
        setProducts(response.data.products);
        setTableRows(productRows);
        setLoadingProducts(false);
      })
      .catch((error) => {
        console.log('error fetching dashboard products: ', error);
        setLoadingProducts(false);
        setErr({ msg: error.message, status: true });
      });
    // dispatch(getAllProducts());
  }, [success]);

  console.log('table rows: ', tableRows);

  const handleDeleteProduct = (event, rowParams) => {
    console.log('params: ', rowParams);
    if (window.confirm('Are you sure you want to delete the product?')) {
      dispatch(deleteProduct(rowParams.id));
      dispatch(deleteProductReset());
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <div className='products'>
      {err.status && (
        <h1 className='text-lg text-center bg-rose-600 text-white py-2 mb-4'>
          {err.msg}
        </h1>
      )}
      <div className='snackbar'>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}>
          <Alert variant='filled' onClose={handleClose} severity='success'>
            Product Deleted Successfully!
          </Alert>
        </Snackbar>
      </div>
      <div className='products__header'>
        <h2 className='text-2xl font-semibold text-cyan-900'>All Products</h2>
        <Button variant='outlined' size='small'>
          <Link to='/dashboard/products/add'>Add Product</Link>
        </Button>
      </div>
      <div className='products__table'>
        {loadingProducts ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <DataGrid
            rows={tableRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight={true}
          />
        )}
      </div>
    </div>
  );
}

export default Products;
