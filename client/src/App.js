import "./App.css";
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import { colors } from "./values/colors";

function App() {
    return (
        <div
            style={{
                backgroundColor: colors.black,
                color: "#EFFFFB",
                width: "100vw",
                height: "100vh",
            }}
        >
            <Navigation />
            <LandingPage />
        </div>
    );
}

export default App;
