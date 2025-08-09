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
import React, { useEffect } from "react"
import CreateLession from "./CreateLession"
import axiosInstance from "../../axios/axios"
import EditLesson from "./EditLession"
import EditLession from "./EditLession"

const LessionList = ({ module, moduleId, onClose }) => {

  const [showEditLessionCard, setShowEditLessionCard] = React.useState(false);
  const [lessons, setLessons] = React.useState([]);
  const [showCreateLessionCard, setShowCreateLessionCard] = React.useState(false);
  const [selectedLession, setSelectedLession] = React.useState(null);

  const handleEditLessionClick = (lessonId) => {
    setShowEditLessionCard(true);
    setSelectedLession(lessonId);
  }
  const [selectedLessionId, setSelectedLessionId] = React.useState(null);

  const fetchLessons = async () => {
    try {
      const response = await axiosInstance.get(`/api/lessons/list-lessions/${module._id}`);
      console.log("Lessons fetched:", response.data);
      if (response.data && response.data.lessons) {
        setLessons(response.data.lessons);
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  const handleNextClick = (lessonId) => {
    setSelectedLessionId(lessonId);
  };


  const handleDeleteSession = async (lessonId) => {
    try {
      const response = await axiosInstance.delete(`/api/lessons/delete-lession/${lessonId}`);

      console.log("Session deleted:", response.data);
      if (response.status === 200) {
        setLessons((prevLessons) => prevLessons.filter((lesson) => lesson._id !== lessonId));
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [module._id]);

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: "auto" }}>



      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "text.primary" }}>
          Module : {module.moduleName}
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
          onClick={() => setShowCreateLessionCard(true)}
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
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessons.map((lesson) => (
                <TableRow
                  key={lesson._id}
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
                    <Typography variant="body1" sx={{ fontWeight: 500, color: "text.primary", fontSize: "0.95rem" }}>
                      {lesson.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 2.5 }}>
                    <Chip
                      label={lesson.isPublic ? "Public" : "Private"}
                      size="small"
                      sx={{
                        bgcolor: lesson.isPublic ? "#d4edda" : "#f8d7da",
                        color: lesson.isPublic ? "#155724" : "#721c24",
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
                          }, backgroundColor: "#343088"
                        }}
                        onClick={() => handleEditLessionClick(lesson)}
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
                        onClick={() => handleDeleteSession(lesson._id)}
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

        {/* Show message when no lessons */}
        {lessons.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              No lessons found for this module.
            </Typography>
          </Box>
        )}
      </Paper>

      <Box mt={4} display="flex" gap={2}>
        
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            mb: 2,
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 500,
            ":hover": {
               backgroundColor: "#343088"
            }
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNextClick}
          disabled={lessons.length === 0}
          sx={{
            mb: 2,
            textTransform: "none",
            borderRadius: 2,
            fontWeight: 500,
             backgroundColor: "#343088"
          }}
        >
          Next
        </Button>
      </Box>

      {/* Create Lesson Dialog - FIXED: Changed showCreateModuleCard to showCreateLessionCard */}
      {
        showCreateLessionCard && (
          <CreateLession
            open={showCreateLessionCard}
            onClose={() => {
              setShowCreateLessionCard(false)
              fetchLessons()
            }}
            setLessons={setLessons}
            moduleId={moduleId || module._id}
            heading="Create Lesson"
          />
        )
      }

      {/* Edit Lesson Dialog */}
      {
        showEditLessionCard && (
          <EditLesson
            open={showEditLessionCard}
            onClose={() => {
              setShowEditLessionCard(false)
              fetchLessons()
            }}
            heading="Edit Lesson"
            setLessons={setLessons}
            lesson={selectedLession}
          />
        )
      }
    </Box >
  )
}

export default LessionList