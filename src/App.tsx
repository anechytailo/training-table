import React, { useEffect, useState } from "react";

import UsersTable from "./components/usersTable";
import AddUserForm from "./components/addUserForm";

// import logo from './logo.svg';
import "./App.css";

function App() {
  const [usersList, setUsersList] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);

  const fetchUsersHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://63a19d4fba35b96522e2ff4e.mockapi.io/users");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      let loadedUsers = [];
      for (const key in data) {
        loadedUsers.push({
          id: data[key].id,
          name: data[key].name,
          age: data[key].age,
        });
      }
      setUsersList(loadedUsers);
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsersHandler();
  }, [isNewUser]);

  const confirmHandler = (isSubmitted: boolean) => {
    setIsNewUser(isSubmitted);
  }

  const showFormHandler = () => {
    setFormIsVisible(true);
  };
  const formCancelHandler = () => {
    setFormIsVisible(false);
  };

  let content;

  content = <p>Found no Content!</p>;

  if (usersList.length) {
    content =<UsersTable usersList={usersList} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className="App">
      <div className="form-wrapper">
        {formIsVisible && (
          <AddUserForm onClose={formCancelHandler} onConfirm={confirmHandler} />
        )}
        {!formIsVisible && (
          <button className="button add" onClick={showFormHandler}>
            Add a User +
          </button>
        )}
      </div>
      {content}
    </div>
  );
}

export default App;
