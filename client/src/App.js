import React, {useEffect} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import EditProfile from './pages/EditProfile'
import ResetPassword from './pages/Reset-Password'
import Photos from './pages/Photos'
import Header from './components/Header/Header'
import HeaderNL from './components/Header/HeaderNotLoggedIn'
import Footer from './components/Footer/Footer'
import Songs from './pages/Songs'
import Search from './pages/Search'
import { keepTheme } from './components/Themes'
import FavPage from './pages/addfav'
import Homepage from './pages/Homepage'
import SongsNL from './pages/SongsNL'
import SearchNL from './pages/SearchNL'


const App = () => {
  useEffect(() => {
    keepTheme()  // for dark/light theme
  })

  const token = localStorage.getItem('token')  // get token from local storage


    return (
    <div>
      {token? (   // if the user is logged in, show specific header
      <Header />
      ) : (
      <HeaderNL />
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/editprofile" exact element={<EditProfile />} />
          <Route path="/reset-password" exact element={<ResetPassword />} />
          <Route path="/photos" exact element={<Photos />} />
          <Route path="/songs" exact element={<Songs />} />
          <Route path="/search" exact element={<Search />} />
          <Route path="/fav-page" exact element={<FavPage />} />
          <Route path="/songs-nl" exact element={<SongsNL />} />
          <Route path="/search-nl" exact element={<SearchNL />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
