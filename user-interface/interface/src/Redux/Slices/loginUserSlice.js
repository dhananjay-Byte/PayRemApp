import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL_BASE

const initialState = {
    loading: false,
    userData:null,
    error: null
}


export const fetchUser = createAsyncThunk('users/fetchUser', async (data) => {
    try {
        const response = await axios.post(`${apiURL}/v1/user/login`, data)
        Cookies.set('token', response.data.token, { secure: true, sameSite: 'Strict' });
        return response
    } catch (error) {
        return error.response;
    }

})

export const LoginUserSlice = createSlice({
    name: 'loginUser',
    initialState,
    reducers: {
        removeToken:(state)=>{
            state.token = null
        },
        removeError:(state)=>{
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.userData = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || "Invalid Credentials!"
            })
    }
})

export const {removeToken,removeError} = LoginUserSlice.actions

export default LoginUserSlice.reducer