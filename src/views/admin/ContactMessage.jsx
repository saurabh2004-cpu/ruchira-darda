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
    IconButton,
} from "@mui/material";
import {
    Visibility as VisibilityIcon,
    ArrowDropUp,
    ArrowDropDown,
    Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { Delete as DeleteIcon } from '@mui/icons-material';
import { create } from "lodash";

const contactMessages = [
    {
        id: 1,
        serial: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        createdAt: "7 june 2023",
        message: "I have a question about your services. Can you please provide more information?",
        date: "2023-05-15"
    },
    {
        id: 2,
        serial: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        createdAt: "7 june 2023",
        message: "Request for more information about your premium package.",
        date: "2023-05-16"
    },
    {
        id: 3,
        serial: 3,
        name: "Robert Johnson",
        email: "robert.j@example.com",
        createdAt: "16 june 2023",
        message: "Complaint about service interruption last Tuesday.",
        date: "2023-05-17"
    },
    {
        id: 4,
        serial: 4,
        name: "Emily Davis",
        email: "emily.d@example.com",
        createdAt: "18 june 2023",
        message: "Feedback on your new product interface - it's great but needs some improvements.",
        date: "2023-05-18"
    },
    {
        id: 5,
        serial: 5,
        name: "Michael Wilson",
        email: "michael.w@example.com",
        createdAt: "19 june 2023",
        message: "Technical support needed for account login issues.",
        date: "2023-05-19"
    },
    {
        id: 6,
        serial: 6,
        name: "Sarah Brown",
        email: "sarah.b@example.com",
        createdAt: "20 june 2023",
        message: "General inquiry about partnership opportunities.",
        date: "2023-05-20"
    },
    {
        id: 7,
        serial: 7,
        name: "David Taylor",
        email: "david.t@example.com",
        createdAt: "21 june 2023",
        message: "Partnership proposal for upcoming conference.",
        date: "2023-05-21"
    },
    {
        id: 8,
        serial: 8,
        name: "Jennifer Martinez",
        email: "jennifer.m@example.com",
        createdAt: "22 june 2023",
        message: "Billing question regarding invoice #45678.",
        date: "2023-05-22"
    },
    {
        id: 9,
        serial: 9,
        name: "Thomas Anderson",
        email: "thomas.a@example.com",
        createdAt: "23 june 2023",
        message: "Product feature request for dark mode option.",
        date: "2023-05-23"
    },
    {
        id: 10,
        serial: 10,
        name: "Lisa Jackson",
        email: "lisa.j@example.com",
        createdAt: "24 june 2023",
        message: "Customer service feedback - excellent support last week!",
        date: "2023-05-24"
    }
];

const ContactMessage = () => {
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

    const filteredData = contactMessages.filter((item) => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();

        switch (searchBy) {
            case "name":
                return item.name.toLowerCase().includes(searchLower);
            case "email":
                return item.email.toLowerCase().includes(searchLower);
            case "createdAt":
                return item.createdAt.includes(searchTerm);
            case "message":
                return item.message.toLowerCase().includes(searchLower);
            default:
                return (
                    item.name.toLowerCase().includes(searchLower) ||
                    item.email.toLowerCase().includes(searchLower) ||
                    item.createdAt.includes(searchTerm) ||
                    item.message.toLowerCase().includes(searchLower)
                );
        }
    });

    const handleDelete = (id) => {
        console.log(`Deleting message with ID: ${id}`);
        // In a real app, you would call an API here
        alert(`Message with ID ${id} would be deleted in a real application`);
    };

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, filteredData.length);
    const currentData = filteredData.slice(startIndex, endIndex);



    const handleShowDetails = (id) => {
        console.log(`Showing details for ID: ${id}`);
        navigate(`/admin/contact-details?id=${id}`);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{ py: 3, mx: "auto", bgcolor: "#f8fafc", minHeight: "100vh", position: "relative", }}>
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
                    Contact Messages
                </Typography>
            </Box>

            {/* Controls Section */}
            <Card sx={{ mb: 3, borderRadius: 2, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", lg: "center" },
                        flexDirection: { xs: "column", lg: "row" },
                        gap: 3
                    }}>
                        {/* Entries per page */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                                Show
                            </Typography>
                            <FormControl size="small" sx={{ minWidth: 80 }}>
                                <Select
                                    value={entriesPerPage}
                                    onChange={handleEntriesChange}
                                    sx={{
                                        bgcolor: "white",
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
                            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                                entries
                            </Typography>
                        </Box>

                        {/* Search Section */}
                        <Box sx={{
                            display: "flex",
                            alignItems: { xs: "flex-start", sm: "center" },
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 2
                        }}>
                            <FormControl size="small" sx={{ minWidth: 150 }}>
                                <InputLabel>Search by</InputLabel>
                                <Select
                                    value={searchBy}
                                    onChange={handleSearchByChange}
                                    label="Search by"
                                    sx={{
                                        bgcolor: "white",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "grey.300",
                                        },
                                    }}
                                >
                                    <MenuItem value="all">All Fields</MenuItem>
                                    <MenuItem value="name">Name</MenuItem>
                                    <MenuItem value="email">Email</MenuItem>
                                    <MenuItem value="phone">CreatedAt</MenuItem>
                                    <MenuItem value="message">Message</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                size="small"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder={`Search ${searchBy === 'all' ? 'all fields' : searchBy}...`}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: "grey.400" }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    width: { xs: "100%", sm: 280 },
                                    "& .MuiOutlinedInput-root": {
                                        bgcolor: "white",
                                        "& fieldset": {
                                            borderColor: "grey.300",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "primary.main",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "primary.main",
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </CardContent>
            </Card>

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
                                        Name
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Email
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        CreatedAt
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>

                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    Actions
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
                                                {item.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 3 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}>
                                                {item.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 3 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}>
                                                {item.createdAt}
                                            </Typography>
                                        </TableCell>

                                        <TableCell sx={{ py: 3 }}>
                                            <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
                                                    // onClick={() => handleShowDetails(item.id)}
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

                                                <IconButton
                                                    onClick={() => handleDelete(item.id)}
                                                    sx={{
                                                        backgroundColor: '#dc3545',
                                                        color: 'white',
                                                        width: 40,
                                                        height: 40,
                                                        '&:hover': {
                                                            backgroundColor: '#bb2d3b'
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon sx={{ fontSize: 20 }} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} sx={{ textAlign: "center", py: 6 }}>
                                        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1rem" }}>
                                            No contact messages found matching your search criteria.
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

export default ContactMessage;