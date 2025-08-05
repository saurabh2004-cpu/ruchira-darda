import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  FormControl,
  Select,
  MenuItem,
  Grid,
  CardMedia,
} from "@mui/material"
import BlankCard from "../shared/BlankCard"
import { Close as CloseIcon } from "@mui/icons-material"
import TiptapEdit from "../../views/forms/from-tiptap/TiptapEdit"



const CreateLession = ({ open, onClose, onSave, heading }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [formData, setFormData] = useState({
    name: "",
    videoSource: "Youtube",
    videoLink: "",
    videoDuration: "",
    serial: "",
    description: "",
  })

  const [errors, setErrors] = useState({
    name: false,
    videoSource: false,
    videoLink: false,
    videoDuration: false,
    serial: false,
    description: false,
  })

  const handleInputChange = (field) => (event) => {
    const value = event.target.value
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [field]: false,
    }))
  }

  const handleSelectChange = (field) => (event) => {
    const value = event.target.value
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [field]: false,
    }))
  }


  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      videoSource: !formData.videoSource.trim(),
      videoLink: !formData.videoLink.trim(),
      videoDuration: !formData.videoDuration.trim(),
      serial: !formData.serial.trim(),
      description: !formData.description.trim(),
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
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
      videoSource: "Youtube",
      videoLink: "",
      videoDuration: "",
      serial: "",
      description: "",
    })
    setErrors({
      name: false,
      videoSource: false,
      videoLink: false,
      videoDuration: false,
      serial: false,
      description: false,
    })
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          maxWidth: isMobile ? "100%" : 700,
          m: isMobile ? 0 : 2,
          maxHeight: "90vh",
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
       {heading ==='Edit Lesson' && <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Grid item xs={12} md={6}>
            <BlankCard className="hoverCard">

              <CardMedia
                component="iframe"
                height="300"
                width={"100%"}
                src="https://www.youtube.com/embed/UKJsjKivhdE"
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </BlankCard>
          </Grid>
        </Box>}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
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
              Name <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="Enter lesson name"
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

          {/* Video Source Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Video Source <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <FormControl fullWidth error={errors.videoSource}>
              <Select
                value={formData.videoSource}
                onChange={handleSelectChange("videoSource")}
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.videoSource ? "#f44336" : "#e5e7eb",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.videoSource ? "#f44336" : "#d1d5db",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: errors.videoSource ? "#f44336" : "#6366f1",
                  },
                }}
              >
                <MenuItem value="Youtube">Youtube</MenuItem>
                <MenuItem value="Vimeo">Vimeo</MenuItem>
                <MenuItem value="Upload">Upload Video</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Video Link Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Video Link <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={formData.videoLink}
              onChange={handleInputChange("videoLink")}
              placeholder="Enter video URL"
              error={errors.videoLink}
              helperText={errors.videoLink ? "Video link is required" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: errors.videoLink ? "#f44336" : "#e5e7eb",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.videoLink ? "#f44336" : "#d1d5db",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.videoLink ? "#f44336" : "#6366f1",
                  },
                },
                "& .MuiInputBase-input": {
                  py: 2,
                  fontSize: "1rem",
                },
              }}
            />
          </Box>

          {/* Video Duration Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Video Duration (minute) <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={formData.videoDuration}
              onChange={handleInputChange("videoDuration")}
              placeholder="Enter duration in minutes"
              error={errors.videoDuration}
              helperText={errors.videoDuration ? "Video duration is required" : ""}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: errors.videoDuration ? "#f44336" : "#e5e7eb",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.videoDuration ? "#f44336" : "#d1d5db",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.videoDuration ? "#f44336" : "#6366f1",
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
              Serial <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              type="number"
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

          {/* Description Field with Rich Text Editor Simulation */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Description <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TiptapEdit value={formData.description} onChange={handleInputChange("description")} />
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
          Save Lesson
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateLession
