import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';

// Sample data
const studentData = {
  name: "John Doe",
  avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  phone: "123-874-6548",
  email: "student@gmail.com",
  address: "Jackson Heights, 11372, NY, United States",
  enrolledCourses: 12,
  totalTransaction: 628.00,
  walletBalance: 0.00,
};

const enrollmentsData = [
  {
    id: 1,
    serial: 1,
    invoice: "#829776602",
    totalAmount: 90.00,
    date: "12 Feb, 2025",
    gateway: "Stripe",
    payment: "Success",
  },
  {
    id: 2,
    serial: 2,
    invoice: "#1506512937",
    totalAmount: 100.00,
    date: "06 Feb, 2025",
    gateway: "Stripe",
    payment: "Success",
  },
  {
    id: 3,
    serial: 3,
    invoice: "#725168301",
    totalAmount: 100.00,
    date: "04 Feb, 2025",
    gateway: "Stripe",
    payment: "Success",
  },
  {
    id: 4,
    serial: 4,
    invoice: "#1672858800",
    totalAmount: 189.00,
    date: "20 Jan, 2025",
    gateway: "Stripe",
    payment: "Success",
  },
  {
    id: 5,
    serial: 5,
    invoice: "#104522873",
    totalAmount: 149.00,
    date: "20 Jan, 2025",
    gateway: "Stripe",
    payment: "Success",
  },
];

const StudentDetails = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteStudent = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleting student...');
    setDeleteDialogOpen(false);
    alert('Student deleted successfully!');
  };

  const handleDetailClick = (enrollment) => {
    console.log('Viewing details for enrollment:', enrollment);
    navigate(`/admin/student-profile?id=${enrollment.id}`);
  };

  const StatCard = ({ icon, title, value, color = '#10b981' }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid #e5e7eb',
        height: '100%',
        
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box
          sx={{
            width: 100,
            height: 48,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TrendingUpIcon sx={{ color: color, fontSize: 24 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              fontSize: '2rem',
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );

  const filteredEnrollments = enrollmentsData.filter(enrollment =>
    enrollment.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.gateway.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ py: 3,  mx: "auto", bgcolor: "#f8fafc",  }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Grid item xs={12} md={4}> 
            <StatCard
              title="Enrolled Course"
              value={studentData.enrolledCourses}
              color="#10b981"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Total Transaction"
              value={`$${studentData.totalTransaction.toFixed(2)}`}
              color="#10b981"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              title="Wallet Balance"
              value={`$${studentData.walletBalance.toFixed(2)}`}
              color="#10b981"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Profile Section */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 2,
                border: '1px solid #e5e7eb',
                height: 'fit-content',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                  src={studentData.avatar}
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 3,
                  }}
                >
                  {studentData.name}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 2,
                  }}
                >
                  Contact Information
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <PhoneIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {studentData.phone}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <EmailIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {studentData.email}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <LocationIcon sx={{ color: '#6366f1', fontSize: 20, mt: 0.5 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {studentData.address}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  sx={{
                    bgcolor: '#10b981',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: '#059669',
                    },
                  }}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteStudent}
                  sx={{
                    bgcolor: '#ef4444',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: '#dc2626',
                    },
                  }}
                >
                  Delete Student
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Enrollments Table */}
          <Grid item xs={12} md={8} sx={{ py: 3, mx: "auto", bgcolor: "#f8fafc",  }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 3,
                  }}
                >
                  Enrollments List
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Show
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 80 }}>
                      <Select
                        value={entriesPerPage}
                        onChange={(e) => setEntriesPerPage(e.target.value)}
                        sx={{ fontSize: '0.875rem' }}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      entries
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Search:
                    </Typography>
                    <TextField
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ minWidth: 200 }}
                    />
                  </Box>
                </Box>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8fafc' }}>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Serial
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Invoice
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Total Amount
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Date
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Gateway
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Payment
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredEnrollments.slice(0, entriesPerPage).map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 600,fontSize:'0.875rem' }}>{enrollment.serial}</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 600,fontSize:'0.875rem' }}>
                          {enrollment.invoice}
                        </TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 600,fontSize:'0.875rem' }}>
                          ${enrollment.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell sx={{ color: 'text.secondary',fontSize:'0.875rem',fontWeight: 600 }}>
                          {enrollment.date}
                        </TableCell>
                        <TableCell sx={{ color: 'text.secondary',fontSize:'0.875rem',fontWeight: 600 }}>
                          {enrollment.gateway}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={enrollment.payment}
                            sx={{
                              bgcolor: '#d1fae5',
                              color: '#065f46',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              height: 28,
                              borderRadius: 2,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            startIcon={<VisibilityIcon />}
                            sx={{
                              bgcolor: '#1f2937',
                              color: 'white',
                              textTransform: 'none',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              borderRadius: 2,
                              minWidth: 'auto',
                              px: 2,
                              py: 1,
                              backgroundColor: "#343088"
                            }}
                            onClick={() => handleDetailClick(enrollment)}
                          >
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: 'error.main' }}>
          Delete Student
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '1rem', color: 'text.primary' }}>
            Are you sure you want to delete this student? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: 'text.secondary'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
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

export default StudentDetails;