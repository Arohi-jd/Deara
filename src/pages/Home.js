import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  Paper,
  Avatar,
  Badge,
  TextField,
} from '@mui/material';
import { motion, useAnimation, useInView, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { styled, keyframes } from '@mui/material/styles';
import tshirtImage from '../assets/tshirt.png';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TagIcon from '@mui/icons-material/Tag';
import BrushIcon from '@mui/icons-material/Brush';
import StarIcon from '@mui/icons-material/Star';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SafetyPinIcon from '@mui/icons-material/PushPin';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import ToysIcon from '@mui/icons-material/Toys';

// Font imports
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Syne:wght@800&family=Playfair+Display:wght@900&display=swap');
`;

// Animations
const glitch = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

const jiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
`;

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #E6E6FA 0%, #FFA07A 100%)',
  padding: theme.spacing(8),
}));

const SplitLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  gap: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(4),
  },
}));

const HeadlineSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(4),
  position: 'relative',
  zIndex: 2,
  maxWidth: '600px',
  margin: '0 auto',
}));

const MainText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Playfair Display', serif",
  fontWeight: 900,
  fontSize: '5rem',
  lineHeight: 1.1,
  marginBottom: theme.spacing(6),
  color: '#2C3E50',
  [theme.breakpoints.down('md')]: {
    fontSize: '3.5rem',
  },
}));

const SubText = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  marginBottom: theme.spacing(8),
  color: '#2C3E50',
  fontFamily: "'Space Grotesk', sans-serif",
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
}));

const TShirtSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 2,
  minHeight: '600px',
}));

const FloatingTShirt = styled(motion.div)(({ theme }) => ({
  width: '700px',
  height: '700px',
  backgroundImage: `url(${tshirtImage})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
  transformStyle: 'preserve-3d',
  perspective: '1000px',
  [theme.breakpoints.down('md')]: {
    width: '500px',
    height: '500px',
  },
}));

const Sticker = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  border: '2px solid #FFA07A',
  '&:hover': {
    animation: `${jiggle} 0.5s ease`,
    background: '#FFA07A',
    color: 'white',
  },
}));

const MoodWidget = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

const MoodEmoji = styled(motion.div)(({ theme }) => ({
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  background: 'white',
  cursor: 'pointer',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  border: '2px solid #E6E6FA',
  '&:hover': {
    transform: 'scale(1.1)',
    background: '#E6E6FA',
  },
}));

const ProductGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  padding: theme.spacing(2),
  maxWidth: '1400px',
  margin: '0 auto',
}));

const ProductCard = styled(motion.div)(({ theme }) => ({
  background: 'white',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'rotateY(10deg) rotateX(5deg)',
  },
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '250px',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700,
  fontSize: '1.2rem',
  color: '#2C3E50',
  marginBottom: theme.spacing(1),
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 500,
  fontSize: '1.1rem',
  color: '#FF6B35',
}));

export default function Home() {
  const theme = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedMood, setSelectedMood] = useState(null);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const moods = [
    { emoji: '💀', label: 'edgy' },
    { emoji: '🧸', label: 'soft' },
    { emoji: '🎀', label: 'girly' },
    { emoji: '🚬', label: 'cool' },
  ];

  const scrollVariants = {
    hidden: { 
      opacity: 0, 
      x: -200,
      scale: 0.8,
      rotateY: -30
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.2,
        rotateY: {
          duration: 1.2,
          ease: "easeOut"
        }
      }
    }
  };

  const scrollVariantsRight = {
    hidden: { 
      opacity: 0, 
      x: 200,
      scale: 0.8,
      rotateY: 30
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.4,
        rotateY: {
          duration: 1.2,
          ease: "easeOut"
        }
      }
    }
  };

  const scrollVariantsTop = {
    hidden: { 
      opacity: 0, 
      y: -200,
      scale: 0.8,
      rotateX: -30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.6,
        rotateX: {
          duration: 1.2,
          ease: "easeOut"
        }
      }
    }
  };

  const scrollVariantsBottom = {
    hidden: { 
      opacity: 0, 
      y: 200,
      scale: 0.8,
      rotateX: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.8,
        rotateX: {
          duration: 1.2,
          ease: "easeOut"
        }
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: -50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.2
      }
    }
  };

  const products = [
    {
      id: 1,
      title: "Vintage Vibes Tee",
      price: "$49.99",
      image: tshirtImage
    },
    {
      id: 2,
      title: "Street Style Hoodie",
      price: "$79.99",
      image: tshirtImage
    },
    {
      id: 3,
      title: "Urban Classic",
      price: "$59.99",
      image: tshirtImage
    },
    {
      id: 4,
      title: "Modern Minimalist",
      price: "$54.99",
      image: tshirtImage
    }
  ];

  return (
    <Box>
      <style>{fontStyles}</style>
      <HeroSection>
        <SplitLayout>
          <HeadlineSection>
            <MainText variant="h1">
              THIS IS NOT A T-SHIRT
            </MainText>
            <SubText variant="h2">
              Emotion-stitched threads
            </SubText>
            <Box sx={{ display: 'flex', gap: 3, mb: 6 }}>
              <Button
                component={Link}
                to="/products"
                variant="contained"
                sx={{
                  bgcolor: '#FF6B35',
                  color: 'white',
                  fontSize: '1.2rem',
                  padding: theme.spacing(1.5, 4),
                  '&:hover': {
                    bgcolor: '#FFA07A',
                  },
                }}
              >
                see the drop
              </Button>
              <Button
                component={Link}
                to="/products"
                variant="outlined"
                sx={{
                  color: '#2C3E50',
                  borderColor: '#2C3E50',
                  fontSize: '1.2rem',
                  padding: theme.spacing(1.5, 4),
                  '&:hover': {
                    borderColor: '#FFA07A',
                    color: '#FFA07A',
                  },
                }}
              >
                I'm just browsing
              </Button>
            </Box>
            <MoodWidget>
              {moods.map((mood) => (
                <MoodEmoji
                  key={mood.emoji}
                  onClick={() => setSelectedMood(mood)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {mood.emoji}
                </MoodEmoji>
              ))}
            </MoodWidget>
          </HeadlineSection>

          <TShirtSection>
            <FloatingTShirt
              animate={{
                rotateY: mousePosition.x,
                rotateX: -mousePosition.y,
              }}
              transition={{ type: 'spring', damping: 20 }}
            />
            <Sticker
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ top: '20%', right: '30%' }}
            >
              <EmojiEmotionsIcon sx={{ color: '#FF6B35' }} />
              <Typography variant="body2">vibe check</Typography>
            </Sticker>
            <Sticker
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
              style={{ top: '40%', left: '20%' }}
            >
              <FavoriteIcon sx={{ color: '#FFA07A' }} />
              <Typography variant="body2">limited drip</Typography>
            </Sticker>
            <Sticker
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.4 }}
              style={{ top: '60%', right: '40%' }}
            >
              <LocalFireDepartmentIcon sx={{ color: '#FF6B35' }} />
              <Typography variant="body2">zero basic</Typography>
            </Sticker>
          </TShirtSection>
        </SplitLayout>
      </HeroSection>
    </Box>
  );
} 
