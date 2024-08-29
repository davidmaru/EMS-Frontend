import { useState } from 'react';
import { Box, Typography, Tab, Tabs, Paper,Card, CardContent, Drawer, List, ListItem, ListItemText, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Edit, Delete, Menu } from '@mui/icons-material';
import './Admin.css';
import HomeIcon from "@mui/icons-material/Home";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement,
    LineElement,
    PointElement,
    ArcElement, 
    Title, 
    Tooltip, 
    Legend
);

const Admin = () => {
  const [currentTab, setCurrentTab] = useState('users');
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleHomeClick = () => {
    // Replace this with your navigation logic to go back to the home page
    window.location.href = '/';
  };

  return (
    <Box display="flex"  height="100vh">
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={handleDrawerToggle}
        variant="temporary"  // Change to 'permanent' if you want it to stay open
        sx={{
          width: 240,  // Adjust the width here as needed
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,  // Adjust the width of the drawer paper
            boxSizing: 'border-box',
            mt: 7,
            mr: 4,
          },
        }}
      >
        <List>
          <ListItem button onClick={() => { setCurrentTab('users'); handleDrawerToggle(); }}>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={() => { setCurrentTab('events'); handleDrawerToggle(); }}>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem button onClick={() => { setCurrentTab('organizers'); handleDrawerToggle(); }}>
            <ListItemText primary="Organizers" />
          </ListItem>
          <ListItem button onClick={() => { setCurrentTab('analytics'); handleDrawerToggle(); }}>
            <ListItemText primary="Analytics" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main"  flex={1} display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" mb={2} p={2} borderBottom={1} borderColor="divider">
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} aria-label="menu">
            <Menu />
          </IconButton>
          <IconButton edge="start" color="inherit" onClick={handleHomeClick} aria-label="home" sx={{ ml: 1 }}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h4" gutterBottom flex={1}>
            Admin Dashboard
          </Typography>
        </Box>
        <Box flex={1} p={1}>
          <Tabs value={currentTab} onChange={handleChange} aria-label="admin dashboard tabs">
            <Tab label="Users" value="users" />
            <Tab label="Events" value="events" />
            <Tab label="Organizers" value="organizers" />
            <Tab label="Analytics" value="analytics" />
          </Tabs>
          <Box mt={3} flex={1}>
            {currentTab === 'users' && <UsersSection />}
            {currentTab === 'events' && <EventsSection />}
            {currentTab === 'organizers' && <OrganizersSection />}
            {currentTab === 'analytics' && <AnalyticsSection />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const OrganizersSection = () => (
  <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
    <Typography variant="h6">Organizer Management</Typography>
    <Box mt={2} height="100%">
      <TableContainer component={Paper} style={{ height: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Jimmy Wanjigi</TableCell>
              <TableCell>jimmywanjigi@example.com</TableCell>
              <TableCell align="right">
                <IconButton color="primary">
                  <Edit />
                </IconButton>
                <IconButton color="secondary">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>WILLIAM RUTO</TableCell>
              <TableCell>williamruto@example.com</TableCell>
              <TableCell align="right">
                <IconButton color="primary">
                  <Edit />
                </IconButton>
                <IconButton color="secondary">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
            {/* Add more rows as needed */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Paper>
);

const UsersSection = () => (
  <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
    <Typography variant="h6">User Management</Typography>
    <Box mt={2} height="100%">
      <TableContainer component={Paper} style={{ height: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Jimmy Wanjigi</TableCell>
              <TableCell>jimmywanjigi@example.com</TableCell>
              <TableCell align="right">
                <IconButton color="primary">
                  <Edit />
                </IconButton>
                <IconButton color="secondary">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>WILLIAM RUTO</TableCell>
              <TableCell>williamruto@example.com</TableCell>
              <TableCell align="right">
                <IconButton color="primary">
                  <Edit />
                </IconButton>
                <IconButton color="secondary">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
            {/* Add more rows as needed */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Paper>
);

const EventsSection = () => (
    <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
      <Typography variant="h6">Event Management</Typography>
      <Box mt={2} height="100%">
        <TableContainer component={Paper} style={{ height: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Music Fest</TableCell>
                <TableCell>2024-09-12</TableCell>
                <TableCell>Nairobi</TableCell>
                <TableCell align="right">
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Art Expo</TableCell>
                <TableCell>2024-10-05</TableCell>
                <TableCell>Mombasa</TableCell>
                <TableCell align="right">
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
              {/* Add more rows as needed */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
  

  const AnalyticsSection = () => {
    const dataLine = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Ticket Sales',
          data: [120, 150, 180, 200, 220, 240],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const dataBar = {
      labels: ['Organizer 1', 'Organizer 2', 'Organizer 3'],
      datasets: [
        {
          label: 'Performance',
          data: [60, 70, 80],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const dataPie = {
      labels: ['User 1', 'User 2', 'User 3'],
      datasets: [
        {
          label: 'User Statistics',
          data: [30, 50, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
            },
          },
        },
      },
    };
  
    return (
        <Paper elevation={3} style={{ padding: '10px', height: '70%', backgroundColor: 'transparent', boxShadow:'none'}}>
          <Typography variant="h6">Analytics</Typography>
          <Box mt={2} display="flex" flexDirection="row" gap={2} height="70%">
            <Card style={{ flex: 1, height: '70%', zIndex: 1 }}>
              <CardContent>
                <Typography variant="h6">Ticket Sales Over Time</Typography>
                <Box mt={2}>
                  <Line data={dataLine} options={options} />
                </Box>
              </CardContent>
            </Card>
            <Card style={{ flex: 1 , height:'40%', zIndex: 1}}>
              <CardContent>
                <Typography variant="h6">Organizers Performance</Typography>
                <Box mt={2}>
                  <Bar data={dataBar} options={options} />
                </Box>
              </CardContent>
            </Card>
            <Card style={{ flex: 1, height: "40%",  zIndex: 1}}>
              <CardContent>
                <Typography variant="h6">User Statistics</Typography>
                <Box mt={2}>
                  <Pie data={dataPie} options={options} />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Paper>
      );
    };
    
  
export default Admin;
