import { useState } from 'react';
import { Box, TextField, Button, Typography, Link, Paper } from '@mui/material';
import { styled } from '@mui/system';
import EventImage2 from "./assets/EventImage2.jpg"; // Import the image

// Styled components
const GradientBackground = styled('div')({
  background: 'linear-gradient(135deg, rgba(0, 105, 148, 1) 0%, rgba(0, 191, 255, 1) 100%)', // Ocean Blue Gradient
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  position: 'relative'
});

const Wave = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(180deg, rgba(0, 191, 255, 1) 50%, rgba(0, 105, 148, 1) 100%)',
  clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%)',
  zIndex: -1
});

const AuthContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1200px',
  padding: '40px',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  position: 'relative'
});

const ImageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '40%',
  paddingRight: '40px',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '10px',
  height: '100%' // Ensure the container covers the full height
});

const Image = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: -1,
  opacity: 0.5 // Adjust opacity for better overlay effect
});

const StyledPaper = styled(Paper)({
  padding: '40px',
  borderRadius: '15px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)', // Blurring effect
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width:600px)': {
    padding: '20px',
  },
});

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <GradientBackground>
      <Wave />
      <AuthContainer sx={{backgroundColor: 'initial'}}>
        <ImageContainer>
          <Image
            src={EventImage2} // Use the image directly
            alt="Background"
          />
          <Typography variant="h4" gutterBottom sx={{ mb: 2, color: '#fff', fontWeight: 'bold', zIndex: 1 }}>
            Festiflow
          </Typography>
        </ImageContainer>
        <Box component="main" sx={{ width: '65%', backgroundColor: 'initial'}}>
          <StyledPaper elevation={5} sx={{backgroundColor: 'initial'}}>
            <Typography component="h1" variant="h5" gutterBottom sx={{ mb: 2, color: '#333', fontWeight: 'bold' }}>
              {isSignUp ? 'Sign Up' : 'Login'}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {isSignUp && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirm-password"
                    sx={{ mb: 2 }}
                  />
                </>
              )}
              {!isSignUp && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{ mb: 2 }}
                  />
                </>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#007fff', color: 'white', '&:hover': { backgroundColor: '#0059b3' } }}
              >
                {isSignUp ? 'Sign Up' : 'Login'}
              </Button>
              <Box textAlign="center" sx={{ mt: 2 }}>
                <Link href="#" variant="body2" onClick={handleSwitch} sx={{ color: '#007fff', '&:hover': { color: '#0059b3' } }}>
                  {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </Link>
              </Box>
            </Box>
          </StyledPaper>
        </Box>
      </AuthContainer>
    </GradientBackground>
  );
};

export default AuthPage;
