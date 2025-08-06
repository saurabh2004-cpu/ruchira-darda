import { useState } from "react"
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
    Icon,
} from "@mui/material"
import { Add as AddIcon, Visibility as VisibilityIcon, Delete as DeleteIcon, ArrowDropUp, ArrowDropDown, Edit } from "@mui/icons-material"
import { useNavigate } from "react-router"
import CreateNewEnrollment from "../../components/Enrollments/CreateNew"
import EditCouponDetails from "../../components/coupons/EditCouponDetails"
import { IconPencil } from "@tabler/icons"

// Dummy coupon data
const couponData = [
    {
        id: 1,
        serial: 1,
        code: "SAVE20",
        offer: "20% Off",
        endTime: "25 Mar, 2025",
        status: "Active"
    },
    {
        id: 2,
        serial: 2,
        code: "NEWUSER50",
        offer: "$50 Off",
        endTime: "30 Apr, 2025",
        status: "Active"
    },
    {
        id: 3,
        serial: 3,
        code: "SUMMER25",
        offer: "25% Off",
        endTime: "31 Aug, 2025",
        status: "Active"
    },
    {
        id: 4,
        serial: 4,
        code: "FLASH10",
        offer: "10% Off",
        endTime: "15 Feb, 2025",
        status: "Expired"
    },
    {
        id: 5,
        serial: 5,
        code: "STUDENT30",
        offer: "30% Off",
        endTime: "31 Dec, 2025",
        status: "Active"
    },
    {
        id: 6,
        serial: 6,
        code: "WELCOME15",
        offer: "15% Off",
        endTime: "28 Feb, 2025",
        status: "Inactive"
    },
    {
        id: 7,
        serial: 7,
        code: "BULK100",
        offer: "$100 Off",
        endTime: "15 Jun, 2025",
        status: "Active"
    },
    {
        id: 8,
        serial: 8,
        code: "EARLY40",
        offer: "40% Off",
        endTime: "10 Jan, 2025",
        status: "Expired"
    }
]

const CouponList = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [showCreateNewCard, setShowCreateNewCard] = useState(false)
    const [showEditCouponModal,setShowEditCouponModal] = useState(false)
    const [selectedCoupon, setSelectedCoupon] = useState(null)

    
  
    const navigate = useNavigate()

    const handleEntriesChange = (event) => {
        setEntriesPerPage(event.target.value)
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value)
    }

    const filteredData = couponData.filter(
        (coupon) =>
            coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coupon.offer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coupon.status.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleCreateNewCoupon = (newCoupon) => {
        // setCouponData((prev) => [...prev, { ...newCoupon, id: prev.length + 1 }])
    }

    const getStatusChipColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return { bgcolor: "#d4edda", color: "#155724" }
            case 'inactive':
                return { bgcolor: "#fff3cd", color: "#856404" }
            case 'expired':
                return { bgcolor: "#f8d7da", color: "#721c24" }
            default:
                return { bgcolor: "#e2e3e5", color: "#383d41" }
        }
    }

    return (
        <Box sx={{ py: 3,minWidth: 1350, mx: "auto", bgcolor: "#f8fafc", minHeight: "100vh",position: "relative" ,right: 100 }}>
            {/* Header Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: "text.primary" }}>
                    Coupon List
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
                        },
                    }}
                    onClick={() => navigate('/admin/create-coupon')}
                >
                    Create New
                </Button>
            </Box>

            {/* Controls Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        entries
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Search:
                    </Typography>
                    <TextField
                        size="small"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder=""
                        sx={{
                            width: 200,
                            "& .MuiOutlinedInput-root": {
                                bgcolor: "white",
                                "& fieldset": {
                                    borderColor: "grey.300",
                                },
                            },
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
                                        Code
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Offer
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                       End Time
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                                            <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        Status
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
                                        </Box>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((coupon) => (
                                <TableRow
                                    key={coupon.id}
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
                                            {coupon.serial}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}>
                                            {coupon.code}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}>
                                            {coupon.offer}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.875rem" }}>
                                            {coupon.endTime}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ py: 2.5 }}>
                                        <Chip
                                            label={coupon.status}
                                            size="small"
                                            sx={{
                                                ...getStatusChipColor(coupon.status),
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
                                                startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
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
                                                        bgcolor: "#4b5563",
                                                    },
                                                }}
                                                onClick={() => navigate(`/admin/coupon-details?id=${coupon.id}`)}
                                            >
                                                Detail
                                            </Button>
                                            {/* <IconButton
                                                variant="contained"
                                                size="small"
                                                startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
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
                                                        bgcolor: "#4b5563",
                                                    },
                                                }}
                                                onClick={() => setShowEditCouponModal(true)}
                                            >
                                                <IconPencil sx={{ fontSize: 18 }} />
                                            </IconButton> */}
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
                                            >
                                                <DeleteIcon sx={{ fontSize: 16 }} />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
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
            {showCreateNewCard && <CreateNewEnrollment open={showCreateNewCard} onClose={() => setShowCreateNewCard(false)} onSave={handleCreateNewCoupon} />}
            {/* {showEditCouponModal && <EditCouponDetails open={showEditCouponModal} onClose={() => setShowEditCouponModal(false)} onSave={handleEditCoupon} couponData={selectedCoupon} />} */}
        </Box>
    )
}
export default CouponList