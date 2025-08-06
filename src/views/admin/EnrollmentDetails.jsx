import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const EnrollmentDetails = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Sample enrollment data
    const enrollmentData = {
        billedTo: {
            name: "John Doe",
            phone: "123-874-6548",
            email: "student@gmail.com",
            address: "Jackson Heights, 11372, NY, United States"
        },
        paymentInfo: {
            status: "Success",
            invoiceNo: "#829776602",
            createdAt: "12 Feb, 2025",
            gateway: "Stripe",
            transaction: "txn_3QrdVgF56Pb8BOOXIYEsfvTi"
        },
        courses: [
            {
                id: 1,
                sn: 1,
                instructor: "Muhammad Yunus",
                course: "Photography Techniques: Light, Content, and Sharing",
                amount: 40.00
            },
            {
                id: 2,
                sn: 2,
                instructor: "Ashif Mahmud",
                course: "Web3 and Blockchain Leadership for Transformation",
                amount: 50.00
            }
        ],
        summary: {
            subtotal: 90.00,
            discount: 0.00,
            total: 90.00
        }
    };

    return (
        <Box sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            maxWidth: '100%', 
            bgcolor: '#f8f9fa',
            minHeight: '100vh'
        }}>
            <Paper sx={{ 
                p: { xs: 2, sm: 3, md: 4 }, 
                borderRadius: 0,
                boxShadow: 'none',
                bgcolor: 'white'
            }}>
                {/* Header Section */}
                <Grid container spacing={{ xs: 3, md: 6 }} sx={{ mb: 4 }}>
                    {/* Billed To Section */}
                    <Grid item xs={12} md={6}>
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                fontWeight: 600, 
                                mb: 3, 
                                color: "#333",
                                fontSize: { xs: '1.25rem', md: '1.5rem' }
                            }}
                        >
                            Billed To
                        </Typography>
                        
                        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 } }}>
                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        fontWeight: 500, 
                                        minWidth: { xs: 70, md: 90 }, 
                                        color: "#666",
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    Name:
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        ml: { xs: 1, md: 2 }, 
                                        color: "#333",
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    {enrollmentData.billedTo.name}
                                </Typography>
                            </Box>
                            
                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        fontWeight: 500, 
                                        minWidth: { xs: 70, md: 90 }, 
                                        color: "#666",
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    Phone:
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        ml: { xs: 1, md: 2 }, 
                                        color: "#333",
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    {enrollmentData.billedTo.phone}
                                </Typography>
                            </Box>
                            
                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        fontWeight: 500, 
                                        minWidth: { xs: 70, md: 90 }, 
                                        color: "#666",
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    Email:
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        ml: { xs: 1, md: 2 }, 
                                        color: "#333",
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    {enrollmentData.billedTo.email}
                                </Typography>
                            </Box>
                            
                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        fontWeight: 500, 
                                        minWidth: { xs: 70, md: 90 }, 
                                        color: "#666",
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    Address:
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        ml: { xs: 1, md: 2 }, 
                                        color: "#333",
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                        lineHeight: 1.5
                                    }}
                                >
                                    {enrollmentData.billedTo.address}
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        fontWeight: 500, 
                                        minWidth: { xs: 70, md: 90 }, 
                                        color: "#666",
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    Payment Status:
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        ml: { xs: 1, md: 2 }, 
                                        color: "#333",
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                        lineHeight: 1.5
                                    }}
                                >
                                    {enrollmentData.paymentInfo.status}
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        fontWeight: 500, 
                                        minWidth: { xs: 70, md: 90 }, 
                                        color: "#666",
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                   Invoice No:
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        ml: { xs: 1, md: 2 }, 
                                        color: "#333",
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                        lineHeight: 1.5
                                    }}
                                >
                                    {enrollmentData.paymentInfo.invoiceNo}
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        fontWeight: 500, 
                                        minWidth: { xs: 70, md: 90 }, 
                                        color: "#666",
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    Created At:
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        ml: { xs: 1, md: 2 }, 
                                        color: "#333",
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                        lineHeight: 1.5
                                    }}
                                >
                                    {enrollmentData.paymentInfo.createdAt}
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        fontWeight: 500, 
                                        minWidth: { xs: 70, md: 90 }, 
                                        color: "#666",
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    Gateway:
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        ml: { xs: 1, md: 2 }, 
                                        color: "#333",
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                        lineHeight: 1.5
                                    }}
                                >
                                    {enrollmentData.paymentInfo.gateway}
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        fontWeight: 500, 
                                        minWidth: { xs: 70, md: 90 }, 
                                        color: "#666",
                                        fontSize: { xs: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    Transaction:
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        ml: { xs: 1, md: 2 }, 
                                        color: "#333",
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                        lineHeight: 1.5
                                    }}
                                >
                                    {enrollmentData.paymentInfo.transactionId}
                                </Typography>
                            </Box>

                        </Box>
                        
                    </Grid>

                    <Box item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, md: 2 } }}>
                        <Box sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            gap: { xs: 1.5, md: 2 },
                            alignItems: { xs: 'flex-start', md: 'flex-end' }
                        }}>
                           
                        </Box>
                    </Box>
                </Grid>

                {/* Course List Section */}
                <Typography 
                    variant="h5" 
                    sx={{ 
                        fontWeight: 600, 
                        mb: 3, 
                        color: "#333",
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        mt: { xs: 4, md: 5 }
                    }}
                >
                    Course List
                </Typography>

                <TableContainer 
                    sx={{ 
                        border: 'none',
                        boxShadow: 'none',
                        overflow: 'auto',
                        mb: 3
                    }}
                >
                    <Table sx={{ minWidth: { xs: 600, md: 'auto' } }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "#f3f4f7" }}>
                                <TableCell sx={{ 
                                    py: { xs: 2, md: 3 }, 
                                    fontWeight: 600, 
                                    color: "#555", 
                                    fontSize: { xs: '0.85rem', md: '1rem' },
                                    border: 'none'
                                }}>
                                    SN
                                </TableCell>
                                <TableCell sx={{ 
                                    py: { xs: 2, md: 3 }, 
                                    fontWeight: 600, 
                                    color: "#555", 
                                    fontSize: { xs: '0.85rem', md: '1rem' },
                                    border: 'none'
                                }}>
                                    Instructor
                                </TableCell>
                                <TableCell sx={{ 
                                    py: { xs: 2, md: 3 }, 
                                    fontWeight: 600, 
                                    color: "#555", 
                                    fontSize: { xs: '0.85rem', md: '1rem' }, 
                                    minWidth: { xs: 250, md: 400 },
                                    border: 'none'
                                }}>
                                    Course
                                </TableCell>
                                <TableCell sx={{ 
                                    py: { xs: 2, md: 3 }, 
                                    fontWeight: 600, 
                                    color: "#555", 
                                    fontSize: { xs: '0.85rem', md: '1rem' }, 
                                    textAlign: "right",
                                    border: 'none'
                                }}>
                                    Amount
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {enrollmentData.courses.map((course) => (
                                <TableRow
                                    key={course.id}
                                    sx={{
                                        "&:hover": {
                                            bgcolor: "#fafafa",
                                        },
                                        "&:last-child td": {
                                            borderBottom: 0,
                                        },
                                    }}
                                >
                                    <TableCell sx={{ 
                                        py: { xs: 2.5, md: 3 },
                                        border: 'none',
                                        borderBottom: '1px solid #f0f0f0'
                                    }}>
                                        <Typography variant="body1" sx={{ 
                                            fontWeight: 500, 
                                            fontSize: { xs: '0.85rem', md: '1rem' }, 
                                            color: "#333" 
                                        }}>
                                            {course.sn}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ 
                                        py: { xs: 2.5, md: 3 },
                                        border: 'none',
                                        borderBottom: '1px solid #f0f0f0'
                                    }}>
                                        <Typography variant="body1" sx={{ 
                                            fontWeight: 400, 
                                            color: "#555", 
                                            fontSize: { xs: '0.85rem', md: '1rem' }
                                        }}>
                                            {course.instructor}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ 
                                        py: { xs: 2.5, md: 3 },
                                        border: 'none',
                                        borderBottom: '1px solid #f0f0f0'
                                    }}>
                                        <Typography variant="body1" sx={{ 
                                            color: "#555", 
                                            fontSize: { xs: '0.85rem', md: '1rem' },
                                            lineHeight: 1.4
                                        }}>
                                            {course.course}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ 
                                        py: { xs: 2.5, md: 3 }, 
                                        textAlign: "right",
                                        border: 'none',
                                        borderBottom: '1px solid #f0f0f0'
                                    }}>
                                        <Typography variant="body1" sx={{ 
                                            fontWeight: 500, 
                                            color: "#333", 
                                            fontSize: { xs: '0.85rem', md: '1rem' }
                                        }}>
                                            ${course.amount.toFixed(2)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Summary Section */}
                <Box sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: { xs: 'flex-start', md: 'flex-end' },
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 3, md: 0 },
                    mt: { xs: 3, md: 4 }
                }}>
                    {/* Delete Button */}
                    <IconButton
                        sx={{
                            bgcolor: "#ff5722",
                            color: "white",
                            width: { xs: 44, md: 48 },
                            height: { xs: 44, md: 48 },
                            "&:hover": {
                                bgcolor: "#e64919",
                            },
                        }}
                    >
                        <DeleteIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                    </IconButton>

                    {/* Summary */}
                    <Box sx={{ 
                        minWidth: { xs: '100%', md: 250 },
                        textAlign: 'right'
                    }}>
                        <Box sx={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            mb: 1 
                        }}>
                            <Typography variant="body1" sx={{ 
                                fontWeight: 500, 
                                color: "#666",
                                fontSize: { xs: '0.9rem', md: '1rem' }
                            }}>
                                Subtotal:
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                fontWeight: 600, 
                                color: "#333",
                                fontSize: { xs: '0.9rem', md: '1rem' }
                            }}>
                                ${enrollmentData.summary.subtotal.toFixed(2)}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            mb: 2 
                        }}>
                            <Typography variant="body1" sx={{ 
                                fontWeight: 500, 
                                color: "#666",
                                fontSize: { xs: '0.9rem', md: '1rem' }
                            }}>
                                Discount(-):
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                fontWeight: 600, 
                                color: "#333",
                                fontSize: { xs: '0.9rem', md: '1rem' }
                            }}>
                                ${enrollmentData.summary.discount.toFixed(2)}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center",
                            borderTop: '2px solid #ddd',
                            pt: 2
                        }}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 700, 
                                color: "#333",
                                fontSize: { xs: '1.1rem', md: '1.25rem' }
                            }}>
                                Total:
                            </Typography>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 700, 
                                color: "#333",
                                fontSize: { xs: '1.1rem', md: '1.25rem' }
                            }}>
                                ${enrollmentData.summary.total.toFixed(2)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default EnrollmentDetails;