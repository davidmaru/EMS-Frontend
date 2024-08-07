import PropTypes from 'prop-types';
import { TextField, Select, MenuItem, Grid, Box, InputLabel, FormControl, Typography, Button, IconButton } from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon} from '@mui/icons-material';
import '../scss/editEventForm.scss';
import { useTheme } from '../UseTheme';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


function EditEventForm({ event = {}, types = [], status = []}) {
    const { mode, toggleMode } = useTheme();

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
            defaultValue={event.name || ''}
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
            defaultValue={event.startDate || ''}
          />
        </Grid>

        {/* Duration */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Duration (hours)"
            type="number"
            variant="outlined"
            defaultValue={event.duration || ''}
          />
        </Grid>

        {/* Price */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price (KES)"
            type="number"
            step={100}
            inputProps={{ min: 0 }}
            variant="outlined"
            defaultValue={event.price || ''}
          />
        </Grid>

        {/* Capacity */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Capacity"
            type="number"
            variant="outlined"
            defaultValue={event.capacity || ''}
          />
        </Grid>

        {/* Location Venue */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location Venue"
            variant="outlined"
            defaultValue={event.locationVenue || ''}
          />
        </Grid>

        {/* Ticket Quantity */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ticket Quantity"
            type="number"
            variant="outlined"
            defaultValue={event.ticketQuantity || ''}
          />
        </Grid>

        {/* Organizer ID */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Organizer ID"
            variant="outlined"
            defaultValue={event.organizerId || ''}
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
            defaultValue={event.description || ''}
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
            defaultValue={event.schedule || ''}
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
              defaultValue={event.eventType || ''}
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
              defaultValue={event.eventStatus || ''}
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
              >
                Discard Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

EditEventForm.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    startDate: PropTypes.string,
    duration: PropTypes.number,
    price: PropTypes.number,
    capacity: PropTypes.number,
    locationVenue: PropTypes.string,
    ticketQuantity: PropTypes.number,
    organizerId: PropTypes.string,
    description: PropTypes.string,
    schedule: PropTypes.string,
    eventType: PropTypes.string,
    eventStatus: PropTypes.string,
  }),
  types: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.arrayOf(PropTypes.string),
  onThemeToggle: PropTypes.func,  // Add this to handle the theme toggle
};

export default EditEventForm;
