import React from "react";
import "./GeneralInfoPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function GeneralInfoPage() {
    const navigate = useNavigate();

    const SubmitForm = (event) => {
        event.preventDefault();
        navigate("/signup-quiz");
    };

    return (
        <>
            <div className="border position-absolute top-50 start-50 translate-middle p-5 w-50 rounded-lg shadow">
                <h2 className="mb-4">General Info</h2>
                <Form onSubmit={SubmitForm}>
                    <Form.Group className="mb-4">
                        <Form.Label>D.O.B</Form.Label>
                        <Form.Control
                            type="date"
                            name="dob"
                            placeholder="Enter date of birth"
                        />
                    </Form.Group>

                    <Form.Group className="d-flex gap-3">
                        <Form.Label>Marital Status : </Form.Label>
                        {["radio"].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Check
                                    inline
                                    label="Male"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />
                                <Form.Check
                                    inline
                                    label="Female"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                                <Form.Check
                                    inline
                                    label="Other"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                />
                            </div>
                        ))}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Number of Dependents</Form.Label>
                        <Form.Control
                            type="number"
                            name="dependents"
                            placeholder="Enter number of dependents"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cash Balance</Form.Label>
                        <Form.Control
                            type="number"
                            name="cash"
                            placeholder="Enter your cash balance"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Bank Balance</Form.Label>
                        <Form.Control
                            type="number"
                            name="bank"
                            placeholder="Enter your cash balance"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default GeneralInfoPage;
