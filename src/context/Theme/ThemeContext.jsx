import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();
export default ThemeContext;

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    JSON.stringify(localStorage.getItem("theme")) || false
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const themeString = theme ? "light" : "light";
    // document.documentElement.setAttribute("data-bs-theme", themeString);
    document.documentElement.setAttribute("data-theme", themeString);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === false ? true : false));
  };

  let context = {
    theme: theme,
    toggleTheme: toggleTheme,
  };

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};
