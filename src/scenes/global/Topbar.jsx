import { Box, IconButton, Typography, useTheme, InputBase } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import RUTO from "../assets/RUTO.jpg";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

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
        height: '60px',
        background: theme.palette.mode === "dark"
          ? 'linear-gradient(90deg, #000435 0%, #001970 100%)'
          : 'linear-gradient(90deg, #001970 0%, #0033cc 100%)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000
      }}
    >
      {/* THEME ICON */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode} sx={{ color: colors.grey[100] }}>
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
          variant="h6"
          color={colors.grey[100]}
          sx={{
            '&:hover': { color: colors.primary[100] },
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Festiflow
        </Typography>
      </Link>

      {/* SEARCH BAR */}
      <Box display="flex" alignItems="center" sx={{ flexGrow: 1, justifyContent: 'center', ml: 2, mr: 2 }}>
        <Box
          display="flex"
          alignItems="center"
          backgroundColor= "initial"
          borderRadius="20px"
          sx={{ p: 1, width: '100%', maxWidth: '400px', boxShadow: 'inset 0 3px 4px rgba(0, 0, 0, 0.9)' }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1, color: colors.grey[100] }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type="button" sx={{ p: 1, color: colors.grey[100] }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* BUTTON LINKS */}
      <Box display="flex" alignItems="center">
        <IconButton component={Link} to="/authpage" sx={{ '&:hover': { color: colors.primary[100] } }}>
          <Typography color={colors.grey[100]}>Signup</Typography>
        </IconButton>
        <IconButton component={Link} to="/OrganizersPage" sx={{ '&:hover': { color: colors.primary[100] }, ml: 2 }}>
          <Typography color={colors.grey[100]}>Manage Events</Typography>
        </IconButton>
        <IconButton sx={{ '&:hover': { color: colors.primary[100] }, ml: 2 }}>
          <Typography color={colors.grey[100]}>Find Events</Typography>
        </IconButton>
      </Box>

      {/* PROFILE ICON */}
      <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
        <IconButton
          component={Link}
          to="/authpage"
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            backgroundColor: 'initial',
            '& img': {
              width: '100%',
              height: '100%',
              borderRadius: '50%',
            }
          }}
        >
          <img
            src={RUTO}
            alt="Profile"
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
