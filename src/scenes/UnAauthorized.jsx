// src/scenes/Unauthorized.jsx
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/AuthPage');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '3rem', fontWeight: 'bold', mb: 2 }}>
        403 - Unauthorized
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        You do not have permission to view this page.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1rem',
          textTransform: 'none',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
        }}
      >
        Register for Access
      </Button>
    </Box>
  );
};

export default Unauthorized;
