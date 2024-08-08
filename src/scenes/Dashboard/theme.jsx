import { createTheme } from '@mui/material/styles';

// Define the light theme
const lightTheme = createTheme({
    typography: {
        fontFamily: '"Roboto", sans-serif',
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // Blue color
        },
        secondary: {
            main: '#dc004e', // Pink color
        },
        background: {
            default: '#ffffff', // White background
            paper: '#f5f5f5',  // Light gray paper background
        },
        text: {
            primary: '#000000', // Black text
            secondary: '#666666', // Dark gray text
        },
    },
});

// Define the dark theme with a dark navy blue color scheme
const darkTheme = createTheme({
    typography: {
        fontFamily: '"Roboto", sans-serif',
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#1e3a8a', // Dark navy blue
        },
        secondary: {
            main: '#60a5fa', // Light blue
        },
        background: {
            default: '#0f172a', // Very dark navy blue
            paper: '#1e293b',  // Darker navy blue
        },
        text: {
            primary: '#e2e8f0', // Light text color
            secondary: '#94a3b8', // Lighter text color
        },
    },
});

// Function to get the theme based on the mode
const getTheme = (mode) => (mode === 'light' ? lightTheme : darkTheme);

export default getTheme;
