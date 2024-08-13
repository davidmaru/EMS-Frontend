import { Box, IconButton, Typography, Container, Grid, Card, CardContent, Button, CardHeader, Tooltip, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

const organizers = [
  { id: 1, name: "Organizer 1", contact: "contact1@example.com", bio: "Bio for Organizer 1" },
  { id: 2, name: "Organizer 2", contact: "contact2@example.com", bio: "Bio for Organizer 2" },
  { id: 3, name: "Organizer 3", contact: "contact3@example.com", bio: "Bio for Organizer 3" },
];

const OrganizersPage = () => {
  const theme = useTheme();
  const colors = theme.palette.mode;
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
          background: '#1975D1', // Updated top bar color
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          borderBottom: `1px solid ${colors.grey}`,
        }}>
        {/* ICONS */}
        <Box display="flex" alignItems="center">
          <Tooltip title="Home">
            <IconButton component={Link} to="/" sx={{ color: '#ffffff' }}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Theme">
            <IconButton onClick={colorMode.toggleColorMode} sx={{ ml: 1 }}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon sx={{ color: '#ffffff' }} />
              ) : (
                <LightModeOutlinedIcon sx={{ color: '#ffffff'}} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Event">
            <IconButton component={Link} to="/AddEventPage" sx={{ ml: 1 }}>
              <AddCircleOutlineOutlinedIcon sx={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
          <Link to="/Eventpage">
            <Tooltip title="Event List">
              <IconButton sx={{ ml: 1 }}>
                <FormatListBulletedOutlinedIcon sx={{ color: '#ffffff' }} />
              </IconButton>
            </Tooltip>
          </Link>
          <Tooltip title="Profile">
            <IconButton component={Link} to="/authpage" sx={{ ml: 1 }}>
              <PersonOutlinedIcon sx={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton onClick={handleClick} sx={{ ml: 1 }}>
              <SettingsOutlinedIcon sx={{ color: '#ffffff' }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                width: '200px',
                backgroundColor: '#1975D1', // Updated menu background color
              },
            }}
          >
            <MenuItem onClick={handleClose} component={Link} to="/dashboard" sx={{ color: '#ffffff', padding: '10px' }}>
              Admin Dashboard
            </MenuItem>
          </Menu>
        </Box>

        {/* PAGE NAME */}
        <Typography variant="h6" color="#ffffff" sx={{ ml: 2, fontWeight: 'bold' }}>
          Festiflow Organizers
        </Typography>
      </Box>

      {/* Page Content */}
      <Container sx={{ marginTop: '80px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ marginTop: '20px', fontWeight: 'bold', color: '#1975D1' }}>
          Event Organizers
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {organizers.map((organizer) => (
            <Grid item xs={12} sm={6} md={4} key={organizer.id}>
              <Card sx={{
                boxShadow: theme.palette.mode === "dark" ? 4 : 2,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === "dark" ? '#4376A9' : '#4F93D7', // Updated card background color
              }}>
                <CardHeader
                  title={organizer.name}
                  subheader={organizer.contact}
                  sx={{
                    backgroundColor: '#D8DDE1', // Updated card header background color
                    color: '#ffffff',
                  }}
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    {organizer.bio}
                  </Typography>
                </CardContent>
                <Box display="flex" justifyContent="center" p={2}>
                  <Button variant="contained" color="primary" size="small">
                    Contact
                  </Button>
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
