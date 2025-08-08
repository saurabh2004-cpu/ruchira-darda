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
import { Link, useNavigate } from "react-router"; // corrected import
import BlankCard from "../shared/BlankCard";
import CustomFormLabel from "../forms/theme-elements/CustomFormLabel";
import CustomTextField from "../forms/theme-elements/CustomTextField";
import UploadIcon from "@mui/icons-material/Upload";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Alert from '@mui/material/Alert';
import axiosInstance from "../../axios/axios.js";
import axios from "axios";
import { IconLoader3 } from "@tabler/icons";
import BreadcrumbNavigation from "../../views/admin/BreadCrumb.jsx";

const ImageAndVideo = ({ formData, setFormData, setStep, setCourseId }) => {
  const [isLoading, setLoading] = useState(true);
  const [thumbnailImage, setThumbnailImage] = useState('https://educve-laravel.themedox.com/uploads/custom-images/course-thumb-2025-02-13-02-28-40-9348.webp');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleChangeThumbnailImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      setThumbnailImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, thumbnailImg: file });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  const handleCreateCourse = async () => {
    // setStep('Curriculum');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('regularPrice', formData.regularPrice);
    data.append('offerPrice', formData.offerPrice);
    data.append('category', formData.category);
    data.append('courseLevel', formData.courseLevel);
    data.append('CourseLanguage', formData.CourseLanguage);
    data.append('totalLesson', formData.totalLesson);
    data.append('totalDuration', formData.totalDuration);
    data.append('shortDescription', formData.shortDescription);
    data.append('Description', formData.Description);
    data.append('certifications', formData.certifications);
    data.append('videoSource', formData.videoSource);
    data.append('videoLink', formData.videoLink);
    data.append('visibility', formData.visibility);
    data.append('curriculum', JSON.stringify(formData.curriculum));
    data.append('slug', formData.slug);

    if (!formData.thumbnailImg) {
      alert('Please upload a thumbnail image');
      return;
    }
    data.append('thumbnailImg', formData.thumbnailImg);
    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:3000/api/course/create-course',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );

      console.log("resp", res);

      if (res.data.statusCode === 200) {

        setCourseId(res.data.data._id);
        setStep('Curriculum');
        navigate(`/admin/courses/modules?courseId=${res.data.data._id}`);
        nav
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.error('Error creating course:', error.message);
    } finally {
      setLoading(false);
    }
  }




  return (
    <>
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
                  image={thumbnailImage}
                  alt="Course Thumbnail"
                  onClick={handleChangeThumbnailImage}
                />
              )}
            </BlankCard>
          </Grid>
        </Grid>

        {/* Form Section */}
        <Box mt={4} >
          <Grid container spacing={3} sx={{ maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid item >
              <CustomFormLabel htmlFor="video-source">Video Source</CustomFormLabel>
              <CustomTextField id="video-source" fullWidth sx={{ width: "200%" }}
                onChange={(e) => setFormData({ ...formData, videoSource: e.target.value })} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomFormLabel htmlFor="video-link">Video Link</CustomFormLabel>
              <CustomTextField id="video-link" fullWidth sx={{ width: "200%" }}
                onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })} />
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box mt={4} display="flex" gap={2}>
            <Button variant="contained" color="primary" sx={{ px: 4, fontSize: "18px", fontWeight: "500", backgroundColor: "#343088" }}
              onClick={() => setStep('Basic Information')}>
              Previous Step
            </Button>
            <Button variant="contained" color="primary" sx={{
              px: 4, fontSize: "18px", fontWeight: "500",backgroundColor: "#343088"
            }}
              onClick={handleCreateCourse}>
              {isLoading ? <IconLoader3 size={20} style={{ animation: 'spin 1s linear infinite',  }}  /> : "Save And Continue"}
              {/* Save And Next */}
            </Button>
            {/* <Button variant="outlined" backgroundColor="#7c74b4" sx={{ px: 4, fontSize: "18px", fontWeight: "500" }} startIcon={<PlayCircleOutlineIcon />}>
              Preview Video
            </Button> */}
          </Box>
        </Box>
        {error && <Alert severity="error" icon={false}>
          {error}
        </Alert>}
      </Box>
    </>
  );
};

export default ImageAndVideo;
