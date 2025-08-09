import {
  Grid,
  Box,
  Button,
  CardMedia,
  Skeleton,
  Typography,
  Stack,
  MenuItem,
  Select,
  FormControl,
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

const ImageAndVideo = ({ formData, setFormData, setStep, setCourseId, courseID }) => {
  const [isLoading, setLoading] = useState(true);
  const [thumbnailImage, setThumbnailImage] = useState('https://educve-laravel.themedox.com/uploads/custom-images/course-thumb-2025-02-13-02-28-40-9348.webp');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log("formData", formData);


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
    const data = new FormData();
    data.append('title', formData.title);
    data.append('regularPrice', formData.regularPrice);
    data.append('offerPrice', formData.offerPrice);
    data.append('category', formData.category);
    data.append('courseLevel', formData.courseLevel);
    data.append('courseLanguage', formData.courseLanguage);
    data.append('totalLesson', formData.totalLesson);
    data.append('totalDuration', formData.totalDuration);
    data.append('shortDescription', formData.shortDescription);
    data.append('description', formData.description || 'description');
    data.append('certifications', formData.certifications);
    data.append('thumbnailImg', formData.thumbnailImg);
    data.append('videoSource', formData.videoSource);
    data.append('videoLink', formData.videoLink);
    data.append('visibility', formData.visibility);
    data.append('curriculum', JSON.stringify(formData.curriculum));
    data.append('slug', formData.slug);

    if (!formData.thumbnailImg) {
      alert('Please upload a thumbnail image');
      return;
    }
    data.append('thumbnailImg', thumbnailImage);
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
        // navigate(`/admin/courses/modules?courseId=${res.data.data._id}`);
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

  const handleUpdateCourse = async () => {
    try {
      const res = await axiosInstance.put(
        `/api/course/update-course-basic-information/${courseID}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      )
      setStep('Curriculum');

      console.log("resp", res);
    } catch (error) {
      console.error('Error updating course:', error.message);
      setError(error.message);
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
                  // src={formData.videoLink || "https://www.youtube.com/embed/UKJsjKivhdE"}
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
                <Box
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                    "&:hover .hoverText": {
                      opacity: 1,
                      visibility: "visible",
                    },
                  }}
                  onClick={handleChangeThumbnailImage}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={
                      formData.thumbnailImg instanceof File
                        ? thumbnailImage  // Use the object URL for new file selections
                        : formData.thumbnailImg || thumbnailImage  // Use existing URL for saved courses
                    }
                    alt="Course Thumbnail"
                  />
                  {/* Hover Text Overlay */}
                  <Box
                    className="hoverText"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 500,
                      fontSize: "1rem",
                      opacity: 0,
                      visibility: "hidden",
                      transition: "opacity 0.3s ease, visibility 0.3s ease",
                    }}
                  >
                    Click to select the thumbnail
                  </Box>
                </Box>
              )}
            </BlankCard>
          </Grid>

        </Grid>

        {/* Form Section */}
        <Box mt={4} >
          <Grid container spacing={3} sx={{ maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* <Grid item >
              <CustomFormLabel htmlFor="video-source">Video Source</CustomFormLabel>
              <CustomTextField id="video-source" fullWidth sx={{ width: "200%" }}
                onChange={(e) => setFormData({ ...formData, videoSource: e.target.value })} value={formData.videoSource} />
            </Grid>Video Source Field */}

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
              {/* <FormControl fullWidth error={errors.videoSource}> */}
              <FormControl fullWidth >
                <Select
                  value={formData.videoSource}
                  onChange={(e) => setFormData({ ...formData, videoSource: e.target.value })}
                  sx={{
                    bgcolor: "white",
                    borderRadius: 2,
                  }}
                >
                  <MenuItem value="Youtube">Youtube</MenuItem>
                  <MenuItem value="Vimeo">Vimeo</MenuItem>
                  <MenuItem value="Upload">Upload Video</MenuItem>
                </Select>
                {/* {errors.videoSource && (
                  <Typography variant="caption" sx={{ color: "#f44336", mt: 0.5, ml: 1 }}>
                    Video source is required
                  </Typography>
                )} */}
              </FormControl>
            </Box>

            <Grid item xs={12} md={6}>
              <CustomFormLabel htmlFor="video-link">Video Link</CustomFormLabel>
              <CustomTextField id="video-link" fullWidth sx={{ width: "100%" }}
                onChange={(e) => setFormData({ ...formData, videoLink: e.target.value })} value={formData.videoLink} />
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box mt={4} display="flex" gap={2}>
            <Button variant="contained" color="primary" sx={{ px: 4, fontSize: "18px", fontWeight: "500", backgroundColor: "#343088" }}
              onClick={() => setStep('Basic Information')}>
              Previous Step
            </Button>

            {/* //create course and edit course buttons */}
            {courseID === null && <Button variant="contained" color="primary" sx={{
              px: 2, fontSize: "18px", fontWeight: "500", backgroundColor: "#343088"
            }}
              onClick={handleCreateCourse}>
              {isLoading ? <IconLoader3 size={20} style={{ animation: 'spin 1s linear infinite', }} /> : "Save And Continue"}
              {/* Save And Next */}
            </Button>}

            {courseID !== null && <Button variant="contained" color="primary" sx={{
              px: 2, fontSize: "18px", fontWeight: "500", backgroundColor: "#343088"
            }}
              onClick={handleUpdateCourse}>
              {isLoading ? <IconLoader3 size={20} style={{ animation: 'spin 1s linear infinite', }} /> : "Update And Continue"}
            </Button>
            }


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
