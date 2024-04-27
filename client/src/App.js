//import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import LoginSignup from "./components/LoginSignup";
import PersonalInfo from "./components/PersonalInfo";
import AboutUs from "./components/AboutUs";
import FinancialInfo from "./components/FinancialInfo";
import InvestmentInfo from "./components/InvestmentInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { colors } from "./values/colors";
import AssetsLiabilityInfo from "./components/AssetsLiabilityInfo";
import Dashboard from "./components/DashBoard";

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
          <Route
            path="/dashboard"
            element={
              <>
                <Navigation />
                <Dashboard />
              </>
            }
          />
          <Route path="/personal_info" element={<PersonalInfo />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/login_signup" element={<LoginSignup />} />
          <Route
            path="/personal_info/financial_info"
            element={<FinancialInfo />}
          />
          <Route
            path="/Personal_info/financial_info/AssetsLiability_info"
            element={<AssetsLiabilityInfo />}
          />
          <Route
            path="/Personal_info/financial_info/AssetsLiability_info/Investment_info"
            element={<InvestmentInfo />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
