import { React, useEffect, useState } from "react";

import { colors } from "../../values/colors";
import { useNavigate } from "react-router-dom";

function QuizPage() {
  const linkStyle = {
    upperDiv: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.white,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      width: "600px",
      background: "#fff",
      paddingBottom: "30px",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "9px",
      width: "100%",
      marginTop: "30px",
    },
    txt: {
      color: colors.purple,
      fontSize: "48px",
      fontWeight: "700",
    },
    underline: {
      width: "61px",
      height: "6px",
      background: colors.purple,
      borderRadius: "9px",
    },
    inputs: {
      display: "flex",
      flexDirection: "column",
      gap: "25px",
      marginTop: "55px",
    },
    input: {
      display: "flex",
      alignItems: "center",
      margin: "auto",
      width: "480px",
      height: "70px",
      background: "#eaeaea",
      borderRadius: "6px",
    },
    inputImg: {
      margin: "0px 30px",
    },
    inputFields: {
      height: "50px",
      width: "400px",
      background: "transparent",
      border: "none",
      outline: "none",
      color: "#797979",
      fontSize: "20px",
    },
    forgotPassword: {
      paddingLeft: "62px",
      marginTop: "27px",
      color: "#797979",
      fontSize: "18px",
    },
    fpSpan: {
      color: "#4c00b4",
      cursor: "pointer",
    },
    submitContainer: {
      display: "flex",
      gap: "30px",
      margin: "60px auto",
    },
    submit: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "220px",
      height: "60px",
      color: "#fff",
      background: "#4c00b4",
      borderRadius: "50px",
      fontSize: "19px",
      fontWeight: "700",
      cursor: "pointer",
    },
    gray: {
      background: "#eaeaea",
      color: "#676767",
    },
  };

  // to hide description on click :
  const [submitted, setSubmitted] = useState(false);

  // usestate hook for questions changing :
  const [quiz, setQuiz] = useState({
    _id: "",
    question: "",
    options: [],
    description: "",
    field: "",
    attribute: "",
  });

  const navigate = useNavigate(); // for navigation between pages

  var q = []; // to store quiz data

  // fetching quiz data :
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      try {
        const storedQuiz = localStorage.getItem("quiz");
        if (storedQuiz) {
          q = JSON.parse(storedQuiz);
        } else {
          // fetch quiz data
          const response = await fetch(`../Wealth-View/v1/userin/fetchQuiz`, {
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
          } else if (response.status === 404) {
            console.log(response.message);
          } else if (response.status === 200) {
            q = data.questions;
            console.log(quiz);
            console.log("Data fetched!");
            localStorage.setItem("quiz", JSON.stringify(q));
          }
        }
        setQuiz(q[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    const options = document.querySelectorAll("input[type=checkbox]");
    var answers = [];
    options.forEach((option) => {
      if (option.checked) {
        answers.push(option.value[0]);
      }
    });

    if (answers.length === 0) {
      alert("Select atleast one option!");
      return;
    }

    try {
      const response = await fetch(
        `../Wealth-View/v1/userin/quiz/${quiz._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("jwt_token")}`,
          },
          body: JSON.stringify({
            answers,
          }),
        }
      );

      const data = await response.json();
      if (response.status === 401) {
        console.log("Access Denied!");
        navigate(`/login_signup`);
      } else if (response.status === 403) {
        console.log("Session Expired  , Please login again");
        navigate(`/login_signup`);
      } else if (response.status === 404) {
        console.log(response.message);
      } else if (response.status === 200) {
        console.log("question submitted!");
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = async () => {
    try {
      q = JSON.parse(localStorage.getItem("quiz"));
      q.shift();
      console.log(q);
      if (q.length > 0) {
        setQuiz(q[0]);
        localStorage.setItem("quiz", JSON.stringify(q));
        console.log(q[0]);
        setSubmitted(false);
        const options = document.querySelectorAll("input[type=checkbox]");
        options.forEach((option) => {
          option.checked = false;
        });
      } else {
        localStorage.removeItem("quiz");
        navigate(`/finance`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={linkStyle.upperDiv}>
        <div style={linkStyle.container}>
          <div style={linkStyle.header}>
            <div style={linkStyle.txt}>Quiz</div>
            <div style={linkStyle.underline}></div>
          </div>
          <div className="QuizClass">
            <div className="question">Q. {quiz && quiz.question}</div>
            <div className="options">
              {quiz &&
                quiz.options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={`option${index}`}
                      name={`option${index}`}
                      value={option}
                    />
                    <label htmlFor={`option${index}`}>{option}</label>
                  </div>
                ))}
            </div>
          </div>
          <div style={linkStyle.submitContainer}>
            <div style={linkStyle.submit} onClick={handleSubmit}>
              submit
            </div>
          </div>
          <div className="description">
            {submitted && `Description : ${quiz && quiz.description}`}
          </div>
          <div style={linkStyle.submitContainer}>
            <div style={linkStyle.submit} onClick={handleNext}>
              {">"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizPage;
