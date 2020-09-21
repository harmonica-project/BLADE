
import React, { PureComponent } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import favicon from "../../../static/vendor/favicon.png";
import './NavbarLayout.css';

/**
 * NavbarLayout: template for BLADE navbar
 *
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class NavbarLayout extends PureComponent {
    render() {
        return (
            <Navbar bg="light" expand="lg" id="navbar">
                <Navbar.Brand href=".">
                <img
                    src={favicon}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt=""
                />
                </Navbar.Brand>
                <Navbar.Brand href=".">The BLADE project</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href=".">Home</Nav.Link>
                    <Nav.Link href="/recommendation">Get recommandation</Nav.Link>
                    <Nav.Link href="/knowledge_base">Knowledge base</Nav.Link>
                    <Nav.Link href="/publications">Associated Publications</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    };
}

export default NavbarLayout;