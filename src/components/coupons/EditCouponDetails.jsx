"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Grid,
  Chip,
  Autocomplete,
  InputAdornment,
} from "@mui/material"
import {
  Close as CloseIcon,
  Percent as PercentIcon,
  AttachMoney as MoneyIcon,
  Person as PersonIcon,
} from "@mui/icons-material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

// Sample users data
const usersData = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
  { id: 3, name: "David Wilson", email: "david.wilson@example.com" },
  { id: 4, name: "Sarah Johnson", email: "sarah.johnson@example.com" },
  { id: 5, name: "Michael Brown", email: "michael.brown@example.com" },
  { id: 6, name: "Emily Davis", email: "emily.davis@example.com" },
  { id: 7, name: "Robert Miller", email: "robert.miller@example.com" },
  { id: 8, name: "Lisa Anderson", email: "lisa.anderson@example.com" },
]


const EditCouponDetails = ({ open, onClose, onSave, couponData }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [formData, setFormData] = useState({
    code: "",
    offerType: "percentage",
    offerValue: "",
    startDate: null,
    endDate: null,
    status: "Active",
    description: "",
    usageLimit: "",
    minimumAmount: "",
    isUserSpecific: false,
    specificUsers: [],
  })

  const [errors, setErrors] = useState({
    code: false,
    offerValue: false,
    startDate: false,
    endDate: false,
    usageLimit: false,
    minimumAmount: false,
  })

  useEffect(() => {
    if (couponData && open) {
      setFormData({
        code: couponData.code || "",
        offerType: couponData.offerType || "percentage",
        offerValue: couponData.offerValue?.toString() || "",
        startDate: couponData.startTime ? new Date(couponData.startTime) : null,
        endDate: couponData.endTime ? new Date(couponData.endTime) : null,
        status: couponData.status || "Active",
        description: couponData.description || "",
        usageLimit: couponData.usageLimit?.toString() || "",
        minimumAmount: couponData.minimumAmount?.toString() || "",
        isUserSpecific: couponData.isUserSpecific || false,
        specificUsers: couponData.specificUsers || [],
      })
    }
  }, [couponData, open])

  const handleInputChange = (field) => (event) => {
    const value = event.target.value
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (field in errors) {
      setErrors((prev) => ({
        ...prev,
        [field]: false,
      }))
    }
  }

  const handleSwitchChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.checked,
    }))
  }

  const handleDateChange = (field) => (date) => {
    setFormData((prev) => ({
      ...prev,
      [field]: date,
    }))
    setErrors((prev) => ({
      ...prev,
      [field]: false,
    }))
  }

  const handleUsersChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      specificUsers: newValue,
    }))
  }

  const validateForm = () => {
    const newErrors = {
      code: !formData.code.trim(),
      offerValue: !formData.offerValue.trim() || parseFloat(formData.offerValue) <= 0,
      startDate: !formData.startDate,
      endDate: !formData.endDate,
      usageLimit: !formData.usageLimit.trim() || parseInt(formData.usageLimit) <= 0,
      minimumAmount: !formData.minimumAmount.trim() || parseFloat(formData.minimumAmount) < 0,
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSave = () => {
    if (validateForm()) {
      const updatedCoupon = {
        ...couponData,
        code: formData.code,
        offerType: formData.offerType,
        offerValue: parseFloat(formData.offerValue),
        offer: formData.offerType === "percentage" 
          ? `${formData.offerValue}% Off` 
          : `$${formData.offerValue} Off`,
        startTime: formData.startDate?.toLocaleDateString() || "",
        endTime: formData.endDate?.toLocaleDateString() || "",
        status: formData.status,
        description: formData.description,
        usageLimit: parseInt(formData.usageLimit),
        minimumAmount: parseFloat(formData.minimumAmount),
        isUserSpecific: formData.isUserSpecific,
        specificUsers: formData.specificUsers,
      }
      onSave(updatedCoupon)
    }
  }

  const handleClose = () => {
    setErrors({
      code: false,
      offerValue: false,
      startDate: false,
      endDate: false,
      usageLimit: false,
      minimumAmount: false,
    })
    onClose()
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 3,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 2,
            px: 3,
            pt: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
            Edit Coupon
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              color: "grey.500",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 3, py: 2 }}>
          <Grid container spacing={3}>
            {/* Coupon Code */}
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500, color: "text.primary" }}>
                Coupon Code <span style={{ color: "#f44336" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                value={formData.code}
                onChange={handleInputChange("code")}
                placeholder="Enter coupon code"
                error={errors.code}
                helperText={errors.code ? "Coupon code is required" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#f8fafc",
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Offer Type */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500, color: "text.primary" }}>
                Offer Type <span style={{ color: "#f44336" }}>*</span>
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.offerType}
                  onChange={handleInputChange("offerType")}
                  sx={{
                    bgcolor: "#f8fafc",
                    borderRadius: 2,
                  }}
                >
                  <MenuItem value="percentage">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PercentIcon sx={{ fontSize: 18, color: "primary.main" }} />
                      Percentage
                    </Box>
                  </MenuItem>
                  <MenuItem value="amount">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <MoneyIcon sx={{ fontSize: 18, color: "success.main" }} />
                      Fixed Amount
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Offer Value */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500, color: "text.primary" }}>
                {formData.offerType === "percentage" ? "Offer (%)" : "Offer Amount ($)"}{" "}
                <span style={{ color: "#f44336" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={formData.offerValue}
                onChange={handleInputChange("offerValue")}
                placeholder={formData.offerType === "percentage" ? "Enter percentage" : "Enter amount"}
                error={errors.offerValue}
                helperText={errors.offerValue ? "Offer value is required" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {formData.offerType === "percentage" ? (
                        <PercentIcon sx={{ color: "primary.main" }} />
                      ) : (
                        <MoneyIcon sx={{ color: "success.main" }} />
                      )}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#f8fafc",
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Start Date
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500, color: "text.primary" }}>
                Start Date <span style={{ color: "#f44336" }}>*</span>
              </Typography>
              <DatePicker
                value={formData.startDate}
                onChange={handleDateChange("startDate")}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: errors.startDate,
                    helperText: errors.startDate ? "Start date is required" : "",
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#f8fafc",
                        borderRadius: 2,
                      },
                    },
                  },
                }}
              />
            </Grid> */}

            {/* End Date */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500, color: "text.primary" }}>
                End Date <span style={{ color: "#f44336" }}>*</span>
              </Typography>
              <DatePicker
                value={formData.endDate}
                onChange={handleDateChange("endDate")}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: errors.endDate,
                    helperText: errors.endDate ? "End date is required" : "",
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#f8fafc",
                        borderRadius: 2,
                      },
                    },
                  },
                }}
              />
            </Grid>

            {/* Usage Limit */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500, color: "text.primary" }}>
                Usage Limit <span style={{ color: "#f44336" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={formData.usageLimit}
                onChange={handleInputChange("usageLimit")}
                placeholder="Enter usage limit"
                error={errors.usageLimit}
                helperText={errors.usageLimit ? "Usage limit is required" : ""}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#f8fafc",
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Minimum Amount */}
            {/* <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500, color: "text.primary" }}>
                Minimum Amount ($) <span style={{ color: "#f44336" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={formData.minimumAmount}
                onChange={handleInputChange("minimumAmount")}
                placeholder="Enter minimum amount"
                error={errors.minimumAmount}
                helperText={errors.minimumAmount ? "Minimum amount is required" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon sx={{ color: "success.main" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#f8fafc",
                    borderRadius: 2,
                  },
                }}
              />
            </Grid> */}

            {/* Status */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500, color: "text.primary" }}>
                Status
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={formData.status}
                  onChange={handleInputChange("status")}
                  sx={{
                    bgcolor: "#f8fafc",
                    borderRadius: 2,
                  }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Expired">Expired</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* User Specific Toggle */}
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500, color: "text.primary" }}>
                User Specific Offer
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isUserSpecific}
                    onChange={handleSwitchChange("isUserSpecific")}
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
                    {formData.isUserSpecific ? "Specific users only" : "All users"}
                  </Typography>
                }
              />
            </Grid>

            {/* Specific Users */}
            {formData.isUserSpecific && (
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 500, color: "text.primary" }}>
                  Select Users
                </Typography>
                <Autocomplete
                  multiple
                  options={usersData}
                  getOptionLabel={(option) => `${option.name} (${option.email})`}
                  value={formData.specificUsers}
                  onChange={handleUsersChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option.name}
                        {...getTagProps({ index })}
                        key={option.id}
                        sx={{
                          borderColor: "#6366f1",
                          color: "#6366f1",
                        }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search and select users"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <PersonIcon sx={{ color: "text.secondary", mr: 1 }} />
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "#f8fafc",
                          borderRadius: 2,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
            )}

            
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
          <Button
            onClick={handleClose}
            sx={{
              textTransform: "none",
              color: "text.secondary",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              bgcolor: "#6366f1",
              color: "white",
              textTransform: "none",
              px: 4,
              "&:hover": {
                bgcolor: "#5048e5",
              },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}

export default EditCouponDetails
