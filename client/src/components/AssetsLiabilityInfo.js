import React, { useState } from "react";
import { colors } from "../values/colors";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function AssetsLiabilityInfo() {
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

    const [AssetsLiabilities, setAssetsLiabilities] = useState({
        valAssets: "",
        liabilities: "",
        runningEMI: "",
        remTime: "",
    });
    const [InsuranceData, setExpenseData] = useState({
        ifInsurance: "",
        InsuranceType: "",
        yearlyInstallment: "",
        YearlyInstallment: "",
        maturityAmt: "",
        numInstallments: "",
    });

    const [ifLiabilities, setIfLiabilities] = useState("No");

    // 👇️ called every time input's value changes
    const handleChangeAL = (e) => {
        console.log(e);
        const { id, value } = e.target; // 👈️ id is the id of the input field
        setAssetsLiabilities({ ...AssetsLiabilities, [id]: value });
    };

    const handleChangeIns = (e) => {
        console.log(e);
        const { id, value } = e.target;
        setExpenseData({ ...InsuranceData, [id]: value });
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
                    <h1 style={{ ...linkStyle.txt_style, fontSize: "2.5rem" }}>
                        Assets & Liabilities
                    </h1>

                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Value of your assets
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Value of your assets"
                                    value={AssetsLiabilities.valAssets}
                                    id="valAssets"
                                    onChange={handleChangeAL}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Any liabilities?
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    as="select"
                                    placeholder="Enter if you have any liabilities"
                                    value={AssetsLiabilities.liabilities}
                                    id="liabilities"
                                    onChange={handleChangeAL}
                                >
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        {AssetsLiabilities.liabilities === "yes" && (
                            <>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">
                                        Running EMI
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Running EMI"
                                            value={AssetsLiabilities.runningEMI}
                                            id="runningEMI"
                                            onChange={handleChangeAL}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">
                                        Remaining Time Period
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Remaining Time Period"
                                            value={AssetsLiabilities.remTime}
                                            id="remTime"
                                            onChange={handleChangeAL}
                                        />
                                    </Col>
                                </Form.Group>
                            </>
                        )}
                    </Form>
                </div>
                <div className="expense-part" style={linkStyle.expensePart}>
                    {/* ======= Expense Form ======= */}
                    <h1 style={{ ...linkStyle.txt_style, fontSize: "2.5rem" }}>
                        Insurance Details
                    </h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                Any Insurance ?
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    as="select"
                                    placeholder="Enter Household Expense"
                                    value={InsuranceData.ifInsurance}
                                    id="ifInsurance"
                                    onChange={handleChangeIns}
                                >
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        {InsuranceData.ifInsurance === "yes" && (
                            <>
                                {" "}
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">
                                        Type of Insurance
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            as="select"
                                            placeholder="Enter Type of Insurance"
                                            value={InsuranceData.InsuranceType}
                                            id="InsuranceType"
                                            onChange={handleChangeIns}
                                        >
                                            <option value="term">Term</option>
                                            <option value="health">
                                                Health
                                            </option>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="3">
                                        Yearly Installment
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter Yearly Installment"
                                            value={
                                                InsuranceData.yearlyInstallment
                                            }
                                            id="yearlyInstallment"
                                            onChange={handleChangeIns}
                                        />
                                    </Col>
                                </Form.Group>
                                {InsuranceData.InsuranceType === "health" && (
                                    <>
                                        {" "}
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="3">
                                                Maturity Amount
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter Maturity Amount"
                                                    value={
                                                        InsuranceData.maturityAmt
                                                    }
                                                    id="maturityAmt"
                                                    onChange={handleChangeIns}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="3">
                                                Remaining No. of Installments
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter remianing no. of installments"
                                                    value={
                                                        InsuranceData.numInstallments
                                                    }
                                                    id="numInstallments"
                                                    onChange={handleChangeIns}
                                                />
                                            </Col>
                                        </Form.Group>{" "}
                                    </>
                                )}
                            </>
                        )}

                        <Button
                            type="submit"
                            style={{ marginTop: "20px" }}
                            variant="info"
                            onClick={() => {
                                navigate(
                                    "/personal_info/financial_info/AssetsLiability_info/Investment_info"
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

export default AssetsLiabilityInfo;
