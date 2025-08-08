import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import axiosInstance from '../../../axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import AuthSocialButtons from './AuthSocialButtons';
import { login } from '../../../store/authSlice';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/user/admin/signin', formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      const userData = response.data.user;
      console.log('Login success:', userData);
      dispatch(login(userData));
      localStorage.setItem('user', JSON.stringify(userData));

      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

 
  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      <Stack component="form" >
        <Box>
          <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Box>

        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password?
          </Typography>
        </Stack>

        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            onClick={(e) => handleSignIn(e)}
          >
            Sign In
          </Button>
        </Box>
      </Stack>

      {subtitle}
    </>
  );
};

export default AuthLogin;
