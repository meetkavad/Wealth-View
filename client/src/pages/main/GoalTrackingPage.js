import { React, useState, useEffect } from "react";
import { FaPlusSquare, FaTheaterMasks } from "react-icons/fa";
import { Button, Card, Form } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";

function GoalTrackingPage() {
  const styles = {
    paragraph: {
      color: "black",
      fontWeight: "bold",
      display: "inline",
    },
    button: {
      background: "none",
      border: "none",
      fontSize: "1.2rem",
      margin: "0.1rem",
    },
  };
  const navigate = useNavigate();
  const [goalData, setGoalData] = useState([
    {
      _id: "",
      name: "",
      type: "",
      target_amount: 0,
      allocated_amount: 0,
      description: "",
      timeline: "",
      plan: [],
      completion: 0,
    },
  ]);

  // to hide plan :
  const [planVisibility, setPlanVisibility] = useState([]);

  // on checking or unchecking a task :
  const handleCheck = async (goalId, taskId, task) => {
    try {
      const response = await fetch(
        `../Wealth-View/v1/userin/goal/${goalId}/${taskId}`,
        {
          method: "POST",
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
        console.log(data);
        const completion = data.completion;
        const newGoalData = [...goalData];
        const goalIndex = newGoalData.findIndex((goal) => goal._id === goalId);
        const taskIndex = newGoalData[goalIndex].plan.findIndex(
          (task) => task._id === taskId
        );
        newGoalData[goalIndex].plan[taskIndex].status =
          !newGoalData[goalIndex].plan[taskIndex].status;
        newGoalData[goalIndex].completion = completion;
        setGoalData(newGoalData);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchGoalData = async () => {
      console.log("here..");
      try {
        const response = await fetch(`../Wealth-View/v1/userin/goal`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("jwt_token")}`,
          },
        });
        const data = await response.json();
        if (response.status === 401) {
          console.log("Access Denied!");
          navigate(`/login_signup`);
        } else if (response.status === 403) {
          console.log("Session Expired  , Please login again");
          navigate(`/login_signup`);
        } else if (response.status === 200) {
          console.log(data.goal);
          setGoalData(data.goal);
          setPlanVisibility(new Array(data.goal.length).fill(false));
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGoalData();
  }, []);

  const hanldeAddGoal = () => {
    navigate(`/add_goal`);
  };

  const editGoal = (id) => {
    localStorage.setItem("goalId", id);
    navigate(`/add_goal`);
  };

  const deleteGoal = async (goalId) => {
    try {
      const response = await fetch(`../Wealth-View/v1/userin/goal/${goalId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("jwt_token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 401) {
        console.log("Access Denied!");
        navigate(`/login_signup`);
      } else if (response.status === 403) {
        console.log("Session Expired  , Please login again");
        navigate(`/login_signup`);
      } else if (response.status === 200) {
        console.log(data.goal);
        const newGoalData = goalData.filter((goal) => goal._id !== goalId);
        setGoalData(newGoalData);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          Goal Planning & Management
        </h3>
        <Button
          variant="secondary"
          style={{ marginLeft: "40rem", marginTop: "1rem" }}
          onClick={hanldeAddGoal}
        >
          <FaPlusSquare className="mb-1" />
          Add Goal
        </Button>
      </div>

      <div className="mt-3">
        {goalData &&
          goalData.map((goal, index) => {
            return (
              <Card
                style={{
                  width: "54rem",
                  display: "flex",
                  marginLeft: "20rem",
                  marginTop: "1rem",
                }}
              >
                <Card.Body className="d-flex justify-content-between">
                  <div>
                    <Card.Title className="mb-3">{goal.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <p style={styles.paragraph}>Type</p> : {goal.type}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      <p style={styles.paragraph}>Description</p> :{" "}
                      {goal.description}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      <p style={styles.paragraph}>Target</p> :{" "}
                      {goal.target_amount}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      <p style={styles.paragraph}>Allocated</p> :{" "}
                      {goal.allocated_amount}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      <p style={styles.paragraph}>Timeline</p> :{" "}
                      {goal.timeline
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">
                      <Form.Label style={styles.paragraph}>Plan</Form.Label>
                      <button
                        style={{ border: "none", background: "none" }}
                        onClick={() => {
                          const newPlanVisibility = [...planVisibility];
                          newPlanVisibility[index] = !newPlanVisibility[index];
                          setPlanVisibility(newPlanVisibility);
                        }}
                      >
                        {planVisibility[index] ? (
                          <FaAngleUp />
                        ) : (
                          <FaAngleDown />
                        )}
                      </button>
                      {planVisibility[index] &&
                        goal.plan.map((task, index) => (
                          <Form.Check
                            type="checkbox"
                            label={task.task}
                            key={index}
                            onChange={() =>
                              handleCheck(goal._id, task._id, task.task)
                            }
                            checked={task.status}
                          />
                        ))}
                    </Card.Subtitle>
                  </div>
                  <div style={{ width: 130, height: 130 }}>
                    <CircularProgressbar
                      value={goal.completion}
                      text={`${goal.completion}%`}
                      styles={{
                        path: {
                          stroke: goal.completion === 100 ? "green" : "blue",
                        },
                        text: {
                          fill: goal.completion === 100 ? "green" : "blue",
                        },
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 170,
                      left: 800,
                    }}
                  >
                    <button
                      style={styles.button}
                      onClick={() => {
                        editGoal(goal._id);
                      }}
                    >
                      <MdEdit />
                    </button>
                    <button
                      style={styles.button}
                      onClick={(e) => {
                        e.preventDefault();
                        deleteGoal(goal._id);
                      }}
                    >
                      <MdOutlineDeleteOutline />
                    </button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
}

export default GoalTrackingPage;
