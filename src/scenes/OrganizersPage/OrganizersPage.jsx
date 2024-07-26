// src/scenes/OrganizersPage/OrganizersPage.jsx
import { Box, IconButton, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext } from "react";
import { tokens } from "../../theme";
import { Link } from 'react-router-dom';
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeIcon from "@mui/icons-material/Home";


const organizers = [
  { id: 1, name: "Organizer 1", contact: "contact1@example.com", bio: "Bio for Organizer 1" },
  { id: 2, name: "Organizer 2", contact: "contact2@example.com", bio: "Bio for Organizer 2" },
  { id: 3, name: "Organizer 3", contact: "contact3@example.com", bio: "Bio for Organizer 3" },
];

const OrganizersPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <div>
      {/* Topbar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          backgroundColor:'grey',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}>
        {/* ICONS */}
        <Box display="flex" alignItems="center">
        <IconButton component={Link} to="/" sx={{ color: colors.grey[100] }}>
            <HomeIcon />
          </IconButton>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
          <IconButton>
            <ShoppingCartOutlinedIcon />
          </IconButton>
          <IconButton component={Link} to="/authpage">
            <PersonOutlinedIcon />
          </IconButton>
        </Box>

        {/* PAGE NAME */}
        <Typography variant="h6" color={colors.grey[100]} sx={{ ml: 2 }}>
          Festiflow
          Organizers
        </Typography>
      </Box>

      {/* Page Content */}
      <Container style={{ marginTop: '60px' }}>
        <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
          Event Organizers
        </Typography>
        
        <Grid container spacing={3}>
          {organizers.map((organizer) => (
            <Grid item xs={12} sm={6} md={4} key={organizer.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {organizer.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {organizer.contact}
                  </Typography>
                  <Typography variant="body2">
                    {organizer.bio}
                  </Typography>
                </CardContent>
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <Button size="small">Contact</Button>
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
