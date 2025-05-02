import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
  borderRadius: '12px',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
}));

const StyledCardMedia = styled(CardMedia)({
  height: 350,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundColor: '#f5f5f5',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2.5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: 'space-between',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const PriceTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '1.4rem',
}));

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleAddToCart = async () => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }

      await addToCart(product.id);
      setSnackbar({
        open: true,
        message: 'Product added to cart!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to add product to cart. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <StyledCard>
        <Box sx={{ position: 'relative' }}>
          <StyledCardMedia
            image={product.image_url}
            title={product.name}
          />
          <IconButton
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              width: 36,
              height: 36,
            }}
            onClick={toggleFavorite}
          >
            {isFavorite ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
        </Box>

        <StyledCardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="h2"
            sx={{
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontSize: '1.2rem',
              lineHeight: 1.4,
            }}
          >
            {product.name}
          </Typography>

          <PriceTypography variant="h6">
            ${product.price.toFixed(2)}
          </PriceTypography>
        </StyledCardContent>

        <StyledCardActions>
          <Button
            size="medium"
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              px: 2.5,
              py: 1,
              fontSize: '0.95rem',
              fontWeight: 600,
              width: '100%',
            }}
          >
            Add to Cart
          </Button>
        </StyledCardActions>
      </StyledCard>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}