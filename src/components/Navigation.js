import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  Divider,
  Badge,
  Container,
  Stack,
} from '@mui/material';
import {
  Inventory2 as InventoryIcon,
  CategoryRounded as CategoryIcon,
  LogoutRounded as LogoutIcon,
  PersonRounded as PersonIcon,
  HomeRounded as HomeIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  ShoppingCartRounded as ShoppingCartIcon,
  InfoRounded as InfoIcon,
  SupportRounded as ContactIcon,
  QuestionAnswerRounded as FAQIcon,
  LoginRounded as LoginIcon,
  StorefrontRounded as StoreIcon,
  SettingsRounded as SettingsIcon,
  BrandingWatermarkRounded as BrandIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

function Navigation() {
  const { isAuthenticated, logout, user } = useAuth();
  const { mode, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const location = useLocation();
  
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    logout();
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const isCurrentPath = (path) => location.pathname === path;

  const menuItems = {
    main: [
      { text: 'Home', icon: <HomeIcon />, path: '/home' },
    ],
    shop: [
      { text: 'Products', icon: <InventoryIcon />, path: '/products', protected: true },
      { text: 'Categories', icon: <CategoryIcon />, path: '/categories', protected: true },
      { text: 'Brands', icon: <BrandIcon />, path: '/brands', protected: true },
    ],
    info: [
      { text: 'About', icon: <InfoIcon />, path: '/about' },
      { text: 'Contact', icon: <ContactIcon />, path: '/contact' },
      { text: 'FAQ', icon: <FAQIcon />, path: '/faq' },
    ]
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          backdropFilter: 'blur(8px)',
          bgcolor: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.9)' 
            : 'rgba(18, 18, 18, 0.9)',
          borderBottom: 1,
          borderColor: mode === 'light' 
            ? 'rgba(0, 0, 0, 0.06)' 
            : 'rgba(255, 255, 255, 0.06)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/home"
              sx={{ 
                background: mode === 'light'
                  ? 'linear-gradient(45deg, #2563eb, #4f46e5)'
                  : 'linear-gradient(45deg, #60a5fa, #818cf8)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mr: 4
              }}
            >
              <StoreIcon sx={{ 
                color: mode === 'light' ? '#2563eb' : '#60a5fa',
                fontSize: '2rem'
              }} />
              TLG Store
            </Typography>

            {/* Main Menu Items */}
            <Stack 
              direction="row" 
              spacing={1}
              sx={{ flexGrow: 1 }}
            >
              {Object.values(menuItems).flat().map((item) => {
                if (item.protected && !isAuthenticated) return null;
                return (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: isCurrentPath(item.path)
                        ? mode === 'light' ? '#2563eb' : '#60a5fa'
                        : mode === 'light' ? '#64748b' : '#94a3b8',
                      '&:hover': {
                        bgcolor: mode === 'light' 
                          ? 'rgba(37, 99, 235, 0.08)'
                          : 'rgba(96, 165, 250, 0.08)',
                        color: mode === 'light' ? '#2563eb' : '#60a5fa',
                      },
                      textTransform: 'none',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      ...(isCurrentPath(item.path) && {
                        bgcolor: mode === 'light' 
                          ? 'rgba(37, 99, 235, 0.08)'
                          : 'rgba(96, 165, 250, 0.08)',
                      })
                    }}
                  >
                    {item.text}
                  </Button>
                );
              })}
            </Stack>

            {/* Right Side Actions */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
                <IconButton 
                  onClick={toggleTheme}
                  sx={{
                    color: mode === 'light' ? '#64748b' : '#94a3b8',
                    '&:hover': {
                      bgcolor: mode === 'light' 
                        ? 'rgba(37, 99, 235, 0.08)'
                        : 'rgba(96, 165, 250, 0.08)',
                    }
                  }}
                >
                  {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              </Tooltip>

              {isAuthenticated && (
                <Tooltip title="Shopping Cart">
                  <IconButton 
                    onClick={toggleCart}
                    sx={{
                      color: mode === 'light' ? '#64748b' : '#94a3b8',
                      '&:hover': {
                        bgcolor: mode === 'light' 
                          ? 'rgba(37, 99, 235, 0.08)'
                          : 'rgba(96, 165, 250, 0.08)',
                      }
                    }}
                  >
                    <Badge 
                      badgeContent={cartCount}
                      sx={{
                        '& .MuiBadge-badge': {
                          bgcolor: mode === 'light' ? '#2563eb' : '#60a5fa',
                          color: '#ffffff'
                        }
                      }}
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              {isAuthenticated ? (
                <Tooltip title="Account settings">
                  <IconButton 
                    onClick={handleUserMenuOpen}
                    sx={{
                      p: 0.5,
                      border: 2,
                      borderColor: mode === 'light' 
                        ? 'rgba(37, 99, 235, 0.2)'
                        : 'rgba(96, 165, 250, 0.2)',
                      '&:hover': {
                        bgcolor: mode === 'light' 
                          ? 'rgba(37, 99, 235, 0.08)'
                          : 'rgba(96, 165, 250, 0.08)',
                      }
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32,
                        bgcolor: mode === 'light' ? '#2563eb' : '#60a5fa'
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  component={Link}
                  to="/auth"
                  variant="contained"
                  startIcon={<LoginIcon />}
                  sx={{ 
                    borderRadius: 2,
                    bgcolor: mode === 'light' ? '#2563eb' : '#60a5fa',
                    '&:hover': {
                      bgcolor: mode === 'light' ? '#1d4ed8' : '#3b82f6'
                    },
                    textTransform: 'none',
                    px: 3
                  }}
                >
                  Login
                </Button>
              )}
            </Stack>

            {/* User Menu */}
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
              PaperProps={{
                elevation: 3,
                sx: { 
                  width: 220,
                  maxWidth: '100%',
                  mt: 1.5,
                  borderRadius: 2,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 500 }}>
                  {user?.email || 'User'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Administrator
                </Typography>
              </Box>
              <Divider />
              <MenuItem 
                component={Link} 
                to="/settings" 
                onClick={handleUserMenuClose}
                sx={{
                  py: 1.5,
                  '&:hover': {
                    bgcolor: mode === 'light' 
                      ? 'rgba(37, 99, 235, 0.08)'
                      : 'rgba(96, 165, 250, 0.08)',
                  }
                }}
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem 
                onClick={handleLogout} 
                sx={{ 
                  color: 'error.main',
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'error.lighter',
                  }
                }}
              >
                <ListItemIcon>
                  <LogoutIcon color="error" fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Add toolbar spacing since AppBar is fixed */}
      <Toolbar />
    </>
  );
}

export default Navigation; 