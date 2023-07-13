import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { MainRoutes } from "./routes/main";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../lib/theme";

export const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const theme = React.useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MainRoutes isDarkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </BrowserRouter>
    </ThemeProvider>
  );
};
