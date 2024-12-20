import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL_BASE

const initialState = {
    loading:"pending",
    response:null,
    error:null
}

export const generateExcelSheet = createAsyncThunk('reminder/generate-excel',async(id)=>{
    try {
        const response = await axios.get(`${apiURL}/v1/user/reminder/generate-excel`,id)

        console.log('excel sheet response',response)
        return response.data
    } catch (error) {
        console.log('checking error',error.response)
    }
})

export const generateExcelSlice = createSlice({
name:'generatExcel',
initialState,
reducers:{},

extraReducers:(builder)=>{
    builder.
        addCase(generateExcelSheet.pending,(state)=>{
            state.loading = true;
        })
        .addCase(generateExcelSheet.fulfilled,(state,action)=>{
            state.response = action.payload
            state.error = null
        })
        .addCase(generateExcelSheet.rejected,(state,action)=>{
            state.error = action.payload
        })
}
})

export default generateExcelSlice.reducer;  