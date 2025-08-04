import React from 'react';
import { Grid, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CustomFormLabel from '../theme-elements/CustomFormLabel';
import CustomTextField from '../theme-elements/CustomTextField';
import CustomOutlinedInput from '../theme-elements/CustomOutlinedInput';
import TiptapEdit from '../../../views/forms/from-tiptap/TiptapEdit';

const BasicLayout = () => {
  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Layout */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Grid container>
        {/* 1 */}
        <Grid size={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-name" sx={{ mt: 0 }}>
            Title
          </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomTextField id="bl-name" placeholder="John Deo" fullWidth />
        </Grid>
        {/* 2 */}
        <Grid size={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-company">Slug</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomTextField id="bl-company" fullWidth />
        </Grid>
        <Grid size={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-company">Regular Price</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomTextField id="bl-company" fullWidth />
        </Grid>
        {/* 3 */}
        <Grid size={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-email">Offer Price</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomTextField id="bl-email" fullWidth />
        </Grid>
        <Grid size={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-email">Category</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomTextField id="bl-email" fullWidth />
        </Grid>
        {/* 4 */}
        <Grid size={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-phone">Course Level </CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomTextField id="bl-phone" fullWidth />
        </Grid>
        {/* 5 */}
        <Grid size={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Course Language</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomTextField
            id="bl-message"
            fullWidth
          />
        </Grid>
        <Grid size={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Total Lessions</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomTextField
            id="bl-message"
            fullWidth
          />
        </Grid>
        <Grid size={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Total Duration</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomTextField
            id="bl-message"
            fullWidth
            placeholder="e.g. 2 hours"
          />
        </Grid>
        <Grid size={12} display="flex" alignItems="center">
          <CustomFormLabel htmlFor="bl-message">Short description</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <CustomTextField
            id="bl-message"
            fullWidth
            placeholder="Write a short description about the course"
            multiline
          />
        </Grid>

        <Grid display="flex" alignItems="center" size={12}>
          <CustomFormLabel htmlFor="desc">Description</CustomFormLabel>
        </Grid>
        <Grid size={12}>
          <TiptapEdit />
        </Grid>


        <Grid size={12} mt={3}>
          <Button variant="contained" color="primary">
            Save And Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default BasicLayout;
