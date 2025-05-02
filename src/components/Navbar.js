import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems } = useCart();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Deara
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/products')}>
            Products
          </Button>
          <Button color="inherit" onClick={() => navigate('/about')}>
            About
          </Button>
          {user && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AdminIcon />}
              onClick={() => navigate('/admin')}
              sx={{
                bgcolor: '#FF6B35',
                '&:hover': {
                  bgcolor: '#FF8C5A',
                },
              }}
            >
              Admin
            </Button>
          )}
          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            sx={{ position: 'relative' }}
          >
            <ShoppingCartIcon />
            {cartItems.length > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: 'error.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                }}
              >
                {cartItems.length}
              </Box>
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 