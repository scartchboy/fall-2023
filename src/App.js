import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './auth/login/Login';
import SignUp from './auth/SignUp/SignUp';
import AdminView from './admin/AdminView';
import './App.css'
import Profile from './common/Profile/Profile';
import SearchPage from './common/SearchPage/SearchPage';

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
