import Button from '@restart/ui/esm/Button'
import React from 'react'
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'
// import { useNavigate} from 'react-router-dom'


import Toggle from '../Toggle'

const Header = () => {

  return (
    <div>
      {/* Navbar structure taken from https://react-bootstrap.github.io/components/navbar/*/}
      <Navbar bg="light" expand="lg" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">D&B's Music App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/search-nl">Search</Nav.Link>
              <Nav.Link href="/songs-nl">Song List</Nav.Link>
              <NavDropdown title="Account" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              </NavDropdown>
              <br/>
              {/* <Nav.Link href="#"> */}
                <button>Change Theme</button>
                <Toggle/>

              {/* </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
