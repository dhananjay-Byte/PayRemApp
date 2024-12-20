import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL_BASE

const initialState = {
    loading: false,
    response: null,
    error: null
}

export const registerUser = createAsyncThunk('users/registerUser', async (data) => {

    try {
        const response = await axios.post(`${apiURL}/v1/user/register`, data)
        return response;
        
    } catch (error) {
        return error.response.status;
    }
       
        

})

export const RegisterUserSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        removeStatus:(state)=>{
            state.response = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.response = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || "Something went Wrong!"
            })
    }
})

export const {removeStatus} = RegisterUserSlice.actions

export default RegisterUserSlice.reducer