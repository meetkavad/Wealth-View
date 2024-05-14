import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { MdAddTask, MdDelete } from "react-icons/md";

function AddGoal() {
  const styles = {
    button: {
      margin: "10px",
      background: "none",
      border: "none",
    },
  };

  const goalId = localStorage.getItem("goalId");
  //edit or add
  const navigate = useNavigate();
  const [plan, setPlan] = useState([]);

  const [goalForm, setGoalForm] = useState({
    name: "",
    type: "",
    description: "",
    target_amount: 0,
    allocated_amount: 0,
    timeline: "",
    plan: [],
  });

  const handleChange = (e) => {
    if (e.target.name === "plan") setPlan(e.target.value);
    else setGoalForm({ ...goalForm, [e.target.name]: e.target.value });
  };

  // fetch goal data :

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(
          `../Wealth-View/v1/userin/goal/${goalId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("jwt_token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.status === 401) {
          console.log("Access Denied!");
          navigate(`/login_signup`);
        } else if (response.status === 403) {
          console.log("Session Expired  , Please login again");
          navigate(`/login_signup`);
        } else if (response.status === 200) {
          setGoalForm(data.goal);
          setPlan(data.goal.plan.map((item) => item.task));
          console.log(data.goal);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (goalId !== "") {
      console.log(goalId);
      fetchGoal();
    }
  }, []);

  const handleAdd = async (opType) => {
    goalForm.plan = plan.map((task, index) => {
      const existingTask = goalForm.plan.find(
        (p) => p.task === task && p.index === index
      );
      return {
        index,
        task,
        status: existingTask ? existingTask.status : false,
      };
    });
    console.log(goalForm);
    try {
      var response;
      if (opType === "add") {
        response = await fetch(`../Wealth-View/v1/userin/goal`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("jwt_token")}`,
          },
          body: JSON.stringify(goalForm),
        });
      } else if (opType === "edit") {
        response = await fetch(`../Wealth-View/v1/userin/goal/${goalId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("jwt_token")}`,
          },
          body: JSON.stringify(goalForm),
        });
      }

      const data = await response.json();
      if (response.status === 401) {
        console.log("Access Denied!");
        navigate(`/login_signup`);
      } else if (response.status === 403) {
        console.log("Session Expired  , Please login again");
        navigate(`/login_signup`);
      } else if (response.status === 200) {
        console.log(data.goal);
        localStorage.removeItem("goalId");
        navigate("/goal");
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="border p-5 w-50 rounded-lg shadow">
        <h2 className="mb-4">Add Goal</h2>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            goalId ? handleAdd("edit") : handleAdd("add");
          }}
        >
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              value={goalForm.name}
              onChange={handleChange}
              placeholder="Enter Goal name ..."
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{ display: "flex" }}>
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={goalForm.type}
              onChange={handleChange}
              required
            >
              <option value={"short-term"}>short-term</option>
              <option value={"mid-term"}>mid-term</option>
              <option value={"long-term"}>long-term</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" style={{ display: "flex" }}>
            <Form.Label>Target Amount</Form.Label>
            <Form.Control
              type="number"
              name="target_amount"
              value={goalForm.target_amount}
              onChange={handleChange}
              placeholder="Enter Target Amount in Rupees"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{ display: "flex", flex: 1 }}>
            <Form.Label>Allocated Amount</Form.Label>
            <Form.Control
              type="number"
              name="allocated_amount"
              value={goalForm.allocated_amount}
              onChange={handleChange}
              placeholder="Enter Allocated Amount in Rupees"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="description"
              value={goalForm.description}
              onChange={handleChange}
              placeholder="Provide Description ..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Timeline : </Form.Label>
            <Form.Control
              type="date"
              name="timeline"
              value={goalForm.timeline}
              onChange={handleChange}
              placeholder="Date"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Plan</Form.Label>
            <button
              style={styles.button}
              onClick={(e) => {
                e.preventDefault();
                setPlan([...plan, ""]);
              }}
            >
              <MdAddTask />
            </button>
            {plan.map((task, index) => (
              <div
                key={index}
                style={{ display: "flex", marginBottom: "1rem" }}
              >
                <Form.Control
                  type="text"
                  value={task}
                  onChange={(event) => {
                    const newPlan = [...plan];
                    newPlan[index] = event.target.value;
                    setPlan(newPlan);
                  }}
                  placeholder="Task"
                />
                <button
                  style={styles.button}
                  onClick={() => {
                    const newPlan = [...plan];
                    newPlan.splice(index, 1);
                    setPlan(newPlan);
                  }}
                >
                  <MdDelete style={{ fontSize: "20px" }} />
                </button>
              </div>
            ))}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddGoal;
