import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  useTheme
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { brandService } from '../services/api';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState({ name: '' });
  const [editingBrand, setEditingBrand] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const response = await brandService.getAllBrands();
      const activeBrands = (response.data || []).filter(brand => !brand.isDeleted);
      setBrands(activeBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Failed to fetch brands');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBrand = async (e) => {
    e.preventDefault();
    if (!newBrand.name.trim()) {
      toast.error('Brand name is required');
      return;
    }
    try {
      setIsLoading(true);
      await brandService.createBrand({ name: newBrand.name.trim() });
      toast.success('Brand created successfully!');
      setNewBrand({ name: '' });
      await fetchBrands();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create brand');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBrand = async (e) => {
    e.preventDefault();
    if (!editingBrand.name.trim()) {
      toast.error('Brand name is required');
      return;
    }
    try {
      setIsLoading(true);
      await brandService.updateBrand({
        id: editingBrand.id,
        name: editingBrand.name.trim()
      });
      toast.success('Brand updated successfully!');
      setIsDialogOpen(false);
      setEditingBrand(null);
      await fetchBrands();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update brand');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBrand = async (brandId) => {
    if (window.confirm('Are you sure you want to delete this brand?')) {
      try {
        setIsLoading(true);
        await brandService.softDeleteBrand(brandId);
        toast.success('Brand deleted successfully!');
        await fetchBrands();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete brand');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Create Brand Form */}
      <Card 
        elevation={0}
        sx={{ 
          mb: 4,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          borderRadius: 3,
          border: 1,
          borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AddIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Create New Brand</Typography>
          </Box>
          <form onSubmit={handleCreateBrand}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Brand Name"
                value={newBrand.name}
                onChange={(e) => setNewBrand({ name: e.target.value })}
                required
                disabled={isLoading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{
                  px: 4,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
                  }
                }}
              >
                Create
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* Brands List */}
      <Grid container spacing={3}>
        {brands.map((brand) => (
          <Grid item xs={12} sm={6} md={4} key={brand.id}>
            <Fade in={true}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 2,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {brand.name}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <IconButton
                    onClick={() => {
                      setEditingBrand(brand);
                      setIsDialogOpen(true);
                    }}
                    sx={{ 
                      color: 'primary.main',
                      '&:hover': { transform: 'scale(1.1)' }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDeleteBrand(brand.id)}
                    sx={{ 
                      color: 'error.main',
                      '&:hover': { transform: 'scale(1.1)' }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 400
          }
        }}
      >
        <DialogTitle>Edit Brand</DialogTitle>
        <form onSubmit={handleUpdateBrand}>
          <DialogContent>
            <TextField
              fullWidth
              label="Brand Name"
              value={editingBrand?.name || ''}
              onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
              required
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2.5 }}>
            <Button 
              onClick={() => setIsDialogOpen(false)}
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
                }
              }}
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default Brands; 