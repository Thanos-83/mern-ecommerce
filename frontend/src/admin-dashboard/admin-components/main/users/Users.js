import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from 'react-router-dom';
import { Avatar, Skeleton } from '@mui/material';
import './Users.css';
function Users() {
  const columns = [
    {
      field: ' avatar',
      headerName: 'User',
      minWidth: 240,
      flex: 1,

      renderCell: (params) => {
        return (
          <div className='user__name'>
            <Avatar alt='Remy Sharp' src={`${params.row.avatar}`} />
            <p>{params.row.name}</p>
          </div>
        );
      },
    },
    {
      field: 'orders',
      headerName: '# Orders',
      minWidth: 80,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      cellClassName: 'test-class',
      // renderCell: (params) => {
      //   return <>{params.row.orders.length}</>;
      // },
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'isAdmin',
      headerName: 'Admin',
      minWidth: 80,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      minWidth: 80,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 0.75,
      renderCell: (params) => {
        return (
          <>
            <EditIcon
              onClick={(e) => handleEditUser(e, params.row)}
              title='Edit'
            />
          </>
        );
      },
    },
  ];
  const history = useHistory();
  // const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableRows, setTableRows] = useState([]);

  const handleEditUser = (e, params) => {
    // alert('edit order clicked');
    // console.log(params);
    history.push(`/dashboard/users/${params.id}`);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/dashboard/users')
      .then((response) => {
        let dataRows = [];
        console.log('order response: ', response);
        response.data.users.map((user) =>
          dataRows.push({
            id: user._id,
            avatar: user.avatar
              ? user.avatar
              : 'https://robohash.org/ullamtemporalabore.png?size=50x50&set=set1',
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            orders: user.orders.length,
          })
        );
        // console.log('Data Rows: ', dataRows);
        // setUsers(response.data.users);
        setTableRows(dataRows);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className='w-full max-w-7xl mx-auto'>
      <div className='pb-4 border-b border-b-slate-300'>
        <h1 className='text-3xl font-semibold text-zinc-700'>Users</h1>
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

export default Users;
