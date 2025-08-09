import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  Typography,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  Grid,
  Divider,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import axiosInstance from "../../axios/axios";

const EditCategoryPopup = ({ open, onClose, category, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    categoryName: '',
    slug: '',
    status: false
  });

  // Update form data when category prop changes
  useEffect(() => {
    if (open && category) {
      setFormData({
        categoryName: category.categoryName || '',
        slug: category.slug || '',
        status: category.status || false
      });
      setError('');
      setSuccess('');
    }
  }, [open, category]);

  const generateSlug = (categoryName) => {
    return categoryName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleCategoryNameChange = (e) => {
    const categoryName = e.target.value;
    const slug = generateSlug(categoryName);
    
    setFormData(prev => ({
      ...prev,
      categoryName,
      slug
    }));
  };

  const handleStatusChange = (e) => {
    setFormData(prev => ({
      ...prev,
      status: e.target.checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    if (!category?._id) {
      setError("Category ID is missing");
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await axiosInstance.put(
        `/api/categories/update-category/${category._id}`, 
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess("Category updated successfully!");
        setTimeout(() => {
          onSuccess && onSuccess(); // Callback to refresh parent component
          handleClose();
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Error updating category");
      } else if (error.request) {
        setError("Network error - please try again");
      } else {
        setError("Error updating category");
      }
      console.error("Error updating category:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (!saving) {
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: 450,
          maxHeight: '90vh'
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 2,
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <Typography variant="h6" fontWeight={600} sx={{ color: '#1a202c' }}>
          Edit Category
        </Typography>
        <IconButton 
          onClick={handleClose} 
          disabled={saving}
          size="small"
          sx={{
            color: '#64748b',
            '&:hover': {
              backgroundColor: '#e2e8f0'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Success Message */}
          {success && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
              {success}
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Category Name */}
            <Grid item xs={12}>
              <Box>
                <Typography 
                  variant="body1" 
                  fontWeight={600} 
                  gutterBottom
                  sx={{ color: '#374151', mb: 1 }}
                >
                  Category Name *
                </Typography>
                <TextField
                  fullWidth
                  value={formData.categoryName}
                  onChange={handleCategoryNameChange}
                  placeholder="Enter category name"
                  error={!formData.categoryName.trim() && error}
                  disabled={saving}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#ffffff',
                      '&:hover fieldset': {
                        borderColor: '#343088',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#343088',
                      }
                    }
                  }}
                />
              </Box>
            </Grid>

            {/* Slug */}
            <Grid item xs={12}>
              <Box>
                <Typography 
                  variant="body1" 
                  fontWeight={600} 
                  gutterBottom
                  sx={{ color: '#374151', mb: 1 }}
                >
                  Slug
                </Typography>
                <TextField
                  fullWidth
                  value={formData.slug}
                  disabled
                  placeholder="Auto-generated from category name"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f8fafc',
                      '& input': {
                        color: '#64748b'
                      }
                    }
                  }}
                />
                
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>

            {/* Status Toggle */}
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
                <Box>
                  <Typography 
                    variant="body1" 
                    fontWeight={600}
                    sx={{ color: '#374151' }}
                  >
                    Category Status
                  </Typography>
                  
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography 
                    variant="body2" 
                    fontWeight={500}
                    sx={{ 
                      color: formData.status ? "#10b981" : "#64748b",
                      minWidth: 60,
                      textAlign: 'right'
                    }}
                  >
                    {formData.status ? "Active" : "Inactive"}
                  </Typography>
                  <Switch
                    checked={formData.status}
                    onChange={handleStatusChange}
                    disabled={saving}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#343088',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#343088',
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ 
        px: 3, 
        pb: 3, 
        pt: 2,
        gap: 1,
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0'
      }}>
        <Button
          onClick={handleClose}
          disabled={saving}
          variant="outlined"
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: 3,
            py: 1,
            borderColor: '#d1d5db',
            color: '#374151',
            '&:hover': {
              borderColor: '#9ca3af',
              backgroundColor: '#f3f4f6'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={saving || !formData.categoryName.trim()}
          variant="contained"
          sx={{
            backgroundColor: "#343088",
            textTransform: 'none',
            borderRadius: 2,
            px: 4,
            py: 1,
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#2c2a70",
            },
            "&:disabled": {
              backgroundColor: "#d1d5db",
              color: "#6b7280"
            }
          }}
        >
          {saving ? (
            <>
              <CircularProgress size={16} sx={{ mr: 1, color: 'white' }} />
              Updating...
            </>
          ) : (
            "Update Category"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryPopup;