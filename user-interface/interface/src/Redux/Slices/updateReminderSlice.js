import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookie from 'js-cookie'
const apiURL = process.env.REACT_APP_API_URL_BASE

const initialState = {
    loading: false,
    update_reminder_response: null,
    error: null,
    reminderIds: []
}

export const updateReminderCall = createAsyncThunk('/user/updateReminder', async (data) => {
    try {
        const response = await axios.post(`${apiURL}/v1/user/reminder/update`, data, {
            headers: {
                Authorization: `Bearer ${Cookie.get('token')}`
            }
        })
        return response.status
    } catch (error) {
        return error.response
    }
})

export const updateReminderSlice = createSlice({
    name: "updateReminder",
    initialState,
    reducers: {
        removeResponse: (state) => {
            state.update_reminder_response = null;
        },
        addReminderId: (state, action) => {
            state.reminderIds.push(action.payload);
        },
        removeReminderId: (state, action) => {
            const index = state.reminderIds.indexOf(action.payload);
            if (index !== -1) {
                state.reminderIds.splice(index, 1);
            }

            if (state.reminderIds.length === 0) {
                state.reminderIds = [];
            }

        },
        emptyReminderId: (state) => {
            state.reminderIds = [];
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(updateReminderCall.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateReminderCall.fulfilled, (state, action) => {
                state.error = null;
                state.update_reminder_response = action.payload
            })
            .addCase(updateReminderCall.rejected, (state, acion) => {
                state.error = acion.error;
                state.loading = false;
            })
    }
})

export const { removeResponse, addReminderId, removeReminderId, emptyReminderId } = updateReminderSlice.actions
export default updateReminderSlice.reducer