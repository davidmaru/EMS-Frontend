import { useState } from "react";
import  ThemeProvider  from "./ThemeProvider_2";
import theme from './theme';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./scss/App.scss"
import Panel from "./components/panel";


export default function Dashboard() {
    const [mode, setMode] = useState('light')

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <>
            <ThemeProvider theme={theme(mode)}>
                <CssBaseline />
                <div className="dashApp">
                    <Panel toggleMode={toggleMode} />
                    <div className="main">
                        <Outlet />
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}