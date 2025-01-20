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
  useMediaQuery,
  Badge,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Menu as MenuIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  ShoppingCart as ShoppingCartIcon,
  Info as InfoIcon,
  ContactSupport as ContactIcon,
  QuestionAnswer as FAQIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

function Navigation() {
  const { isAuthenticated, logout, user } = useAuth();
  const muiTheme = useMuiTheme();
  const { mode, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const location = useLocation();
  
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

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

  const menuItems = [
    { text: 'Home', icon: <DashboardIcon />, path: '/home' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
    { text: 'Contact', icon: <ContactIcon />, path: '/contact' },
    { text: 'FAQ', icon: <FAQIcon />, path: '/faq' },
    { text: 'Brands', icon: <CategoryIcon />, path: '/brands', protected: true },
    { text: 'Products', icon: <InventoryIcon />, path: '/products', protected: true },
  ];

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <>
      <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="primary"
              edge="start"
              onClick={handleMobileMenuOpen}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <DashboardIcon color="primary" sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{ 
              flexGrow: 1, 
              color: 'text.primary', 
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            TLG Online Store
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
              {menuItems
                .filter(item => !item.protected || isAuthenticated)
                .map((item) => (
                  <Button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    color="inherit"
                    sx={{
                      px: 3,
                      py: 1,
                      color: isCurrentPath(item.path) ? 'primary.main' : 'text.primary',
                      bgcolor: isCurrentPath(item.path) ? 'action.selected' : 'transparent',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                    startIcon={item.icon}
                  >
                    {item.text}
                  </Button>
                ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
              <FormControlLabel
                control={
                  <Switch
                    checked={mode === 'dark'}
                    onChange={toggleTheme}
                    icon={<LightModeIcon />}
                    checkedIcon={<DarkModeIcon />}
                  />
                }
                label=""
              />
            </Tooltip>

            {isAuthenticated && (
              <Tooltip title="Shopping Cart">
                <IconButton onClick={toggleCart} color="inherit" sx={{ color: 'text.primary' }}>
                  <Badge badgeContent={cartCount} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {isAuthenticated ? (
              <Tooltip title="Account settings">
                <IconButton onClick={handleUserMenuOpen} size="small">
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    <PersonIcon />
                  </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                component={Link}
                to="/auth"
                color="primary"
                variant="contained"
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Mobile Menu */}
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            PaperProps={{
              sx: { width: 200, maxWidth: '100%' }
            }}
          >
            {menuItems
              .filter(item => !item.protected || isAuthenticated)
              .map((item) => (
                <MenuItem
                  key={item.text}
                  component={Link}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                  selected={isCurrentPath(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <Typography variant="body2">{item.text}</Typography>
                </MenuItem>
              ))}
            <Divider />
            <MenuItem onClick={toggleTheme}>
              <ListItemIcon>
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </ListItemIcon>
              <Typography variant="body2">
                {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Typography>
            </MenuItem>
            {isAuthenticated && (
              <MenuItem onClick={toggleCart}>
                <ListItemIcon>
                  <Badge badgeContent={cartCount} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </ListItemIcon>
                <Typography variant="body2">Cart</Typography>
              </MenuItem>
            )}
          </Menu>

          {/* User Menu */}
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            PaperProps={{
              sx: { width: 220, maxWidth: '100%' }
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1" color="text.primary">
                {user?.email || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Administrator
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navigation; 