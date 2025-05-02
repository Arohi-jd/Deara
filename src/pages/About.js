import React from 'react';
import { Container, Box, Typography, Grid, Paper } from '@mui/material';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const InfoSection = styled(Paper)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: theme.spacing(4),
  borderRadius: '16px',
  marginBottom: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontSize: '1.5rem',
}));

const SectionText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  lineHeight: 1.8,
  fontSize: '1.1rem',
}));

const MotionBox = motion(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #000, #333)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          About Deara
        </Typography>
      </MotionBox>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <MotionBox
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InfoSection>
              <SectionTitle variant="h5">Our Story</SectionTitle>
              <SectionText>
                Deara was born from a simple idea: to create t-shirts that tell stories. Founded in 2023, we've grown from a small startup to a beloved brand known for our unique designs and commitment to quality. Our journey has been about more than just selling t-shirts - it's about creating a community of individuals who express themselves through fashion.
              </SectionText>
            </InfoSection>
          </MotionBox>
        </Grid>

        <Grid item xs={12} md={6}>
          <MotionBox
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <InfoSection>
              <SectionTitle variant="h5">Our Mission</SectionTitle>
              <SectionText>
                At Deara, we believe that what you wear should reflect who you are. Our mission is to empower individuals to express their unique style and personality through high-quality, comfortable, and stylish t-shirts. We're committed to sustainable practices and ethical manufacturing, ensuring that our products not only look good but also do good.
              </SectionText>
            </InfoSection>
          </MotionBox>
        </Grid>

        <Grid item xs={12} md={6}>
          <MotionBox
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <InfoSection>
              <SectionTitle variant="h5">Quality & Sustainability</SectionTitle>
              <SectionText>
                We take pride in our commitment to quality and sustainability. Each Deara t-shirt is crafted from premium materials, ensuring comfort and durability. Our manufacturing process follows strict environmental standards, and we're constantly working to reduce our carbon footprint. From organic cotton to eco-friendly packaging, every detail matters to us.
              </SectionText>
            </InfoSection>
          </MotionBox>
        </Grid>

        <Grid item xs={12} md={6}>
          <MotionBox
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <InfoSection>
              <SectionTitle variant="h5">Our Community</SectionTitle>
              <SectionText>
                Deara is more than just a brand - it's a community. We value our customers' feedback and actively involve them in our design process. Through our social media platforms and events, we've built a vibrant community of fashion enthusiasts who share our passion for self-expression through clothing.
              </SectionText>
            </InfoSection>
          </MotionBox>
        </Grid>

        <Grid item xs={12}>
          <MotionBox
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <InfoSection>
              <SectionTitle variant="h5">Contact Us</SectionTitle>
              <SectionText>
                Have questions or want to learn more about Deara? We'd love to hear from you! Reach out to us at:
                <br />
                <br />
                <strong>Email:</strong> support@deara.com
                <br />
                <strong>Phone:</strong> +1 (555) 123-4567
                <br />
                <strong>Address:</strong> 123 Fashion Street, Design District, New York, NY 10001
              </SectionText>
            </InfoSection>
          </MotionBox>
        </Grid>
      </Grid>
    </Container>
  );
} 