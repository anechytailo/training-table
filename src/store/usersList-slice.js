import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialDataGridState = {
  updated: false,
  columns: [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 150,
      editable: true,
    },
  ],
  rows: [],
};

const dataGridSlice = createSlice({
  name: "usersDataGrid",
  initialState: initialDataGridState,
  reducers: {
    configureUsersList(state, action) {
      state.rows = action.payload;
      state.updated = true;
    },
  },
});

export const fetchUserData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get("https://63a19d4fba35b96522e2ff4e.mockapi.io/users");
      const { data } = response;
      return data;
    };

    try {
      const usersData = await fetchData();
      dispatch(dataGridActions.configureUsersList(usersData));
    } catch (error) {
      console.log(error);
    }
  };
};

export const dataGridActions = dataGridSlice.actions;

export default dataGridSlice.reducer;
