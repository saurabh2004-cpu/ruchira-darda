import { useEffect, useState } from "react"
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
    IconButton,
    TextField,
    Select,
    MenuItem,
    FormControl,
} from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, ArrowDropUp, ArrowDropDown } from "@mui/icons-material"
import { useNavigate } from "react-router"
import axiosInstance from "../../axios/axios"

const CourseList = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate()

    const value = localStorage.getItem('user');
    const user = JSON.parse(value);
    const [courseData, setCourseData] = useState([]);

    const handleEntriesChange = (event) => {
        setEntriesPerPage(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value)
    }

    const filteredData = courseData.filter(
        (course) =>
            (course.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (course.category?.name || course.category || '').toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleEditClick = (courseId) => {
        navigate(`/admin/courses/create/?courseId=${courseId}`);
    };

    const fetchCourses = async () => {
        try {
            const response = await axiosInstance(`/api/course/list-courses/${user._id}`);
            console.log("courses fetched:", response.data);
            setCourseData(response.data.courses || []);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setCourseData([]);
        }
    };

    const handleDeleteClick = async (courseId) => {
        try {
            const res = await axiosInstance.delete(`/api/course/delete-course/${courseId}`);
            console.log("response", res);
            setCourseData(courseData.filter((course) => course._id !== courseId));
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    useEffect(() => {
        fetchCourses()
    }, []);

    return (
        <Box sx={{ py: 3, mx: "auto", bgcolor: "#f8fafc", minHeight: "100vh", position: "relative", }}>
            {/* Header Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: "text.primary" }}>
                    Course List
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
                        "&:hover": {
                            bgcolor: "#34495e",
                        }, backgroundColor: "#343088"

                    }}
                    onClick={() => window.location.href = '/admin/courses/create'}
                >
                    Create New
                </Button>
            </Box>

            {/* Controls Section */}
            <Box sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", sm: "space-between" },
                alignItems: { xs: "flex-start", sm: "center" },
                mb: { xs: 2, sm: 3 },
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 0 },
                width: "100%"
            }}>
                {/* Show entries section */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexWrap: { xs: "wrap", sm: "nowrap" }
                }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.8rem", sm: "0.875rem" },
                            whiteSpace: "nowrap"
                        }}
                    >
                        Show
                    </Typography>
                    <FormControl
                        size="small"
                        sx={{
                            minWidth: { xs: 70, sm: 80 },
                            "& .MuiSelect-select": {
                                fontSize: { xs: "0.8rem", sm: "0.875rem" }
                            }
                        }}
                    >
                        <Select
                            value={entriesPerPage}
                            onChange={handleEntriesChange}
                            sx={{
                                bgcolor: "white",
                                height: { xs: 35, sm: 40 },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "grey.300",
                                },
                                "& .MuiSelect-select": {
                                    py: { xs: 0.5, sm: 1 }
                                }
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
                            fontSize: { xs: "0.8rem", sm: "0.875rem" },
                            whiteSpace: "nowrap",
                            display: { xs: "none", sm: "block" }
                        }}
                    >
                        entries
                    </Typography>
                </Box>

                {/* Search section */}
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    width: { xs: "100%", sm: "auto" },
                    flexWrap: { xs: "wrap", sm: "nowrap" }
                }}>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.8rem", sm: "0.875rem" },
                            whiteSpace: "nowrap"
                        }}
                    >
                        Search:
                    </Typography>
                    <TextField
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        sx={{
                            width: { xs: "100%", sm: 200, md: 250 },
                            minWidth: { xs: 150, sm: 200 },
                            "& .MuiOutlinedInput-root": {
                                bgcolor: "white",
                                height: { xs: 35, sm: 40 },
                                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                                "& fieldset": {
                                    borderColor: "grey.300",
                                },
                                "&:hover fieldset": {
                                    borderColor: "grey.400",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "primary.main",
                                },
                            },
                            "& .MuiInputBase-input": {
                                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                                py: { xs: 0.5, sm: 1 }
                            },
                            "& .MuiInputBase-input::placeholder": {
                                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                                opacity: 0.7
                            }
                        }}
                    />
                </Box>
            </Box>

            {/* Table */}
            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden", mb: 3 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: "grey.50" }}>
                                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Serial
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>

                                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Title
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Category
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Price
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Visibility
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Action
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courseData.map((course, index) => (
                                <TableRow
                                    key={course._id}
                                    sx={{
                                        "&:hover": {
                                            bgcolor: "grey.25",
                                        },
                                        "&:last-child td": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "0.875rem", color: "text.primary" }}>
                                            {/* Use index + 1 as serial number since course.serial might be an object */}
                                            {course.serial}
                                        </Typography>
                                    </TableCell>

                                    <TableCell sx={{ py: 2.5, maxWidth: 300, }}>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 600,
                                                color: "text.primary",
                                                fontSize: "0.875rem",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {course.title || 'No Title'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Typography variant="body1" sx={{ color: "text.primary", fontWeight: 600, fontSize: "0.875rem" }}>
                                            {/* Handle both string and object category formats */}
                                            {typeof course.category === 'object' ? course.category?.name || 'No Category' : course.category || 'No Category'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}>
                                            ${course?.regularPrice ? course.regularPrice.toFixed(2) : '0.00'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Chip
                                            label={course.visibility === true ? 'Public' : 'Private'}
                                            size="small"
                                            sx={{
                                                bgcolor: course.visibility === true ? "#d4edda" : "#f8d7da",
                                                color: course.visibility === true ? "#155724" : "#721c24",
                                                fontWeight: 500,
                                                borderRadius: 1,
                                                fontSize: "0.85rem",
                                                height: 38,
                                                py: 1,
                                                minWidth: 80,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                                                sx={{
                                                    bgcolor: "#374151",
                                                    color: "white",
                                                    textTransform: "none",
                                                    borderRadius: 1.5,
                                                    px: 2,
                                                    py: 1,
                                                    fontSize: "0.85rem",
                                                    fontWeight: 500,
                                                    minWidth: "auto",
                                                    "&:hover": {
                                                        bgcolor: "#584ca0",
                                                    },
                                                    backgroundColor: "#343088"
                                                }}
                                                onClick={() => handleEditClick(course._id)}
                                            >
                                                Edit
                                            </Button>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    bgcolor: "#ef4444",
                                                    color: "white",
                                                    width: 38,
                                                    height: 38,
                                                    "&:hover": {
                                                        bgcolor: "#dc2626",
                                                    },
                                                }}
                                                onClick={() => handleDeleteClick(course._id)}
                                            >
                                                <DeleteIcon sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {courseData.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} sx={{ py: 2.5 }}>
                                        <Typography variant="body1" sx={{ color: "text.primary", fontWeight: 600, fontSize: "0.875rem" }}>
                                            No Courses Found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Footer Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Showing 1 to {filteredData.length} of {filteredData.length} entries
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange({}, currentPage - 1)}
                        sx={{
                            textTransform: "none",
                            borderColor: "grey.400",
                            color: "text.primary",
                            "&:hover": {
                                borderColor: "grey.600",
                                bgcolor: "grey.50",
                            },
                        }}
                    >
                        Previous
                    </Button>

                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            minWidth: 32,
                            height: 32,
                            bgcolor: "#6366f1",
                            color: "white",
                            "&:hover": {
                                bgcolor: "#5048e5",
                            },
                        }}
                    >
                        1
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handlePageChange({}, currentPage + 1)}
                        sx={{
                            textTransform: "none",
                            borderColor: "grey.400",
                            color: "text.primary",
                            "&:hover": {
                                borderColor: "grey.600",
                                bgcolor: "grey.50",
                            },
                        }}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
export default CourseList