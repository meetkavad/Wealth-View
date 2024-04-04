import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { colors } from "../values/colors";
import { Link } from "react-router-dom";

function Navigation() {
    const linkStyle = {
        fontWeight: "600",
        fontSize: "20px",
        fontFamily: "MuseoModerno",
        color: colors.white,
        marginRight: "5rem",
    };

    return (
        <Navbar
            expand="lg"
            style={{ backgroundColor: colors.blue }}
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
                        color: colors.white,
                    }}
                >
                    Wealth View
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto" variant="tabs">
                        <Nav.Link
                            as={Link}
                            style={{ ...linkStyle, fontWeight: "400" }}
                            to="/about_us"
                        >
                            About Us
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            style={{ ...linkStyle, fontWeight: "400" }}
                            to="/personal_info"
                        >
                            Link
                        </Nav.Link>
                        <Nav.Link
                            style={{
                                ...linkStyle,
                                marginRight: "0",
                                fontWeight: "400",
                            }}
                            href="#"
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
