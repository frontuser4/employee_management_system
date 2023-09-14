import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  empData: []
}

const empSlice = createSlice({
  name: 'empData',
  initialState,
  reducers: {
    employeeDetails : (state, action)=>{
      state.empData = action.payload;
  },
  }
});

export const { employeeDetails } = empSlice.actions;
export default empSlice.reducer;