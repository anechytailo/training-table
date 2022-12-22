import React from "react";
//import { DataGrid } from '@mui/x-data-grid';

const UsersTable = (props) => {
  const deletePost = async (id) => {
    await fetch(`https://63a19d4fba35b96522e2ff4e.mockapi.io/users/${id}`, { method: 'DELETE' });
}

  const removeUserHandler = (id) => {
    console.log(id);
    deletePost(id)
  };

  return (<>
  {/* <DataGrid
  rows={props.usersList}
  columns={[{field:"name", headerName: "User Name"}, {field:"age", headerName: "User Age"}]}
  pageSize={5}
  rowsPerPageOptions={[5]}
  checkboxSelection
/> */}
  
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
                <button onClick={() => {removeUserHandler(user.id)}}>{"\u274C"}</button>
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
