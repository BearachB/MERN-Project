import React, {useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import EditProfile from './pages/EditProfile'
import ResetPassword from './pages/Reset-Password'
import Photos from './pages/Photos'
import ForgotPassword from './pages/ForgotPassword'
// import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Songs from './pages/Songs'
import Search from './pages/Search'
import { keepTheme } from './components/Themes'

const App = () => {
  useEffect(() => {
    keepTheme()
  })

  return (
    <div>
      <Header />
      <main style={{ minHeight: '50px' }}></main>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/editprofile" exact element={<EditProfile />} />
          <Route path="/reset-password" exact element={<ResetPassword />} />
          <Route path="/photos" exact element={<Photos />} />
          <Route path="/songs" exact element={<Songs />} />
          <Route path="/search" exact element={<Search />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
