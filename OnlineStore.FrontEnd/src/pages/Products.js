import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { productService } from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title:'',
    name: '',
    description: '',
    price: '',
    brandId: '',
    categoryId:''
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await productService.createProduct(newProduct);
      toast.success('Product created successfully!');
      setNewProduct({ name: '', description: '', price: '', brandId: '' });
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
        await productService.deleteProduct(productId);
        toast.success('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  return (
    <div>
      <Paper sx={{ p: 3, mb: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Create New Product
        </Typography>
        <form onSubmit={handleCreateProduct}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Title"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand ID"
                value={newProduct.brandId}
                onChange={(e) => setNewProduct({ ...newProduct, brandId: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Category ID"
                type="number"
                value={newProduct.categoryId}
                onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                required
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
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Create Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
              <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {product.name}
                </Typography>
                <Typography color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <Typography color="textSecondary">
                  Discount: %{product.discount}
                </Typography>
                <Typography variant="body2">
                  {product.description}
                </Typography>
                <Typography variant="caption">
                  Brand ID: {product.brandId}
                </Typography>
                <Typography variant="caption">
                  Category ID: {product.categoryId}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  onClick={() => {
                    setEditingProduct(product);
                    setIsDialogOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteProduct(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit Product</DialogTitle>
        <form onSubmit={handleUpdateProduct}>
          <DialogContent>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Title"
                  value={editingProduct?.title || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, title: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  value={editingProduct?.name || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={editingProduct?.price || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Discount"
                  type="number"
                  value={editingProduct?.discount || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, discount: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Brand ID"
                  type="number"
                  value={editingProduct?.brandId || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, brandId: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Category ID"
                  type="number"
                  value={editingProduct?.categoryId || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, categoryId: e.target.value })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={editingProduct?.description || ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Products; 