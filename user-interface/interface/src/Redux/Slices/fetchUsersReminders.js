import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL_BASE

const initialState = {
    loading:false,
    userRemindersData:null,
    error:null
}

export const fetchReminders = createAsyncThunk('user/fetchReminders', async (data, thunkAPI) => {
    try {
        const response = await axios.get(`${apiURL}/v1/user/reminder/fetch`, {
            params: data, // Pass query parameters here
        });
        return response.data; // Return the response data for further use
    } catch (error) {
        
        return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
});

export const fetchReminderSlice = createSlice({
    name:'userReminders',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchReminders.pending,(state)=>{
                state.loading = true
            })
            .addCase(fetchReminders.fulfilled,(state,action)=>{
                state.userRemindersData = action.payload
                state.error = null
            })
            .addCase(fetchReminders.rejected,(state,action)=>{
                state.error = action.payload
                state.loading = false;
            })
    }
})

export default fetchReminderSlice.reducer