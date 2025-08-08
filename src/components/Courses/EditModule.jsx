import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import axiosInstance from "../../axios/axios";

const EditModule = ({ open, onClose, heading, courseId, onSave, setModuleList, selectedModule }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    moduleName: selectedModule.moduleName,
    serial: selectedModule.serial,
    status: selectedModule.status,
  });

  const [errors, setErrors] = useState({
    moduleName: false,
    serial: false,
  });

  const handleClose = () => {
    setFormData({
      moduleName: "",
      serial: "",
      status: true,
    });
    setErrors({ moduleName: false, serial: false });
    setError("");
    onClose();
  };

  const validate = () => {
    const newErrors = {
      moduleName: formData.moduleName.trim() === "",
      serial: formData.serial,
    };
    setErrors(newErrors);
    return !newErrors.moduleName && !newErrors.serial;
  };

  const handleEditModule = async () => {
    if (!validate()) return;
    console.log("formData", formData);
    try {
      const resp = await axiosInstance.put(`/api/module//update-module/${selectedModule._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        formData
      });
      console.log("Module updated:", resp);
      setModuleList((prevModules) => [...prevModules, resp.data.module]);

      if (onSave) onSave();
      handleClose();
    } catch (error) {
      console.error("Error creating module:", error);
      setError(error.message || "Failed to create module");
    }
  };




  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          maxWidth: isMobile ? "100%" : 500,
          m: isMobile ? 0 : 2,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
          px: 3,
          pt: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
          {heading}
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{
            color: "grey.500",
            "&:hover": {
              bgcolor: "grey.100",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ px: 3, py: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Error message */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Module Name Field */}
          <Box>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}>
              Module Name <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={formData.moduleName}
              onChange={(e) => setFormData({ ...formData, moduleName: e.target.value })}
              placeholder="Enter module name"
              error={errors.moduleName}
              helperText={errors.moduleName ? "Module name is required" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                  borderRadius: 2,
                },
                "& .MuiInputBase-input": {
                  py: 2,
                  fontSize: "1rem",
                },
              }}
            />
          </Box>

          {/* Serial Field */}
          <Box>
            <Typography variant="body1" sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}>
              Serial <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={formData.serial}
              onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
              placeholder="Enter serial number"
              error={errors.serial}
              helperText={errors.serial ? "Serial is required" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                  borderRadius: 2,
                },
                "& .MuiInputBase-input": {
                  py: 2,
                  fontSize: "1rem",
                },
              }}
            />
          </Box>

          {/* Visibility Switch */}
          <Box>
            <Typography variant="body1" sx={{ mb: 2, fontWeight: 500, color: "text.primary" }}>
              Visibility Status
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#6366f1",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#6366f1",
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: "text.secondary", ml: 1 }}>
                  {formData.status ? "Visible" : "Hidden"}
                </Typography>
              }
            />
          </Box>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleEditModule}
          sx={{
            py: 2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            bgcolor: "#6366f1",
            "&:hover": {
              bgcolor: "#5048e5",
            },
          }}
        >
          Save Module
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModule;
