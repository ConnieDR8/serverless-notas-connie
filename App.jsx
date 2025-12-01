import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CoursesPage from "./pages/CoursesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
