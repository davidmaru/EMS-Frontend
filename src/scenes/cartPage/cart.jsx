import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, Typography, TextField, Button, 
  Box, Grid, Card, CardContent, IconButton, Divider, Paper 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Ticket Type', price: 5000.00, quantity: 0 },
    { id: 2, name: 'Ticket Type VIP', price: 1000.00, quantity: 0 }
  ]);
  const [coupon, setCoupon] = useState('');
  const [cartTotal, setCartTotal] = useState(0.00);
  const [tax, setTax] = useState(0.00);

  const handleQuantityChange = (id, delta) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    });
    setCartItems(updatedItems);
    updateCartTotal(updatedItems);
  };

  const handleCoupon = () => {
    console.log('Coupon applied:', coupon);
  };

  const handleCheckout = () => {
    console.log('Checkout initiated');
  };

  const updateCartTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
    setTax(total * 0.1); // Example tax calculation (10% tax)
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4 , backgroundColor:"initial"}}>
        <Typography variant="h4" gutterBottom>Cart Page</Typography>
        <Grid container spacing={2}>
          {cartItems.map(item => (
            <Grid item xs={12} key={item.id}>
              <Card>
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="body1">{item.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1">ksh{item.price.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1">Qty: {item.quantity}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <IconButton 
                        color="primary" 
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton 
                        color="secondary" 
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 0}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={4}>
          <TextField
            label="Enter Coupon Code"
            variant="outlined"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleCoupon}>
            Apply
          </Button>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Box mt={4}>
          <Typography variant="h6">Cart Totals</Typography>
          <Typography>Cart Total: KSH {cartTotal.toFixed(2)}</Typography>
          <Typography>Tax: KSH {tax.toFixed(2)}</Typography>
          <Typography>Sub Total: KSH {(cartTotal + tax).toFixed(2)}</Typography>
        </Box>
        <Box mt={4}>
          <Link to="/CheckoutPage" style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}

export default Cart;
