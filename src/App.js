import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './auth/login/Login';
import SignUp from './auth/SignUp/SignUp';
import AdminView from './admin/AdminView';
import './App.css'
import Profile from './common/Profile/Profile';
import SearchPage from './common/SearchPage/SearchPage';
import ForgotPassword from './auth/forgorPassword/ForgotPassword';
import TwoAuth from './auth/TwoAuth/TwoAuth';
import CheckEmail from './auth/CheckEmail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin-view" element={<AdminView />} />
          <Route path="/profile-page" element={<Profile />} />
          <Route path="/search-page" element={<SearchPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/two-auth" element={<TwoAuth />} />
          <Route path="/check-email" element={<CheckEmail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
