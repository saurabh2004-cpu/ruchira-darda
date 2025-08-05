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
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, List as ListIcon } from "@mui/icons-material"
import CreateModule from "./CreateModule";
import React from "react";
import LessionList from "./LessionList";

// Sample data matching the image
const moduleData = [
  {
    id: 1,
    serial: 1,
    moduleName: "Introduction",
    totalLessons: 3,
    status: "Active",
  },
  {
    id: 2,
    serial: 2,
    moduleName: "Data Structures and Algorithms in Python",
    totalLessons: 3,
    status: "Active",
  },
  {
    id: 3,
    serial: 3,
    moduleName: "Data Analysis with Pandas",
    totalLessons: 3,
    status: "Active",
  },
  {
    id: 4,
    serial: 4,
    moduleName: "Introduction to Machine Learning",
    totalLessons: 3,
    status: "Active",
  },
]

const ModuleListTable = () => {
  const [showCreateModuleCard, setShowCreateModuleCard] = React.useState(false);
  const [showLessionList, setShowLessionList] = React.useState(false);
  const [showEditModuleCard, setShowEditModuleCard] = React.useState(false);

  const handleSave = () => {
    console.log("Module saved");
    setShowCreateModuleCard(false);
  }

  const handleClose = () => {
    setShowCreateModuleCard(false);
  }

  const handleEditModuleClick = (moduleId) => {
    setShowEditModuleCard(true);
  }

  return (
    <>
      {!showLessionList ? <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>
        {/* Header Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: "text.primary" }}>
            Module List
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
            Add Module
          </Button>
        </Box>

        {/* Table */}
        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "grey.50" }}>
                  <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                    Serial
                  </TableCell>
                  <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                    Module Name
                  </TableCell>
                  <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                    Total Lessons
                  </TableCell>
                  <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ py: 2, fontWeight: 600, color: "text.secondary", fontSize: "0.875rem" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {moduleData.map((module) => (
                  <TableRow
                    key={module.id}
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
                      <Typography variant="body1" sx={{ fontWeight: 500, fontSize: "1rem" }}>
                        {module.serial}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500, color: "text.primary", fontSize: "1rem" }}>
                        {module.moduleName}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1rem" }}>
                        {module.totalLessons}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Chip
                        label={module.status}
                        size="small"
                        sx={{
                          bgcolor: "#d4edda",
                          color: "#155724",
                          fontWeight: 500,
                          borderRadius: 1,
                          fontSize: "0.85rem",
                          height: 35,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<ListIcon sx={{ fontSize: 16 }} />}
                          sx={{
                            bgcolor: "#6366f1",
                            color: "white",
                            textTransform: "none",
                            borderRadius: 1.5,
                            px: 3,
                            py: 1,
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            minWidth: "auto",
                            "&:hover": {
                              bgcolor: "#5048e5",
                            },
                          }}

                          onClick={() => setShowLessionList(true)}
                        >
                          Lessons
                        </Button>
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: "#374151",
                            color: "white",
                            width: 32,
                            height: 32,
                            "&:hover": {
                              bgcolor: "#4b5563",
                            },
                          }}
                          onClick={() => handleEditModuleClick(module.id)}
                        >
                          <EditIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: "#ef4444",
                            color: "white",
                            width: 32,
                            height: 32,
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

        {/* Pagination Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
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
              "&:hover": {
                borderColor: "grey.600",
                bgcolor: "grey.50",
              },
            }}
            onClick={() => setShowLessionList(false)}
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
          <CreateModule open={showCreateModuleCard} onClose={handleClose} onSave={handleSave} heading="Create Module" />
        )}

        {showEditModuleCard && (
          <CreateModule open={showEditModuleCard} onClose={() => setShowEditModuleCard(false)} onSave={handleSave} heading="Edit Module" />
        )}
      </Box>:
      <LessionList />
      }
    </>
  )
}

export default ModuleListTable
