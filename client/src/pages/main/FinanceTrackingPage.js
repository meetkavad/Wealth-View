import { React, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { FaPlusCircle, FaSave } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdEdit } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function FinanceTrackingPage() {
  const navigate = useNavigate();
  const [financeData, setFinanceData] = useState({
    bank: 0,
    cash: 0,
    assets: [],
    liabilities: [],
  });

  // to re-render when al added :
  const [alAdded, setAlAdded] = useState(false);

  // set edit index :
  const [assetIndex, setAssetIndex] = useState(-1);
  const [liabilityIndex, setLiabilityIndex] = useState(-1);

  const handleChange = (e, index, type, change) => {
    if (type === "asset") {
      const newAssets = [...financeData.assets];
      if (change === "name") {
        newAssets[index].name = e.target.value;
      } else {
        newAssets[index].value = e.target.value;
      }
      setFinanceData({ ...financeData, assets: newAssets });
    } else if (type === "liability") {
      const newLiabilities = [...financeData.liabilities];
      if (change === "name") {
        newLiabilities[index].name = e.target.value;
      } else {
        newLiabilities[index].value = e.target.value;
      }
      setFinanceData({ ...financeData, liabilities: newLiabilities });
    }
  };

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        const response = await fetch(`../Wealth-View/v1/userin/finance`, {
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
          setFinanceData(data.finance);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFinanceData();
  }, [alAdded]);

  const editAL = async (index, id, type) => {
    var name, value;
    if (type === "asset") {
      setAssetIndex(-1);
      name = financeData.assets[index].name;
      value = financeData.assets[index].value;
    } else if (type === "liability") {
      setLiabilityIndex(-1);
      name = financeData.liabilities[index].name;
      value = financeData.liabilities[index].value;
    }
    try {
      const response = await fetch(
        `../Wealth-View/v1/userin/al/${id}/?is_${type}=true`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("jwt_token")}`,
          },
          body: JSON.stringify({
            name,
            value,
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
      } else if (response.status === 200) {
        console.log(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postAL = async (type) => {
    try {
      const response = await fetch(
        `../Wealth-View/v1/userin/al/?is_${type}=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("jwt_token")}`,
          },
          body: JSON.stringify({
            name: "",
            value: 0,
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
      } else if (response.status === 201) {
        console.log(data);
        setAlAdded(!alAdded);
        if (type === "asset") {
          const len = financeData.assets.length;
          setAssetIndex(len);
        } else if (type === "liability") {
          const len = financeData.liabilities.length;
          setLiabilityIndex(len);
        }
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAL = async (index, id, type) => {
    try {
      const response = await fetch(
        `../Wealth-View/v1/userin/al/${id}/?is_${type}=true`,
        {
          method: "DELETE",
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
      } else if (response.status === 201) {
        console.log(data);
        setAlAdded(!alAdded);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="d-flex">
        <Card
          style={{
            width: "28rem",
            boxShadow: "2px 2px",
            marginLeft: "20rem  ",
            marginTop: "3rem",
          }}
        >
          <Card.Body>
            <Card.Title>Cash Balance</Card.Title>
            <Card.Subtitle className="mt-3 text-muted">
              <FaIndianRupeeSign style={{ marginRight: "10px" }} />
              {financeData.cash}
            </Card.Subtitle>
          </Card.Body>
        </Card>
        <Card
          style={{
            width: "28rem",
            boxShadow: "2px 2px",
            marginLeft: "5rem",
            marginTop: "3rem",
          }}
        >
          <Card.Body>
            <Card.Title>Bank Balance</Card.Title>
            <Card.Subtitle className="mt-3 text-muted">
              <FaIndianRupeeSign style={{ marginRight: "10px" }} />
              {financeData.bank}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>

      <div className="d-flex">
        <Card
          style={{
            width: "28rem",
            boxShadow: "2px 2px",
            marginLeft: "20rem",
            marginTop: "5rem",
          }}
        >
          <Card.Body>
            <Card.Title>Assets</Card.Title>
            <Card.Subtitle className="mt-3 text-muted">
              <Table striped="row">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>
                      Value (
                      <FaIndianRupeeSign style={{ fontSize: "13px" }} />)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {financeData.assets.length > 0 ? (
                    financeData.assets.map((asset, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {assetIndex === index ? (
                            <input
                              style={{ width: "80%" }}
                              type="text"
                              value={asset.name}
                              onChange={(e) =>
                                handleChange(e, index, "asset", "name")
                              }
                            />
                          ) : (
                            asset.name
                          )}
                        </td>
                        <td>
                          {assetIndex === index ? (
                            <input
                              style={{ width: "80%" }}
                              type="text"
                              value={asset.value}
                              onChange={(e) =>
                                handleChange(e, index, "asset", "value")
                              }
                            />
                          ) : (
                            asset.value
                          )}
                        </td>
                        <td>
                          {assetIndex === index ? (
                            <button
                              style={{ background: "none", border: "0px" }}
                              onClick={() => editAL(index, asset._id, "asset")}
                            >
                              <FaSave />
                            </button>
                          ) : (
                            <button
                              style={{ background: "none", border: "0px" }}
                              onClick={() => setAssetIndex(index)}
                            >
                              <MdEdit />
                            </button>
                          )}
                        </td>
                        <td>
                          <button
                            style={{ background: "none", border: "0px" }}
                            onClick={() => deleteAL(index, asset._id, "asset")}
                          >
                            <MdOutlineDeleteOutline />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        No Assets
                      </td>
                    </tr>
                  )}
                  <tr>
                    <button
                      onClick={() => postAL("asset")}
                      style={{ background: "none", border: "0px" }}
                    >
                      <FaPlusCircle />
                    </button>
                  </tr>
                </tbody>
              </Table>
            </Card.Subtitle>
          </Card.Body>
        </Card>
        <Card
          style={{
            width: "28rem",
            boxShadow: "2px 2px",
            marginLeft: "5rem",
            marginTop: "5rem",
          }}
        >
          <Card.Body>
            <Card.Title>Liabilities</Card.Title>
            <Card.Subtitle className="mt-3 text-muted">
              <Table striped="row">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>
                      Value (
                      <FaIndianRupeeSign style={{ fontSize: "13px" }} />)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {financeData.liabilities.length > 0 ? (
                    financeData.liabilities.map((liability, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {liabilityIndex === index ? (
                            <input
                              style={{ width: "80%" }}
                              type="text"
                              value={liability.name}
                              onChange={(e) =>
                                handleChange(e, index, "liability", "name")
                              }
                            />
                          ) : (
                            liability.name
                          )}
                        </td>
                        <td>
                          {liabilityIndex === index ? (
                            <input
                              style={{ width: "80%" }}
                              type="text"
                              value={liability.value}
                              onChange={(e) =>
                                handleChange(e, index, "liability", "value")
                              }
                            />
                          ) : (
                            liability.value
                          )}
                        </td>
                        <td>
                          {liabilityIndex === index ? (
                            <button
                              style={{ background: "none", border: "0px" }}
                              onClick={() =>
                                editAL(index, liability._id, "liability")
                              }
                            >
                              <FaSave />
                            </button>
                          ) : (
                            <button
                              style={{ background: "none", border: "0px" }}
                              onClick={() => setLiabilityIndex(index)}
                            >
                              <MdEdit />
                            </button>
                          )}
                        </td>
                        <td>
                          <button
                            style={{ background: "none", border: "0px" }}
                            onClick={() =>
                              deleteAL(index, liability._id, "liability")
                            }
                          >
                            <MdOutlineDeleteOutline />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: "center" }}>
                        No Liabilites
                      </td>
                    </tr>
                  )}
                  <tr>
                    <button
                      style={{ background: "none", border: "0px" }}
                      onClick={() => postAL("liability")}
                    >
                      <FaPlusCircle />
                    </button>
                  </tr>
                </tbody>
              </Table>
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default FinanceTrackingPage;
