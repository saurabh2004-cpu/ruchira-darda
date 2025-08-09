import { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    InputAdornment,
    Pagination,
    Card,
    CardContent,
} from "@mui/material";
import {
    Add as AddIcon,
    Visibility as VisibilityIcon,
    ArrowDropUp,
    ArrowDropDown,
    Search as SearchIcon,
    CheckCircle as ApproveIcon,
    Cancel as RejectIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

// Dummy withdraw data
const withdrawData = [
    {
        id: 1,
        serial: 1,
        sellerName: "David Malan",
        totalAmount: 40.00,
        withdrawAmount: 36.00,
        withdrawCharge: 4.00,
        status: "Approved",
        requestDate: "2024-12-15",
        method: "Bank Transfer"
    },
    {
        id: 2,
        serial: 2,
        sellerName: "Sarah Johnson",
        totalAmount: 150.00,
        withdrawAmount: 142.50,
        withdrawCharge: 7.50,
        status: "Pending",
        requestDate: "2024-12-14",
        method: "PayPal"
    },
    {
        id: 3,
        serial: 3,
        sellerName: "Mike Wilson",
        totalAmount: 85.00,
        withdrawAmount: 80.75,
        withdrawCharge: 4.25,
        status: "Approved",
        requestDate: "2024-12-13",
        method: "Stripe"
    },
    {
        id: 4,
        serial: 4,
        sellerName: "Emily Davis",
        totalAmount: 200.00,
        withdrawAmount: 190.00,
        withdrawCharge: 10.00,
        status: "Rejected",
        requestDate: "2024-12-12",
        method: "Bank Transfer"
    },
    {
        id: 5,
        serial: 5,
        sellerName: "John Smith",
        totalAmount: 75.50,
        withdrawAmount: 71.73,
        withdrawCharge: 3.77,
        status: "Pending",
        requestDate: "2024-12-11",
        method: "PayPal"
    },
    {
        id: 6,
        serial: 6,
        sellerName: "Lisa Anderson",
        totalAmount: 320.00,
        withdrawAmount: 304.00,
        withdrawCharge: 16.00,
        status: "Approved",
        requestDate: "2024-12-10",
        method: "Stripe"
    },
    {
        id: 7,
        serial: 7,
        sellerName: "Robert Brown",
        totalAmount: 95.25,
        withdrawAmount: 90.49,
        withdrawCharge: 4.76,
        status: "Processing",
        requestDate: "2024-12-09",
        method: "Bank Transfer"
    },
    {
        id: 8,
        serial: 8,
        sellerName: "Anna Taylor",
        totalAmount: 180.00,
        withdrawAmount: 171.00,
        withdrawCharge: 9.00,
        status: "Approved",
        requestDate: "2024-12-08",
        method: "PayPal"
    }
];

const WithdrawList = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const handleEntriesChange = (event) => {
        setEntriesPerPage(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSearchByChange = (event) => {
        setSearchBy(event.target.value);
        setCurrentPage(1);
    };

    const filteredData = withdrawData.filter((item) => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();

        switch (searchBy) {
            case "sellerName":
                return item.sellerName.toLowerCase().includes(searchLower);
            case "status":
                return item.status.toLowerCase().includes(searchLower);
            case "method":
                return item.method.toLowerCase().includes(searchLower);
            case "amount":
                return item.totalAmount.toString().includes(searchTerm) ||
                    item.withdrawAmount.toString().includes(searchTerm);
            default:
                return (
                    item.sellerName.toLowerCase().includes(searchLower) ||
                    item.status.toLowerCase().includes(searchLower) ||
                    item.method.toLowerCase().includes(searchLower) ||
                    item.totalAmount.toString().includes(searchTerm) ||
                    item.withdrawAmount.toString().includes(searchTerm)
                );
        }
    });

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, filteredData.length);
    const currentData = filteredData.slice(startIndex, endIndex);

    const getStatusChipProps = (status) => {
        switch (status.toLowerCase()) {
            case "approved":
                return {
                    color: "success",
                    sx: { bgcolor: "#d4edda", color: "#155724", fontWeight: 600 }
                };
            case "pending":
                return {
                    color: "warning",
                    sx: { bgcolor: "#fff3cd", color: "#856404", fontWeight: 600 }
                };
            case "processing":
                return {
                    color: "info",
                    sx: { bgcolor: "#d1ecf1", color: "#0c5460", fontWeight: 600 }
                };
            case "rejected":
                return {
                    color: "error",
                    sx: { bgcolor: "#f8d7da", color: "#721c24", fontWeight: 600 }
                };
            default:
                return {
                    color: "default",
                    sx: { bgcolor: "#e2e3e5", color: "#383d41", fontWeight: 600 }
                };
        }
    };

    const handleApprove = (id) => {
        console.log(`Approving withdrawal for ID: ${id}`);
        alert(`Withdrawal approved for ID: ${id}`);
    };

    const handleReject = (id) => {
        console.log(`Rejecting withdrawal for ID: ${id}`);
        alert(`Withdrawal rejected for ID: ${id}`);
    };

    const handleShow = (id) => {
        console.log(`Showing details for ID: ${id}`);
        navigate(`/admin/withdraw-details?id=${id}`);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{ py: 3, mx: "auto", bgcolor: "#f8fafc", minHeight: "100vh", position: "relative" }}>
            {/* Header Section */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 0 },
                mb: 4
            }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
                    Withdraw List
                </Typography>

            </Box>

            {/* Controls Section */}
            {/* Responsive Controls Section */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: 2, sm: 0 },
                    mb: 3
                }}
            >
                {/* Show entries control */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.75rem", sm: "0.875rem" }
                        }}
                    >
                        Show
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: { xs: 60, sm: 80 } }}>
                        <Select
                            value={entriesPerPage}
                            onChange={handleEntriesChange}
                            sx={{
                                bgcolor: "white",
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "grey.300",
                                },
                            }}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.75rem", sm: "0.875rem" }
                        }}
                    >
                        entries
                    </Typography>
                </Box>

                {/* Search control */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.75rem", sm: "0.875rem" }
                        }}
                    >
                        Search:
                    </Typography>
                    <TextField
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder=""
                        sx={{
                            width: { xs: 140, sm: 160, md: 200 },
                            "& .MuiOutlinedInput-root": {
                                bgcolor: "white",
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                "& fieldset": {
                                    borderColor: "grey.300",
                                },
                            },
                        }}
                    />
                </Box>
            </Box>

            {/* Table */}
            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden", mb: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "grey.50" }}>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Serial
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Seller Name
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Total Amount
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Withdraw Amount
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Withdraw Charge
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Status
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData.length > 0 ? (
                                currentData.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "grey.25",
                                            },
                                            "&:last-child td": {
                                                border: 0,
                                            },
                                        }}
                                    >
                                        <TableCell sx={{ py: 3 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "0.875rem", color: "text.primary" }}>
                                                {item.serial}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 3 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}>
                                                {item.sellerName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 3 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}>
                                                ${item.totalAmount.toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 3 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}>
                                                ${item.withdrawAmount.toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 3 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}>
                                                ${item.withdrawCharge.toFixed(2)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 3 }}>
                                            <Chip
                                                label={item.status}
                                                size="small"
                                                {...getStatusChipProps(item.status)}
                                                sx={{
                                                    ...getStatusChipProps(item.status).sx,
                                                    borderRadius: 1,
                                                    fontSize: "0.75rem",
                                                    height: 28,
                                                    minWidth: 80,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ py: 3 }}>
                                            <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
                                                    onClick={() => handleShow(item.id)}
                                                    sx={{
                                                        bgcolor: "#374151",
                                                        color: "white",
                                                        textTransform: "none",
                                                        borderRadius: 1.5,
                                                        px: 2,
                                                        py: 0.8,
                                                        fontSize: "0.85rem",
                                                        fontWeight: 600,
                                                        minWidth: "auto",
                                                        "&:hover": {
                                                            bgcolor: "#584ca0",
                                                        },
                                                        backgroundColor: "#343088"
                                                    }}
                                                >
                                                    Details
                                                </Button>


                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    startIcon={<RejectIcon sx={{ fontSize: 16 }} />}
                                                    onClick={() => handleReject(item.id)}
                                                    sx={{
                                                        bgcolor: "#ef4444",
                                                        color: "white",
                                                        textTransform: "none",
                                                        borderRadius: 1.5,
                                                        px: 2,
                                                        py: 0.8,
                                                        fontSize: "0.75rem",
                                                        fontWeight: 600,
                                                        minWidth: "auto",
                                                        "&:hover": {
                                                            bgcolor: "#dc2626",
                                                        },
                                                    }}
                                                >
                                                    Withdraw
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} sx={{ textAlign: "center", py: 6 }}>
                                        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1rem" }}>
                                            No withdrawals found matching your search criteria.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Footer Section */}
            {filteredData.length > 0 && (
                <Card sx={{ borderRadius: 2, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: { xs: "flex-start", sm: "center" },
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 2
                        }}>
                            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                                Showing {startIndex + 1} to {endIndex} of {filteredData.length} entries
                            </Typography>

                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                variant="outlined"
                                shape="rounded"
                                sx={{
                                    "& .MuiPaginationItem-root": {
                                        fontWeight: 600,
                                    },
                                    "& .Mui-selected": {
                                        bgcolor: "#6366f1 !important",
                                        color: "white",
                                        "&:hover": {
                                            bgcolor: "#5048e5 !important",
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default WithdrawList;