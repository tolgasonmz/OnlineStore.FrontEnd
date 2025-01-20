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
  Chip,
  Rating,
  useTheme,
  Container,
  CircularProgress
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Login as LoginIcon } from '@mui/icons-material';
import { productService } from '../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Sample product images
const sampleImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', // Headphones
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', // Watch
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80', // Smart watch
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80', // Perfume
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80', // Sunglasses
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', // Shoes
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80', // Electronics
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80'  // Sneakers
];

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
      // Add sample images to products
      const productsWithImages = (response.data || []).map((product, index) => ({
        ...product,
        imageUrl: sampleImages[index % sampleImages.length]
      }));
      setProducts(productsWithImages);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            py: 6,
            px: 4,
            mb: 6,
            borderRadius: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to TLG Store
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Discover our amazing products at great prices
          </Typography>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: theme.shadows[4],
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl}
                  alt={product.name}
                  sx={{ 
                    width: '100%',
                    p: 0,
                    bgcolor: 'white'
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.2,
                    height: '2.4em'
                  }}>
                    {product.title || product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      mb: 2,
                      height: '4.5em'
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={4} readOnly size="small" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      (4.0)
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={`$${product.price}`}
                      color="primary"
                      sx={{ fontWeight: 'bold' }}
                    />
                    {product.brandId && (
                      <Chip
                        label={`Brand: ${product.brandId}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  {isAuthenticated ? (
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<LoginIcon />}
                      fullWidth
                      onClick={handleLoginClick}
                    >
                      Login to Buy
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home; 