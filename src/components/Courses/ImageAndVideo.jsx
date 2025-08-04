import {
  Grid,
  Box,
  Button,
  CardMedia,
  Skeleton,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router"; // corrected import
import BlankCard from "../shared/BlankCard";
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import UploadIcon from "@mui/icons-material/Upload";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const ImageAndVideo = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BlankCard className="hoverCard">
            {isLoading ? (
              <Skeleton variant="rectangular" height={240} animation="wave" />
            ) : (
              <CardMedia
                component="iframe"
                height="240"
                src="https://www.youtube.com/embed/UKJsjKivhdE"
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </BlankCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <BlankCard className="hoverCard">
            {isLoading ? (
              <Skeleton variant="rectangular" height={240} animation="wave" />
            ) : (
              <CardMedia
                component="img"
                height="240"
                image="https://educve-laravel.themedox.com/uploads/custom-images/course-thumb-2025-02-13-02-28-40-9348.webp"
                alt="Course Thumbnail"
              />
            )}
          </BlankCard>
        </Grid>
      </Grid>

      {/* Form Section */}
      <Box mt={4} >
        <Grid container spacing={3}  sx={{ maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Grid item >
            <CustomFormLabel htmlFor="video-source">Video Source</CustomFormLabel>
            <CustomTextField id="video-source" fullWidth sx={{ width: "200%" }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomFormLabel htmlFor="video-link">Video Link</CustomFormLabel>
            <CustomTextField id="video-link" fullWidth sx={{ width: "200%" }} />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box mt={4} display="flex" gap={2}>
          <Button variant="contained" color="primary" sx={{ px: 4, fontSize: "18px", fontWeight: "500" }} >
            Next
          </Button>
          <Button variant="outlined" color="secondary" startIcon={<PlayCircleOutlineIcon />}>
            Preview Video
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageAndVideo;
