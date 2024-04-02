import React from "react";
import { colors } from "../values/colors";

function LandingPage() {
    const styles = {
        txt: {
            fontFamily: "Montserrat Alternates",
            fontWeight: "500",
            fontSize: "4rem",
            marginTop: "1rem",
            marginBottom: "0.5rem", // Added margin bottom for consistency
            color: colors.white,
        },
        making_green: {
            color: colors.green,
        },
    };

    return (
        <div style={{ height: "85vh", overflow: "hidden" }}>
            <div style={{ marginTop: "10rem", marginLeft: "8rem" }}>
                <h1 style={styles.txt}>Empowering your financial journey,</h1>
                <h1 style={styles.txt}>
                    One{" "}
                    <span style={{ ...styles.txt, ...styles.making_green }}>
                        Personalized{" "}
                    </span>
                    plan
                </h1>
                <h1 style={styles.txt}>at a time.</h1>
            </div>
        </div>
    );
}

export default LandingPage;
