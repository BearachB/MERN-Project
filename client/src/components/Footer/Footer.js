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
          <FaSpotify />
          <FaGithub />
          <FaYoutube />
          <FaLinkedin />
          <FaFacebook />
          <FaInstagram />
        </div>


      <Card.Body>
        <footer>&copy; 2021 Bearach Byrne & Daragh Kneeshaw</footer>
      </Card.Body>
    </Card>
  </footer>
)
export default Footer
