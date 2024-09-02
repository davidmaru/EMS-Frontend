import { Box, IconButton, Typography, useTheme, InputBase } from "@mui/material";
import { useContext, useEffect, useState} from "react";
import { useAuth } from "../AuthContext";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import RUTO from "../assets/RUTO.jpg";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const { isAuthenticated, login, logout } = useAuth();

   // State to manage the authentication status based on the token
   const [authStatus, setAuthStatus] = useState(isAuthenticated);

   useEffect(() => {
    // Check for the token in localStorage
    const token = localStorage.getItem('authToken');
    setAuthStatus(!!token); // Set to true if token exists, false otherwise
  }, [isAuthenticated]);

  const handleAuthClick = () => {
    if (authStatus) {
      logout();
      navigate('/'); // Redirect after logout
    } else {
      login('userRole', 'authToken');
      navigate('/authpage'); // Redirect after login
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: '#1975D1', // Updated top bar color
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        transition: 'background 0.3s ease',
      }}
    >
      {/* THEME TOGGLE ICON */}
      <Box display="flex" alignItems="center">
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{
            color: '#ffffff', // Text color for icons
            transition: 'color 0.3s ease',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
              transition: 'background-color 0.3s ease',
            },
          }}
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>

      {/* PAGE NAME */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography
          variant="h5"
          color='#ffffff' // Text color for page name
          sx={{
            '&:hover': { color: '#ffffff' }, // Text color on hover
            textAlign: 'center',
            fontWeight: 700,
            transition: 'color 0.3s ease',
          }}
        >
          Festiflow
        </Typography>
      </Link>

      {/* SEARCH BAR */}
      <Box
        display="flex"
        alignItems="center"
        sx={{ flexGrow: 1, justifyContent: 'center', ml: 4, mr: 4 }}
      >
        <Box
          display="flex"
          alignItems="center"
          backgroundColor={theme.palette.background.default}
          borderRadius="25px"
          sx={{
            p: 1,
            width: '100%',
            maxWidth: '400px',
            boxShadow: 'inset 0 3px 4px rgba(0, 0, 0, 0.2)',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: 'inset 0 3px 4px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          <InputBase
            sx={{
              ml: 2,
              flex: 1,
              color: theme.palette.text.primary,
            }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type="button" sx={{ p: 1, color: theme.palette.text.primary }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* BUTTON LINKS */}
      <Box display="flex" alignItems="center">
      <IconButton
          onClick={handleAuthClick}
          sx={{
            '&:hover': {
              color: theme.palette.primary.main,
              backgroundColor: 'transparent',
              transition: 'color 0.3s ease',
            },
          }}
        >
          <Typography color='#ffffff' fontWeight="500">
            {isAuthenticated ? "Logout" : "Login"} {/* Conditional rendering */}
          </Typography>
        </IconButton>
        <IconButton
          component={Link}
          to="/OrganizersPage"
          sx={{
            '&:hover': {
              color: theme.palette.primary.main,
              backgroundColor: 'transparent',
              transition: 'color 0.3s ease',
            },
            ml: 3,
          }}
        >
          <Typography color='#ffffff' fontWeight="500">Manage Events</Typography> {/* Text color for buttons */}
        </IconButton>
        <IconButton
          component={Link}
          to="/Eventlist"
          sx={{
            '&:hover': {
              color: theme.palette.primary.main,
              backgroundColor: 'transparent',
              transition: 'color 0.3s ease',
            },
            ml: 3,
          }}
        >
          <Typography color='#ffffff' fontWeight="500">Find Events</Typography> {/* Text color for buttons */}
        </IconButton>
      </Box>

      {/* PROFILE ICON */}
      <Box display="flex" alignItems="center" sx={{ ml: 3 }}>
        <IconButton
          component={Link}
          to="/authpage"
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%', // Ensures a round shape
            padding: 0,
            '&:hover': {
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
              transition: 'box-shadow 0.3s ease',
            },
          }}
        >
          <img
            src={RUTO}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
