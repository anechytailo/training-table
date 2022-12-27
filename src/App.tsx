import React, { useEffect, useState } from "react";
import axios from "axios";

import UsersTable from "./components/usersTable";
import AddUserForm from "./components/addUserForm";

// import logo from './logo.svg';
import "./App.css";

function App() {
  const [usersList, setUsersList] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);

  const fetchUsersHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://63a19d4fba35b96522e2ff4e.mockapi.io/users");
      const { data } = response;
      setUsersList(data);
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsersHandler();
  }, [isNewUser, isRemoved]);

  const confirmHandler = (isSubmitted: boolean) => {
    setIsNewUser(isSubmitted);
  };

  const deleteHandler = (isDeleted: boolean) => {
    setIsRemoved(isDeleted);
  };

  const showFormHandler = () => {
    setFormIsVisible(true);
  };
  const formCancelHandler = () => {
    setFormIsVisible(false);
  };

  let content;

  content = <p>Found no Content!</p>;

  // if (usersList.length) {
  //   content = (
  //     <UsersTable usersList={usersList} onDelete={deleteHandler} onConfirm={confirmHandler} />
  //   );
  // }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className="App">
      <>
        {formIsVisible && (
          <AddUserForm onClose={formCancelHandler} onConfirm={confirmHandler} />
        )}
        <div className="form-wrapper">
          <button className="button add" onClick={showFormHandler}>
            Add a User +
          </button>
        </div>
        <UsersTable usersList={usersList} onDelete={deleteHandler} onConfirm={confirmHandler} />
      </>
    </div>
  );
}

export default App;
