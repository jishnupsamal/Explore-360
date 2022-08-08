import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import "@fontsource/comfortaa"
import "bootstrap/dist/css/bootstrap.min.css"
import * as style from "../components/index.module.css"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"

function NavBar({ siteTitle }) {
  return (
    <>
      {["xl"].map(expand => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">
              <StaticImage src="../images/logo.png" alt="Explore 360 Logo" width={35} height={35}/>
              {" "}
              <span className={`${style.heading}`}>{siteTitle}</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <span className={`${style.heading}`}>{siteTitle}</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link>
                    <Link to="/">Home</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/location">Location Dashboard</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/bag-pack">Bag Pack</Link>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}

export default NavBar
