import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import EditUserForm from "./editUserForm";
import { fetchUserData } from "../store/usersList-slice";

const UsersTable = (props) => {
  const [isRemoved, setIsRemoved] = useState(false);
  const [deletedRows, setDeletedRows] = useState([]);

  const [formIsVisible, setFormIsVisible] = useState(false);
  const [editableUser, setEditableUser] = useState({});

  const dispatch = useDispatch();
  const dataGrigColumns = useSelector((state) => state.usertData.columns);
  const dataGrigRows = useSelector((state) => state.usertData.rows);
  const isDataGrigUpdated = useSelector((state) => state.usertData.updated);
  console.log(props.isNewUser);

  useEffect(()=>{
    dispatch(fetchUserData());
  },[dispatch, isRemoved, props.isNewUser]);

  const rowSelectionHandler = (e) => {
    setDeletedRows(e);
  };

  const deletePost = async (id) => {
    await axios.delete(`https://63a19d4fba35b96522e2ff4e.mockapi.io/users/${id}`);
    setIsRemoved(true);
  };

  const delHandler = () => {
    const selectedIDs = new Set(deletedRows);
    dataGrigRows.filter((item) => {
      const isInDelArray = selectedIDs.has(`${item.userId}-${item.id}`);
      isInDelArray && deletePost(item.id);
    });
  };

  const rowEditHandler = (e) => {
    setEditableUser(e.row);
    setFormIsVisible(true);
  };

  const formCancelHandler = () => {
    setFormIsVisible(false);
  };

  return (
    <>
      <Box sx={{ height: 400, width: "auto" }}>
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
      <div className="buttons">
        <button className="button" onClick={delHandler} disabled={!deletedRows.length}>
          Remove Row(s)
        </button>
      </div>
      {formIsVisible && (
        <EditUserForm
          onClose={formCancelHandler}
          user={editableUser}
          onConfirm={props.onConfirm}
        />
      )}
    </>
  );
};

export default UsersTable;
