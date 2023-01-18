import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { Person, EditProps } from '../api/table';

import Modal from '../UI/Modal';
import { dataGridActions } from '../store/usersList-slice';

const EditUserForm = (props: EditProps) => {
  const [userName, setUserName] = useState(props.user.name);
  const [userAge, setUserAge] = useState(props.user.age);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const ageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserAge(+event.target.value);
  };

  const sendUsersData = async (userData: Person) => {
    setError('');
    try {
      await axios.put(
        `https://63a19d4fba35b96522e2ff4e.mockapi.io/users/${props.user.id}`,
        userData
      );
      dispatch(dataGridActions.reRender());
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const updateUserHandler = (event: FormEvent) => {
    event.preventDefault();
    if (userName !== '' && userAge >= 0) {
      sendUsersData({
        name: userName,
        age: userAge,
      });
      props.onClose();
    }
  };

  return (
    <Modal>
      <form onSubmit={updateUserHandler} className='modal add-user-form'>
        {error && <p>We couldn't send your data. Please try again!</p>}
        <h3>Update information about {props.user.name}</h3>
        <div>
          <label htmlFor='id'>User Id:</label>
          <input type='text' id='id' value={props.user.id} readOnly />
        </div>
        <div>
          <label htmlFor='name'>User Name:</label>
          <input
            type='text'
            id='name'
            value={userName}
            placeholder='Ex. John'
            onChange={nameChangeHandler}
          />
        </div>
        <div>
          <label htmlFor='age'>User Age:</label>
          <input
            type='number'
            id='age'
            value={userAge}
            placeholder='Ex. 26'
            onChange={ageChangeHandler}
          />
        </div>
        <div className='buttons'>
          <button className='button cancel' onClick={props.onClose}>
            Cancel
          </button>
          <button className='button'>Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditUserForm;
