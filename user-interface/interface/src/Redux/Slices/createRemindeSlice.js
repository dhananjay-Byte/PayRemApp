import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import Cookie from 'js-cookie'

const apiURL = process.env.REACT_APP_API_URL_BASE

const initialState = {
    loading:false,
    server_response:null,
    error:null
}

export const saveReminder = createAsyncThunk('reminder/saveReminder',async(data)=>{
    try {
        const response = await axios.post(`${apiURL}/v1/user/reminder/create`,data,{
            headers:{
                Authorization:`Bearer ${Cookie.get('token')}`
            }
        })
        return response.status
    } catch (error) {
        console.log(`checking error: ${error.response}`)
    }
})

export const createReminderSlice = createSlice({
    name:'saveReminder',
    initialState,
    reducers:{
        removeResponse:(state)=>{
            state.server_response = null
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(saveReminder.pending,(state)=>{
                state.loading = true;
            })
            .addCase(saveReminder.fulfilled,(state,action)=>{
                state.server_response = action.payload;
                state.error = null;
            })
            .addCase(saveReminder.rejected,(state)=>{
                state.error = 'something went wrong!';
                state.loading = false;
            })
    }
})

export const {removeResponse} = createReminderSlice.actions
export default createReminderSlice.reducer