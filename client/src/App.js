//import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import PersonalInfo from "./components/PersonalInfo";
import LoginSignup from "./components/LoginSignup";
import AboutUs from "./components/AboutUs";
import FinancialInfo from "./components/FinancialInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { colors } from "./values/colors";

function App() {
    return (
        <div style={{ backgroundColor: colors.white }}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Navigation />
                                <LandingPage />
                            </>
                        }
                    />
                    <Route path="/personal_info" element={<PersonalInfo />} />
                    <Route path="/about_us" element={<AboutUs />} />
                    <Route path="/login_signup" element={<LoginSignup />} />
                    <Route path="/financial_info" element={<FinancialInfo />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
