import { React, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { FaPlusCircle } from "react-icons/fa";

function IncExpTrackingPage() {
    const [btnState, setBtnState] = useState(0);

    const varEx = btnState === 0 ? "dark" : "outline-dark";
    const varIn = btnState === 1 ? "dark" : "outline-dark";


    return (
        <>
            <div className="d-flex">
                <Button
                    variant={varIn}
                    size="lg"
                    style={{
                        width: "26rem",
                        boxShadow: "1px 1px",
                        marginLeft: "18rem  ",
                        marginTop: "2rem",
                    }}
                    onClick = {() => setBtnState(1)}
                >
                    Income
                </Button>
                <Button
                    variant={varEx}
                    size="lg"
                    style={{
                        width: "26rem",
                        boxShadow: "1px 1px",
                        marginLeft: "8rem  ",
                        marginTop: "2rem",
                    }}
                    onClick = {() => setBtnState(0)}
                >
                    Expense
                </Button>
            </div>

            <div>

                <h3
                    style={{
                        marginLeft: "18rem",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                    }}
                >
                    Fixed Expenses
                </h3>
                <Card style={{ width: "60rem", marginLeft: "18rem" }}>
                    <Card.Body>
                        <Card.Subtitle className="mb-1">Name :</Card.Subtitle>
                        <Card.Subtitle className="mb-1">Amount :</Card.Subtitle>
                        <Card.Subtitle className="mb-1">
                            Category :
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-1">
                            Description :
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-1">Mode :</Card.Subtitle>
                    </Card.Body>
                </Card>

                <h3
                    style={{
                        marginLeft: "18rem",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                    }}
                >
                    Other Expenses
                </h3>
                <Card style={{ width: "60rem", marginLeft: "18rem" }}>
                    <Card.Body>
                        <Card.Subtitle className="mb-1">Name :</Card.Subtitle>
                        <Card.Subtitle className="mb-1">Amount :</Card.Subtitle>
                        <Card.Subtitle className="mb-1">
                            Category :
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-1">
                            Description :
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-1">Mode :</Card.Subtitle>
                    </Card.Body>
                </Card>
            </div>





            <div className="d-flex">
                <Form
                    style={{
                        width: "50rem",
                        marginLeft: "18rem",
                        marginTop: "10px",
                    }}
                >
                    <h4>New</h4>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            Name
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Name of the expense"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            Amount
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Enter amount"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            Category
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Enter category of the expense"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            Description
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Enter description of the expense"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            Mode
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Enter mode of the expense"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Form>

                <Button
                    style={{
                        marginLeft: "3rem",
                        marginTop: "16rem",
                        height: "3rem",
                    }}
                    variant="secondary"
                >
                    <FaPlusCircle />
                </Button>
            </div>
        </>
    );
}

export default IncExpTrackingPage;
