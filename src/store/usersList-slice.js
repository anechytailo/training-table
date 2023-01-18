import { createSlice } from '@reduxjs/toolkit';

const initialDataGridState = {
  renderTable: true,
  columns: [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 150,
      editable: true,
    },
  ],
  rows: [],
};

const dataGridSlice = createSlice({
  name: 'usersDataGrid',
  initialState: initialDataGridState,
  reducers: {
    configureUsersList(state, action) {
      state.rows = action.payload;
      state.renderTable = false;
    },
    reRender(state) {
      state.renderTable = true;
    },
  },
});

export const dataGridActions = dataGridSlice.actions;

export default dataGridSlice.reducer;
