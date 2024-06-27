import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import ThemeSwitch from "./ThemeSwitch";
import React from "react";

interface Props {
    theme: String
    setTheme: (theme: String) => void
}

export default ({theme, setTheme}: Props) => <Navbar expand="lg" className="bg-body-tertiary">
    <Container fluid>
        <Navbar.Brand href="#home">Epikinetics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#docs">Docs</Nav.Link>
                <Nav.Link href="#login" disabled>Login</Nav.Link>
                <Nav.Link href="#submit" disabled>Submit dataset</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        <ThemeSwitch theme={theme} setTheme={setTheme}></ThemeSwitch>
    </Container>
</Navbar>