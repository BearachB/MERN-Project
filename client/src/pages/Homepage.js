import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate, Link } from 'react-router-dom'
import recordImage from './photos/pexels-miguel-á-padriñán-167092.jpg'
import SplashPageImage from '../components/styling/SplashPageImage'

const Homepage = () => {

  return (
    <div class="homepage-content">
      <div classname="background-image">
        {/* <img src={recordImage} fluid></img> */}
        <SplashPageImage />
      </div>
    </div>
  )
}

export default Homepage
