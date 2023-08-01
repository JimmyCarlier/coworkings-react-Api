import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import Coworkings from "./page/Coworkings";
import CreateCoworking from "./page/CreateCoworking";
import UpdateCoworkingPage from "./page/UpdateCoworkingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/coworkings" element={<Coworkings />}></Route>
        <Route path="/coworking/create" element={<CreateCoworking />}></Route>
        <Route
          path="/coworking/:id/update"
          element={<UpdateCoworkingPage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
