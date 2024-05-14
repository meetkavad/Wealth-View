import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function FinanceInfoPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bank: 0,
    cash: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { bank, cash } = formData;
    try {
      const response = await fetch(`../Wealth-View/v1/userin/postBalance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("jwt_token")}`,
        },
        body: JSON.stringify({ bank, cash }),
      });

      if (response.status === 401) {
        console.log("Access Denied!");
        navigate(`/login_signup`);
      } else if (response.status === 403) {
        console.log("Session Expired  , Please login again");
        navigate(`/login_signup`);
      } else if (response.status === 200) {
        console.log("Data saved Successfully");
        navigate(`/quiz`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="border position-absolute top-50 start-50 translate-middle p-5 w-50 rounded-lg shadow">
        <h2 className="mb-4">Financial Info</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Cash Balance</Form.Label>
            <Form.Control
              type="number"
              name="cash"
              value={formData.cash}
              placeholder="Enter your cash balance"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bank Balance</Form.Label>
            <Form.Control
              type="number"
              name="bank"
              value={formData.bank}
              placeholder="Enter your cash balance"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <p className="break-line"></p>
        <p>
          *Note: This information cannot be altered once submitted. This will be
          further adjusted based on your income and expense tracking. Therefore,
          please be careful and precise when entering this information.
        </p>
      </div>
    </>
  );
}

export default FinanceInfoPage;
