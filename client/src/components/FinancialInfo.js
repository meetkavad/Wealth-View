import React, { useState } from "react";
import { colors } from "../values/colors";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function FinancialInfo() {
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
            width: "70vw",
            border: `2px solid ${colors.purple}`,
            display: "flex",
            justifyContent: "space-around",
            borderRadius: "10px",
            padding: "2rem",
        },
        incomePart: {
            marginBottom: "5px",
            flexGrow: "0.5",
        },
        expensePart: {
            marginBottom: "5px",
            flexGrow: "3",
        },
        txt_style: {
            fontFamily: "Montserrat Alternates",
            fontWeight: "500",
            fontSize: "4rem",
            color: colors.purple,
        },
    };

    const [IncomeData, setIncomeData] = useState({
        numSource: "",
        monthlySalary: "",
        rentalIncome: "",
        interestIncome: "",
    });
    const [ExpenseData, setExpenseData] = useState({
        houseHold: "",
        education: "",
        personalCare: "",
        entertainment: "",
        healthCare: "",
        other: "",
    });

    // 👇️ called every time input's value changes
    const handleChangeIncome = (e) => {
        console.log(e);
        const { id, value } = e.target;
        setIncomeData({ ...IncomeData, [id]: value });
    };

    const handleChangeExpense = (e) => {
        console.log(e);
        const { id, value } = e.target;
        setExpenseData({ ...ExpenseData, [id]: value });
    };
    // 👇️ called when form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        // Send formData to backend here (you can use fetch or axios)
        //console.log("Form submitted:", formData);
    };

    return (
        <div style={linkStyle.upperDiv}>
            <h1 style={linkStyle.txt_style}>Financial Info</h1>
            <div style={linkStyle.lowerDiv}>
                <div className="income-part" style={linkStyle.incomePart}>
                    {/* ======= Income Form ======= */}
                    <h1 style={{ ...linkStyle.txt_style, fontSize: "3rem" }}>
                        Income
                    </h1>

                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                No. of Source
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter No. of Source"
                                    value={IncomeData.numSource}
                                    id="numSource"
                                    onChange={handleChangeIncome}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Monthly Salary
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Monthly Salary"
                                    value={IncomeData.monthlySalary}
                                    id="monthlySalary"
                                    onChange={handleChangeIncome}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Rental Income
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Rental Income"
                                    value={IncomeData.rentalIncome}
                                    id="rentalIncome"
                                    onChange={handleChangeIncome}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Interest Income
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Interest Income"
                                    value={IncomeData.interestIncome}
                                    id="interestIncome"
                                    onChange={handleChangeIncome}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
                <div className="expense-part" style={linkStyle.expensePart}>
                    {/* ======= Expense Form ======= */}
                    <h1 style={{ ...linkStyle.txt_style, fontSize: "3rem" }}>
                        Expense
                    </h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Household
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Household Expense"
                                    value={ExpenseData.houseHold}
                                    id="houseHold"
                                    onChange={handleChangeExpense}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Education
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Educational Expense"
                                    value={IncomeData.education}
                                    id="education"
                                    onChange={handleChangeExpense}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Personal Care
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Personal Care Expense"
                                    value={IncomeData.personalCare}
                                    id="personalCare"
                                    onChange={handleChangeExpense}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Entertainment
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Entertainment Expense"
                                    value={IncomeData.entertainment}
                                    id="entertainment"
                                    onChange={handleChangeExpense}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Health Care
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Health Care Expense"
                                    value={IncomeData.healthCare}
                                    id="healthCare"
                                    onChange={handleChangeExpense}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Other
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter any other Expense"
                                    value={IncomeData.other}
                                    id="other"
                                    onChange={handleChangeExpense}
                                />
                            </Col>
                        </Form.Group>

                        <Button
                            type="submit"
                            style={{ marginTop: "20px" }}
                            variant="info"
                            onClick={() => {
                                navigate(
                                    "/personal_info/financial_info/AssetsLiability_info"
                                );
                            }}
                        >
                            Next
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default FinancialInfo;
