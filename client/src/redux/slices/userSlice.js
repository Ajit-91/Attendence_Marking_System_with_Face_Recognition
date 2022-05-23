import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user : null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SET_USER : (state, {payload})=>{
            state.user = payload
            localStorage.setItem('token', payload?.token)
        },
        LOGOUT : (state)=>{
            state.user = null
            localStorage.removeItem('token')
        }
    }
});

export const { SET_USER, LOGOUT } = userSlice.actions;
export const selectUser = state => state?.user?.user
export default userSlice.reducer