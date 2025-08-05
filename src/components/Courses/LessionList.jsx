"use client"
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Paper,
  TableContainer,
  Button,
  IconButton,
} from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"
import React from "react"
import CreateLession from "./CreateLession"

// Sample lesson data matching the image
const lessonData = [
  {
    id: 1,
    serial: 1,
    name: "Overview",
    visibility: "Public",
    status: "Active",
  },
  {
    id: 2,
    serial: 2,
    name: "Historical Context",
    visibility: "Public",
    status: "Active",
  },
  {
    id: 3,
    serial: 2,
    name: "Answering Questions with Data",
    visibility: "Private",
    status: "Active",
  },
]

const LessionList = () => {
    const [showCreateModuleCard, setShowCreateModuleCard] = React.useState(false);
    const [showEditLessionCard, setShowEditLessionCard] = React.useState(false);

    const handleSave = () => {
      console.log("Module saved");
      setShowCreateModuleCard(false);
    }
    const handleClose = () => {
      setShowCreateModuleCard(false);
    }

    const handleEditLessionClick = (lessonId) => {
      setShowEditLessionCard(true);
    }

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "text.primary" }}>
          Module : Introduction
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
          onClick={() => setShowCreateModuleCard(true)}
        >
          Add Lesson
        </Button>
      </Box>

      {/* Table */}
      <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden", mb: 3 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "1rem" }}>
                  Serial
                </TableCell>
                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "1rem" }}>
                  Name
                </TableCell>
                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "1rem" }}>
                  Visibility
                </TableCell>
                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "1rem" }}>
                  Status
                </TableCell>
                <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "1rem" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessonData.map((lesson) => (
                <TableRow
                  key={lesson.id}
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
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {lesson.serial}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2.5 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "text.primary",fontSize: "0.95rem" }}>
                      {lesson.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2.5 }}>
                    <Chip
                      label={lesson.visibility}
                      size="small"
                      sx={{
                        bgcolor: lesson.visibility === "Public" ? "#d4edda" : "#f8d7da",
                        color: lesson.visibility === "Public" ? "#155724" : "#721c24",
                        fontWeight: 500,
                        borderRadius: 1,
                        fontSize: "0.95rem",
                        height: 28,
                        minWidth: 60,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 2.5 }}>
                    <Chip
                      label={lesson.status}
                      size="small"
                      sx={{
                        bgcolor: "#d4edda",
                        color: "#155724",
                        fontWeight: 500,
                        borderRadius: 1,
                        fontSize: "0.95rem",
                        height: 28,
                        minWidth: 60,
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
                          borderRadius: 1,
                          px: 2,
                          py: 1,
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          minWidth: "auto",
                          "&:hover": {
                            bgcolor: "#4b5563",
                          },
                        }}
                        onClick={()=>handleEditLessionClick(lesson.id)}
                      >
                        Edit
                      </Button>
                      <IconButton
                        size="small"
                        sx={{
                          bgcolor: "#ef4444",
                          color: "white",
                          width: 42,
                          height: 42,
                          "&:hover": {
                            bgcolor: "#dc2626",
                          },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 25 }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "grey.400",
            color: "text.primary",
            px: 3,
            py: 1,
            borderRadius: 2,
            fontWeight: 500,
            
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: "#6366f1",
            px: 3,
            py: 1,
            borderRadius: 2,
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#5048e5",
            },
          }}
        >
          Next
        </Button>
      </Box>
      {showCreateModuleCard && (
        <CreateLession open={showCreateModuleCard} onClose={handleClose} onSave={handleSave} heading="Create Lesson" />
      )}

      {showEditLessionCard && (
        <CreateLession open={showEditLessionCard} onClose={() => setShowEditLessionCard(false)} onSave={handleSave} heading="Edit Lesson" />
      )}
    </Box>
  )
}

export default LessionList
