import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  CheckCircle as ApprovedIcon,
  Schedule as PendingIcon,
  Cancel as RejectedIcon,
} from '@mui/icons-material';

// Sample withdraw data
const withdrawData = {
  id: 1,
  seller: "David Malan",
  totalAmount: 40.00,
  withdrawAmount: 36.00,
  withdrawCharge: 4.00,
  createdAt: "20 January 2025",
  withdrawMethod: "Bank Payment",
  bankAccountInfo: "ibbl 4040",
  status: "Approved",
};

const WithdrawDetail = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleBack = () => {
    window.history.back();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleting withdraw request...');
    setDeleteDialogOpen(false);
    alert('Withdraw request deleted successfully!');
    window.history.back();
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <ApprovedIcon sx={{ fontSize: 16, color: 'inherit' }} />;
      case 'pending':
        return <PendingIcon sx={{ fontSize: 16, color: 'inherit' }} />;
      case 'rejected':
        return <RejectedIcon sx={{ fontSize: 16, color: 'inherit' }} />;
      default:
        return null;
    }
  };

  const getStatusChipProps = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return {
          sx: {
            backgroundColor: '#d4edda',
            color: '#155724',
            fontWeight: 500,
            border: 'none',
          },
        };
      case 'pending':
        return {
          sx: {
            backgroundColor: '#fff3cd',
            color: '#856404',
            fontWeight: 500,
            border: 'none',
          },
        };
      case 'rejected':
        return {
          sx: {
            backgroundColor: '#f8d7da',
            color: '#721c24',
            fontWeight: 500,
            border: 'none',
          },
        };
      default:
        return {
          sx: {
            backgroundColor: '#f8f9fa',
            color: '#6c757d',
            fontWeight: 500,
            border: 'none',
          },
        };
    }
  };

  const DetailRow = ({ label, value, isStatus = false, isAction = false }) => (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      py: 2.5,
      borderBottom: '1px solid #f0f0f0',
      '&:last-child': {
        borderBottom: 'none',
      }
    }}>
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#333',
          fontWeight: 500,
          fontSize: '16px'
        }}
      >
        {label}
      </Typography>
      
      <Box>
        {isStatus ? (
          <Chip
            label={value}
            {...getStatusChipProps(value)}
            sx={{
              ...getStatusChipProps(value ).sx,
              fontSize: '14px',
              height: 32,
              borderRadius: '8px',
            }}
          />
        ) : isAction ? (
          <IconButton
            onClick={handleDelete}
            sx={{
              backgroundColor: '#dc3545',
              color: 'white',
              width: 40,
              height: 40,
              '&:hover': {
                backgroundColor: '#c82333',
              },
            }}
          >
            <DeleteIcon sx={{ fontSize: 20 }} />
          </IconButton>
        ) : (
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#333',
              fontWeight: 500,
              fontSize: '16px'
            }}
          >
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      p: { xs: 2, md: 4 }
    }}>
      <Box sx={{ 
        maxWidth: 800, 
        mx: 'auto',
        backgroundColor: 'white',
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        {/* Header */}
        <Box sx={{
          p: 3,
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <IconButton
            onClick={handleBack}
            sx={{
              backgroundColor: '#f8f9fa',
              '&:hover': {
                backgroundColor: '#e9ecef',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600,
              color: '#333',
              fontSize: '24px'
            }}
          >
            Withdraw Detail
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ p: 4 }}>
          <DetailRow 
            label="Seller" 
            value={withdrawData.seller} 
          />
          <DetailRow 
            label="Total Amount" 
            value={`$${withdrawData.totalAmount.toFixed(2)}`} 
          />
          <DetailRow 
            label="Withdraw Amount" 
            value={`$${withdrawData.withdrawAmount.toFixed(2)}`} 
          />
          <DetailRow 
            label="Withdraw Charge" 
            value={`$${withdrawData.withdrawCharge.toFixed(2)}`} 
          />
          <DetailRow 
            label="Created at" 
            value={withdrawData.createdAt} 
          />
          <DetailRow 
            label="Withdraw Method" 
            value={withdrawData.withdrawMethod} 
          />
          <DetailRow 
            label="Bank/Account Info" 
            value={withdrawData.bankAccountInfo} 
          />
          <DetailRow 
            label="Status" 
            value={withdrawData.status}
            isStatus={true}
          />
          <DetailRow 
            label="Action" 
            value=""
            isAction={true}
          />
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, color: '#dc3545' }}>
          Delete Withdraw Request
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '16px', color: '#333' }}>
            Are you sure you want to delete this withdraw request? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              color: '#6c757d'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              backgroundColor: '#dc3545',
              '&:hover': {
                backgroundColor: '#c82333',
              },
              borderRadius: 1,
              px: 3
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WithdrawDetail;