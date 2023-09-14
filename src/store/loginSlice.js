import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  expence : null,
  empData: null
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login : (state, action)=>{
        state.data = action.payload;
    },
    expenceData : (state, action)=>{
        state.expence = action.payload;
    },
    employeeDetails : (state, action)=>{
      state.empData = action.payload;
  },
  },
})

export const { login, expenceData, employeeDetails } = loginSlice.actions
export default loginSlice.reducer