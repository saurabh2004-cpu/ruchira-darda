

import { useState } from "react"
import { Box, Typography, TextField, Button, Breadcrumbs, Container } from "@mui/material"
import { ChevronRight } from "@mui/icons-material"

const SeoSetupForm = () => {
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")

  

  const handleSeoTitleChange = (event) => {
    setSeoTitle(event.target.value)
  }

  const handleSeoDescriptionChange = (event) => {
    setSeoDescription(event.target.value)
  }

  const handlePrevious = () => {
    console.log("Previous step")
  }

  const handleUpdate = () => {
    console.log("Update SEO settings", { seoTitle, seoDescription })
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb Navigation */}
      <Box sx={{ mb: 6, display: "flex", justifyContent: "center" }}>
        <Breadcrumbs
          separator={<ChevronRight sx={{ color: "#666", fontSize: "1rem" }} />}
          aria-label="form navigation"
          sx={{
            "& .MuiBreadcrumbs-ol": {
              alignItems: "center",
              flexWrap: "nowrap",
            },
          }}
        >
          
        </Breadcrumbs>
      </Box>

      {/* Form Content */}
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        {/* SEO Title Field */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              fontWeight: 500,
              color: "text.primary",
              fontSize: "1rem",
            }}
          >
            SEO title
          </Typography>
          <TextField
            fullWidth
            value={seoTitle}
            onChange={handleSeoTitleChange}
            placeholder="Enter SEO title"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "white",
                borderRadius: 2,
                "& fieldset": {
                  borderColor: "#e5e7eb",
                },
                "&:hover fieldset": {
                  borderColor: "#d1d5db",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6366f1",
                },
              },
              "& .MuiInputBase-input": {
                py: 2,
                fontSize: "1rem",
              },
            }}
          />
        </Box>

        {/* SEO Description Field */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              fontWeight: 500,
              color: "text.primary",
              fontSize: "1rem",
            }}
          >
            SEO Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={seoDescription}
            onChange={handleSeoDescriptionChange}
            placeholder="Enter SEO description"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "white",
                borderRadius: 2,
                "& fieldset": {
                  borderColor: "#e5e7eb",
                },
                "&:hover fieldset": {
                  borderColor: "#d1d5db",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6366f1",
                },
              },
              "& .MuiInputBase-input": {
                fontSize: "1rem",
              },
            }}
          />
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={handlePrevious}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "1rem",
              borderColor: "#d1d5db",
              color: "#374151",
              "&:hover": {
                borderColor: "#9ca3af",
                bgcolor: "#f9fafb",
              },
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={handleUpdate}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "1rem",
              bgcolor: "#6366f1",
              "&:hover": {
                bgcolor: "#5048e5",
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default SeoSetupForm
