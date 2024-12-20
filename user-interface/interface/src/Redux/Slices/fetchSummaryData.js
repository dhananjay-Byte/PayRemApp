import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookie from 'js-cookie'

const apiURL = process.env.REACT_APP_API_URL_BASE



const initialState = {
    loading: false,
    Data: null,
    error: null
}

export const fetchSummaryData = createAsyncThunk('fetch/summary', async (userId, thunkAPI) => {
    try {
        const response = await axios.get(`${apiURL}/v1/user/reminder/summary?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${Cookie.get('token')}`

            }
        });
        return response.data; // Return the response data for further use
    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
    }
})

export const fetchSummarySlice = createSlice({
    name: 'summaryData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSummaryData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchSummaryData.fulfilled, (state, action) => {
                state.Data = action.payload
                state.error = null
            })
            .addCase(fetchSummaryData.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false;
            })
    }
})

export default fetchSummarySlice.reducer