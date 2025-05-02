import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../supabaseClient';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, signIn, signOut } = useAuth();
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

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
        navigate('/admin');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      // First sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Then clear local auth state
      signOut();
      
      // Finally navigate to home
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
            {user ? (
              <>
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
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  sx={{ ml: 1 }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AdminIcon />}
                onClick={handleClickOpen}
                sx={{
                  bgcolor: '#FF6B35',
                  '&:hover': {
                    bgcolor: '#FF8C5A',
                  },
                }}
              >
                Admin Login
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleMenuClose();
          handleLogout();
        }}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Admin Login</DialogTitle>
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
    </>
  );
} 
