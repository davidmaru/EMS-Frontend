import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Link,} from '@mui/material';
import { styled } from '@mui/system';
import { lightBlue } from '@mui/material/colors';
import Glasses from "./assets/Glasses.jpg";
import Dining from "./assets/Dining.jpg";
import Group from "./assets/Group.jpg";
import Wine from "./assets/Wine.jpg";
import WILLIAM from "./assets/WILLIAM.jpg";
import Blue from "./assets/Blue.jpg";

// Styled components
const GradientBackground = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'flex-start',
  position: 'relative',
  backgroundColor: 'initial',
});

const AuthContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'row',
});

const FormContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  height: '100%',
  backgroundColor: 'initial',
});


const ImageContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  marginLeft: '5px',
  marginRight: '0.101px',
});

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  marginRight: '0px',
  opacity: 0.8,
});

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [Glasses, Group, Dining, Wine, Blue, WILLIAM];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <GradientBackground>
      <AuthContainer>
        <FormContainer>
            <Typography
              component="h1"
              variant="h5"
              gutterBottom
              sx={{ mb: 0.1, mt: 1,color: '#333', fontWeight: 'bold' }}
            >
              {isSignUp ? '' : ''}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              {isSignUp && (
                <>
                  <TextField
                    margin="normal"
                    required
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    sx={{ mb: 1, width: "60%",boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)'}}
                  />
                  <TextField
                    margin="normal"
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    sx={{ mb: 1 , width: "60%", boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)'}}
                  />
                  <TextField
                    margin="normal"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{ mb: 1, width: "60%",boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)' }}
                  />
                  <TextField
                    margin="normal"
                    required
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirm-password"
                    sx={{ mb: 1, width: "60%",boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)' }}
                  />
                </>
              )}
              {!isSignUp && (
                <>
                  <TextField
                    margin="normal"
                    required
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    sx={{ mb: 2, width: "60%",boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)' }}
                  />
                  <TextField
                    margin="normal"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    sx={{ mb: 2, width:"60%",boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)' }}
                  />
                </>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2,width:"70%", backgroundColor: '#007fff', color: 'white', '&:hover': { backgroundColor: '#0059b3' } }}
              >
                {isSignUp ? 'Sign Up' : 'Login'}
              </Button>
              <Box textAlign="center" sx={{ mt: -0.9 }}>
                <Link
                  href="#"
                  variant="body2"
                  onClick={handleSwitch}
                  sx={{ color: lightBlue[300], '&:hover': { color: '#0059b3' } }}
                >
                  {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                </Link>
              </Box>
            </Box>
        </FormContainer>
        <ImageContainer>
          <Image src={images[currentImageIndex]} alt="Background" />
          <Typography
            variant="h4"
            gutterBottom
            sx={{ mb: 1, color: 'whitesmoke', fontWeight: 'bold', position: 'absolute', zIndex: 1 }}
          >
            Festiflow
          </Typography>
        </ImageContainer>
      </AuthContainer>
    </GradientBackground>
  );
};

export default AuthPage;
