import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Link, } from '@mui/material';
import { styled } from '@mui/system';
import { lightBlue } from '@mui/material/colors';
import Glasses from "./assets/Glasses.jpg";
import Dining from "./assets/Dining.jpg";
import Group from "./assets/Group.jpg";
import Wine from "./assets/Wine.jpg";
import WILLIAM from "./assets/WILLIAM.jpg";
import Blue from "./assets/Blue.jpg";
import { gql, useMutation } from '@apollo/client';

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
    userEmail: "",
    userName: "",
    password: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: ""
  })

  const REGISTER_USER = gql`
  mutation register($userName: String!, $userEmail: String!, $password: String!) {
  registerUser(userName: $userName, userEmail: $userEmail, password: $password) {
    error
    success
  }
}`
  const LOGIN_USER = gql`
  mutation login($userEmail: String!, $password: String!){
  loginUser(userEmail: $userEmail, password: $password) {
    token
  }
}`
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
  const [loginUser, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER)

  function handleChange(key, value) {
    setUserInfo({ ...userInfo, [key]: value })
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (loading || loginLoading) {
      return;
    }
    if (isSignUp) {
      if (userInfo.password != userInfo.confirmPassword) {
        setPasswordError({ error: true, message: "Password does not match" })
        return
      }
      setPasswordError({ ...passwordError, error: false });
      registerUser({
        variables:
        {
          userEmail: userInfo.userEmail,
          userName: userInfo.userName,
          password: userInfo.password
        }
      })
    }
    if (!isSignUp) {
      loginUser({
        variables: {
          userEmail: userInfo.userEmail,
          password: userInfo.password
        }
      })
    }
  }
  const images = [Glasses, Group, Dining, Wine, Blue, WILLIAM];
  useEffect(()=>{
    // console.log(data)
    if (data && data.registerUser.success){
      console.log(data.registerUser)
      //TODO Handle afer register
    }
  }, [data]);
  useEffect(()=>{
    // console.log(loginData.loginUser.token)
    if (loginData && loginData.loginUser){
      // console.log(loginData.loginUser.token)
      // TODO: handle token
    }
  }, [loginData])
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
                  value={userInfo.userName}
                  onChange={(e) => handleChange("userName", e.target.value)}
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
                  value={userInfo.userEmail}
                  onChange={(e) => handleChange("userEmail", e.target.value)}
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
                  value={userInfo.password}
                  onChange={(e) => handleChange('password', e.target.value)}
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
                  value={userInfo.userEmail}
                  onChange={(e) => handleChange("userEmail", e.target.value)}
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
                  value={userInfo.password}
                  onChange={(e) => handleChange('password', e.target.value)}
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
              {isSignUp ? "Already have an account? " :"Don't have an account? "}
              <Link
                href="#"
                variant="body2"
                onClick={handleSwitch}
                sx={{ color: lightBlue[300], '&:hover': { color: '#0059b3' } }}
              >
                {isSignUp ? 'Login' : "Sign Up"}
              </Link>
          {error&& <p>Error in Registering user</p>}
          {loginError && <p>Error in Login user</p>}
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
