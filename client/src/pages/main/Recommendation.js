import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

function Recommendation() {
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState("");
  const [userData, setUserData] = useState("");

  // to get all user data :
  useEffect(() => {
    // fetch data from server
    const getAllData = async () => {
      try {
        const response = await fetch(`../Wealth-View/v1/userin/userData`, {
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
          console.log(data);
          setUserData(data);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAllData();
  }, []);

  const getRecommendation = async () => {
    try {
      const prompt = userData;
      const response = await fetch(`../Wealth-View/v1/userin/recommendation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("jwt_token")}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (response.status === 401) {
        console.log("Access Denied!");
        navigate(`/login_signup`);
      } else if (response.status === 403) {
        console.log("Session Expired  , Please login again");
        navigate(`/login_signup`);
      } else if (response.status === 200) {
        console.log(data.htmlContent);
        setRecommendation(data.htmlContent);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   const printDocument = () => {
  //     const input = document.getElementById("divToPrint");
  //     console.log(input);
  //     html2canvas(input).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "mm", "a4"); // set PDF to A4 size
  //       pdf.html(input, {
  //         async callback(doc) {
  //           await doc.save("pdf_name");
  //         },
  //       });
  //     });
  //   };

  return (
    <div>
      <h1>Recommendation</h1>
      <div id="divToPrint">{recommendation}</div>
      <button onClick={getRecommendation}>Print</button>
    </div>
  );
}

export default Recommendation;
