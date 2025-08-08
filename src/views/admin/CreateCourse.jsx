import React, { useState } from 'react'
import BasicLayout from '../../components/forms/form-vertical/BasicLayout';
import BreadCrumb from './BreadCrumb';
import { Card } from '@mui/material';
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

const CreateCourse = () => {
  const location = useLocation();
  const [step, setStep] = useState('Basic Information');
  const [slug, setSlug] = useState('');
  const [courseId, setCourseId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    regularPrice: 0,
    offerPrice: 0,
    category: '',
    courseLevel: '',
    CourseLanguage: '',
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

  const handleCreateCourse = (data) => {
    // Handle form submission logic here
  }


  return (
    <>
      
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
              <CustomFormLabel htmlFor="bl-email">Category</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <CustomTextField
                id="bl-email"
                fullWidth
                value={formData.category}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  category: e.target.value
                }))}
              />
            </Grid>
            {/* Course Level */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-phone">Course Level</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <CustomTextField
                id="bl-phone"
                fullWidth
                value={formData.courseLevel}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  courseLevel: e.target.value
                }))}
              />
            </Grid>
            {/* Course Language */}
            <Grid size={12} display="flex" alignItems="center">
              <CustomFormLabel htmlFor="bl-message">Course Language</CustomFormLabel>
            </Grid>
            <Grid size={12}>
              <CustomTextField
                id="bl-message"
                fullWidth
                value={formData.CourseLanguage}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  CourseLanguage: e.target.value
                }))}
              />
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
                onClick={() => {
                  setStep("Image And Video");
                  console.log("formData", formData);
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
        <ImageAndVideo formData={formData} setFormData={setFormData} setStep={setStep} setCourseId={setCourseId}/>
      </>}

      {step === "Curriculum" && <ModuleListTable courseId={courseId} setStep={setStep}/>}

      {step === "Seo Setup" && <SeoSetupForm />}

      {step === "Submit For Review" && <></>}

    </>
  )
}

export default CreateCourse
