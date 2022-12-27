import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalForm = (props) => {
  const [userName, setUserName] = useState(props.user.name);
  const [userAge, setUserAge] = useState(props.user.age);

  const nameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setUserAge(event.target.value);
  };

  const updateUserHandler = (event) => {
    event.preventDefault();
    if (userName !== "" && userAge !== "") {
      props.onSend({
        name: userName,
        age: userAge,
      });
      props.onClose();
    }
  };

  return (
    <form onSubmit={updateUserHandler} className="modal add-user-form">
      {props.isError && <p>We couldn't send your data. Please try again!</p>}
      <h3>Update information about {props.user.name}</h3>
      <div>
        <label htmlFor="id">User Id:</label>
        <input type="text" id="id" value={props.user.id} readOnly />
      </div>
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

const EditUserForm = (props) => {
  const [error, setError] = useState(null);

  const sendUsersData = async (userData) => {
    setError(null);
    props.onConfirm(false);
    try {
      await axios.put(
        `https://63a19d4fba35b96522e2ff4e.mockapi.io/users/${props.user.id}`,
        userData
      );
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
        <ModalForm
          onClose={props.onClose}
          onSend={sendUsersData}
          isError={error}
          user={props.user}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default EditUserForm;
