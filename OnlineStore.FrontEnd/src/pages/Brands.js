import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Divider,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import { toast } from 'react-toastify';
import { brandService } from '../services/api';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [newBrand, setNewBrand] = useState({ name: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await brandService.getAllBrands();
      console.log('Brand Response:', response);
      setBrands(response.data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setError('Failed to fetch brands. Please try again later.');
      toast.error('Failed to fetch brands');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBrand = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await brandService.createBrand(newBrand);
      toast.success('Brand created successfully!');
      setNewBrand({ name: '', description: '' });
      await fetchBrands();
    } catch (error) {
      console.error('Error creating brand:', error);
      toast.error(error.response?.data?.message || 'Failed to create brand');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
          <Button variant="contained" onClick={fetchBrands} sx={{ mt: 2 }}>
            Retry
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Create New Brand
        </Typography>
        <form onSubmit={handleCreateBrand}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand Name"
                value={newBrand.name}
                onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                margin="normal"
                required
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                value={newBrand.description}
                onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                margin="normal"
                multiline
                rows={3}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Brand'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Brand List
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {brands.length === 0 ? (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body1" color="textSecondary">
                    No brands found
                  </Typography>
                </Paper>
              </Grid>
            ) : (
              brands.map((brand, index) => (
                <Grid item xs={12} sm={6} md={4} key={brand.id || index}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom component="div">
                        {brand.name}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {brand.description || 'No description available'}
                      </Typography>
                      <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                        Brand ID: {brand.id}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}

export default Brands; 