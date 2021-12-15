import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";


const NavigationSidebar = () => {
    return (
        <>
            <Navbar collapseOnSelect bg="dark" variant={"dark"}>
                <Container fluid >
                    <Navbar.Brand href="../">Playlist</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="../home">Home</Nav.Link>
                            <Nav.Link href="../search">Search</Nav.Link>
                            <Nav.Link href="../profile">Profile</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="../privacy">About Privacy</Nav.Link>
                            <Nav.Link href="../register">Register</Nav.Link>
                            <Nav.Link href="../login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
export default NavigationSidebar;
