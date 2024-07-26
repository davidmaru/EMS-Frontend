import { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Link, Paper } from '@mui/material';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Container component="main" maxWidth="xs" >
      <Paper elevation={3} sx={{ mt: 8, p: 4, backgroundColor: "darkgrey" }}>
        <Typography component="h1" variant="h5" gutterBottom>
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
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
              />
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </Button>
          <Box textAlign="center" color="white" >
            <Link  href="#" variant="body2" onClick={handleSwitch} >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthPage;
