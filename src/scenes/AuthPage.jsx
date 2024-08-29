import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';
import { lightBlue } from '@mui/material/colors';
import Glasses from "./assets/Glasses.jpg";
import Dining from "./assets/Dining.jpg";
import Group from "./assets/Group.jpg";
import Wine from "./assets/Wine.jpg";
import WILLIAM from "./assets/WILLIAM.jpg";
import Blue from "./assets/Blue.jpg";
import axios from 'axios';

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
  const [userInfo, setUserInfo] = useState({
    Email: "",
    UserName: "",
    Password: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: ""
  });

  function handleChange(key, value) {
    setUserInfo({ ...userInfo, [key]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isSignUp) {
      if (userInfo.Password !== userInfo.confirmPassword) {
        setPasswordError({ error: true, message: "Passwords do not match" });
        return;
      }
      setPasswordError({ ...passwordError, error: false });
      axios.post('http://localhost:5081/register', {
        Email: userInfo.Email,
        UserName: userInfo.UserName,
        Password: userInfo.Password
      })
      .then(response => {
        if (response.status === 200) {
          console.log("Registration successful", response.data);
          // Handle post-registration logic here
          alert("Registration Successful!")
          window.location.href = 'http://localhost:5173/authpage#'
        } else {
          console.error("Registration failed", response.data);
        }
      })
      .catch(error => {
        console.error("There was an error registering the user!", error);
      });
    } else {
      axios.post('http://localhost:5081/login', {
        Email: userInfo.Email,
        Password: userInfo.Password
      })
      .then(response => {
        if (response.status === 200) {
          const token = response.data.token;
          console.log('Login successful, token:', token);
          localStorage.setItem('token', token);
          // Handle post-login logic here
           window.location.href = 'http://localhost:5173/'
        } else {
          console.error("Login failed", response.data);
        }
      })
      .catch(error => {
        console.error("There was an error logging in the user!", error);
      });
    }
  }

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
            sx={{ mb: 0.1, mt: 1, color: '#333', fontWeight: 'bold' }}
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
                  label="UserName"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  sx={{ mb: 1, width: "60%", boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)' }}
                  value={userInfo.UserName}
                  onChange={(e) => handleChange("UserName", e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  sx={{ mb: 1, width: "60%", boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)' }}
                  value={userInfo.Email}
                  onChange={(e) => handleChange("Email", e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={passwordError.error}
                  helperText={passwordError.message}
                  autoComplete="current-password"
                  sx={{ mb: 1, width: "60%", boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)' }}
                  value={userInfo.Password}
                  onChange={(e) => handleChange('Password', e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  sx={{ mb: 1, width: "60%", boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)' }}
                  value={userInfo.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
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
                  sx={{ mb: 2, width: "60%", boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)' }}
                  value={userInfo.Email}
                  onChange={(e) => handleChange("Email", e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  sx={{ mb: 2, width: "60%", boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.2)' }}
                  value={userInfo.Password}
                  onChange={(e) => handleChange('Password', e.target.value)}
                />
              </>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "70%", backgroundColor: '#007fff', color: 'white', '&:hover': { backgroundColor: '#0059b3' } }}
              onClick={(e) => handleSubmit(e)}
            >
              {isSignUp ? 'Sign Up' : 'Login'}
            </Button>
            <Box textAlign="center" sx={{ mt: -0.9 }}>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <Link
                href="#"
                variant="body2"
                onClick={handleSwitch}
                sx={{ color: lightBlue[300], '&:hover': { color: '#0059b3' } }}
              >
                {isSignUp ? 'Login' : "Sign Up"}
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
