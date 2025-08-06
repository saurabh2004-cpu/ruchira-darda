

import { useState } from "react"
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
} from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"



const CreateNewEnrollment = ({ open, onClose, onSave}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [formData, setFormData] = useState({
    name: "",
    serial: "",
    visibilityStatus: false,
  })

  const [errors, setErrors] = useState({
    name: false,
    serial: false,
  })

  const handleInputChange = (field) => (event) => {
    const value = field === "visibilityStatus" ? event.target.checked : event.target.value
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (field === "name" || field === "serial") {
      setErrors((prev) => ({
        ...prev,
        [field]: false,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      serial: !formData.serial.trim(),
    }
    setErrors(newErrors)
    return !newErrors.name && !newErrors.serial
  }

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData)
      handleClose()
    }
  }

  const handleClose = () => {
    setFormData({
      name: "",
      serial: "",
      visibilityStatus: false,
    })
    setErrors({
      name: false,
      serial: false,
    })
    onClose()
  }

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
          Create New Enrollment
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
          {/* Name Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Student Name <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="Enter module name"
              error={errors.name}
              helperText={errors.name ? "Name is required" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: errors.name ? "#f44336" : "#e5e7eb",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.name ? "#f44336" : "#d1d5db",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.name ? "#f44336" : "#6366f1",
                  },
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
            <Typography
              variant="body1"
              sx={{
                mb: 1,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Course Name <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={formData.serial}
              onChange={handleInputChange("serial")}
              placeholder="Enter serial number"
              error={errors.serial}
              helperText={errors.serial ? "Serial is required" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: errors.serial ? "#f44336" : "#e5e7eb",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.serial ? "#f44336" : "#d1d5db",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.serial ? "#f44336" : "#6366f1",
                  },
                },
                "& .MuiInputBase-input": {
                  py: 2,
                  fontSize: "1rem",
                },
              }}
            />
          </Box>

          {/* Visibility Status */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Payment Status
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.visibilityStatus}
                  onChange={handleInputChange("visibilityStatus")}
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
                  {formData.visibilityStatus ? "Paid" : "Unpaid"}
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
          onClick={handleSave}
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateNewEnrollment
