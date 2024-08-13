import { useEffect, useState } from 'react';
import { Container, Box, Typography, CircularProgress, Alert } from '@mui/material';

const Eventpage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/Eventpage.json")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setEvents(data.events); // Accessing the 'events' array from the JSON data
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error loading events: {error.message}</Alert>;

  return (
    <Container>
      <Box>
        <Typography variant="h4"sx={{mt: 6}} gutterBottom>
          The list of Events
        </Typography>
        {events.length === 0 ? (
          <Typography>No events found</Typography>
        ) : (
          <Box>
            {events.map((event) => (
              <Box key={event.id} mb={2} p={2} border={1} borderColor="divider" borderRadius="8px">
                <Typography variant="h6" gutterBottom>
                  {event.name}
                </Typography>
                <Typography><strong>Location:</strong> {event.location}</Typography>
                <Typography><strong>Date:</strong> {event.date}</Typography>
                <Typography>{event.description}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Eventpage;
