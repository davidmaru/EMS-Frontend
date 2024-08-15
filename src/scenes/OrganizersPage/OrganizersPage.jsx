import React from 'react';
import { Box, Grid, Card, CardContent, Button, IconButton, Typography, Divider, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.scss';

// Dummy organizer data
const organizer = {
  id: 1,
  name: "State Man",
  contact: "stateman@example.com",
  bio: "Bio for State Man",
  events: [
    { id: 101, name: "State Dinner", date: "2024-09-01", attendees: 150 },
    { id: 102, name: "State Rally", date: "2024-10-15", attendees: 200 },
  ],
};

// Styled components
const StyledPanel = styled(Box)(({ theme, closed }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: closed ? '60px' : '240px',
  transition: 'width 0.3s',
  height: `calc(100vh - 15px)`,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  position: 'fixed',
  top: '70px',
  left: 0,
  zIndex: 1200,
}));

const StyledPanelHeader = styled(Box)(({ theme }) => ({
  padding: '16px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledPanelItem = styled(Box)(({ theme, closed }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  transition: 'all 0.3s',
  cursor: 'pointer',
  '&:hover': { backgroundColor: theme.palette.action.hover },
  '.text': {
    opacity: closed ? 0 : 1,
    width: closed ? 0 : 'auto',
    overflow: 'hidden',
    transition: 'opacity 0.3s, width 0.3s',
    whiteSpace: 'nowrap',
  },
}));

const PanelItem = ({ children, text, closed, handler }) => (
  <StyledPanelItem onClick={handler} closed={closed}>
    <span className="icon" style={{ marginRight: '8px' }}>
      {children}
    </span>
    <span className={`text ${closed ? 'close' : 'open'}`}>{text}</span>
  </StyledPanelItem>
);

PanelItem.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string,
  closed: PropTypes.bool,
  handler: PropTypes.func,
};

const OrganizerDashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDrawerToggle = () => setOpen(!open);

  const handleAddEvent = () => {
    window.location.href = `/AddEventPage`;
  };

  const handleSearchChange = (event) => setFilter(event.target.value);

  const filteredEvents = organizer.events.filter(event =>
    event.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', mt: 0 }}>
      {/* Side Panel */}
      <StyledPanel closed={!open}>
        <StyledPanelHeader>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ color: '#ffffff' }}>
            <MenuIcon />
          </IconButton>
        </StyledPanelHeader>
        <PanelItem
          text="Home"
          closed={!open}
          handler={() => window.location.href = ""}
        >
          <HomeIcon />
        </PanelItem>
        <PanelItem
          text="Events"
          closed={!open}
          handler={() => window.location.href = `/organizer/${organizer.id}`}
        >
          <EventIcon />
        </PanelItem>
        <PanelItem
          text="Attendees"
          closed={!open}
          handler={() => window.location.href = `/organizer/${organizer.id}/attendees`}
        >
          <PeopleIcon />
        </PanelItem>
        <PanelItem
          text="Calendar"
          closed={!open}
          handler={() => window.location.href = `/organizer/${organizer.id}/calendar`}
        >
          <CalendarMonthOutlinedIcon />
        </PanelItem>
        <StyledPanelItem closed={!open} onClick={handleAddEvent}>
          <span className="icon" style={{ marginRight: '8px' }}>
            <AddIcon />
          </span>
          <span className={`text ${open ? 'open' : 'close'}`}>Add Event</span>
        </StyledPanelItem>
      </StyledPanel>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          marginLeft: open ? '240px' : '60px',
          marginTop: '15px',
        }}
      >
        {/* Content */}
        <Box sx={{ marginTop: 0 }}>
          <Typography variant="h4" sx={{ marginBottom: '20px', color: '#1975D1' }}>
            {organizer.name} Dashboard
          </Typography>

          {/* Organizer Details */}
          <Card sx={{ marginBottom: '20px', padding: 3, borderRadius: '12px', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: '10px', color: '#1975D1' }}>Contact Information</Typography>
              <Typography variant="body2" sx={{ marginBottom: '5px' }}>{organizer.contact}</Typography>
              <Typography variant="body2" sx={{ marginTop: '10px', color: '#555' }}>{organizer.bio}</Typography>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            {/* Events Section */}
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: '12px', boxShadow: 3, padding: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ marginBottom: '10px', color: '#1975D1' }}>Events</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Search Events"
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    value={filter}
                    onChange={handleSearchChange}
                  />
                  {filteredEvents.map((event) => (
                    <Box key={event.id} sx={{ marginBottom: '20px' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>{event.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#555' }}>Date: {event.date}</Typography>
                      <Typography variant="body2" sx={{ color: '#555' }}>Attendees: {event.attendees}</Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/organizer/${organizer.id}/event/${event.id}`}
                        sx={{ marginTop: '10px', textTransform: 'none' }}
                      >
                        Manage Event
                      </Button>
                      <Divider sx={{ marginTop: '20px' }} />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Calendar Section */}
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: '12px', boxShadow: 3, padding: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ marginBottom: '10px', color: '#1975D1' }}>
                    Event Calendar
                  </Typography>
                  <Box
                    sx={{
                      height: '400px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'initial',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      padding: '16px',
                    }}
                  >
                    <Calendar
                      className="custom-calendar"
                      onChange={setSelectedDate}
                      value={selectedDate}
                      minDetail="month"
                      maxDetail="month"
                      showNavigation={true}
                      tileClassName={({ date, view }) => view === 'month' && date.getDate() % 2 === 0 ? 'highlighted' : null}
                    />
                    <Typography variant="body1" sx={{ marginTop: '20px', textAlign: 'center', color: '#333' }}>
                      Selected Date: <span style={{ fontWeight: 'bold', color: '#1975D1' }}>{selectedDate.toDateString()}</span>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default OrganizerDashboard;
