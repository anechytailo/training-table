import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';

import { IPerson, UserTable } from '../types/table';

import EditUserForm from './editUserForm';
import { dataGridActions } from '../store/usersList-slice';

const UsersTable = () => {
  const [deletedRows, setDeletedRows] = useState<GridSelectionModel>([]);

  const [formIsVisible, setFormIsVisible] = useState<boolean>(false);
  const initialEditableUser = {
    id: '',
    userId: '',
    name: '',
    age: 0,
  };
  const [editableUser, setEditableUser] = useState<IPerson>(initialEditableUser);

  const dispatch = useDispatch();
  const dataGrigColumns = useSelector((state: UserTable) => state.usertData.columns);
  const dataGrigRows = useSelector((state: UserTable) => state.usertData.rows);
  const isDataGrigRendered = useSelector((state: UserTable) => state.usertData.renderTable);

  const fetchData = async () => {
    const response = await axios.get('https://63a19d4fba35b96522e2ff4e.mockapi.io/users');
    const { data } = response;
    return data;
  };

  const fetchUserData = async () => {
    try {
      const usersData = await fetchData();
      dispatch(dataGridActions.configureUsersList(usersData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isDataGrigRendered]);

  const rowSelectionHandler = (event: GridSelectionModel) => {
    setDeletedRows(event);
  };

  const deletePost = async (id: string) => {
    await axios.delete(`https://63a19d4fba35b96522e2ff4e.mockapi.io/users/${id}`);
  };

  const delHandler = () => {
    const selectedIDs = new Set(deletedRows);
    dataGrigRows.filter((item: IPerson) => {
      const isInDelArray: boolean = selectedIDs.has(`${item.userId}-${item.id}`);
      if (isInDelArray) {
        deletePost(item.id as string);
        dispatch(dataGridActions.reRender());
      }
    });
  };

  const rowEditHandler = (event: any) => {
    setEditableUser(event.row);
    setFormIsVisible(true);
  };

  const formCancelHandler = () => {
    setFormIsVisible(false);
  };

  return (
    <>
      <Box sx={{ height: 400, width: 'auto' }}>
        <DataGrid
          rows={dataGrigRows}
          columns={dataGrigColumns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => `${row.userId}-${row.id}`}
          checkboxSelection
          onSelectionModelChange={rowSelectionHandler}
          onRowDoubleClick={rowEditHandler}
        />
      </Box>
      <div className='buttons'>
        <button className='button' onClick={delHandler} disabled={!deletedRows.length}>
          Remove Row(s)
        </button>
      </div>
      {formIsVisible && <EditUserForm onClose={formCancelHandler} user={editableUser} />}
    </>
  );
};

export default UsersTable;
