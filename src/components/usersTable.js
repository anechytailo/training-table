import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditUserForm from "./editUserForm";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
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
  const [rows, setRows] = useState(props.usersList);
  const [deletedRows, setDeletedRows] = useState([]);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [editableUser, setEditableUser] = useState({});

  const rowSelectionHandler = (e) => {
    setDeletedRows(e);
  };

  const deletePost = async (id) => {
    await fetch(`https://63a19d4fba35b96522e2ff4e.mockapi.io/users/${id}`, {
      method: "DELETE",
    });
    props.onDelete(true);
  };

  const delHandler = () => {
    const selectedIDs = new Set(deletedRows);
    setRows(
      rows.filter((item) => {
        const isInArray = selectedIDs.has(`${item.userId}-${item.id}`);
        if (isInArray) {
          deletePost(item.id);
        }
        return !isInArray;
      })
    );
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
          rows={rows}
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
