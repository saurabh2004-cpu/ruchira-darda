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
    Add as AddIcon,
    Visibility as VisibilityIcon,
    ArrowDropUp,
    ArrowDropDown,
    Search as SearchIcon,
    CheckCircle as ApproveIcon,
    Cancel as RejectIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import {
    Delete as DeleteIcon,
} from '@mui/icons-material';
import CreateUser from "../../components/user/CreateUser";

// Dummy student data
const studentData = [
    {
        id: 1,
        serial: 1,
        name: "John Doe",
        email: "student@gmail.com",
        phone: "123-874-6548",
        status: "Active",
    },
    {
        id: 2,
        serial: 2,
        name: "David Richard",
        email: "instructor2@gmail.com",
        phone: "123-874-6548",
        status: "Active",
    },
    {
        id: 3,
        serial: 3,
        name: "Selena Gomez",
        email: "instructor3@gmail.com",
        phone: "123-874-6548",
        status: "Active",
    },
    {
        id: 4,
        serial: 4,
        name: "Rajibul Islam",
        email: "instructor4@gmail.com",
        phone: "123-874-6548",
        status: "Active",
    },
    {
        id: 5,
        serial: 5,
        name: "Jubair Ahmed",
        email: "instructor5@gmail.com",
        phone: "123-874-6548",
        status: "Active",
    },
    {
        id: 6,
        serial: 6,
        name: "Abdullah Mamun",
        email: "instructor6@gmail.com",
        phone: "123-874-6548",
        status: "Active",
    },
];

const StudentList = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [showCreateUserCard, setShowCreateUserCard] = useState(false);
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
    const handleCreateUser = () => {
    };

    const filteredData = studentData.filter((item) => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();

        switch (searchBy) {
            case "name":
                return item.name.toLowerCase().includes(searchLower);
            case "email":
                return item.email.toLowerCase().includes(searchLower);
            case "phone":
                return item.phone.includes(searchTerm);
            case "status":
                return item.status.toLowerCase().includes(searchLower);
            default:
                return (
                    item.name.toLowerCase().includes(searchLower) ||
                    item.email.toLowerCase().includes(searchLower) ||
                    item.phone.includes(searchTerm) ||
                    item.status.toLowerCase().includes(searchLower)
                );
        }
    });

    const handleDelete = () => { };

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = Math.min(startIndex + entriesPerPage, filteredData.length);
    const currentData = filteredData.slice(startIndex, endIndex);

    const getStatusChipProps = (status) => {
        switch (status.toLowerCase()) {
            case "active":
                return {
                    color: "success",
                    sx: { bgcolor: "#d4edda", color: "#155724", fontWeight: 600 }
                };
            case "inactive":
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

    const handleShowDetails = (id) => {
        console.log(`Showing details for ID: ${id}`);
        navigate(`/admin/student-details?id=${id}`);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{ py: 3, mx: "auto", bgcolor: "#f8fafc", minHeight: "100vh", position: "relative", }}>
            {/* Header Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: "text.primary" }}>
                    Enrollment List
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        bgcolor: "#2c3e50",
                        color: "white",
                        textTransform: "none",
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        fontWeight: 500,
                        backgroundColor: "#343088"
                    }}
                    onClick={() => setShowCreateUserCard(true)}
                >
                    New User
                </Button>
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
                                        Phone
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
                                                {item.phone}
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
                                                    onClick={() => handleShowDetails(item.id)}
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
                                                    onClick={handleDelete}
                                                    sx={{
                                                        backgroundColor: '#dc3545',
                                                        color: 'white',
                                                        width: 40,
                                                        height: 40,

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
                                            No students found matching your search criteria.
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
            {showCreateUserCard && (
                <CreateUser
                    open={showCreateUserCard}
                    onClose={() => setShowCreateUserCard(false)}
                    onSubmit={handleCreateUser}
                />
            )}
        </Box>
    );
};

export default StudentList;