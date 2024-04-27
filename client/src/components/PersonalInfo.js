import React, { useState } from "react";
import { colors } from "../values/colors";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

function PersonalInfo() {
    const navigate = useNavigate();
    const linkStyle = {
        upperDiv: {
            height: "100vh",
            width: "100vw",
            backgroundColor: colors.white,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },
        lowerDiv: {
            width: "50vw",
            border: `2px solid ${colors.purple}`,
            borderRadius: "10px",
            padding: "2rem",
        },
        txt_style: {
            fontFamily: "Montserrat Alternates",
            fontWeight: "500",
            fontSize: "4rem",
            color: colors.purple,
        },
    };

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        maritalStatus: "",
        numDependents: "",
    });

    // 👇️ called every time input's value changes
    const handleChange = (e) => {
        console.log(e);
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // 👇️ called when form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        // Send formData to backend here (you can use fetch or axios)
        console.log("Form submitted:", formData);
    };

    return (
        <div style={linkStyle.upperDiv}>
            <h1 style={linkStyle.txt_style}>Personal Info</h1>
            <div style={linkStyle.lowerDiv}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={formData.name}
                                id="name"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Age
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="number"
                                placeholder="Enter age"
                                value={formData.age}
                                id="age"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Gender
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                as="select"
                                placeholder="Password"
                                value={formData.gender}
                                id="gender"
                                onChange={handleChange}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Marital Status
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                as="select"
                                placeholder="Password"
                                value={formData.maritalStatus}
                                id="maritalStatus"
                                onChange={handleChange}
                            >
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            No. of Dependents
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="number"
                                placeholder="Enter number of dependents"
                                value={formData.numDependents}
                                id="numDependents"
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Button
                        type="submit"
                        style={{ marginTop: "20px" }}
                        variant="info"
                        onClick={() => {
                            navigate("/personal_info/financial_info");
                        }}
                    >
                        Next
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default PersonalInfo;
