import React, { useEffect, useState } from 'react'
import SplashPageImage from '../components/styling/SplashPageImage'

const Homepage = () => {

  return (
    <div class="homepage-content">
      {/* The homepage content was added via the SplashPageImage component  */}
      <div classname="background-image">
        <SplashPageImage />
      </div>
    </div>
  )
}

export default Homepage
