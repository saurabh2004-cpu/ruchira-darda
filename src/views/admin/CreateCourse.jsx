import React, { useState } from 'react'
import BasicLayout from '../../components/forms/form-vertical/BasicLayout';
import BreadCrumb from './BreadCrumb';
import { Card } from '@mui/material';
import ImageAndVideo from '../../components/Courses/ImageAndVideo';
import ModuleListTable from '../../components/Courses/ModuleList';
import SeoSetupForm from '../../components/Courses/SeoSetup';
import { useLocation } from 'react-router';

const CreateCourse = () => {
  const location = useLocation();
  const courseId = location.state?.courseId;

  console.log("Course ID from state:", courseId);

  const steps = [
    { label: "Basic Information", active: true, completed: false },
    { label: "Image And Video", active: false, completed: false },
    { label: "Curriculum", active: false, completed: false },
    { label: "Seo Setup", active: false, completed: false },
  ];

  const [step, setStep] = useState('Basic Information');
  return (
    <>
    <BreadCrumb steps={steps} setStep={setStep}/>
    {step === "Basic Information" && <BasicLayout />}

    {step === "Image And Video" && <>
      <ImageAndVideo />
    </>}

    {step === "Curriculum" && <ModuleListTable/>}
    
    {step === "Seo Setup" && <SeoSetupForm/>}

    {step === "Submit For Review" && <></>}
    
    </>
  )
}

export default CreateCourse
