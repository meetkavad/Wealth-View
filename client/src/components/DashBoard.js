import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { colors } from "../values/colors";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

function Dashboard() {
    const navigate = useNavigate();
    const upperDiv = {
        width: "100vw",
        height: "85vh",
        backgroundColor: colors.white,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overFlow: "hidden",
    };
    const dashboardStyle = {
        width: "60rem",
        backgroundColor: "#fff", // Set your preferred background color
        marginTop: "-8rem",
    };
    const cardStyle = {
        width: "200px",
        height: "150px",
        background: "#ffffff", // Set card background color
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
        margin: "10px", // Adjust spacing between cards
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
        fontWeight: "bold",
    };
    const reportbtn = {
        position: "relative",
        top: "-10rem",
    };
    return (
        <div style={upperDiv}>
            <Card style={dashboardStyle}>
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#first">
                        <Nav.Item>
                            <Nav.Link href="#first">Active</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#link">Link</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#disabled" disabled>
                                Disabled
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body style={{ display: "flex", gap: "3rem" }}>
                    <Card style={{ width: "18rem" }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: "18rem" }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </Card.Body>
                <Button
                    variant="success"
                    onClick={() => {
                        navigate("/personal_info");
                    }}
                >
                    Success
                </Button>
            </Card>
        </div>
    );
}

export default Dashboard;
