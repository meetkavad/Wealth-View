import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function GeneralInfoPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dob: "",
    gender: "",
    no_of_dependents: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    const { dob, gender, no_of_dependents } = formData;
    try {
      const response = await fetch(`../Wealth-View/v1/userin/inputInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("jwt_token")}`,
        },
        body: JSON.stringify({ dob, gender, no_of_dependents }),
      });
      console.log(response.status);
      if (response.status === 401) {
        console.log("Access Denied!");
        navigate(`/login_signup`);
      } else if (response.status === 403) {
        console.log("Session Expired  , Please login again");
        navigate(`/login_signup`);
      } else if (response.status === 200) {
        console.log("Data saved Successfully");
        navigate(`/finance-info`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="border position-absolute top-50 start-50 translate-middle p-5 w-50 rounded-lg shadow">
        <h2 className="mb-4">Personal Info</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>D.O.B</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              placeholder="Enter date of birth"
              onChange={handleChange}
              value={formData.dob}
            />
          </Form.Group>

          <Form.Group className="d-flex gap-3">
            <Form.Label>Gender : </Form.Label>
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Male"
                  value="Male"
                  name="gender"
                  type={type}
                  id={`inline-${type}-1`}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Female"
                  value="Female"
                  name="gender"
                  type={type}
                  id={`inline-${type}-2`}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Other"
                  value="Other"
                  name="gender"
                  type={type}
                  id={`inline-${type}-2`}
                  onChange={handleChange}
                />
              </div>
            ))}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Number of Dependents</Form.Label>
            <Form.Control
              type="number"
              name="no_of_dependents"
              placeholder="Enter number of dependents"
              onChange={handleChange}
              value={formData.no_of_dependents}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3">
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
          </Form.Group> */}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default GeneralInfoPage;
