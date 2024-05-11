import * as React from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { FaPlusCircle } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function FinanceTrackingPage() {
    return (
        <>
            <div className="d-flex">
                <Card
                    style={{
                        width: "28rem",
                        boxShadow: "2px 2px",
                        marginLeft: "20rem  ",
                        marginTop: "3rem",
                    }}
                >
                    <Card.Body>
                        <Card.Title>Cash Balance</Card.Title>
                        <Card.Subtitle className="mt-3 text-muted">
                            213232
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
                <Card
                    style={{
                        width: "28rem",
                        boxShadow: "2px 2px",
                        marginLeft: "5rem",
                        marginTop: "3rem",
                    }}
                >
                    <Card.Body>
                        <Card.Title>Bank Balance</Card.Title>
                        <Card.Subtitle className="mt-3 text-muted">
                            190
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </div>

            <div className="d-flex">
                <Card
                    style={{
                        width: "28rem",
                        boxShadow: "2px 2px",
                        marginLeft: "20rem",
                        marginTop: "5rem",
                    }}
                >
                    <Card.Body>
                        <Card.Title>Assets</Card.Title>
                        <Card.Subtitle className="mt-3 text-muted">
                            <Table striped="row">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>10031</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>23424</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
                <Card
                    style={{
                        width: "28rem",
                        boxShadow: "2px 2px",
                        marginLeft: "5rem",
                        marginTop: "5rem",
                    }}
                >
                    <Card.Body>
                        <Card.Title>Liability</Card.Title>
                        <Card.Subtitle className="mt-3 text-muted">
                            <Table striped="row">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>10031</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>23424</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </div>

            <div className="d-flex">
                <Form
                    style={{
                        width: "28rem",
                        marginLeft: "20rem",
                        marginTop: "2rem",
                    }}
                >
                    <Form.Group className="mb-1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter asset name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Value</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter asset value"
                        />
                    </Form.Group>
                    <Button variant="secondary">
                        <FaPlusCircle />
                    </Button>
                </Form>

                <Form
                    style={{
                        width: "28rem",
                        marginLeft: "5rem",
                        marginTop: "2rem",
                    }}
                >
                    <Form.Group className="mb-1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter liability name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Value</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter liability value"
                        />
                    </Form.Group>
                    <Button variant="secondary">
                        <FaPlusCircle />
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default FinanceTrackingPage;
