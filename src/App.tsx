import "./App.css";
import NavBar from "./NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./HomePage";
import Stats from "./Stats/Stats";
import History from "./History/History";
import Compete from "./Compete/Compete";
import GetSearchFilter from "./HamsterGallery/GetSearchFilter";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compete" element={<Compete />} />
        <Route path="/galleri" element={<GetSearchFilter />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
