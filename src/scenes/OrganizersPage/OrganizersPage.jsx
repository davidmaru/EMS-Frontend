// src/scenes/OrganizersPage/OrganizersPage.jsx
import { Box, IconButton, Typography, Container, Grid, Card, CardContent, Button, CardHeader, Tooltip, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useState } from "react";
import { tokens } from "../../theme";
import { Link } from 'react-router-dom';
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

const organizers = [
  { id: 1, name: "Organizer 1", contact: "contact1@example.com", bio: "Bio for Organizer 1" },
  { id: 2, name: "Organizer 2", contact: "contact2@example.com", bio: "Bio for Organizer 2" },
  { id: 3, name: "Organizer 3", contact: "contact3@example.com", bio: "Bio for Organizer 3" },
];

const OrganizersPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      {/* Topbar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '70px',
          backgroundColor: colors.blueAccent[500], // Ocean blue background
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          borderBottom: `1px solid ${colors.grey[300]}`,
        }}>
        {/* ICONS */}
        <Box display="flex" alignItems="center">
          <Tooltip title="Home">
          <IconButton component={Link} to="/" sx={{ color: colors.grey[100] }}>
            <HomeIcon />
          </IconButton>
          </Tooltip>
          <Tooltip title="Theme">
          <IconButton onClick={colorMode.toggleColorMode} sx={{ ml: 1 }}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon sx={{ color: colors.grey[100] }} />
            ) : (
              <LightModeOutlinedIcon sx={{ color: colors.grey[100] }} />
            )}
          </IconButton>
          </Tooltip>
          <Tooltip title="Add Event">
          <IconButton component= {Link} to= "/AddEventPage" sx={{ ml: 1 }}>
            <AddCircleOutlineOutlinedIcon sx={{ color: colors.grey[100] }} />
          </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
          <IconButton component={Link} to="/authpage" sx={{ ml: 1 }}>
            <PersonOutlinedIcon sx={{ color: colors.grey[100] }} />
          </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton onClick={handleClick} sx={{ ml: 1 }}>
              <SettingsOutlinedIcon sx={{ color: colors.grey[100] }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: '200px',
              },
            }}
          >
            <MenuItem onClick={handleClose} component={Link} to="/Admin">
              Admin Dashboard
            </MenuItem>
            {/* Add other menu items here if needed */}
          </Menu>

        </Box>

        {/* PAGE NAME */}
        <Typography variant="h6" color={colors.grey[100]} sx={{ ml: 2 }}>
          Festiflow Organizers
        </Typography>
      </Box>

      {/* Page Content */}
      <Container style={{ marginTop: '80px' }}>
        <Typography variant="h4" gutterBottom style={{ marginTop: '20px', fontWeight: 'bold' }}>
          Event Organizers
        </Typography>
        
        <Grid container spacing={3}>
          {organizers.map((organizer) => (
            <Grid item xs={12} sm={6} md={4} key={organizer.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardHeader
                  title={organizer.name}
                  subheader={organizer.contact}
                  sx={{ backgroundColor: colors.primary[100], color: colors.grey[800] }}
                />
                <CardContent>
                  <Typography variant="body2">
                    {organizer.bio}
                  </Typography>
                </CardContent>
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <Button variant="contained" color="primary" size="small">Contact</Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default OrganizersPage;
