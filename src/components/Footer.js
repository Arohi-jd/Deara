import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Pinterest as PinterestIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const FooterLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  fontSize: '0.9rem',
  padding: '4px 0',
  '&:hover': {
    color: theme.palette.accent.main,
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  margin: '0 4px',
  '&:hover': {
    color: theme.palette.accent.main,
    transform: 'translateY(-2px)',
  },
}));

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        bgcolor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              About
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FooterLink to="/about">Our Story</FooterLink>
              <FooterLink to="/">Sustainability</FooterLink>
              <FooterLink to="/">Careers</FooterLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              Customer Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FooterLink to="/">Contact Us</FooterLink>
              <FooterLink to="/">Shipping & Returns</FooterLink>
              <FooterLink to="/">FAQ</FooterLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <SocialIcon>
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon>
                <TwitterIcon />
              </SocialIcon>
              <SocialIcon>
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon>
                <PinterestIcon />
              </SocialIcon>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                color: theme.palette.text.primary,
              }}
            >
              Newsletter
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: '0.9rem',
                color: 'text.secondary',
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.palette.divider}`,
                  fontSize: '0.9rem',
                  width: '100%',
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'secondary.main',
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.85rem',
              color: 'text.secondary',
            }}
          >
            © {new Date().getFullYear()} Deara. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 