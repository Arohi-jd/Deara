import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { supabase } from '../supabaseClient';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
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
    } finally {
      setLoading(false);
    }
  }

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
            width: '33.333%',
            maxWidth: '400px',
            minWidth: '300px',
            padding: '0 16px',
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