import { useState } from 'react';
import { Box, Typography, TextField, Button, Container, FormControl, InputLabel, Select, MenuItem, Input } from '@mui/material';
import { useCreateEvent } from '../../hooks/useMutations';
import { useNavigate } from 'react-router-dom';

const EventStatuses = ["Ongoing", "Postponed", "Canceled", "Done"];
const EventTypes = ["Hybrid", "Online", "Physical"];

const AddEventPage = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDate: '',
    location: '',
    description: '',
    duration: '',
    eventType: '',
    capacity: '',
    ticketPrice: '',
    ticketQuantity: '',
    schedule: '',
    status: '',
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  // Apollo useMutation hook
  const [createEvent, { loading, error }] = useCreateEvent({
    onCompleted: (data) => {
      // Handle the success scenario, e.g., redirect to the organizer's page
      console.log('Event created Successfully:', data);
      navigate('/OrganizersPage')
    },
    onError: (error) => {
      // Handle the error scenario
      console.error('Error creating event:', error);
    },
  });

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      await createEvent({
        variables: {
          capacity: parseInt(eventData.capacity, 10),
          description: eventData.description,
          duration: parseInt(eventData.duration, 10),
          eventName: eventData.eventName,
          eventType: eventData.eventType.toUpperCase(),
          locationVenue: eventData.location,
          schedule: eventData.schedule,
          startDateTime: eventData.eventDate,
          status: eventData.status,
          ticketPrice: parseFloat(eventData.ticketPrice),
          ticketQuantity: parseInt(eventData.ticketQuantity, 10),
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>
          Add New Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxWidth: '600px',
              mx: 'auto',
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: 'initial',
            }}
          >
            <TextField
              label="Event Name"
              variant="outlined"
              fullWidth
              name="eventName"
              value={eventData.eventName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Event Date"
              type="date"
              variant="outlined"
              fullWidth
              name="eventDate"
              value={eventData.eventDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              name="location"
              value={eventData.location}
              onChange={handleChange}
              required
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              name="description"
              value={eventData.description}
              onChange={handleChange}
            />
            <TextField
              label="Duration (minutes)"
              variant="outlined"
              fullWidth
              name="duration"
              value={eventData.duration}
              onChange={handleChange}
            />
            
            {/* Event Type Dropdown */}
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select
                name="eventType"
                value={eventData.eventType}
                onChange={handleChange}
                required
              >
                {EventTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Status Dropdown */}
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={eventData.status}
                onChange={handleChange}
                required
              >
                {EventStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Capacity"
              variant="outlined"
              fullWidth
              name="capacity"
              value={eventData.capacity}
              onChange={handleChange}
            />
            <TextField
              label="Ticket Price"
              variant="outlined"
              fullWidth
              name="ticketPrice"
              value={eventData.ticketPrice}
              onChange={handleChange}
            />
            <TextField
              label="Ticket Quantity"
              variant="outlined"
              fullWidth
              name="ticketQuantity"
              value={eventData.ticketQuantity}
              onChange={handleChange}
            />
            <TextField
              label="Schedule"
              variant="outlined"
              fullWidth
              name="schedule"
              value={eventData.schedule}
              onChange={handleChange}
            />

            {/* Image Upload */}
            <FormControl fullWidth>
              <Input
                id="event-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                sx={{ mb: 2 }}
              />
              {file && (
                <Typography variant="body2" color="text.secondary">
                  Selected file: {file.name}
                </Typography>
              )}
            </FormControl>

            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Adding Event...' : 'Add Event'}
            </Button>
            {error && <Typography color="error">Error adding event: {error.message}</Typography>}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddEventPage;
