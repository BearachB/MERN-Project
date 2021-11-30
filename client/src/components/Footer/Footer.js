import React from 'react'
import {Card} from 'react-bootstrap'

const Footer = () => (
  <footer>
    <Card>
      <Card.Header>Quote</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            &copy; 2021{' '}
          </p>
          <footer>
            Bearach Byrne & Daragh Kneeshaw
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  </footer>
)
export default Footer
