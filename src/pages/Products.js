import React, { useCallback, useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { supabase } from '../supabaseClient';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setError(error.message || 'Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert
          severity="error"
          action={(
            <Button color="inherit" size="small" onClick={fetchProducts}>
              Retry
            </Button>
          )}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          textAlign: 'center',
          mb: 6,
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '2rem' },
          background: 'linear-gradient(90deg, #000, #333)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Deara T-Shirts
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          '& > .MuiGrid-item': {
            width: { xs: '100%', sm: '50%', md: '33.333%' },
            maxWidth: '420px',
          }
        }}
      >
        {products.map((product) => (
          <Grid
            item
            key={product.id}
            xs={12}
            sm={6}
            md={4}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {products.length === 0 && !loading && (
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mt: 4,
            color: 'text.secondary'
          }}
        >
          No products available at the moment.
        </Typography>
      )}
    </Container>
  );
} 