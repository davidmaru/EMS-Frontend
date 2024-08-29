import { useState } from 'react';
import { Box, Card, CardContent, TextField, Typography, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/system';

// Dummy organizer data for events
const events = [
  { id: 101, name: "State Dinner", date: "2024-09-01", attendees: 150 },
  { id: 102, name: "State Rally", date: "2024-10-15", attendees: 200 },
];

const EventsPage = () => {
  const [filter, setFilter] = useState('');
  const theme = useTheme();

  const handleSearchChange = (event) => setFilter(event.target.value);

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#D9DADB' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', color: theme.palette.primary.main }}>
        Events
      </Typography>

      <Card sx={{ borderRadius: '12px', boxShadow: 3, padding: 3, backgroundColor: theme.palette.mode === 'dark' ? '#2C3E50' : '#C4CCD5' }}>
        <CardContent>
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
                component={Link}
                to={`/EditEventPage/${event.id}`}
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
    </Box>
  );
};

export default EventsPage;
