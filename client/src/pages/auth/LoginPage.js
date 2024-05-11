import { React, useState } from "react";
import user_icon from "../../assets/person.png";
import email_icon from "../../assets/email.png";
import password_icon from "../../assets/password.png";
import { colors } from "../../values/colors";

function LoginSignup() {
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

    const [action, setAction] = useState("Login");

    const handleLogin = (e) => {
        console.log("Login");
    };
    const handleSignup = (e) => {
        console.log("Signup");
    };

    return (
        <div style={linkStyle.upperDiv}>
            <div style={linkStyle.container}>
                <div style={linkStyle.header}>
                    <div style={linkStyle.txt}>{action}</div>
                    <div style={linkStyle.underline}></div>
                </div>
                <div style={linkStyle.inputs}>
                    {action === "Login" ? (
                        <></>
                    ) : (
                        <div style={linkStyle.input}>
                            <img
                                style={linkStyle.inputImg}
                                src={user_icon}
                                alt=""
                            />
                            <input
                                style={linkStyle.inputFields}
                                type="text"
                                placeholder="Name"
                            />
                        </div>
                    )}

                    <div style={linkStyle.input}>
                        <img
                            style={linkStyle.inputImg}
                            src={email_icon}
                            alt=""
                        />
                        <input
                            style={linkStyle.inputFields}
                            type="email"
                            placeholder="Email Id"
                        />
                    </div>
                    <div style={linkStyle.input}>
                        <img
                            style={linkStyle.inputImg}
                            src={password_icon}
                            alt=""
                        />
                        <input
                            style={linkStyle.inputFields}
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                </div>
                {action === "Sign Up" ? (
                    <> </>
                ) : (
                    <div style={linkStyle.forgotPassword}>
                        Lost Password?{" "}
                        <span style={linkStyle.fpSpan}>Click Here!</span>
                    </div>
                )}
                {action === "Sign Up" ? (
                    <div style={linkStyle.forgotPassword}>
                        Already have an account?{" "}
                        <span
                            style={linkStyle.fpSpan}
                            onClick={() => {
                                setAction("Login");
                            }}
                        >
                            Log In!
                        </span>
                    </div>
                ) : (
                    <div style={linkStyle.forgotPassword}>
                        Don't have an account?{" "}
                        <span
                            style={linkStyle.fpSpan}
                            onClick={() => {
                                setAction("Sign Up");
                            }}
                        >
                            Sign Up!
                        </span>
                    </div>
                )}
                <div style={linkStyle.submitContainer}>
                    {action === "Login" ? (
                        <div
                            style={linkStyle.submit}
                            onClick={() => {
                                handleLogin();
                            }}
                        >
                            Login
                        </div>
                    ) : (
                        <div
                            style={linkStyle.submit}
                            onClick={() => {
                                handleSignup();
                            }}
                        >
                            Sign Up
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
