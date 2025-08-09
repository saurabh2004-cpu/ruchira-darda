import React, { useEffect, useState } from 'react'
import BasicLayout from '../../components/forms/form-vertical/BasicLayout';
import BreadCrumb from './BreadCrumb';
import { Card, FormControl, FormControlLabel, MenuItem, Select, Switch } from '@mui/material';
import ImageAndVideo from '../../components/Courses/ImageAndVideo';
import ModuleListTable from '../../components/Courses/ModuleList';
import SeoSetupForm from '../../components/Courses/SeoSetup';
import { useLocation, useParams, useSearchParams } from 'react-router';
import { Grid, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import CustomOutlinedInput from '../../components/forms/theme-elements/CustomOutlinedInput';
import TiptapEdit from '../../views/forms/from-tiptap/TiptapEdit';
import { set } from 'lodash';
import axiosInstance from '../../axios/axios';
import BreadcrumbNavigation from './BreadCrumb';
import { Box } from '@mui/system';

const CreateCourse = () => {
  const [step, setStep] = useState("Basic Information");
  const [slug, setSlug] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const cId = searchParams.get("courseId");
  const [courseId, setCourseId] = useState(cId || null);

  console.log("courseId", courseId);


  const [formData, setFormData] = useState({
    title: "",
    serial: "",
    regularPrice: "",
    offerPrice: "",
    category: "",
    courseLevel: "",
    shortDescription: "",
    description: "",
    totalDuration: "",
    totalLesson: "",
    courseLanguage: "",
    thumbnailImg: null,
    videoSource: "",
    videoLink: "",
    visibility:false,
    slug: slug,
  });


  const steps = [
    { label: "Basic Information", active: true, completed: false },
    { label: "Image And Video", active: false, completed: false },
    { label: "Curriculum", active: false, completed: false },
    { label: "Seo Setup", active: false, completed: false },
  ];

  const handleSlugChange = (title) => {
    const slug = title.trim()
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(slug);
    setFormData((prevFormData) => ({
      ...prevFormData,
      slug,
    }));
  };

  const handleSwitchChange = (field) => (event) => {
    const value = event.target.checked
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get('/api/categories/list-categories',
        { withCredentials: true }
      );
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error.message || "Failed to fetch categories");
    }
  }

  const fetchCourse = async () => {
    try {
      const res = await axiosInstance.get(`/api/course/get-course-by-id/${courseId}`);
      setFormData(res.data.course);

      console.log("fetched course", res.data.course);
      // console.log("fetched course", res.data.course.category.categoryName);
    } catch (error) {
      console.error("Error fetching course:", error);
      setError(error.message || "Failed to fetch course");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])


  useEffect(() => {
    fetchCourse();
  }, [courseId])


  return (
    <>
      <BreadcrumbNavigation steps={steps} setStep={setStep} />
      {step === "Basic Information" && (
        <div>
          <Grid container>
            {/* Title */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-name" sx={{ mt: 0 }}>
                Title
              </CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <CustomTextField
                id="bl-name"
                placeholder="JavaScript for Beginners"
                fullWidth
                value={formData.title}
                onChange={e => {
                  setFormData(prev => ({
                    ...prev,
                    title: e.target.value
                  }));
                  handleSlugChange(e.target.value);
                }}
              />
            </Grid>
            {/* Slug */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-company">Slug</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <CustomTextField
                id="bl-company"
                fullWidth
                value={formData.slug}
                disabled
              />
            </Grid>
            {/* serial */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-company">serial</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <CustomTextField
                id="bl-company"
                fullWidth
                value={formData.serial}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  serial: e.target.value
                }))}
              />
            </Grid>
            {/* Regular Price */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-company">Regular Price</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <CustomTextField
                id="bl-company"
                fullWidth
                value={formData.regularPrice}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  regularPrice: e.target.value
                }))}
              />
            </Grid>
            {/* Offer Price */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-email">Offer Price</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <CustomTextField
                id="bl-email"
                fullWidth
                value={formData.offerPrice}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  offerPrice: e.target.value
                }))}
              />
            </Grid>
            {/* Category */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-category">Category</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <Select
                  id="bl-category"
                  value={formData.category._id || formData.category}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    category: e.target.value
                  }))}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select Category</em>
                  </MenuItem>
                  {categories.length > 0 ? categories.map(category =>
                  (<MenuItem value={category._id} key={category._id}
                    onClick={() => setFormData(prev => ({ ...prev, category: category._id }))}>
                    {category.categoryName}
                  </MenuItem>
                  ))
                    : (
                      <MenuItem value="" disabled>
                        <em>No categories available, please create one</em>
                      </MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            </Grid>
            {/* Course Level */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-category">Course Level</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <Select
                  id="bl-category"
                  value={formData.courseLevel}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    courseLevel: e.target.value
                  }))}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select Language</em>
                  </MenuItem>
                  <MenuItem value="begginer">Beginner Level</MenuItem>
                  <MenuItem value="intermediate">Intermediate Level</MenuItem>
                  <MenuItem value="Expert">Expert Level</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
            </Grid>

            {/* Course Language */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-category">Language</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth>
                <Select
                  id="bl-category"
                  value={formData.courseLanguage}
                  onChange={e => {
                    setFormData(prev => ({
                      ...prev,
                      courseLanguage: e.target.value
                    }));
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <em>Select Language</em>
                  </MenuItem>
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="hindi">Hindi</MenuItem>
                  <MenuItem value="marathi">Marathi</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Total Lessons */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-message">Total Lessons</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <CustomTextField
                id="bl-message"
                fullWidth
                value={formData.totalLesson}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  totalLesson: e.target.value
                }))}
              />
            </Grid>
            {/* Total Duration */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-message">Total Duration</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <CustomTextField
                id="bl-message"
                fullWidth
                value={formData.totalDuration}
                placeholder="e.g. 2 hours"
                onChange={e => setFormData(prev => ({
                  ...prev,
                  totalDuration: e.target.value
                }))}
              />
            </Grid>
            {/* Short Description */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-message">Short description</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <CustomTextField
                id="bl-message"
                fullWidth
                placeholder="Write a short description about the course"
                multiline
                value={formData.shortDescription}
                rows={4}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  shortDescription: e.target.value
                }))}
              />
            </Grid>
            {/* Description */}
            <Grid display="flex" alignItems="center" size={12}>
              <CustomFormLabel htmlFor="desc">Description</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <CustomTextField
                id="desc"
                fullWidth
                multiline
                value={formData.description}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  description: e.target.value
                }))}
              />
            </Grid>

            {/* Public Access Switch */}
            <Box>
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
                visibility
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.visibility}
                    onChange={handleSwitchChange("visibility")}
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
                    {formData.visibility ? "Public" : "Private"}
                  </Typography>
                }
              />
            </Box>

            {/* Save and Next Button */}
            <Grid size={12} mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  setStep("Image And Video");
                }}
                sx={{ backgroundColor: "#343088" }}

              >
                Save And Next
              </Button>
            </Grid>
          </Grid>
        </div>
      )}

      {step === "Image And Video" && <>
        <ImageAndVideo formData={formData} setFormData={setFormData} setStep={setStep} setCourseId={setCourseId} courseID={courseId} />
      </>}

      {step === "Curriculum" && <ModuleListTable courseId={courseId} setStep={setStep} />}

      {step === "Seo Setup" && <SeoSetupForm />}

      {step === "Submit For Review" && <></>}

    </>
  )
}

export default CreateCourse
