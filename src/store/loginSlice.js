import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
  expence : null
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
    }
  },
})


export const { login, expenceData } = loginSlice.actions
export default loginSlice.reducer