import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid';

const AddUserForm = (props) => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");

  const nameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setUserAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    if (userName !== "" && userAge !== "") {
      props.onConfirm({
        id: uuidv4(),
        name: userName,
        age: userAge,
      });
      props.onClose();
    }
  };

  return (
    <form onSubmit={addUserHandler} className="add-user-form">
      <h3>Add information about user</h3>
      <div>
        <label htmlFor="name">User Name:</label>
        <input
          type="text"
          id="name"
          value={userName}
          placeholder="Ex. John"
          onChange={nameChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="age">User Age:</label>
        <input
          type="number"
          id="age"
          value={userAge}
          placeholder="Ex. 26"
          onChange={ageChangeHandler}
        />
      </div>
      <div className="buttons">
        <button className="button cancel" onClick={props.onClose}>
          Cancel
        </button>
        <button className="button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
