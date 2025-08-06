import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
} from '@mui/material';
import {
    Delete as DeleteIcon,
} from '@mui/icons-material';

// Sample student data
const studentData = {
    name: "John Doe",
    phone: "123-874-6548",
    email: "student@gmail.com",
    address: "Jackson Heights, 11372, NY, United States",
    paymentStatus: "Success",
    invoiceNo: "#829776602",
    createdAt: "12 Feb, 2025",
    gateway: "Stripe",
    transaction: "txn_3QrdVgF56Pb8BOOXlYEsfvTi",
};

const coursesData = [
    {
        id: 1,
        sn: 1,
        instructor: "Muhammad Yunus",
        course: "Photography Techniques: Light, Content, and Sharing",
        amount: 40.00,
    },
    {
        id: 2,
        sn: 2,
        instructor: "Ashif Mahmud",
        course: "Web3 and Blockchain Leadership for Transformation",
        amount: 50.00,
    },
];

const StudentProfile = () => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        console.log('Deleting student profile...');
        setDeleteDialogOpen(false);
        alert('Student profile deleted successfully!');
    };

    const subtotal = coursesData.reduce((sum, course) => sum + course.amount, 0);
    const discount = 0.00;
    const total = subtotal - discount;

    const InfoRow = ({ label, value, isStatus = false }) => (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
            <Typography
                variant="body1"
                sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                    minWidth: 80,
                    mr: 2,
                }}
            >
                {label}
            </Typography>
            {isStatus ? (
                <Chip
                    label={value}
                    sx={{
                        bgcolor: '#d1fae5',
                        color: '#065f46',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        height: 28,
                        borderRadius: 2,
                    }}
                />
            ) : (
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        flex: 1,
                    }}
                >
                    {value}
                </Typography>
            )}
        </Box>
    );

    return (
        <Box sx={{ py: 3, minWidth: 1350, mx: "auto", bgcolor: "#f8fafc", minHeight: "100vh", position: "relative", right: 100 }}>
            <Box>
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 2,
                        border: '1px solid #e5e7eb',
                        overflow: 'hidden',
                        bgcolor: 'white',
                    }}
                >
                    <Box sx={{ p: { xs: 3, md: 4 } }}>
                        <Grid
                            container
                            spacing={4}
                            justifyContent="space-between"
                            alignItems="flex-start"
                            sx={{ mb: 4 }}
                        >
                            {/* Billed To Section - Left Aligned */}
                            <Grid item xs={12} md={5}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        mb: 3,
                                        fontSize: '1.25rem',
                                    }}
                                >
                                    Billed To
                                </Typography>

                                <Box sx={{ mb: 3 }}>
                                    <InfoRow label="Name:" value={studentData.name} />
                                    <InfoRow label="Phone:" value={studentData.phone} />
                                    <InfoRow label="Email:" value={studentData.email} />
                                    <InfoRow label="Address:" value={studentData.address} />
                                </Box>
                            </Grid>

                            {/* Payment Info Section - Right Aligned */}
                            <Grid item xs={12} md={5}>
                                <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                                    <Box sx={{ mb: 3 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: { xs: 'space-between',  },
                                                alignItems: 'center',
                                                mb: 2,
                                                gap: 2,
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{ fontWeight: 500, color: 'text.primary',display: 'flex', alignItems: 'center', gap: 1 }}
                                            >
                                                Payment Status:
                                            </Typography>
                                            <Chip
                                                label={studentData.paymentStatus}
                                                sx={{
                                                    bgcolor: '#d1fae5',
                                                    color: '#065f46',
                                                    fontWeight: 600,
                                                    fontSize: '0.875rem',
                                                    height: 28,
                                                    borderRadius: 2,
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            {[
                                                ['Invoice No:', studentData.invoiceNo],
                                                ['Created at:', studentData.createdAt],
                                                ['Gateway:', studentData.gateway],
                                                ['Transaction:', studentData.transaction],
                                            ].map(([label, value], idx) => (
                                                <Box
                                                    key={idx}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        sx={{ fontWeight: 500, color: 'text.primary' }}
                                                    >
                                                        {label}
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            color: 'text.secondary',
                                                            fontSize: label === 'Transaction:' ? '0.9rem' : '1rem',
                                                            ml: 2,
                                                        }}
                                                    >
                                                        {value}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                        {/* Course List Section */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    color: 'text.primary',
                                    mb: 3,
                                    fontSize: '1.25rem',
                                }}
                            >
                                Course List
                            </Typography>

                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: '#f8fafc' }}>
                                            <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                                                SN
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                                                Instructor
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                                                Course
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2, textAlign: 'right' }}>
                                                Amount
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {coursesData.map((course) => (
                                            <TableRow key={course.id}>
                                                <TableCell sx={{ py: 2 }}>
                                                    {course.sn}
                                                </TableCell>
                                                <TableCell sx={{ py: 2, color: 'text.secondary', fontWeight: 600, fontSize: '0.875rem' }}>
                                                    {course.instructor}
                                                </TableCell>
                                                <TableCell sx={{ py: 2, color: 'text.secondary', fontWeight: 600, fontSize: '0.875rem' }}>
                                                    {course.course}
                                                </TableCell>
                                                <TableCell sx={{ py: 2, textAlign: 'right', fontWeight: 500, fontSize: '0.875rem' }}>
                                                    ${course.amount.toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        {/* Totals Section */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
                            <Box sx={{ minWidth: 300 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.875rem' }}>
                                        Subtotal:
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                                        ${subtotal.toFixed(2)}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary', fontSize: '0.875rem' }}>
                                        Discount(-):
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                                        ${discount.toFixed(2)}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, borderTop: '1px solid #e5e7eb' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', fontSize: '0.875rem' }}>
                                        Total:
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                                        ${total.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Delete Button */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <IconButton
                                onClick={handleDelete}
                                sx={{
                                    bgcolor: '#ef4444',
                                    color: 'white',
                                    width: 48,
                                    height: 48,
                                    '&:hover': {
                                        bgcolor: '#dc2626',
                                    },
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
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
                <DialogTitle sx={{ fontWeight: 700, color: 'error.main' }}>
                    Delete Student Profile
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: '1rem', color: 'text.primary' }}>
                        Are you sure you want to delete this student profile? This action cannot be undone.
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

export default StudentProfile;