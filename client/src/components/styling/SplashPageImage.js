import React from 'react'
import '../../bootstrap.min.css'

const BackgroundImagePage = () => {
  return (
    <div className="bg">
      <div class="homepage-buttons">
        <button
          class="btn btn-primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            window.location.href = '/login'
          }}
        >
          Log In
        </button>
        <button
          class="btn btn-primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            window.location.href = '/register'
          }}
        >
          Register for an Account
        </button>
        <button
          class="btn btn-primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            window.location.href = '/songs'
          }}
        >
          Song List
        </button>
        <button
          class="btn btn-primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            window.location.href = '/search'
          }}
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default BackgroundImagePage
