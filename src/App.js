import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import Coworkings from "./page/admin/Coworkings";
import CreateCoworking from "./page/admin/CreateCoworking";
import UpdateCoworkingPage from "./page/admin/UpdateCoworkingPage";
import LoginPage from "./page/admin/LoginPage";
import DashBoardAdmin from "./page/admin/DashBoardAdmin";
import ShowallCoworkingsPublic from "./page/public/ShowAllCoworkingsPublic";
import CreateReview from "./page/public/CreateReview";

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
        <Route path="/admin/dashboard" element={<DashBoardAdmin />}></Route>
        <Route
          path="/public/coworkings"
          element={<ShowallCoworkingsPublic />}
        ></Route>
        <Route
          path="/public/create/review/:id"
          element={<CreateReview />}
        ></Route>
        <Route
          path="/admin/coworking/:id/update"
          element={<UpdateCoworkingPage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
