import { Box, Card, CardContent, CardActions, CardMedia, Container, Typography, Grid, Button } from '@mui/material';
import Slider from 'react-slick';
import MusicNoteSharpIcon from '@mui/icons-material/MusicNoteSharp';
import BrushIcon from "@mui/icons-material/Brush";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ComputerIcon from "@mui/icons-material/Computer";
import SchoolIcon from "@mui/icons-material/School";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import EventImage1 from "../assets/EventImage1.jpg";
import EventImage2 from "../assets/EventImage2.jpg";
import EventImage3 from "../assets/EventImage3.jpg";
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  EventImage1,
  EventImage2,
  EventImage3,
];

const categories = [
  { name: "Music", icon: <MusicNoteSharpIcon /> },
  { name: "Art", icon: <BrushIcon /> },
  { name: "Sports", icon: <SportsSoccerIcon /> },
  { name: "Technology", icon: <ComputerIcon /> },
  { name: "Education", icon: <SchoolIcon /> },
  { name: "Health", icon: <HealthAndSafetyIcon /> },
];

const events = [
  { id: 1, name: "Event 1", date: "2024-08-01", description: "Description for Event 1" },
  { id: 2, name: "Event 2", date: "2024-08-05", description: "Description for Event 2" },
  { id: 3, name: "Event 3", date: "2024-08-10", description: "Description for Event 3" },
];

const HomePage = () => {
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
            <Box key={index} sx={{ position: 'relative', width: '100%', paddingTop: '33.33%' /* 3:1 Aspect Ratio */ }}>
              <CardMedia
                component="img"
                image={image}
                alt={`Image ${index + 1}`}
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
              />
            </Box>
          ))}
        </Slider>

        <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
          Event Categories
        </Typography>

        <Box
          sx={{
            display: 'flex',
            overflowX: 'scroll',
            gap: 2,
            pb: 2,
          }}
        >
          {categories.map((category, index) => (
            <Card key={index} sx={{ minWidth: '200px', padding: '14px', boxSizing: "initial", bgcolor: 'initial' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  height: '150px',
                  boxShadow: "none"
                }}
              >
                <Box
                  sx={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'grey.main',
                    mb: 1,
                    boxShadow: "none",
                  }}
                >
                  {category.icon}
                </Box>
                <Typography variant="h6" component="div">
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
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
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
                  <Link to="/cartpage" style={{ textDecoration: 'none' }}>
                    <Button size="small" sx={{ color: 'darkgrey' }}>Buy Ticket</Button>
                  </Link>
                  <Button size="small" sx={{ color: 'darkgrey' }}>Learn More</Button>
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
