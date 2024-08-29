/* eslint-disable react/prop-types */
import { Box, Card, CardContent, Typography, IconButton, List, ListItem, ListItemText, useTheme, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { Home as HomeIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Styled components for modern design
const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: 15,
  padding: theme.spacing(3),
  bgcolor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#D9DADB',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: theme.shadows[3],
  padding: theme.spacing(3),
  backgroundColor: theme.palette.mode === 'dark' ? '#2C3E50' : '#C4CCD5',
}));

const defaultAttendees = [
    { id: 1, name: 'OPARANYA', email: 'oparanya@example.com' },
    { id: 2, name: 'BUKUKU', email: 'bukuku@example.com' },
    { id: 3, name: 'MUTULA', email: 'mutula@example.com' },
    { id: 4, name: 'BOBOO', email: 'bobo@example.com' }
  ];
const AttendeesPage = ({ attendees = defaultAttendees }) => {
  const theme = useTheme();

  return (
    <StyledBox>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: '20px' }}>
        <IconButton component={Link} to = "/OrganizersPage" color="primary" sx={{ mr: 2 }}>
          <HomeIcon />
        </IconButton>
        <Box sx={{ mt: 1,flex: 1, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', color: theme.palette.primary.main, fontWeight: 'bold' }}>
        Attendees
      </Typography>
      </Box>
      </Box>
      <StyledCard>
        <CardContent>
          {attendees.length > 0 ? (
            <List>
              {attendees.map((attendee) => (
                <ListItem key={attendee.id} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <Avatar sx={{ mr: 2 }}>{attendee.name.charAt(0)}</Avatar>
                  <ListItemText 
                    primary={attendee.name} 
                    secondary={attendee.email}
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No attendees found.
            </Typography>
          )}
        </CardContent>
      </StyledCard>
    </StyledBox>
  );
};

export default AttendeesPage;
