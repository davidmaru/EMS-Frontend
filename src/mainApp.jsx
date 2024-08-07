import { Outlet, useLocation } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
// import { ThemeProvider } from "react-bootstrap";
import Topbar from "./scenes/global/Topbar";
import { CssBaseline, ThemeProvider } from "@mui/material";

export default function MainApp() {
    const [theme, colorMode] = useMode()
    const location = useLocation();
    const hideTopbar = location.pathname === '/Admin'
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div className="app">
                    <main className="content">
                        {!hideTopbar && <Topbar />}
                        <Outlet />
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}