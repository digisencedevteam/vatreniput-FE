import { Routes, Route } from "react-router-dom";
import { Library } from "../pages/deleteThisLater/DeleteMeLater";
import { Home } from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/Register/Register";

interface MainRoutesProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const MainRoutes = ({ isDarkMode, toggleDarkMode }: MainRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route
        path="/login"
        element={
          <Login isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        }
      />
      <Route
        path="/register"
        element={
          <Register isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        }
      />
    </Routes>
  );
};
