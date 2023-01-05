import React, { useState } from "react";

import UsersTable from "./components/usersTable";
import AddUserForm from "./components/addUserForm";

// import logo from './logo.svg';
import "./App.css";

function App() {
  const [formIsVisible, setFormIsVisible] = useState(false);

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
          <AddUserForm onClose={formCancelHandler} />
        )}
        <div className="form-wrapper">
          <button className="button add" onClick={showFormHandler}>
            Add a User +
          </button>
        </div>
        <UsersTable />
      </>
    </div>
  );
}

export default App;
