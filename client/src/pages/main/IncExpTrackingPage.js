import { React, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { FaPlusCircle, FaCreditCard } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdSignalCellularNull } from "react-icons/md";

function IncExpTrackingPage() {
  const styles = {
    cashIconStyle: {
      fontSize: "30px",
      color: "green",
    },
    creditCardIconStyle: {
      fontSize: "22px",
      color: "blue",
    },
    setDate: {
      display: "flex",
      flexDirection: "row",
      margin: "3vh 45vh",
    },
    addBtnDiv: {
      display: "flex",
      flexDirection: "row",
      margin: "3vh 55vh",
      marginLeft: "65vh",
      justifyContent: "space-evenly",
    },
    addBtn: {
      backgroundColor: "white",
      padding: "0.6rem",
      borderRadius: "1rem",
    },
  };

  const navigate = useNavigate();

  // tracking type : expense or income :
  const [trackingType, setTrackingType] = useState("expense");
  const [expenseData, setExpenseData] = useState({
    expenses: [],
    fixed_expenses: [],
  });
  const [incomeData, setIncomeData] = useState({
    incomes: [],
    fixed_incomes: [],
  });

  //design :
  const varEx = trackingType === "expense" ? "dark" : "outline-dark";
  const varIn = trackingType === "income" ? "dark" : "outline-dark";

  // getting current month  and setting it as global month :
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const [globalMonth, setGlobalMonth] = useState(currentMonth);
  const [globalYear, setGlobalYear] = useState(currentYear);

  useEffect(() => {
    // set start and end date of currentmonth in yyyy-mm-dd format:
    const startDate = `${globalYear}-${globalMonth}-01`;
    const endDate = `${globalYear}-${(Number(globalMonth) + 1) % 12 || 12}-01`;

    const fetchTrackingData = async () => {
      try {
        const response = await fetch(
          `../Wealth-View/v1/userin/${trackingType}?start_date=${startDate}&end_date=${endDate}`,
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
          if (trackingType === "expense") setExpenseData(data);
          else if (trackingType === "income") setIncomeData(data);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrackingData();
  }, [trackingType, globalMonth, globalYear]);

  const handleAddBtn = (e) => {
    e.preventDefault();
    navigate(`/add_tracking_data`);
    localStorage.setItem("trackingType", trackingType);
  };

  const handleChart = (e) => {
    e.preventDefault();
    navigate("/generate_chart");
  };

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
          onClick={() => setTrackingType("income")}
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
          onClick={() => setTrackingType("expense")}
        >
          Expense
        </Button>
      </div>

      <div className="select-date" style={styles.setDate}>
        {/* select month */}
        <div>
          <label htmlFor="month">Month:</label>
          <select
            id="month"
            name="month"
            onChange={(event) => setGlobalMonth(event.target.value)}
          >
            <option value="">{globalMonth}</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* select year */}
        <div>
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            name="year"
            onChange={(event) => setGlobalYear(event.target.value)}
          >
            <option value="">{globalYear}</option>
            {[2022, 2023, 2024].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* add expense-income button  , generate-chart button */}
      <div style={styles.addBtnDiv}>
        <button style={styles.addBtn} onClick={handleAddBtn}>
          Add {trackingType}
        </button>
        {/* 
        <button style={styles.addBtn} onClick={handleChart}>
          Generate Chart
        </button> */}
      </div>

      <div>
        <h3
          style={{
            marginLeft: "18rem",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          Fixed {trackingType === "expense" ? "Expenses" : "Incomes"}
        </h3>
        {trackingType === "expense"
          ? expenseData && expenseData.fixed_expenses
            ? expenseData.fixed_expenses.map((expense, index) => {
                return new Date(expense.date) <
                  new Date(Date.UTC(globalYear, globalMonth, 1)) ? (
                  <Card
                    style={{
                      width: "60rem",
                      marginLeft: "18rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <Card.Body>
                      {expense.mode === "Cash" ? (
                        <GiMoneyStack style={styles.cashIconStyle} />
                      ) : (
                        <FaCreditCard style={styles.creditCardIconStyle} />
                      )}{" "}
                      <Card.Subtitle className="mb-1">
                        {expense.date
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-1">
                        {expense.name}
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-1">
                        <FaIndianRupeeSign style={{ fontSize: "13px" }} />{" "}
                        {expense.amount}
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-1">
                        {expense.category}
                      </Card.Subtitle>
                      <Card.Subtitle className="mb-1">
                        {expense.description}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                ) : null;
              })
            : "Add Fixed Expenses"
          : incomeData && incomeData.fixed_incomes
          ? incomeData.fixed_incomes.map((income, index) => {
              return new Date(income.date) <
                new Date(Date.UTC(globalYear, globalMonth, 1)) ? (
                <Card
                  style={{
                    width: "60rem",
                    marginLeft: "18rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Card.Body>
                    {income.mode === "Cash" ? (
                      <GiMoneyStack style={styles.cashIconStyle} />
                    ) : (
                      <FaCreditCard style={styles.creditCardIconStyle} />
                    )}{" "}
                    <Card.Subtitle className="mb-1">
                      {income.date.split("T")[0].split("-").reverse().join("-")}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-1">
                      {income.name}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-1">
                      <FaIndianRupeeSign style={{ fontSize: "13px" }} />{" "}
                      {income.amount}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-1">
                      {income.category}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-1">
                      {income.description}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              ) : null;
            })
          : "Add Fixed Incomes"}

        <h3
          style={{
            marginLeft: "18rem",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          Other {trackingType === "expense" ? "Expenses" : "Incomes"}
        </h3>
        {trackingType === "expense"
          ? expenseData && expenseData.expenses
            ? expenseData.expenses.map((expense, index) => (
                <Card
                  style={{
                    width: "60rem",
                    marginLeft: "18rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Card.Body>
                    {expense.mode === "cash" ? (
                      <GiMoneyStack style={styles.cashIconStyle} />
                    ) : (
                      <FaCreditCard style={styles.creditCardIconStyle} />
                    )}{" "}
                    <Card.Subtitle className="mb-1">
                      {expense.date
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-1">
                      {expense.name}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-1">
                      <FaIndianRupeeSign style={{ fontSize: "13px" }} />{" "}
                      {expense.amount}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-1">
                      {expense.category}
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-1">
                      {expense.description}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              ))
            : "Add Expenses"
          : incomeData && incomeData.incomes
          ? incomeData.incomes.map((income, index) => (
              <Card
                style={{
                  width: "60rem",
                  marginLeft: "18rem",
                  marginBottom: "1rem",
                }}
              >
                <Card.Body>
                  {income.mode === "Cash" ? (
                    <GiMoneyStack style={styles.cashIconStyle} />
                  ) : (
                    <FaCreditCard style={styles.creditCardIconStyle} />
                  )}{" "}
                  <Card.Subtitle className="mb-1">
                    {income.date.split("T")[0].split("-").reverse().join("-")}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-1">{income.name}</Card.Subtitle>
                  <Card.Subtitle className="mb-1">
                    <FaIndianRupeeSign style={{ fontSize: "13px" }} />{" "}
                    {income.amount}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-1">
                    {income.category}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-1">
                    {income.description}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            ))
          : "Add Incomes"}
      </div>
    </>
  );
}

export default IncExpTrackingPage;
