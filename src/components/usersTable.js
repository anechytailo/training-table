import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

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
  const rows = props.usersList;
  const deletePost = async (id) => {
    await fetch(`https://63a19d4fba35b96522e2ff4e.mockapi.io/users/${id}`, {
      method: "DELETE",
    });
    props.onDelete(true);
  };

  const removeUserHandler = (id) => {
    deletePost(id);
  };
  console.log(rows);

  return (
    <>
      <Box sx={{ height: 400, width: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => {console.log(row); return {id: row.userId}}}
          //getRowId={row => row.id}
        />
      </Box>

      <table>
        <thead>
          <tr key="header">
            <th key="header-id">User Id</th>
            <th key="header-name">User Name</th>
            <th key="header-age">User Age</th>
          </tr>
        </thead>
        <tbody>
          {props.usersList.map((user) => {
            return (
              <tr key={user.id}>
                <td className="user-id" key={`${user.id}-id`}>
                  {user.id}
                </td>
                <td className="user-name" key={`${user.id}-name`}>
                  {user.name}
                </td>
                <td key={`${user.id}-age`}>{user.age}</td>
                <td>
                  <button
                    onClick={() => {
                      removeUserHandler(user.id);
                    }}
                  >
                    {"\u274C"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UsersTable;
