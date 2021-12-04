import React from 'react'
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap'


import Toggle from '../Toggle'

const Header = () => {

  function handleLogOut() {
    localStorage.setItem('token', '')
    localStorage.clear()
  }
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
              <Nav.Link href="/search">Search</Nav.Link>
              <Nav.Link href="/songs">Song List</Nav.Link>
              <NavDropdown title="Account" id="navbarScrollingDropdown">

                <NavDropdown.Item href="/fav-page">My Favourites</NavDropdown.Item>
                <NavDropdown.Item href="/dashboard">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogOut} href="/login">
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
              <br/>
                <Toggle/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
