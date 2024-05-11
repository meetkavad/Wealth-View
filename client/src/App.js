import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./pages/main/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import IncExpTrackingPage from "./pages/main/IncExpTrackingPage";
import GoalTrackingPage from "./pages/main/GoalTrackingPage";
import QuizPage from "./pages/main/QuizPage";
import GeneralInfoPage from "./pages/auth/GeneralInfoPage";
import SignupQuizPage from "./pages/auth/SignupQuizPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FinanceTrackingPage from "./pages/main/FinanceTrackingPage";
import Navigation from "./components/Navigation";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/finance"
                        element={
                            <>
                                <Navigation /> <FinanceTrackingPage />{" "}
                            </>
                        }
                    />
                    <Route path="/login-signup" element={<LoginPage />} />
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
                                <Navigation/><GoalTrackingPage />{" "}
                            </>
                        }
                    />
                    <Route
                        path="/quiz"
                        element={
                            <>
                                <Navigation /> <QuizPage />{" "}
                            </>
                        }
                    />
                    <Route path="/general-info" element = {<GeneralInfoPage/>} />
                    <Route path="/signup-quiz" element = {<SignupQuizPage/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
