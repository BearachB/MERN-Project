import React from 'react'
import { Card } from 'react-bootstrap'
import {
  FaGithub,
  FaSpotify,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa'

const Footer = () => (
  <footer>
    <Card>
      <Card.Header>
        Web Application Architectures - MERN Project
        </Card.Header>
        <div id="footer-icon-grid">
          <p />
          <a href="https://github.com/BearachB">{<FaGithub />}</a>
          <a href="https://spotify.com" >{<FaSpotify />}</a>
          <a href="https://youtube.com">{<FaYoutube />}</a>
          <a href="https://linkedin.com">{<FaLinkedin />}</a>
          <a href="https://facebook.com/">{<FaFacebook />}</a>
          <a href="https://instagram.com/">{<FaInstagram />}</a>
        </div>


      <Card.Body>
        <footer>&copy; 2021 Bearach Byrne & Daragh Kneeshaw</footer>
      </Card.Body>
    </Card>
  </footer>
)
export default Footer
