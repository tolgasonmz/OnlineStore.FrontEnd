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
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { productService, brandService } from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    discount: '',
    description: '',
    brandId: '',
    categoryIds: []
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetchProducts();
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await brandService.getAllBrands();
      setBrands(response.data || []);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
      toast.error('Failed to fetch brands');
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productService.getAllProducts();
      if (Array.isArray(response.data)) {
        const activeProducts = response.data.filter(product => !product.isDeleted);
        setProducts(activeProducts);
      } else {
        console.error('Invalid products data:', response.data);
        toast.error('Invalid products data received');
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast.error('Failed to fetch products: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await productService.createProduct(newProduct);
      toast.success('Product created successfully!');
      setNewProduct({ title: '', price: '', discount: '', description: '', brandId: '', categoryIds: [] });
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await productService.updateProduct(editingProduct);
      toast.success('Product updated successfully!');
      setIsDialogOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.softDeleteProduct(productId);
        toast.success('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Create Product Form */}
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
            <Typography variant="h6">Create New Product</Typography>
          </Box>
          <form onSubmit={handleCreateProduct}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product Title"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Discount (%)"
                  type="number"
                  value={newProduct.discount}
                  onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="brand-select-label">Brand</InputLabel>
                  <Select
                    labelId="brand-select-label"
                    value={newProduct.brandId}
                    label="Brand"
                    onChange={(e) => setNewProduct({ ...newProduct, brandId: e.target.value })}
                    required
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    {brands.map((brand) => (
                      <MenuItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Category IDs"
                  type="text"
                  placeholder="1,2,3"
                  value={newProduct.categoryIds.join(',')}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setNewProduct({
                      ...newProduct,
                      categoryIds: inputValue === '' ? [] : inputValue.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
                    });
                  }}
                  required
                  helperText="Enter category IDs separated by commas (e.g. 1,2,3)"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
                  Create Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Products List */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
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
                    {product.title}
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    Price: ${product.price}
                  </Typography>
                  {product.discount > 0 && (
                    <Typography color="error" variant="body2">
                      Discount: %{product.discount}
                    </Typography>
                  )}
                  <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                    {product.description}
                  </Typography>
                  <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                    Brand: {product.brand?.name}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <IconButton
                    onClick={() => {
                      const productToEdit = {
                        id: product.id,
                        title: product.title?.trim() || '',
                        price: Number(product.price) || 0,
                        discount: Number(product.discount) || 0,
                        description: product.description?.trim() || '',
                        brandId: Number(product.brand?.id) || 0,
                        categoryIds: Array.isArray(product.categoryIds) 
                          ? product.categoryIds.map(Number).filter(id => !isNaN(id) && id > 0) 
                          : [],
                        categoryIdsInput: Array.isArray(product.categoryIds) 
                          ? product.categoryIds.map(Number).filter(id => !isNaN(id) && id > 0).join(',') 
                          : ''
                      };
                      setEditingProduct(productToEdit);
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
                    onClick={() => handleDeleteProduct(product.id)}
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
        <DialogTitle>Edit Product</DialogTitle>
        <form onSubmit={handleUpdateProduct}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Title"
                  value={editingProduct?.title || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  required
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={editingProduct?.price || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Discount (%)"
                  type="number"
                  value={editingProduct?.discount || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, discount: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="edit-brand-select-label">Brand</InputLabel>
                  <Select
                    labelId="edit-brand-select-label"
                    value={editingProduct?.brandId || ''}
                    label="Brand"
                    onChange={(e) => setEditingProduct({ ...editingProduct, brandId: e.target.value })}
                    required
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    {brands.map((brand) => (
                      <MenuItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category IDs"
                  value={editingProduct?.categoryIds || ''}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setEditingProduct({
                      ...editingProduct,
                      categoryIdsInput: inputValue,
                      categoryIds: inputValue === '' ? [] : inputValue.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
                    });
                  }}
                  helperText="Enter category IDs separated by commas (e.g. 1,2,3)"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={editingProduct?.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                />
              </Grid>
            </Grid>
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

export default Products;