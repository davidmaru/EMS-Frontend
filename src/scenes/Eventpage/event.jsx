
import { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';

const Eventpage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/Eventpage.json")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setEvents(data.events)) // Accessing the 'events' array from the JSON data
      .catch(error => console.error('Fetch error:', error));
  }, []);

  return (
    <Container>
      <Box>
        <h1>The list of Events</h1>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <h2>{event.name}</h2>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      </Box>
    </Container>
  );
};

export default Eventpage;
