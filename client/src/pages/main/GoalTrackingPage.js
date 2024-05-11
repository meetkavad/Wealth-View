import { React, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { Button, Card } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function GoalTrackingPage() {
    const percentage = 77;
    return (
        <>
            <div className="d-flex">
                <h3
                    style={{
                        display: "flex",
                        marginLeft: "10rem",
                        marginTop: "1rem",
                    }}
                >
                    Here you can track your goals
                </h3>
                <Button
                    variant="secondary"
                    style={{ marginLeft: "40rem", marginTop: "1rem" }}
                >
                    <FaPlusSquare className="mb-1" />
                    Add Goal
                </Button>
            </div>

            <div className="mt-3">
                <Card
                    style={{
                        width: "54rem",
                        display: "flex",
                        marginLeft: "20rem",
                    }}
                >
                    <Card.Body className="d-flex justify-content-between">
                        <div>
                            <Card.Title className="mb-3">Goal 1</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Type :{" "}
                            </Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">
                                Target Amount :{" "}
                            </Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">
                                Description :
                            </Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">
                                Plan :
                            </Card.Subtitle>
                        </div>
                        <div style={{ width: 130, height: 130 }}>
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                            />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default GoalTrackingPage;
