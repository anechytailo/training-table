import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { IPerson, AddUserProps } from '../types/table';

import Modal from '../UI/Modal';
import { dataGridActions } from '../store/usersList-slice';

const AddUserForm = (props: AddUserProps) => {
  const [userName, setUserName] = useState<string>('');
  const [userAge, setUserAge] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const ageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserAge(event.target.value);
  };

  const sendUsersData = async (userData: IPerson) => {
    setError('');
    try {
      await axios.post('https://63a19d4fba35b96522e2ff4e.mockapi.io/users', userData);
      dispatch(dataGridActions.reRender());
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const addUserHandler = (event: FormEvent) => {
    event.preventDefault();
    if (userName !== '' && +userAge >= 0) {
      sendUsersData({
        userId: uuidv4(),
        name: userName,
        age: +userAge,
      });
      props.onClose();
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <form onSubmit={addUserHandler} className='modal add-user-form'>
        {error && <p>We couldn't send your data. Please try again!</p>}
        <h3>Add information about user</h3>
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

export default AddUserForm;
