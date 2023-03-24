import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './Orders.css';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import moment from 'moment';

function Orders() {
  const columns = [
    {
      field: 'name',
      headerName: 'Customer',
      width: 130,
      flex: 1,
      align: 'center',
      minWidth: 200,
      headerAlign: 'center',
      cellClassName: 'test-class',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      flex: 1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <p
            className={`p-1 rounded text-white text-sm font-semibold ${
              params.row.status === 'pending'
                ? 'bg-orange-600'
                : params.row.status === 'delivered'
                ? 'bg-teal-700'
                : 'bg-rose-700'
            }`}>
            {params.row.status}
          </p>
        );
      },
    },
    {
      field: 'isPaid',
      headerName: 'Is Paid',
      width: 130,
      flex: 1,
      minWidth: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      type: 'number',
      flex: 1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      minWidth: 100,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return <p>{moment(params.row.createdAt).format('LL')}</p>;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      align: 'center',
      minWidth: 80,
      headerAlign: 'center',
      flex: 0.75,
      renderCell: (params) => {
        return (
          <>
            <EditIcon
              className='cursor-pointer text-indigo-800'
              onClick={(e) => handleEditOrder(e, params.row)}
              title='Edit'
            />
          </>
        );
      },
    },
  ];
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableRows, setTableRows] = useState([]);

  const handleEditOrder = (e, params) => {
    // alert('edit order clicked');
    // console.log(params);
    history.push(`/dashboard/orders/${params.id}/edit`);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/dashboard/orders')
      .then((response) => {
        let dataRows = [];
        console.log('order response: ', response.data);
        response.data.orders.map((order) =>
          dataRows.push({
            id: order._id,
            isPaid: order.isPaid,
            name: order.user.name,
            createdAt: order.createdAt,
            status: order.status,
            totalPrice: order.totalPrice,
          })
        );
        // console.log('Data Rows: ', dataRows);
        setOrders(response.data.orders);
        setTableRows(dataRows);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  console.log(orders);
  return (
    <div className='w-full max-w-7xl mx-auto'>
      <div className='pb-4 border-b border-b-slate-300'>
        <h1 className='text-3xl font-semibold text-zinc-700'>Orders</h1>
      </div>

      <div className='orders__table'>
        {loading ? (
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
            // onSelectionModelChange={(ids) => {
            //   setRowIds(ids);
            // }}
          />
        )}
      </div>
    </div>
  );
}

export default Orders;
