import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditUserForm from "./editUserForm";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 150,
    editable: true,
  },
];

const UsersTable = (props) => {
  const [usersList, setUsersList] = useState([{}]);
  const [isRemoved, setIsRemoved] = useState(false);

  const [deletedRows, setDeletedRows] = useState([]);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [editableUser, setEditableUser] = useState({});

  const fetchUsersHandler = async () => {
    try {
      const response = await axios.get("https://63a19d4fba35b96522e2ff4e.mockapi.io/users");
      const { data } = response;
      setUsersList(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUsersHandler();
  }, [isRemoved, props.isNewUser]);

  const rowSelectionHandler = (e) => {
    setDeletedRows(e);
  };

  const deletePost = async (id) => {
    await axios.delete(`https://63a19d4fba35b96522e2ff4e.mockapi.io/users/${id}`);
    setIsRemoved(true);
  };

  const delHandler = () => {
    const selectedIDs = new Set(deletedRows);
    usersList.filter((item) => {
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
          rows={usersList}
          columns={columns}
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
