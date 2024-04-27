import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { colors } from "../values/colors";
import { Link } from "react-router-dom";

function Navigation() {
    const linkStyle = {
        fontWeight: "400",
        fontSize: "20px",
        fontFamily: "MuseoModerno",
        color: colors.purple,
        marginRight: "5rem",
    };

    return (
        <Navbar
            expand="lg"
            style={{backgroundColor: colors.darkPink }}
            variant="dark"
        >
            <Container style={{ marginTop: "2rem" }}>
                <Navbar.Brand
                    as={Link}
                    to="/"
                    style={{
                        fontFamily: "MuseoModerno",
                        fontWeight: "600",
                        fontSize: "30px",
                        color: colors.purple,
                    }}
                >
                    Wealth View
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto" variant="tabs">
                        <Nav.Link as={Link} style={linkStyle} to="/about_us">
                            About Us
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            style={linkStyle}
                            to="/dashboard"
                        >
                            Link
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            style={{
                                ...linkStyle,
                                marginRight: "0",
                            }}
                            to="/login_signup"
                        >
                            Login/Signup
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
