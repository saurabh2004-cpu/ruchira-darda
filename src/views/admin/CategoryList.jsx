"use client"

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
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ArrowDropUp,
  ArrowDropDown,
  Search as SearchIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router"

// Category data matching the original
const categoryData = [
  { id: 1, serial: 1, title: "Server Management", status: "Active" },
  { id: 2, serial: 2, title: "Online Educations", status: "Active" },
  { id: 3, serial: 3, title: "Design System", status: "Active" },
  { id: 4, serial: 4, title: "Blockchain Develop", status: "Active" },
  { id: 5, serial: 5, title: "Photography & Video", status: "Active" },
  { id: 6, serial: 6, title: "Math & Technology", status: "Active" },
  { id: 7, serial: 7, title: "Web Development", status: "Active" },
  { id: 8, serial: 8, title: "Mobile Development", status: "Inactive" },
  { id: 9, serial: 9, title: "Data Science", status: "Active" },
  { id: 10, serial: 10, title: "Machine Learning", status: "Active" },
]

const CategoryList = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchBy, setSearchBy] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const handleEntriesChange = (event) => {
    setEntriesPerPage(event.target.value)
    setCurrentPage(1)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value)
    setCurrentPage(1)
  }

  const filteredData = categoryData.filter((item) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()

    switch (searchBy) {
      case "title":
        return item.title.toLowerCase().includes(searchLower)
      case "status":
        return item.status.toLowerCase().includes(searchLower)
      case "serial":
        return item.serial.toString().includes(searchTerm)
      default:
        return (
          item.title.toLowerCase().includes(searchLower) ||
          item.status.toLowerCase().includes(searchLower) ||
          item.serial.toString().includes(searchTerm)
        )
    }
  })

  const handleDelete = (id) => {
    console.log(`Deleting category with ID: ${id}`)
    alert(`Category with ID ${id} would be deleted in a real application`)
  }

  const handleEdit = (id) => {
    console.log(`Editing category with ID: ${id}`)
    navigate(`/admin/edit-category?id=${id}`)
  }

  const handleCreateNew = () => {
    navigate("/admin/create-category")
  }

  const totalPages = Math.ceil(filteredData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = Math.min(startIndex + entriesPerPage, filteredData.length)
  const currentData = filteredData.slice(startIndex, endIndex)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const getStatusChipColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return { bgcolor: "#d4edda", color: "#155724" }
      case 'inactive':
        return { bgcolor: "#fff3cd", color: "#856404" }
      default:
        return { bgcolor: "#e2e3e5", color: "#383d41" }
    }
  }

  return (
    <Box sx={{
      py: 3,
      px: isMobile ? 2 : 3,
      mx: "auto",
      bgcolor: "#f8fafc",
      minHeight: "100vh"
    }}>
      {/* Header Section */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 2, sm: 0 },
        mb: 4
      }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            fontWeight: 700,
            color: "text.primary",
            fontSize: { xs: "1.5rem", sm: "2rem" }
          }}
        >
          Category List
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth={isMobile}
          onClick={handleCreateNew}
          sx={{
            bgcolor: "#2c3e50",
            color: "white",
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 500,
             backgroundColor: "#343088"
          }}
        >
          Create New
        </Button>
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
                  <MenuItem value={5}>5</MenuItem>
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
              gap: 2,
              width: { xs: "100%", sm: "auto" }
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
                  <MenuItem value="title">Category</MenuItem>
                  <MenuItem value="status">Status</MenuItem>
                  <MenuItem value="serial">Serial</MenuItem>
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
      <Paper variant="outlined" sx={{
        borderRadius: 2,
        overflow: "hidden",
        mb: 3,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
      }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell sx={{
                  py: 3,
                  fontWeight: 700,
                  color: "text.secondary",
                  fontSize: "0.875rem"
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    Serial
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                      <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{
                  py: 3,
                  fontWeight: 700,
                  color: "text.secondary",
                  fontSize: "0.875rem"
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    Category
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                      <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{
                  py: 3,
                  fontWeight: 700,
                  color: "text.secondary",
                  fontSize: "0.875rem"
                }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    Status
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <ArrowDropUp sx={{ fontSize: 16, color: "grey.400", mb: -0.5 }} />
                      <ArrowDropDown sx={{ fontSize: 16, color: "grey.400", mt: -0.5 }} />
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{
                  py: 3,
                  fontWeight: 700,
                  color: "text.secondary",
                  fontSize: "0.875rem"
                }}>
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
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          color: "text.primary"
                        }}
                      >
                        {item.serial}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 3 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          fontSize: "0.875rem"
                        }}
                      >
                        {item.title}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 3 }}>
                      <Chip
                        label={item.status}
                        size="small"
                        sx={{
                          ...getStatusChipColor(item.status),
                          fontWeight: 500,
                          borderRadius: 2,
                          fontSize: "0.75rem",
                          height: 28,
                          minWidth: 70,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 3 }}>
                      <Box sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        flexWrap: "wrap"
                      }}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                          onClick={() => handleEdit(item.id)}
                          sx={{
                            bgcolor: "#374151",
                            color: "white",
                            textTransform: "none",
                            borderRadius: 1.5,
                            px: 2,
                            py: 0.8,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            minWidth: "auto",
                            "&:hover": {
                              bgcolor: "#584ca0",
                            },
                             backgroundColor: "#343088"
                          }}
                        >
                          Edit
                        </Button>
                        <IconButton
                          onClick={() => handleDelete(item.id)}
                          sx={{
                            backgroundColor: '#ef4444',
                            color: 'white',
                            width: 36,
                            height: 36,
                            '&:hover': {
                              backgroundColor: '#dc2626'
                            }
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: "center", py: 6 }}>
                    <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1rem" }}>
                      No categories found matching your search criteria.
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
                    bgcolor: "#584ca0 !important",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#584ca0 !important",
                    },
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

export default CategoryList
