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
  Switch,
  FormControlLabel,
  Alert,
} from "@mui/material"
import BlankCard from "../shared/BlankCard"
import { Close as CloseIcon } from "@mui/icons-material"
import TiptapEdit from "../../views/forms/from-tiptap/TiptapEdit"
import axiosInstance from "../../axios/axios"

const CreateLession = ({ open, onClose, heading, setLessons, moduleId }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    videoSource: "Youtube",
    videoLink: "",
    videoDuration: "",
    serial: "",
    description: "",
    isPublic: false,
  })

  const [errors, setErrors] = useState({
    name: false,
    slug: false,
    videoSource: false,
    videoLink: false,
    videoDuration: false,
    serial: false,
    description: false,
  })

  // Function to generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
  }

  const handleInputChange = (field) => (event) => {
    const value = event.target.value
    
    // If changing name field, also update slug
    if (field === "name") {
      const slug = generateSlug(value)
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        slug: slug,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

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

  const handleSwitchChange = (field) => (event) => {
    const value = event.target.checked
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle TiptapEdit onChange properly
  const handleDescriptionChange = (content) => {
    console.log("dec content", content);
    setFormData((prev) => ({
      ...prev,
      description: content,
    }))

    setErrors((prev) => ({
      ...prev,
      description: false,
    }))
  }

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim(),
      slug: !formData.slug.trim(),
      videoSource: !formData.videoSource.trim(),
      videoLink: !formData.videoLink.trim(),
      videoDuration: !formData.videoDuration.trim(),
      serial: !formData.serial.toString().trim(),
      description: !formData.description.trim(),
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleCreateLession = async () => {
    console.log("formData", formData)
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError("")

    try {
      // Convert serial to number to match schema
      const dataToSend = {
        ...formData,
        serial: parseInt(formData.serial, 10),
      }

      console.log("Sending data:", dataToSend)
      console.log("moduleId:", moduleId)

      const res = await axiosInstance.post(
        `/api/lessons/create-lession/${moduleId}`, 
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      console.log("Lesson created:", res.data)
      
      if (res.status === 200 || res.status === 201) {
        // Update lessons list
        if (setLessons && res.data.lesson) {
          setLessons((prev) => [...prev, res.data.lesson])
        } else if (setLessons && res.data) {
          setLessons((prev) => [...prev, res.data])
        }
        handleClose()
      }
    } catch (error) {
      console.error("Error creating lesson:", error)
      const errorMessage = error.response?.data?.message || error.message || "Failed to create lesson"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      name: "",
      slug: "",
      videoSource: "Youtube",
      videoLink: "",
      videoDuration: "",
      serial: "",
      description: "",
      isPublic: false,
    })
    setErrors({
      name: false,
      slug: false,
      videoSource: false,
      videoLink: false,
      videoDuration: false,
      serial: false,
      description: false,
    })
    setError("")
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
        {/* Video Preview */}
        {formData.videoLink ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 3 }}>
            <Grid item xs={12}>
              <BlankCard className="hoverCard">
                <CardMedia
                  component="iframe"
                  height="300"
                  width={"100%"}
                  src={formData.videoLink}
                  title="YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </BlankCard>
            </Grid>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 3 }}>
            <Grid item xs={12}>
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
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Error Alert */}
          {error && (
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          )}

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
              Lesson Name <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="Enter lesson name"
              error={errors.name}
              helperText={errors.name ? "Lesson name is required" : ""}
              disabled={loading}
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

          {/* Slug Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Slug <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={formData.slug}
              disabled
              error={errors.slug}
              helperText={errors.slug ? "Slug is required" : "Auto-generated from lesson name"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#f5f5f5",
                  borderRadius: 2,
                },
                "& .MuiInputBase-input": {
                  py: 2,
                  fontSize: "1rem",
                  color: "text.secondary",
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
                disabled={loading}
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                }}
              >
                <MenuItem value="Youtube">Youtube</MenuItem>
                <MenuItem value="Vimeo">Vimeo</MenuItem>
                <MenuItem value="Upload">Upload Video</MenuItem>
              </Select>
              {errors.videoSource && (
                <Typography variant="caption" sx={{ color: "#f44336", mt: 0.5, ml: 1 }}>
                  Video source is required
                </Typography>
              )}
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
              placeholder="Enter video URL (e.g., https://www.youtube.com/watch?v=...)"
              error={errors.videoLink}
              helperText={errors.videoLink ? "Video link is required" : ""}
              disabled={loading}
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
              Video Duration (minutes) <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              value={formData.videoDuration}
              onChange={handleInputChange("videoDuration")}
              placeholder="Enter duration (e.g., 15 minutes)"
              error={errors.videoDuration}
              helperText={errors.videoDuration ? "Video duration is required" : ""}
              disabled={loading}
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
            <Typography
              variant="body1"
              sx={{
                mb: 1,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Serial Number <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={formData.serial}
              onChange={handleInputChange("serial")}
              placeholder="Enter serial number (e.g., 1, 2, 3...)"
              error={errors.serial}
              helperText={errors.serial ? "Serial number is required" : ""}
              disabled={loading}
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

          {/* Public Access Switch */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
             Make It Public
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isPublic}
                  onChange={handleSwitchChange("isPublic")}
                  disabled={loading}
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
                  {formData.isPublic ? "Public" : "Private"}
                </Typography>
              }
            />
          </Box>

          {/* Description Field */}
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
            
              <TextField
                multiline
                lines={8}
                fullWidth 
                value={formData.description} 
                onChange={(e)=>setFormData({...formData, description: e.target.value})}
              />
            {errors.description && (
              <Typography variant="caption" sx={{ color: "#f44336", mt: 0.5, ml: 1 }}>
                Description is required
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleCreateLession}
          disabled={loading}
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
            "&:disabled": {
              bgcolor: "grey.300",
              color: "grey.500",
            },
          }}
        >
          {loading ? "Creating..." : "Save Lesson"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateLession