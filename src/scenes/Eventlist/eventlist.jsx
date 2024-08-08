/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import { Box, Card, CardContent, CardMedia, CardActions, Typography, Container, Grid, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Blue from "../assets/Blue.jpg";

// eslint-disable-next-line react/prop-types
const EventCard = ({ event }) => {
  return (
    <Grid item xs={8} sm={8} md={6}>
      <Card sx={{ backgroundColor: "initial", maxWidth:345 }}>
        <CardMedia
          component="img"
          image={Blue}
          alt={event.name}
          sx={{ height: 140, objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {event.eventName}
          </Typography>
          <Typography color="text.secondary">
            {new Date(event.startDateTime).toLocaleString()}
            <br />
            <small>
              For {event.duration} Days
            </small>
          </Typography>
          <Typography variant="body2">
            {event.description}
          </Typography>
          <Typography>
            {event.location}
          </Typography>
          <Typography>
            {event.status}
          </Typography>
          <Typography>
            {event.organizer.userName}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={`/event/${event.id}`} style={{ textDecoration: 'none' }}>
            <Button size="small" sx={{ color: "text.secondary" }}>View Details</Button>
          </Link>
          <Link to="/cartpage" style={{ textDecoration: 'none' }}>
            <Button size="small" sx={{ color: "text.secondary" }}>Buy Ticket<br/>{event.price}</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
    // <div className="event-card">
    //   <h2>{event.EventName}</h2>
    //   <p><strong>Type:</strong> {event.EventType}</p>
    //   <p><strong>Location:</strong> {event.LocationVenue}</p>
    //   <p><strong>Description:</strong> {event.Description}</p>
    //   <p><strong>Status:</strong> {event.Status}</p>
    //   <p><strong>Price:</strong> ${event.Price}</p>
    //   <p><strong>Organizer:</strong> {event.Organizer}</p>
    //   <p><strong>Schedule:</strong> {event.Schedule}</p>
    //   <p><strong>Start Date and Time:</strong> {new Date(event.StartDateTime).toLocaleString()}</p>
    //   <p><strong>Duration:</strong> {event.Duration}</p>
    // </div>
  );
};

const GET_EVENTS_WITH_ORGANIZER = gql` query GetEventsWithOrganizer {
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
}`;
const EventList = () => {
  const [events, setEvents] = useState([]);
  const {loading, error, data} = useQuery(GET_EVENTS_WITH_ORGANIZER);

  // useEffect(() => {
  //     console.log(data)
  // }, [data]);

  if (loading) return(
    <Box sx={{ display:"flex", mt:4}}>
      <CircularProgress/>
    </Box>);
  return (
    <Grid container spacing={3} sx={{mt:4}}>
      {
        data.eventsWithOgranizers.map(t=> <EventCard event={t} key={t.id}/>)
      }
      {/* <Link to="/cartpage">
          <button   sx={{ backgroundColor:"blue"}}> 
            <div className="event-list">
              {events.map(event => (
                <EventCard key={event.Id} event={event} />
              ))}
            </div>
           </button>
      </Link>  */}
    </Grid>
  );
};

export default EventList;
