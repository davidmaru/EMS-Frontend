import { useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Home as HomeIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Dummy organizer data for calendar events
const events = [
  { id: 101, name: "State Dinner", date: "2024-09-01", attendees: 150 },
  { id: 102, name: "State Rally", date: "2024-10-15", attendees: 200 },
];

// Styled Calendar
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

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const theme = useTheme();

  return (
    <Box sx={{mt: 4, p: 3, bgcolor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#D9DADB' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '20px' }}>
        <IconButton component={Link} to = "/OrganizersPage" color="primary" sx={{ mr: 2 }}>
          <HomeIcon />
        </IconButton>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px',alignItems: 'center', color: theme.palette.primary.main }}>
        Calendar
      </Typography>
        </Box>
       </Box> 
      <Card sx={{ borderRadius: '12px', boxShadow: 3, padding: 3, backgroundColor: theme.palette.mode === 'dark' ? '#2C3E50' : '#C4CCD5' }}>
        <CardContent>
          <StyledCalendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date }) => {
              const eventDates = events.map(e => new Date(e.date).toDateString());
              return eventDates.includes(date.toDateString()) ? 'highlighted' : '';
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default CalendarPage;
