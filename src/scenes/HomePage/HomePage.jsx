import { Box, Card, CardContent, CardMedia, CardActions, Typography, Container, Grid, Button } from '@mui/material';
import Slider from 'react-slick';
import MusicNoteSharpIcon from '@mui/icons-material/MusicNoteSharp';
import BrushIcon from "@mui/icons-material/Brush";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ComputerIcon from "@mui/icons-material/Computer";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import MovieIcon from "@mui/icons-material/Movie";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EventImage1 from "../assets/EventImage1.jpg";
import EventImage2 from "../assets/EventImage2.jpg";
import EventImage3 from "../assets/EventImage3.jpg";
import Dining from "../assets/Dining.jpg";
import Glasses from "../assets/Glasses.jpg";
import Wine from "../assets/Wine.jpg";
import Group from "../assets/Group.jpg";
import Blue from "../assets/Blue.jpg";
import WILLIAM from "../assets/WILLIAM.jpg";
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTheme } from '@emotion/react';

const images = [
  { src: EventImage1, description: "Event 1 Description" },
  { src: EventImage2, description: "Event 2 Description" },
  { src: EventImage3, description: "Event 3 Description" },
  { src: Dining, description: "Event 4 Description" },
  { src: Glasses, description: "Event 5 Description" },
  { src: Wine, description: "Event 6 Description" },
  { src: Group, description: "Event 7 Description" },
  { src: Blue, description: "Event 8 Description" },
  { src: WILLIAM, description: "UDA CELEBRATIONS" }
];

const categories = [
  { name: "Music", icon: <MusicNoteSharpIcon /> },
  { name: "Art", icon: <BrushIcon /> },
  { name: "Sports", icon: <SportsSoccerIcon /> },
  { name: "Technology", icon: <ComputerIcon /> },
  { name: "Education", icon: <SchoolIcon /> },
  { name: "Health", icon: <HealthAndSafetyIcon /> },
  { name: "Comedy", icon: <TheaterComedyIcon /> },
  { name: "Movies", icon: <MovieIcon /> },
  { name: "Deals", icon: <LocalOfferIcon /> },
];

const events = [
  { id: 1, name: "Event 1", date: "2024-08-01", description: "Description for Event 1", image: EventImage1 },
  { id: 2, name: "Event 2", date: "2024-08-05", description: "Description for Event 2", image: EventImage2 },
  { id: 3, name: "Event 3", date: "2024-08-10", description: "Description for Event 3", image: EventImage3 },
  { id: 4, name: "Event 4", date: "2024-08-16", description: "Description for Event 4", image: Dining },
  { id: 5, name: "Event 5", date: "2024-08-30", description: "Description for Event 5", image: Group },
  { id: 6, name: "Event 6", date: "2024-08-20", description: "Description for Event 6", image: Wine },
  { id: 7, name: "Event 7", date: "2024-08-17", description: "Description for Event 7", image: Glasses },
  { id: 8, name: "Event 8", date: "2024-08-17", description: "Description for Event 8", image: Blue },
  { id: 9, name: "Event 8", date: "2024-08-29", description: "UDA CELEBRATIONS", image: WILLIAM },
];

const HomePage = () => {
  const theme = useTheme();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div style={{ marginTop: '60px' }}>
      <Container>
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <Box key={index} sx={{ position: 'relative', width: '100%', height: '300px' }}>
              <CardMedia
                component="img"
                image={image.src}
                alt={`Image ${index + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  padding: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  height: '80px',
                }}
              >
                <Typography variant="subtitle2" sx={{ maxWidth: '70%', fontSize: '0.9rem' }}>
                  {image.description}
                </Typography>
                <Link to="/cartpage" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" sx={{ backgroundColor: '#4376A9', color: 'white' }} size="small">
                    Buy Ticket
                  </Button>
                </Link>
              </Box>
            </Box>
          ))}
        </Slider>

        <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
          Event Categories
        </Typography>

        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 2,
            pb: 2,
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          {categories.map((category, index) => (
            <Card key={index} sx={{ minWidth: '120px', padding: '8px', boxSizing: "initial", bgcolor: 'initial' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  height: '100px',
                  boxShadow: "none"
                }}
              >
                <Box
                  sx={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#4376A9',
                    mb: 1,
                    boxShadow: "none",
                    color: 'white',
                  }}
                >
                  {category.icon}
                </Box>
                <Typography variant="body2" component="div">
                  {category.name}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>

        <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
          Upcoming Events
        </Typography>

        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#2C3E50' : '#D8DDE1',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                }
               }}>
                <CardMedia
                  component="img"
                  image={event.image}
                  alt={event.name}
                  sx={{ height: 120, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ color: '#4376A9' }}>
                    {event.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {event.date}
                  </Typography>
                  <Typography variant="body2">
                    {event.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Link to={`/event/${event.id}`} style={{ textDecoration: 'none' }}>
                    <Button size="small" sx={{ color: '#4376A9' }}>View Details</Button>
                  </Link>
                  <Link to="/cartpage" style={{ textDecoration: 'none' }}>
                    <Button size="small" sx={{ color: '#4376A9' }}>Buy Ticket</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
