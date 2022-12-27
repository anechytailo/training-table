import React, { useState } from "react";

import UsersTable from "./components/usersTable";
import AddUserForm from "./components/addUserForm";

// import logo from './logo.svg';
import "./App.css";

function App() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);

  const confirmHandler = (isSubmitted: boolean) => {
    setIsNewUser(isSubmitted);
  };

  const showFormHandler = () => {
    setFormIsVisible(true);
  };
  const formCancelHandler = () => {
    setFormIsVisible(false);
  };

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
        <UsersTable onConfirm={confirmHandler} isNewUser={isNewUser}/>
      </>
    </div>
  );
}

export default App;
