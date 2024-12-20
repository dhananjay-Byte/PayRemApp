import { configureStore } from '@reduxjs/toolkit'
import loginUserReducer from './Redux/Slices/loginUserSlice'
import registerUserReducer from './Redux/Slices/registerUserSlice'
import saveReminderReducer from './Redux/Slices/createRemindeSlice'
import updateReminderReducer from './Redux/Slices/updateReminderSlice'
import generateExcelReducer from './Redux/Slices/generateExcelSlice'
import fetchRemindersReducer from './Redux/Slices/fetchUsersReminders'
import fetchSummaryReducer from './Redux/Slices/fetchSummaryData'

export const store = configureStore({
  reducer: {
    loginUser:loginUserReducer,
    register:registerUserReducer,
    saveReminder:saveReminderReducer,
    updateReminder:updateReminderReducer,
    generateExcel:generateExcelReducer,
    userReminders:fetchRemindersReducer,
    summaryData:fetchSummaryReducer
  },
})