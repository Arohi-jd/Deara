import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CardMedia,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

export default function Cart() {
  const navigate = useNavigate();
  const { user, signIn } = useAuth();
  const {
    cartItems,
    loading,
    updateQuantity,
    removeFromCart,
    getTotal,
  } = useCart();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        signIn(data.user);
        handleClose();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Please sign in to view your cart
        </Alert>
        <Button
          variant="contained"
          onClick={handleClickOpen}
        >
          Sign In
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Login Required</DialogTitle>
          <form onSubmit={handleLogin}>
            <DialogContent>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <Alert severity="info" sx={{ mb: 2 }}>
                Test Credentials:
                <br />
                Email: arohijadhav172@gmail.com
                <br />
                Password: 123456
              </Alert>
              <TextField
                autoFocus
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" sx={{ bgcolor: '#FF6B35', '&:hover': { bgcolor: '#FF8C5A' } }}>
                Login
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Cart
        </Typography>
        <Alert severity="info">
          Your cart is empty. Start shopping to add items!
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Cart
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 80, height: 80, objectFit: 'contain', mr: 2 }}
                      image={item.products.image_url}
                      alt={item.products.name}
                    />
                    <Typography variant="body1">
                      {item.products.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>${item.products.price}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>
                  ${(item.products.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">
          Total: ${getTotal().toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Container>
  );
}
