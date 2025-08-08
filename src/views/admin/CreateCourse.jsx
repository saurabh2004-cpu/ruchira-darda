import React, { useEffect, useState } from 'react'
import BasicLayout from '../../components/forms/form-vertical/BasicLayout';
import BreadCrumb from './BreadCrumb';
import { Card, FormControl, MenuItem, Select } from '@mui/material';
import ImageAndVideo from '../../components/Courses/ImageAndVideo';
import ModuleListTable from '../../components/Courses/ModuleList';
import SeoSetupForm from '../../components/Courses/SeoSetup';
import { useLocation } from 'react-router';
import { Grid, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import CustomOutlinedInput from '../../components/forms/theme-elements/CustomOutlinedInput';
import TiptapEdit from '../../views/forms/from-tiptap/TiptapEdit';
import { set } from 'lodash';
import axiosInstance from '../../axios/axios';

const CreateCourse = () => {
  const location = useLocation();
  const [step, setStep] = useState('Basic Information');
  const [slug, setSlug] = useState('');
  const [courseId, setCourseId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');


  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    serial: 0,
    regularPrice: 0,
    offerPrice: 0,
    category: '',
    courseLevel: '',
    courseLanguage: '',
    totalLesson: '',
    totalDuration: '',
    shortDescription: '',
    Description: 'test',
    thumbnailImg: null,
    videoSource: '',
    videoLink: '',
  });

  console.log("Course ID from state:", courseId);

  const steps = [
    { label: "Basic Information", active: true, completed: false },
    { label: "Image And Video", active: false, completed: false },
    { label: "Curriculum", active: false, completed: false },
    { label: "Seo Setup", active: false, completed: false },
  ];

  const handleSlugChange = (title) => {
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setSlug(slug);
    setFormData((prevFormData) => ({
      ...prevFormData,
      slug,
    }));
  };


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

  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <>
      <BreadCrumb step={step} steps={steps} />
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
                value={slug}
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
                  value={formData.category}
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
                  nChange={e => {
                    console.log('Selected language:', e.target.value);
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
                  {/* Add more options as needed */}
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
              <TiptapEdit
                value={formData.Description}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  Description: value
                }))}
              />
            </Grid>
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
        <ImageAndVideo formData={formData} setFormData={setFormData} setStep={setStep} setCourseId={setCourseId} />
      </>}

      {step === "Curriculum" && <ModuleListTable courseId={courseId} setStep={setStep} />}

      {step === "Seo Setup" && <SeoSetupForm />}

      {step === "Submit For Review" && <></>}

    </>
  )
}

export default CreateCourse
