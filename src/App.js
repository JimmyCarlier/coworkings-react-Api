import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import Coworkings from "./page/Coworkings";
import CreateCoworking from "./page/CreateCoworking";
import UpdateCoworkingPage from "./page/UpdateCoworkingPage";
import LoginPage from "./page/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/admin/coworkings" element={<Coworkings />}></Route>
        <Route
          path="/admin/coworking/create"
          element={<CreateCoworking />}
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/admin/coworking/:id/update"
          element={<UpdateCoworkingPage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
