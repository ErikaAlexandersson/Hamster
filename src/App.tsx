import "./App.css";
import HamsterGallery from "./HamsterGallery";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./HomePage";
import Stats from "./Stats";
import History from "./History";
import Compete from "./Compete";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compete" element={<Compete />} />
        <Route path="/galleri" element={<HamsterGallery />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
