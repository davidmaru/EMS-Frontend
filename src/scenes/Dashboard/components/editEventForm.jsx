/* eslint-disable react/prop-types */
//import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { TextField, Select, MenuItem, Grid, Box, InputLabel, FormControl, Typography, Button, IconButton, duration } from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import '../scss/editEventForm.scss';
import useTheme from '../UseTheme';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useEffect, useState } from 'react';
import { useUpdateEvent } from '../../../hooks/useMutations';


function EditEventForm({ event = {}, types = [], status = [], raiseFlag = () => { } }) {
  const { mode, toggleMode } = useTheme();
  const [updateEvent, { data: updateData, loading: updateLoading, error: updateError }] = useUpdateEvent()

  useEffect(() => {
    if (event) {
      setFormValues(event)
    }
  }, [event])
  const [formValues, setFormValues] = useState({
    id: parseInt(event.id),
    capacity: event.capacity,
    description: event.description,
    duration: event.duration,
    eventName: event.eventName,
    eventType: event.eventType,
    locationVenue: event.locationVenue,
    schedule: event.schedule,
    startDateTime: event.startDateTime,
    status: event.status,
    ticketPrice: event.ticketPrice,
    ticketQuantity: event.ticketQuantity
  })
  useEffect(() => {
    if (updateData && updateData.updateEvent) {
      if (updateData.updateEvent == true) {
        raiseFlag()
      }
    }
  }, [updateData])
  function handleChanges(value, key) {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    updateEvent({ variables: { ...formValues } })
  }

  const convertToDateTimeLocalString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const value = `${year}-${month}-${day}T${hours}:${minutes}`;
    // console.log(event.)
    return value
  }
  // console.log(event)
  return (
    <Box className="edit-event-form" p={3} borderRadius={2} boxShadow={3}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Edit Event
        </Typography>
        {/* Theme Toggle Button */}
        <IconButton onClick={toggleMode} color={mode === 'light' ? 'primary' : 'secondary'}>
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Grid>
      <Grid container spacing={3}>
        {/* Event Name */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Event Name"
            variant="outlined"
            value={formValues.eventName}
            onChange={(e) => handleChanges(e.target.value, "eventName")}
          />
        </Grid>

        {/* Starting Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Starting Date"
            type="datetime-local"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={convertToDateTimeLocalString(new Date(formValues.startDateTime))}
            onChange={(e) => handleChanges(e.target.value, "startDateTime")}
          />
        </Grid>

        {/* Duration */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Duration (Days)"
            type="number"
            variant="outlined"
            inputProps={{ min: 0 }}
            value={formValues.duration}
            onChange={(e) => handleChanges(parseInt(e.target.value), "duration")}
          />
        </Grid>

        {/* Price */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price (KES)"
            type="number"
            // step={.01}
            inputProps={{ min: 0, step: "0.01" }}
            variant="outlined"
            value={formValues.ticketPrice}
            onChange={(e) => handleChanges(parseFloat(e.target.value), "ticketPrice")}
          />
        </Grid>

        {/* Capacity */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Capacity"
            type="number"
            variant="outlined"
            value={formValues.capacity}
            inputProps={{ min: 0 }}
            onChange={(e) => handleChanges(parseInt(e.target.value), "capacity")}
          />
        </Grid>

        {/* Location Venue */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location Venue"
            variant="outlined"
            value={formValues.locationVenue}
            onChange={(e) => handleChanges(e.target.value, "locationVenue")}
          />
        </Grid>

        {/* Ticket Quantity */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ticket Quantity"
            type="number"
            variant="outlined"
            inputProps={{ min: 0 }}
            value={formValues.ticketQuantity}
            onChange={(e) => handleChanges(parseInt(e.target.value), "ticketQuantity")}
          />
        </Grid>

        {/* Organizer ID */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Organizer ID"
            variant="outlined"
            value={event.organizerId}
          // onChange={(e) => handleChanges(e, "organizerId")}
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            value={formValues.description}
            onChange={(e) => handleChanges(e.target.value, "description")}
          />
        </Grid>

        {/* Schedule */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Schedule"
            multiline
            rows={4}
            variant="outlined"
            value={formValues.schedule}
            onChange={(e) => handleChanges(e.target.value, "schedule")}
          />
        </Grid>

        {/* Event Type */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="event-type-label">Choose Event Type</InputLabel>
            <Select
              labelId="event-type-label"
              id="event-type"
              label="Choose Event Type"
              value={formValues.eventType}
              onChange={(e) => handleChanges(e.target.value, "eventType")}
            >
              {types.map((type, idx) => (
                <MenuItem key={idx} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Event Status */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="event-status-label">Change Event Status</InputLabel>
            <Select
              labelId="event-status-label"
              id="event-status"
              label="Change Event Status"
              value={formValues.status}
              onChange={(e) => handleChanges(e.target.value, "status")}
            >
              {status.map((statu, idx) => (
                <MenuItem key={idx} value={statu}>{statu}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Buttons */}
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="flex-end">
            {/* Save Changes Button */}
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                type="submit"
                // eslint-disable-next-line no-unused-vars
                onClick={(_) => handleSave()}
                disabled={updateLoading? true: false}
              >
                Save Changes
              </Button>
            </Grid>

            {/* Discard Changes Button */}
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<CancelIcon />}
                type="button"
                // eslint-disable-next-line no-unused-vars
                onClick={(e) => setFormValues(event)}
              >
                Discard Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {updateError && <Grid item xs={12}>
          <p>Error has occured</p>
        </Grid>
        }
        {updateData && <Grid item xs={12}>
          {!updateData.updateEvent ? <p>Unable to update</p> : null}

        </Grid>
        }

      </Grid>
    </Box>
  );
}

// EditEventForm.propTypes = {
//   event: PropTypes.shape({
//     name: PropTypes.string,
//     startDate: PropTypes.string,
//     duration: PropTypes.number,
//     price: PropTypes.number,
//     capacity: PropTypes.number,
//     locationVenue: PropTypes.string,
//     ticketQuantity: PropTypes.number,
//     organizerId: PropTypes.string,
//     description: PropTypes.string,
//     schedule: PropTypes.string,
//     eventType: PropTypes.string,
//     eventStatus: PropTypes.string,
//   }),
//   types: PropTypes.arrayOf(PropTypes.string),
//   status: PropTypes.arrayOf(PropTypes.string),
//   onThemeToggle: PropTypes.func,  // Add this to handle the theme toggle
// };

export default EditEventForm;
