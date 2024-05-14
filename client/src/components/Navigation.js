import React, { useState } from "react";
import "./Navigation.css";
import logo from "../assets/logo.png";
import {
  FaMoneyBill,
  FaBars,
  FaRegChartBar,
  FaRegCheckCircle,
  FaFileSignature,
  FaClipboardList,
} from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";

import { NavLink } from "react-router-dom";

const Navigation = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/finance",
      name: "Finance",
      icon: <FaMoneyBill />,
    },
    {
      path: "/income-expense",
      name: "IncomeExpense",
      icon: <FaRegChartBar />,
    },
    {
      path: "/goal",
      name: "Goal",
      icon: <FaRegCheckCircle />,
    },

    {
      path: "/quiz",
      name: "Quiz",
      icon: <FaClipboardList />,
    },
    {
      path: "/",
      name: "Logout",
      icon: <CgLogOut />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    window.location.href = "/";
  };
  return (
    <div className="box" style={{ position: "fixed" }}>
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            <img
              src={logo}
              alt="logo"
              style={{ height: "40px", width: "100px" }}
            />
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => {
          if (item.name === "Logout") {
            return (
              <div onClick={handleLogout} key={index} className="link">
                <div className="icon">{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text"
                >
                  {item.name}
                </div>
              </div>
            );
          }
          return (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          );
        })}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Navigation;
