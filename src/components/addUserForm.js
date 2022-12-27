import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalForm = (props) => {
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
      props.onSend({
        userId: uuidv4(),
        name: userName,
        age: userAge,
      });
      props.onClose();
    }
  };

  return (
    <form onSubmit={addUserHandler} className="modal add-user-form">
      {props.isError && <p>We couldn't send your data. Please try again!</p>}
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

const AddUserForm = (props) => {
  const [error, setError] = useState(null);

  const sendUsersData = async (userData) => {
    setError(null);
    try {
      await axios.post("https://63a19d4fba35b96522e2ff4e.mockapi.io/users", userData);
      props.onConfirm(true);
    } catch (error) {
      setError(error.message);
      props.onConfirm(false);
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalForm onClose={props.onClose} onSend={sendUsersData} isError={error}/>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default AddUserForm;
