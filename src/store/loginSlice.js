import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login : (state, action)=>{
        state.data = action.payload;
    }
  },
})


export const { login } = loginSlice.actions
export default loginSlice.reducer