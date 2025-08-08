import { Box, Button, Grid, IconButton, InputLabel, TextField, Typography, Switch } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ListIcon from "@mui/icons-material/List";
import { useState } from "react";
import axiosInstance from "../../axios/axios";
import { set } from "lodash";

export default function CreateCategory() {
  const [image, setImage] = useState(null);
  const [visibility, setVisibility] = useState(false);
  const [slug, setSlug] = useState('')
  const [error, setError] = useState('')


  const [formData, setFormData] = useState({
    categoryName: '',
    slug: slug,
    status: true
  })

  const handleSlugChange = (categoryName) => {
    const slug = categoryName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(slug);
    setFormData((prevFormData) => ({
      ...prevFormData,
      slug,
      categoryName
    }));
  };


  const handleCreateCategory = async (e) => {
    e.preventDefault()

    console.log("formData", formData)

    try {
      const res = await axiosInstance.post('/api/categories/create-category', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log("category created", res.status)
      if (res.status === 200) {
        setFormData({
          categoryName: '',
          slug: '',
          status: true
        })
        setSlug('')
      }
    } catch (error) {
      setError("Error creating category")
      console.error("Error creating category", error)
    }
  }

  return (
    <Box
      p={4}
      sx={{
        backgroundColor: "#fff",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: "1000px",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="end" alignItems="center">
        <Button
          variant="contained"
          startIcon={<ListIcon />}
          sx={{ backgroundColor: "#343088" }}
          onClick={() => window.location.href = "/admin/category-list"}
        >
          Category List
        </Button>
      </Box>

      {/* Title */}
      <Typography variant="h6" fontWeight={600}>
        Create Category
      </Typography>

      {/* Form */}
      <Grid container spacing={4} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Image Upload */}
        {/* <Grid item xs={12} md={4}>
          <InputLabel required>Image</InputLabel>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            border="2px dashed #ccc"
            borderRadius={2}
            p={3}
            sx={{ height: 400, width: 500, cursor: "pointer" }}
          >
            <input
              accept="image/*"
              type="file"
              id="upload-image"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-image">
              <IconButton component="span">
                <CloudUploadIcon fontSize="large" sx={{ color: "#ccc", height: 180, width: 180 }} />
              </IconButton>
            </label>
            <Typography variant="body2" color="text.secondary">
              Click here to{" "}
              <label htmlFor="upload-image" style={{ color: "#3f51b5", cursor: "pointer" }}>
                Choose File
              </label>{" "}
              and upload
            </Typography>
          </Box>
        </Grid> */}

        {/* Inputs and Switch */}
        <Grid item xs={12} md={8} sx={{ width: 500 }}>
          <Grid container spacing={3} sx={{ flexDirection: "column", gap: 3 }}>
            <label htmlFor="category-name" style={{ fontWeight: 600 }}>
              category Name
            </label>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={formData.categoryName}
                xs={{ border: 'none' }}
                onChange={(e) => handleSlugChange(e.target.value)}
              />
            </Grid>
            <label htmlFor="category-name" style={{ fontWeight: 600 }}>
              slug
            </label>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                disabled
                value={slug}
              />
            </Grid>

            {/* Visibility Switch */}
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Visibility Status
              </Typography>
              <Switch
                checked={visibility}
                onChange={(e) => {
                  setVisibility(e.target.checked)
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    status: e.target.checked,
                  }));
                }}
                color="primary"
              />
            </Grid>

            {/* Save Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#343088",
                  color: "#fff",
                  borderRadius: "10px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#0d1620",
                  },
                }}
                onClick={(e) => handleCreateCategory(e)}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
