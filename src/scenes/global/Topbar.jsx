import { Box, IconButton, Typography, useTheme, InputBase } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      p={2}
      alignItems="center"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor:'grey.main',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 1000
      }}
    >
      {/* PAGE NAME */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography variant="h6" color={colors.grey[100]} sx={{ ml: 2 }}>
          Festiflow
        </Typography>
      </Link>

      {/* BUTTON LINKS */}
      <Box display="flex" alignItems="center" sx={{ ml: 4 }}>
        <IconButton component={Link} to="/authpage">
          <Typography color={colors.grey[100]}>Signup</Typography>
        </IconButton>
        <IconButton  component={Link} to="/OrganizersPage">
          <Typography color={colors.grey[100]}>
            Create Events</Typography>
        </IconButton>
        <IconButton>
          <Typography color={colors.grey[100]}>Find Events</Typography>
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>

      {/* SEARCH BAR WITH PEOPLE ICON */}
      <Box display="flex" alignItems="center" sx={{ ml: 2, position: 'relative' }}>
        <Box
          display="flex"
          alignItems="center"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
          </Box>
          </Box>
          {/* People Icon as a Link */}
          <Box justifySelf= "self-end">
          <IconButton
            component={Link}
            to="/authpage"
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: colors.primary[400],
              p: 0
            }}
          >
            <img
              src="https://via.placeholder.com/24"
              alt="Profile"
              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            />
          </IconButton>
        </Box>
        </Box>
  );
};

export default Topbar;
