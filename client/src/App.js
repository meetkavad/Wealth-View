import logo from "./logo.svg";
import "./App.css";
import AboutUs from "./pages/auth/AboutUs";
import LandingPage from "./pages/auth/LandingPage";
import LoginSignupPage from "./pages/auth/LoginSignup";
import VerificationCode from "./pages/auth/VerificationCode";
import PersonalInfo from "./pages/auth/PersonalInfo";
import FinanceInfo from "./pages/auth/FinanceInfo";
import QuizPage from "./pages/auth/QuizPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPassword from "./pages/auth/resetPassword";
import FinanceTrackingPage from "./pages/main/FinanceTrackingPage";
import IncExpTrackingPage from "./pages/main/IncExpTrackingPage";
import GoalTrackingPage from "./pages/main/GoalTrackingPage";
import Navigation from "./components/Navigation";
import AddTrackingData from "./pages/main/AddTrackingData";
import AddGoal from "./pages/main/AddGoal";
import GenerateChart from "./pages/main/GenerateChart";
import Recommendation from "./pages/main/Recommendation";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />

          <Route
            path="/finance"
            element={
              <>
                <Navigation /> <FinanceTrackingPage />{" "}
              </>
            }
          />
          <Route path="/login_signup" element={<LoginSignupPage />} />
          <Route
            path="/income-expense"
            element={
              <>
                <Navigation />
                <IncExpTrackingPage />
              </>
            }
          />
          <Route
            path="/goal"
            element={
              <>
                <Navigation />
                <GoalTrackingPage />{" "}
              </>
            }
          />
          <Route
            path="/nav-quiz"
            element={
              <>
                <Navigation /> <QuizPage />{" "}
              </>
            }
          />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/finance-info" element={<FinanceInfo />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/verificationCode" element={<VerificationCode />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/add_tracking_data" element={<AddTrackingData />} />
          <Route path="/add_goal" element={<AddGoal />} />
          <Route path="/generate_chart" element={<GenerateChart />} />
          <Route path="/pr" element={<Recommendation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
