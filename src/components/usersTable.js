import React from "react";

const UsersTable = (props) => {
  const removeUserHandler = (id) => {
    console.log(id);
  };

  return (
    <table>
      <thead>
        <tr key="header">
          <th key="header-name">User Name</th>
          <th key="header-age">User Age</th>
        </tr>
      </thead>
      <tbody>
        {props.usersList.map((user) => {
          return (
            <tr key={user.id}>
              <td className="user-name" key={`${user.id}-name`}>
                {user.name}
              </td>
              <td key={`${user.id}-age`}>{user.age}</td>
              <td>
                <button onClick={() => {removeUserHandler(user)}}>{"\u274C"}</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersTable;
