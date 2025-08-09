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
} from "@mui/icons-material";
import { useNavigate } from "react-router";
import { Delete as DeleteIcon } from '@mui/icons-material';
import CreateUser from "../../components/user/CreateUser";

// Dummy enrollment data
const enrollmentData = [
    {
        id: 1,
        serial: 1,
        title: "Mathematics 101",
        description: "Introduction to Algebra",
        course: "MATH101",
        student: "John Doe",
        status: "Active",
        enrollmentDate: "2023-09-01"
    },
    {
        id: 2,
        serial: 2,
        title: "Computer Science Fundamentals",
        description: "Basic programming concepts",
        course: "CS101",
        student: "Jane Smith",
        status: "Completed",
        enrollmentDate: "2023-08-15"
    },
    {
        id: 3,
        serial: 3,
        title: "Literature Survey",
        description: "World literature overview",
        course: "LIT201",
        student: "Robert Johnson",
        status: "Active",
        enrollmentDate: "2023-09-05"
    },
    {
        id: 4,
        serial: 4,
        title: "Physics Laboratory",
        description: "Practical physics experiments",
        course: "PHY301",
        student: "Emily Davis",
        status: "Withdrawn",
        enrollmentDate: "2023-07-20"
    },
    {
        id: 5,
        serial: 5,
        title: "Business Management",
        description: "Introduction to business principles",
        course: "BUS101",
        student: "Michael Wilson",
        status: "Active",
        enrollmentDate: "2023-09-10"
    },
    {
        id: 6,
        serial: 6,
        title: "Art History",
        description: "Survey of art movements",
        course: "ART205",
        student: "Sarah Brown",
        status: "Completed",
        enrollmentDate: "2023-06-15"
    },
    {
        id: 7,
        serial: 7,
        title: "Chemistry Basics",
        description: "Fundamental chemistry concepts",
        course: "CHEM101",
        student: "David Taylor",
        status: "Active",
        enrollmentDate: "2023-09-03"
    },
    {
        id: 8,
        serial: 8,
        title: "Data Structures",
        description: "Advanced programming techniques",
        course: "CS202",
        student: "Jennifer Martinez",
        status: "Active",
        enrollmentDate: "2023-08-28"
    },
    {
        id: 9,
        serial: 9,
        title: "Microeconomics",
        description: "Principles of microeconomics",
        course: "ECO101",
        student: "Thomas Anderson",
        status: "Pending",
        enrollmentDate: "2023-09-12"
    },
    {
        id: 10,
        serial: 10,
        title: "Public Speaking",
        description: "Communication skills development",
        course: "COM105",
        student: "Lisa Jackson",
        status: "Active",
        enrollmentDate: "2023-08-22"
    }
];

const EnrollmentList = () => {
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

    const handleCreateUser = (userData) => {
        console.log("Creating user:", userData);
        // In a real app, you would call an API here
        setShowCreateUserCard(false);
    };

    const filteredData = enrollmentData.filter((item) => {
        if (!searchTerm) return true;

        const searchLower = searchTerm.toLowerCase();

        switch (searchBy) {
            case "title":
                return item.title.toLowerCase().includes(searchLower);
            case "student":
                return item.student.toLowerCase().includes(searchLower);
            case "course":
                return item.course.toLowerCase().includes(searchLower);
            case "status":
                return item.status.toLowerCase().includes(searchLower);
            default:
                return (
                    item.title.toLowerCase().includes(searchLower) ||
                    item.student.toLowerCase().includes(searchLower) ||
                    item.course.toLowerCase().includes(searchLower) ||
                    item.status.toLowerCase().includes(searchLower) ||
                    item.description.toLowerCase().includes(searchLower)
                );
        }
    });

    const handleDelete = (id) => {
        console.log(`Deleting enrollment with ID: ${id}`);
        // In a real app, you would call an API here
    };

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
            case "completed":
                return {
                    color: "primary",
                    sx: { bgcolor: "#cce5ff", color: "#004085", fontWeight: 600 }
                };
            case "pending":
                return {
                    color: "warning",
                    sx: { bgcolor: "#fff3cd", color: "#856404", fontWeight: 600 }
                };
            case "withdrawn":
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
        navigate(`/admin/enrollment-details?id=${id}`);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Box sx={{ py: 3, mx: "auto", bgcolor: "#f8fafc", minHeight: "100vh", position: "relative", }}>
            {/* Header Section */}
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
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        fontSize: { xs: "1.25rem", sm: "1.5rem" }
                    }}
                >
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
                        px: { xs: 2, sm: 3 },
                        py: 1,
                        fontWeight: 500,
                        backgroundColor: "#343088",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        minWidth: { xs: "auto", sm: "auto" },
                        width: { xs: "fit-content", sm: "auto" }
                    }}
                    onClick={() => setShowCreateUserCard(true)}
                >
                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                        New Announcement
                    </Box>
                    <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                        New
                    </Box>
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
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Title
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Description
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Course
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Student
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 3, fontWeight: 700, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Status
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
                                                {item.title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 3 }}>
                                            <Typography variant="body1" sx={{ color: "text.primary", fontSize: "0.875rem" }}>
                                                {item.description}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 3 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}>
                                                {item.course}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ py: 3 }}>
                                            <Typography variant="body1" sx={{ color: "text.primary", fontSize: "0.875rem" }}>
                                                {item.student}
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
                                    <TableCell colSpan={7} sx={{ textAlign: "center", py: 6 }}>
                                        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1rem" }}>
                                            No enrollments found matching your search criteria.
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

            {/* Create User Popup */}
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

export default EnrollmentList;