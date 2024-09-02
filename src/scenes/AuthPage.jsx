import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Link,  Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/system";
import axios from "./Axios/Axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Glasses from "./assets/Glasses.jpg";
import Dining from "./assets/Dining.jpg";
import Group from "./assets/Group.jpg";
import Wine from "./assets/Wine.jpg";
import WILLIAM from "./assets/WILLIAM.jpg";
import Blue from "./assets/Blue.jpg";
import Swal from "sweetalert2";

// Styled components
const GradientBackground = styled("div")({
  display: "flex",
  width: "100%",
  height: "100vh",
  alignItems: "center",
  justifyContent: "flex-start",
  position: "relative",
  backgroundColor: "initial",
});

const AuthContainer = styled(Box)({
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "row",
});

const FormContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  height: "100%",
  backgroundColor: "initial",
});

const ImageContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
  marginLeft: "5px",
  marginRight: "0.101px",
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  marginRight: "0px",
  opacity: 0.8,
});

const roles = [
  { value: 'organizer', label: 'Organizer' },
  { value: 'basic', label: 'Basic' },
];

// eslint-disable-next-line react/prop-types
const AuthPage = ({ setIsAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(false); // Default to login view
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userInfo, setUserInfo] = useState({
    Email: "",
    UserName: "",
    Password: "",
    confirmPassword: "",
    Role: "",
  });
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: "",
  });

  const navigate = useNavigate(); // Initialize navigate

  function handleChange(key, value) {
    setUserInfo({ ...userInfo, [key]: value });
  }
  const [loading, setLoading] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // Start loading

    if (isSignUp) {
      // Handle sign up
      if (userInfo.Password !== userInfo.confirmPassword) {
        setPasswordError({ error: true, message: "Passwords do not match" });
        return;
      }
      setPasswordError({ ...passwordError, error: false });
      axios
        .post("/register", {
          Email: userInfo.Email,
          UserName: userInfo.UserName,
          Password: userInfo.Password,
          Role: userInfo.Role, // Send role with registration

        })
        .then((response) => {
          setLoading(false); // Stop loading

          if (response.status === 200) {
            Swal.fire({
              title: "Success!",
              text: "Registration Successful! Please log in.",
              icon: "success",
              customClass: {
                container: 'swal-container',
                header: 'swal-header',
                title: 'swal-title',
                content: 'swal-content',
                footer: 'swal-footer',
                confirmButton: 'swal-confirm-button',
              },
              confirmButtonText: "OK",
            }).then(() => {
              setIsSignUp(false); // Switch to login form after successful registration
            });
          } else {
            console.error("Registration failed", response.data);
          }
        })
        .catch((error) => {
          setLoading(false); // Stop loading
          console.error("There was an error registering the user!", error);
        });
    } else {
      // Handle login
      axios
        .post("/login/", {
          Email: userInfo.Email,
          Password: userInfo.Password,
        })
        .then((response) => {
          setLoading(false); // Stop loading
          if (response.status === 200) {
            const token = response.data.accessToken; // Update to match the backend response
            const role = response.data.role; // Get role from response
            const expirationTime = new Date().getTime() + 15 * 60 * 1000; // Token expiration set to 15 minutes
            localStorage.setItem("authToken", token);
            localStorage.setItem("tokenExpiration", expirationTime.toString());
            localStorage.setItem("userRole", role); // Store role in localStorage
            setIsAuthenticated(true);

            const redirectPath = () => { // Default path for normal users
            if (role === "Admin") {
              navigate("/Dashboard");
            } else if (role === "Organizer") {
              navigate("/OrganizersPage");
            } else {
              navigate ("/");
             }
            }

            Swal.fire({
              title: "Success!",
              text: "Login Successful! Redirecting...",
              icon: "success",
              customClass: {
                container: 'swal-container',
                header: 'swal-header',
                title: 'swal-title',
                content: 'swal-content',
                footer: 'swal-footer',
                confirmButton: 'swal-confirm-button',

              },
              confirmButtonText: "OK",
            }).then(() => {
              redirectPath(); // Redirect based on role
            });
          } 
        })
        .catch((error) => {
          setLoading(false); // Stop loading on error
          if (error.response && error.response.status === 400 ) {
            Swal.fire({
              title: "Error",
              text: "Invalid email or password. Please try again.",
              icon: "error",
              customClass: {
                container: 'swal-container',
                header: 'swal-header',
                title: 'swal-title',
                content: 'swal-content',
                footer: 'swal-footer',
                confirmButton: 'swal-confirm-button',
              },
              confirmButtonText: "OK",
            });
          } else {
            console.error("There was an error logging in the user!", error);
          }
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
            sx={{ mb: 0.1, mt: 1, color: "#333", fontWeight: "bold" }}
          >
            {isSignUp ? "Sign Up" : "Login"}
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
                  sx={{
                    mb: 1,
                    width: "60%",
                    boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.2)",
                  }}
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
                  sx={{
                    mb: 1,
                    width: "60%",
                    boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.2)",
                  }}
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
                  sx={{
                    mb: 1,
                    width: "60%",
                    boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.2)",
                  }}
                  value={userInfo.Password}
                  onChange={(e) => handleChange("Password", e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  sx={{
                    mb: 1,
                    width: "60%",
                    boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.2)",
                  }}
                  value={userInfo.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                />
                 <FormControl fullWidth sx={{ mb: 2, width: "60%" }}>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    value={userInfo.Role}
                    onChange={(e) => handleChange("Role", e.target.value)}
                    label="Role"
                  >
                    {roles.map((Role) => (
                      <MenuItem key={Role.value} value={Role.value}>
                        {Role.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                  sx={{
                    mb: 2,
                    width: "60%",
                    boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.2)",
                  }}
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
                  sx={{
                    mb: 2,
                    width: "60%",
                    boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.2)",
                  }}
                  value={userInfo.Password}
                  onChange={(e) => handleChange("Password", e.target.value)}
                />
              </>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: "70%",
                backgroundColor: "#007fff",
                color: "white",
                "&:hover": { backgroundColor: "#0059b3" },
              }}
              onClick={(e) => handleSubmit(e)}
              disabled-={loading}//disable button while loading
            >
              {loading ? "Please wait...": isSignUp ? "Sign Up" : "Login"}
            </Button>
            <Box textAlign="center" sx={{ mt: -0.9 }}>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <Link href="#" variant="body2" onClick={handleSwitch}>
                {isSignUp ? "Login" : "Sign Up"}
              </Link>
            </Box>
          </Box>
        </FormContainer>
        <ImageContainer>
          <Image src={images[currentImageIndex]} alt="Background Image" />
        </ImageContainer>
      </AuthContainer>
    </GradientBackground>
  );
};

export default AuthPage;
