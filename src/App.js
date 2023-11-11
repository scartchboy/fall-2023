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
import CustomAppBar from './components/CustomAppBar/CustomAppBar';
import Protected from './auth/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomAppBar />} >
            <Route index element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin-view" element={<Protected><AdminView /></Protected>} />
            <Route path="/profile-page" element={<Protected><Profile /> </Protected>} />
            <Route path="/search-page" element={<SearchPage />} />
            <Route path="/two-auth" element={<TwoAuth />} />
            <Route path="/check-email" element={<CheckEmail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
