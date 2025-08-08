import { Box, Button, Grid, IconButton, InputLabel, TextField, Typography, Switch } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ListIcon from "@mui/icons-material/List";
import { useState } from "react";

export default function CreateCategory() {
  const [image, setImage] = useState(null);
  const [visibility, setVisibility] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

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
        <Grid item xs={12} md={4}>
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
        </Grid>

        {/* Inputs and Switch */}
        <Grid item xs={12} md={8} sx={{ width: 500 }}>
          <Grid container spacing={3} sx={{ flexDirection: "column", gap: 3 }}>
            <label htmlFor="category-name" style={{ fontWeight: 600 }}>
             Name
            </label>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                xs={{ border:'none' }}
              />
            </Grid>
            <label htmlFor="category-name" style={{ fontWeight: 600 }}>
             slug
            </label>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
              />
            </Grid>

            {/* Visibility Switch */}
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Visibility Status
              </Typography>
              <Switch
                checked={visibility}
                onChange={(e) => setVisibility(e.target.checked)}
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
