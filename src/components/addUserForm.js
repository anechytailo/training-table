import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddUserForm = (props) => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [error, setError] = useState(null);

  const sendUsersData = async (userData) => {
    setError(null);
    console.log(userData);
    try {
      const response = await fetch("https://63a19d4fba35b96522e2ff4e.mockapi.io/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      props.onConfirm(true);
    } catch (error) {
      setError(error.message);
      props.onConfirm(false);
    }
  };

  const nameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setUserAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    if (userName !== "" && userAge !== "") {
      sendUsersData({
        id: uuidv4(),
        name: userName,
        age: userAge,
      });
      props.onClose();
    }
  };

  return (
    <form onSubmit={addUserHandler} className="add-user-form">
      {error && <p>We couldn't send your data. Please try again!</p>}
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
        <button className="button">Submit</button>
      </div>
    </form>
  );
};

export default AddUserForm;
