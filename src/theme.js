import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Define the light and dark themes
const lightTheme = createTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  palette: {
    mode: "light",
    primary: {
      main: "#1565C0", // Calmer blue
    },
    secondary: {
      main: "#FF8F00", // Subdued orange
    },
    background: {
      default: "#D7D8D9", // Updated to subtle gray background
      paper: "#FFFFFF", // Soft white paper background
    },
    text: {
      primary: "#424242", // Medium-dark gray text
      secondary: "#616161", // Softer gray text
    },
    topbar: {
      background: "#4B9CD3", // Sky Blue background for light mode
      color: "#FFFFFF", // White text for contrast
    },
  },
});

const darkTheme = createTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#64B5F6", // Softer blue
    },
    secondary: {
      main: "#FFA726", // Warm orange
    },
    background: {
      default: "#121212", // Darker background for dark mode
      paper: "#1E1E1E", // Slightly lighter paper background
    },
    text: {
      primary: "#E0E0E0", // Light gray text
      secondary: "#BDBDBD", // Softer gray text
    },
    topbar: {
      background: "#1E3A8A", // Dark Blue background for dark mode
      color: "#F0F0F0", // Light gray text for contrast
    },
  },
});

// Function to get the theme based on the mode
export const themeSettings = (mode) => {
  return mode === "light" ? lightTheme : darkTheme;
};

// Context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light"); // Set light mode as default

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
