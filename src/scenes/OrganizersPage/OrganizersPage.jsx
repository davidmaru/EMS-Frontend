import React from 'react';
import { Box, Grid, Card, CardContent,IconButton, Button, Typography, Divider, TextField, useTheme } from '@mui/material';
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
  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#D9DADB',
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
  backgroundColor: closed ? (theme.palette.mode === 'dark' ? '#444' : '#D9DADB') : 'transparent',
  '&:hover': { backgroundColor: theme.palette.action.hover },
  '.text': {
    opacity: closed ? 0 : 1,
    width: closed ? 0 : 'auto',
    overflow: 'hidden',
    transition: 'opacity 0.3s, width 0.3s',
    whiteSpace: 'nowrap',
  },
}));

const StyledCalendar = styled(Calendar)(({ theme }) => ({
  '&.react-calendar': {
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === 'dark' ? '#2C3E50' : '#93A8BF',
    boxShadow: theme.shadows[2],
    border: `1px solid ${theme.palette.divider}`,
    padding: '10px',
  },
  '& .react-calendar__tile': {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.highlighted': {
      backgroundColor: theme.palette.action.selected,
      color: theme.palette.primary.contrastText,
    },
  },
  '& .react-calendar__navigation button': {
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '& .react-calendar__tile--now': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  '& .react-calendar__tile--active': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const PanelItem = ({ children, text, closed, to }) => (
  <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
  <StyledPanelItem closed={closed}>
    <span className="icon" style={{ marginRight: '8px' }}>
      {children}
    </span>
    <span className={`text ${closed ? 'close' : 'open'}`}>{text}</span>
  </StyledPanelItem>
  </Link>
);

PanelItem.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string,
  closed: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

const OrganizerDashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const theme = useTheme(); // Get the current theme

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
          to="/OrganizersPage"
        >
          <HomeIcon />
        </PanelItem>
        <PanelItem
          text="Events"
          closed={!open}
          to={`/organizer/${organizer.id}`}
        >
          <EventIcon />
        </PanelItem>
        <PanelItem
          text="Attendees"
          closed={!open}
          to={`/organizer/${organizer.id}/attendees`}
        >
          <PeopleIcon />
        </PanelItem>
        <PanelItem
          text="Calendar"
          closed={!open}
          to={`/organizer/${organizer.id}/calendar`}
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
          bgcolor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#D9DADB',
          p: 3,
          marginLeft: open ? '240px' : '60px',
          marginTop: '15px',
        }}
      >
        {/* Content */}
        <Box sx={{ marginTop: 0 }}>
          <Typography variant="h4" sx={{ marginBottom: '20px', color: theme.palette.primary.main }}>
            {organizer.name} Dashboard
          </Typography>

          {/* Organizer Details */}
          <Card sx={{ marginBottom: '20px', padding: 3, borderRadius: '12px', boxShadow: 3, backgroundColor: theme.palette.mode === 'dark' ? '#2C3E50' : '#C4CCD5' }}>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>Contact Information</Typography>
              <Typography variant="body2" sx={{ marginBottom: '5px' }}>{organizer.contact}</Typography>
              <Typography variant="body2" sx={{ marginTop: '10px', color: theme.palette.text.secondary }}>{organizer.bio}</Typography>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            {/* Events Section */}
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: '12px', boxShadow: 3, padding: 3, backgroundColor: theme.palette.mode === 'dark' ? '#2C3E50' : '#C4CCD5' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>Events</Typography>
                  <TextField
                    variant="outlined"
                    placeholder="Search Events"
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                    value={filter}
                    onChange={handleSearchChange}
                  />
                  {filteredEvents.map((event) => (
                    <Box key={event.id} sx={{ marginBottom: '10px' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>{event.name}</Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Date: {event.date}</Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Attendees: {event.attendees}</Typography>
                      <Divider sx={{ marginY: '10px' }} />
                      <Button
                          variant="contained"
                          color="primary"
                          sx={{ marginRight: '10px' }}
                          // component={Link}
                          // to={`/EditEventPage/${event.id}`}
                        >
                          Edit
                        </Button>
                        <Button variant="outlined" color="error">
                          Delete
                        </Button>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Calendar Section */}
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: '12px', boxShadow: 3, padding: 3, backgroundColor: theme.palette.mode === 'dark' ? '#2C3E50' : '#C4CCD5' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ marginBottom: '10px', color: theme.palette.primary.main }}>Calendar</Typography>
                  <StyledCalendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileClassName={({ date }) => {
                      const eventDates = organizer.events.map(e => new Date(e.date).toDateString());
                      return eventDates.includes(date.toDateString()) ? 'highlighted' : '';
                    }}
                  />
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
