import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const categories = [
  "Housing",
  "Transportation",
  "Food",
  "Personal Care",
  "Healthcare",
  "Insurance",
  "Clothing",
  "Education",
  "Debt",
  "Investment",
  "Entertainment",
  "Miscellaneous",
];

function AddTrackingData() {
  const navigate = useNavigate();
  const trackingType = localStorage.getItem("trackingType");

  const [expenseForm, setExpenseForm] = useState({
    isFixed: false,
    name: "",
    amount: 0,
    mode: "Bank",
    description: "",
    category: "Miscellaneous",
    date: "",
    is_asset: false,
    is_liability: false,
    liability_name: "",
  });
  const [incomeForm, setIncomeForm] = useState({
    isFixed: false,
    name: "",
    amount: 0,
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (trackingType === "expense") {
      setExpenseForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setIncomeForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAdd = async (e) => {
    if (trackingType === "expense") {
      if (expenseForm.is_asset && expenseForm.is_liability) {
        alert("Can't be both asset and liability at the same time!");
        return;
      }
      if (expenseForm.is_liability && !expenseForm.liability_name) {
        alert("Please provide liability name!");
        return;
      }
    }

    if (trackingType === "income") {
      if (!incomeForm.date) incomeForm.date = new Date();
    } else {
      if (!expenseForm.date) expenseForm.date = new Date();
    }
    e.preventDefault();
    try {
      const response = await fetch(`../Wealth-View/v1/userin/${trackingType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("jwt_token")}`,
        },
        body: JSON.stringify(
          trackingType === "expense" ? expenseForm : incomeForm
        ),
      });
      const data = await response.json();
      if (response.status === 401) {
        console.log("Access Denied!");
        navigate(`/login_signup`);
      } else if (response.status === 403) {
        console.log("Session Expired  , Please login again");
        navigate(`/login_signup`);
      } else if (response.status === 201) {
        console.log(data.details);
        navigate(`/income-expense `);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        maxWidth: "500px",
        width: "80%",
        margin: "0px auto",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        overflowX: "scroll",
      }}
    >
      <h2 className="mb-4">Add {trackingType}</h2>
      <Form onSubmit={handleAdd}>
        <Form.Group className="mb-3">
          <Form.Label>Is Fixed ?</Form.Label>
          <Form.Control
            as="select"
            name="isFixed"
            value={
              trackingType === "expense"
                ? expenseForm.isFixed
                : incomeForm.isFixed
            }
            onChange={handleChange}
            required
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="name"
            value={
              trackingType === "expense" ? expenseForm.name : incomeForm.name
            }
            onChange={handleChange}
            placeholder="Enter name ..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="number"
            name="amount"
            value={
              trackingType === "expense"
                ? expenseForm.amount
                : incomeForm.amount
            }
            onChange={handleChange}
            placeholder="Enter Amount in Rupees"
            required
          />
        </Form.Group>

        {trackingType === "expense" && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Mode of Payment : </Form.Label>
              <Form.Control
                as="select"
                name="mode"
                value={expenseForm.mode}
                onChange={handleChange}
                required
              >
                <option value="Cash">Cash</option>
                <option value="Bank">Bank</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={expenseForm.category}
                onChange={handleChange}
                required
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </>
        )}

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="description"
            value={
              trackingType === "expense"
                ? expenseForm.description
                : incomeForm.description
            }
            onChange={handleChange}
            placeholder="Provide Description ..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Transaction Date : </Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={
              trackingType === "expense" ? expenseForm.date : incomeForm.date
            }
            onChange={handleChange}
            placeholder="Date"
          />
        </Form.Group>

        {trackingType === "expense" && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Is Asset?</Form.Label>
              <Form.Control
                as="select"
                name="is_asset"
                value={expenseForm.is_asset}
                onChange={handleChange}
              >
                <option value="False">False</option>
                <option value="True">True</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Is liability ? </Form.Label>
              <Form.Control
                as="select"
                name="is_liability"
                value={expenseForm.is_liability}
                onChange={handleChange}
              >
                <option value="False">False</option>
                <option value="True">True</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="liability_name"
                value={expenseForm.liability_name}
                onChange={handleChange}
                placeholder="enter liability name (entered in finance section) "
              />
            </Form.Group>
          </>
        )}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddTrackingData;
