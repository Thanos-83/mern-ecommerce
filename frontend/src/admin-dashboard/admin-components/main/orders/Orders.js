import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './Orders.css';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@mui/material';

function Orders() {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 130,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 130,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      cellClassName: 'test-class',
    },
    {
      field: 'isDelivered',
      headerName: 'Status',
      width: 130,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'isPaid',
      headerName: 'Is Paid',
      width: 130,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      type: 'number',
      flex: 1,
      // width: 300,
      align: 'center',
      headerAlign: 'center',
      // width: 90,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 0.75,
      renderCell: (params) => {
        return (
          <>
            <EditIcon
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
        console.log('order response: ', response);
        response.data.orders?.map((order) =>
          dataRows.push({
            id: order._id,
            isPaid: order.isPaid,
            name: order.user.name,
            isDelivered: order.isDelivered,
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
    <div className='orders'>
      <h1>Orders</h1>

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
