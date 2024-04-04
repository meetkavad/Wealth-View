import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import PersonalInfo from "./components/PersonalInfo";
import AboutUs from "./components/AboutUs";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
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
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
