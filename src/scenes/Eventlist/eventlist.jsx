/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import { Box, Card, CardContent, CardMedia, CardActions, Typography, Container, Grid, Button, Divider, TextField, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import Blue from "../assets/Blue.jpg";

const EventCard = ({ event }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ 
        backgroundColor: "initial", 
        borderRadius: 3, 
        boxShadow: 6, 
        transition: 'transform 0.3s ease-in-out', 
        '&:hover': { 
          transform: 'scale(1.05)',
          boxShadow: 12,
        },
      }}>
        <CardMedia
          component="img"
          image={Blue}
          alt={event.name}
          sx={{ 
            height: 220, 
            objectFit: 'cover', 
            borderTopLeftRadius: 3, 
            borderTopRightRadius: 3 
          }}
        />
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: "text.primary" }}>
            {event.eventName}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {new Date(event.startDateTime).toLocaleString()}
            <br />
            <small>
              For {event.duration} Days
            </small>
          </Typography>
          <Divider sx={{ my: 2 }}/>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {event.description}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "text.primary" }}>
            <strong>Location:</strong> {event.locationVenue}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "text.primary" }}>
            <strong>Status:</strong> {event.status}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "text.primary" }}>
            <strong>Organizer:</strong> {event.organizer.userName}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', p: 2, backgroundColor: "background.default", borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }}>
          <Link to={`/event/${event.id}`} style={{ textDecoration: 'none' }}>
            <Button variant="outlined" size="small" sx={{ color: "primary.main", borderColor: "primary.main", textTransform: 'none' }}>View Details</Button>
          </Link>
          <Link to="/cartpage" style={{ textDecoration: 'none' }}>
            <Button variant="contained" size="small" sx={{ backgroundColor: "primary.main", color: "white", textTransform: 'none' }}>Buy Ticket <br /> KES {event.ticketPrice}</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};

const GET_EVENTS_WITH_ORGANIZER = gql`
  query GetEventsWithOrganizer {
    eventsWithOgranizers {
      capacity
      description
      duration
      eventName
      eventType
      id
      locationVenue
      schedule
      startDateTime
      status
      ticketPrice
      ticketQuantity
      organizer {
        userEmail
        userId
        userName
      }
    }
  }
`;

const EventList = () => {
  const { loading, data } = useQuery(GET_EVENTS_WITH_ORGANIZER);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <CircularProgress />
    </Box>
  );

  const filteredEvents = data.eventsWithOgranizers.filter(event =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" sx={{mt: 2, mb: 4, color: "text.primary" }}>
        Available Events
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          variant="outlined"
          placeholder="Search Events"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 400, backgroundColor: "initial", borderRadius: 3 }}
        />
      </Box>
      <Grid container spacing={4}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard event={event} key={event.id} />
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
            No events found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default EventList;
