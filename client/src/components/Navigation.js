import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { colors } from "../values/colors";

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
                    <Nav
                        className="m-auto"
                        variant="tabs"
                        defaultActiveKey="/home"
                    >
                        <Nav.Link
                            href="#home"
                            style={{ ...linkStyle, fontWeight: "400" }}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            eventKey="link"
                            style={{ ...linkStyle, fontWeight: "400" }}
                        >
                            Link
                        </Nav.Link>
                        <Nav.Link
                            eventKey="login/signup"
                            style={{
                                ...linkStyle,
                                marginRight: "0",
                                fontWeight: "400",
                            }}
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
