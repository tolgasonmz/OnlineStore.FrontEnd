import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Button,
  Divider,
  Avatar
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

function Cart({ isOpen, onClose }) {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Shopping Cart ({cartItems.length} items)</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider />
        
        {cartItems.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
            Your cart is empty
          </Typography>
        ) : (
          <>
            <List sx={{ maxHeight: 'calc(100vh - 250px)', overflow: 'auto' }}>
              {cartItems.map((item) => (
                <ListItem 
                  key={item.id} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'stretch', 
                    mb: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 1,
                    p: 2,
                    height: 130,
                  }}
                >
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    mr: 2
                  }}>
                    <Avatar
                      src={item.imageUrl}
                      alt={item.name}
                      sx={{ 
                        width: 70,
                        height: 70,
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                  <Box sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                    minWidth: 0
                  }}>
                    <Box>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 'bold',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          mb: 1
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      flexWrap: 'wrap',
                      gap: 1
                    }}>
                      <Box>
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          p: 0.5
                        }}>
                          <Button
                            size="small"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            sx={{ 
                              minWidth: '24px',
                              height: '24px',
                              p: 0,
                              borderRadius: '4px'
                            }}
                          >
                            -
                          </Button>
                          <Typography sx={{ 
                            mx: 1,
                            minWidth: '24px',
                            textAlign: 'center',
                            userSelect: 'none'
                          }}>
                            {item.quantity || 1}
                          </Typography>
                          <Button
                            size="small"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            sx={{ 
                              minWidth: '24px',
                              height: '24px',
                              p: 0,
                              borderRadius: '4px'
                            }}
                          >
                            +
                          </Button>
                        </Box>
                      </Box>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => removeFromCart(item.id)}
                        sx={{ height: 'fit-content' }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ textAlign: 'right' }}>
                Total: ${cartTotal}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={clearCart}
                fullWidth
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

export default Cart; 