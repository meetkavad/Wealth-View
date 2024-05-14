import { Bar } from "react-chartjs-2";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GenerateChart() {
  // setting global month and year:
  const navigate = useNavigate();

  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const [globalMonth, setGlobalMonth] = useState(currentMonth);
  const [globalYear, setGlobalYear] = useState(currentYear);

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

  // fetching data :

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

  function ExpenseChart({ data }) {
    const chartData = {
      labels: data.expenses.map((item) => item.date),
      datasets: [
        {
          label: "Expenses",
          data: data.map((item) => item.amount),
          backgroundColor: "rgba(75,192,192,0.6)",
        },
      ],
    };

    return <Bar data={chartData} />;
  }

  return (
    <>
      <div>{ExpenseChart({ expenseData })}</div>
    </>
  );
}

export default GenerateChart;
