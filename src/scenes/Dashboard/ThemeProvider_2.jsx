// src/theme/ThemeProvider.jsx
import { createContext, useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your theme function
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const currentTheme = useMemo(() => theme(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            <MuiThemeProvider theme={currentTheme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
