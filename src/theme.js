import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#e0f7fa",
          200: "#b2ebf2",
          300: "#80deea",
          400: "#4dd0e1",
          500: "#26c6da",
          600: "#00bcd4",
          700: "#00acc1",
          800: "#0097a7",
          900: "#00838f",
        },
        secondary: {
          100: "#f1f8e9",
          200: "#dce775",
          300: "#c0ca33",
          400: "#a4b42b",
          500: "#9cbe19",
          600: "#7cb342",
          700: "#558b2f",
          800: "#33691e",
          900: "#1b5e20",
        },
        redAccent: {
          100: "#ffebee",
          200: "#ffcdd2",
          300: "#ef9a9a",
          400: "#e57373",
          500: "#ef5350",
          600: "#f44336",
          700: "#d32f2f",
          800: "#c62828",
          900: "#b71c1c",
        },
        blueAccent: {
          100: "#e3f2fd",
          200: "#bbdefb",
          300: "#90caf9",
          400: "#64b5f6",
          500: "#42a5f5",
          600: "#2196f3",
          700: "#1e88e5",
          800: "#1976d2",
          900: "#1565c0",
        },
        topbar: {
          background: "#004d40", // Dark teal background
          color: "#ffffff", // White text
        },
      }
    : {
        grey: {
          100: "#f5f5f5",
          200: "#e0e0e0",
          300: "#c2c2c2",
          400: "#a3a3a3",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#e3f2fd",
          200: "#bbdefb",
          300: "#90caf9",
          400: "#64b5f6",
          500: "#42a5f5",
          600: "#2196f3",
          700: "#1e88e5",
          800: "#1976d2",
          900: "#1565c0",
        },
        secondary: {
          100: "#f1f8e9",
          200: "#dce775",
          300: "#c0ca33",
          400: "#a4b42b",
          500: "#9cbe19",
          600: "#7cb342",
          700: "#558b2f",
          800: "#33691e",
          900: "#1b5e20",
        },
        redAccent: {
          100: "#b71c1c",
          200: "#c62828",
          300: "#d32f2f",
          400: "#f44336",
          500: "#ef5350",
          600: "#e57373",
          700: "#ef9a9a",
          800: "#ffcdd2",
          900: "#ffebee",
        },
        blueAccent: {
          100: "#1565c0",
          200: "#1976d2",
          300: "#1e88e5",
          400: "#2196f3",
          500: "#42a5f5",
          600: "#64b5f6",
          700: "#90caf9",
          800: "#bbdefb",
          900: "#e3f2fd",
        },
        topbar: {
          background: "#42a5f5", // Ocean blue background
          color: "#ffffff", // White text
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
            topbar: {
              background: colors.topbar.background,
              color: colors.topbar.color,
            },
          }
        : {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[100],
            },
            topbar: {
              background: colors.topbar.background,
              color: colors.topbar.color,
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

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
