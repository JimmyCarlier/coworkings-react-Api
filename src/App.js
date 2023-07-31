import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import Coworkings from "./page/Coworkings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/coworkings" element={<Coworkings />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
