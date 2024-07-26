// src/scenes/CheckoutPage/CheckoutPage.jsx
import { useState } from 'react';
import { Container, Typography, Grid, TextField, Button, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
  form: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5),
  },
}));

const CheckoutPage = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here you can handle the form submission as needed.
  };

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper} sx={{ backgroundColor:"darkgrey"}}>
        <Typography variant="h4" className={classes.title}>
          Checkout
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                required
                value={formData.fullName}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                name="email"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                required
                value={formData.address}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="City"
                name="city"
                fullWidth
                required
                value={formData.city}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State/Province/Region"
                name="state"
                fullWidth
                required
                value={formData.state}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip / Postal Code"
                name="zip"
                fullWidth
                required
                value={formData.zip}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                name="country"
                fullWidth
                required
                value={formData.country}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Credit Card Number"
                name="cardNumber"
                fullWidth
                required
                value={formData.cardNumber}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Expiration Date"
                name="expDate"
                fullWidth
                required
                value={formData.expDate}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CVV"
                name="cvv"
                fullWidth
                required
                value={formData.cvv}
                onChange={handleChange}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth className={classes.button} type="submit">
                Checkout
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CheckoutPage;
