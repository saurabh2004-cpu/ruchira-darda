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
import React, { useEffect } from "react";
import LessionList from "./LessionList";
import axiosInstance from "../../axios/axios";
import BreadcrumbNavigation from "../../views/admin/BreadCrumb";
import { useSearchParams } from "react-router";
import EditModule from "./EditModule";

// Sample data matching the image
const moduleData = [
  // {
  //   id: 1,
  //   serial: 1,
  //   moduleName: "Introduction",
  //   totalLessons: 3,
  //   status: "Active",
  // },
  // {
  //   id: 2,
  //   serial: 2,
  //   moduleName: "Data Structures and Algorithms in Python",
  //   totalLessons: 3,
  //   status: "Active",
  // },
  // {
  //   id: 3,
  //   serial: 3,
  //   moduleName: "Data Analysis with Pandas",
  //   totalLessons: 3,
  //   status: "Active",
  // },
  // {
  //   id: 4,
  //   serial: 4,
  //   moduleName: "Introduction to Machine Learning",
  //   totalLessons: 3,
  //   status: "Active",
  // },
]

const ModuleListTable = ({ setStep }) => {
  const [showCreateModuleCard, setShowCreateModuleCard] = React.useState(false);
  const [showLessionList, setShowLessionList] = React.useState(false);
  const [showEditModuleCard, setShowEditModuleCard] = React.useState(false);
  const [moduleList, setModuleList] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [selectedModule, setSelectedModule] = React.useState({});

  const handleSave = () => {
    console.log("Module saved");
    setShowCreateModuleCard(false);
  }

  const handleClose = () => {
    setShowCreateModuleCard(false);
  }

  const handleEditModuleClick = (module) => {
    console.log("Edit module clicked", module);
    setShowEditModuleCard(true);
    setSelectedModule(module);
  }

  const fetchModules = async () => {
    console.log("courseId", courseId);
    try {
      const response = await axiosInstance.get(`/api/module/list-modules/${courseId}`);
      console.log("Modules fetched:", response.data);

      setModuleList(response.data.modules);
      console.log("moduleList", response);

    } catch (error) {
      console.error("Error fetching modules:", error);
      setError(error.message || "Failed to fetch modules");
    }
  }

  useEffect(() => {
    fetchModules();
  }, [courseId]);

  const steps = [
    { label: "Basic Information", active: true, completed: false },
    { label: "Image And Video", active: false, completed: false },
    { label: "Curriculum", active: false, completed: false },
    { label: "Seo Setup", active: false, completed: false },
  ];

  return (
    <>
      <BreadcrumbNavigation steps={steps} setStep={setStep} />
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
                {moduleList ? moduleList?.map((module) => (
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
                      <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1rem" ,alignItems:"center",textAlign:""}}>
                        {module.lessions.length}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Chip
                        label={module.status === true ? "Public" : "Private"}
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
                          onClick={() => {handleEditModuleClick(module)}}
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
                )) : ''}

              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {!moduleList || moduleList.length === 0 && (
          <Typography variant="body1" sx={{ mt: 2, color: "text.secondary", fontSize: "1rem" }}>
            No modules found.
          </Typography>
        )}

        <Box mt={4} display="flex" gap={2}>
          <Button variant="contained" color="primary" sx={{ px: 4, fontSize: "18px", fontWeight: "500" }}
            onClick={() => window.location.href = '/admin/courses/create'}>
            Previous Step
          </Button>

          <Button variant="contained" color="primary" sx={{ px: 4, fontSize: "18px", fontWeight: "500" }}
            onClick={() => setShowLessionList(true)}>
            Next Step
          </Button>
        </Box>

        {/* Pagination Buttons
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
        </Box> */}

        {showCreateModuleCard && (
          <CreateModule open={showCreateModuleCard} onClose={handleClose} courseId={courseId} onSave={handleSave} heading="Create Module" setModuleList={setModuleList} />
        )}

        {showEditModuleCard && (
          <EditModule open={showEditModuleCard} onClose={() => setShowEditModuleCard(false)} onSave={handleSave} setModuleList={setModuleList} selectedModule={selectedModule} heading="Edit Module" />
        )}
      </Box> :
        <LessionList />
      }
    </>
  )
}

export default ModuleListTable
