/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h2>{event.EventName}</h2>
      <p><strong>Type:</strong> {event.EventType}</p>
      <p><strong>Location:</strong> {event.LocationVenue}</p>
      <p><strong>Description:</strong> {event.Description}</p>
      <p><strong>Status:</strong> {event.Status}</p>
      <p><strong>Price:</strong> ${event.Price}</p>
      <p><strong>Organizer:</strong> {event.Organizer}</p>
      <p><strong>Schedule:</strong> {event.Schedule}</p>
      <p><strong>Start Date and Time:</strong> {new Date(event.StartDateTime).toLocaleString()}</p>
      <p><strong>Duration:</strong> {event.Duration}</p>
    </div>
  );
};

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/events.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data); // Log the fetched data
        setEvents(data);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <>
      <style>{`
        .event-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 20px;
          justify-content: center;
          background-color: #CD5C5C;
        }

        .event-card {
          background-color: grey;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 300px;
          padding: 20px;
          margin: 10px;
          transition: transform 0.2s;
        }

        .event-card:hover {
          transform: translateY(-10px);
        }

        .event-card h2 {
          font-size: 1.5em;
          margin-bottom: 10px;
        }

        .event-card p {
          margin: 5px 0;
        }

        .event-card strong {
          color: black;
        }
      `}</style>

        <Link to="/cartpage">
            <button style={{ backgroundColor:"blue"}}> 
              <div className="event-list">
                {events.map(event => (
                  <EventCard key={event.Id} event={event} />
                ))}
              </div>
             </button>
        </Link> 

    </>
  );
};

export default EventList;
