import './App.css';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from "react-router-dom";
import LoginComponent from './Components/loginComponent';
import SignUpComponent from './Components/signupComponent';
import EmailVerificationHeader from './Pages/emailVerificationHeader';
import ReminderPage from './Pages/RemindersPage';
import ScheduledRemindersPage from './Pages/ScheduledRemindersPage';
import HistoryPage from './Pages/HistoryPage';
import DashboardPage from './Pages/DashboardPage';
import ProtectedRoute from './Components/protectedRoute';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<LoginComponent />} />
        <Route path='/register' element={<SignUpComponent />} />
        <Route path='/emailVerification' element={<EmailVerificationHeader />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>

            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path='/reminders' element={
          <ProtectedRoute>

            <ReminderPage />
          </ProtectedRoute>
        } />
        <Route path='/schedule-reminders' element={
          <ProtectedRoute>

            <ScheduledRemindersPage />
          </ProtectedRoute>
        } />
        <Route path='/reminders-history' element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
