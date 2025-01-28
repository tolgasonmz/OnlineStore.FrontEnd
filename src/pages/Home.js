import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Container,
  CircularProgress,
  useTheme,
  IconButton,
  Chip,
  Fade,
  Divider
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Login as LoginIcon,
  ArrowForward as ArrowForwardIcon,
  LocalOffer as LocalOfferIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { productService } from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAllProducts();
      const activeProducts = (response.data || [])
        .filter(product => !product.isDeleted)
        .map(product => ({
          ...product,
          imageUrl: getRandomImage()
        }));
      setProducts(activeProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const getRandomImage = () => {
    const images = [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80'
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.info('Please login to add items to cart');
      return;
    }
    addToCart(product);
    toast.success('Product added to cart!');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
          py: { xs: 8, md: 12 },
          mb: 6,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.mode === 'dark' ? '#fff' : '#1e293b',
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      lineHeight: 1.2
                    }}
                  >
                    Welcome to <br />
                    <Box
                      component="span"
                      sx={{
                        color: 'primary.main',
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      TLG Store
                    </Box>
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      color: theme.palette.mode === 'dark' ? '#94a3b8' : '#475569',
                      maxWidth: 500
                    }}
                  >
                    Discover amazing products at great prices. Shop with confidence and style.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/products')}
                      endIcon={<ArrowForwardIcon />}
                      sx={{
                        borderRadius: 2,
                        py: 1.5,
                        px: 4,
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
                        }
                      }}
                    >
                      Shop Now
                    </Button>
                    {!isAuthenticated && (
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={handleLoginClick}
                        startIcon={<LoginIcon />}
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          px: 4,
                          borderColor: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.dark',
                            bgcolor: 'rgba(33, 150, 243, 0.04)'
                          }
                        }}
                      >
                        Login
                      </Button>
                    )}
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Fade in={true} timeout={1500}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                  alt="Shopping"
                  sx={{
                    width: '100%',
                    maxWidth: 600,
                    height: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    transform: 'perspective(1000px) rotateY(-10deg)',
                  }}
                />
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxWidth="xl">
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: theme.palette.mode === 'dark' ? '#fff' : '#1e293b',
              textAlign: 'center',
              mb: 4
            }}
          >
            Featured Products
          </Typography>
          <Grid container spacing={3}>
            {products.slice(0, 6).map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Fade in={true}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? '0 10px 40px rgba(0,0,0,0.5)'
                          : '0 10px 40px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.imageUrl}
                      alt={product.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {product.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            mb: 2
                          }}
                        >
                          {product.description}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{ color: 'primary.main', fontWeight: 600 }}
                        >
                          ${product.price}
                        </Typography>
                        {product.discount > 0 && (
                          <Chip
                            icon={<LocalOfferIcon />}
                            label={`${product.discount}% OFF`}
                            size="small"
                            color="error"
                            sx={{ fontWeight: 500 }}
                          />
                        )}
                      </Box>
                      {product.brand && (
                        <Chip
                          icon={<StarIcon />}
                          label={product.brand.name}
                          size="small"
                          variant="outlined"
                          sx={{ mb: 2 }}
                        />
                      )}
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
                      <Button
                        size="small"
                        onClick={() => navigate(`/products/${product.id}`)}
                        endIcon={<ArrowForwardIcon />}
                      >
                        View Details
                      </Button>
                      <IconButton
                        color="primary"
                        onClick={() => handleAddToCart(product)}
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'primary.dark'
                          }
                        }}
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Home; 