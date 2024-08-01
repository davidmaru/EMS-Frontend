// src/scenes/AddEventPage/AddEventPage.jsx
import { Box, Typography, TextField, Button, Container, FormControl, Input} from '@mui/material';
//import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

const AddEventPage = () => {
  //const theme = useTheme();
  //const colors = tokens(theme.palette.mode);
  
  // State to hold file
  const [file, setFile] = useState(null);

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Container>
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>
          Add New Event
        </Typography>
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
          <TextField label="Event Name" variant="outlined" fullWidth />
          <TextField label="Event Date" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} />
          <TextField label="Location" variant="outlined" fullWidth />
          <TextField label="Description" variant="outlined" multiline rows={4} fullWidth />

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

          <Button variant="contained" color="primary">Add Event</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddEventPage;
