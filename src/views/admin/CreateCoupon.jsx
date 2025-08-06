import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Paper,
  Chip,
  Autocomplete,
  useMediaQuery,
  useTheme,
  InputAdornment,
  Stack,
} from "@mui/material"
import {
  List as ListIcon,
  Percent as PercentIcon,
  AttachMoney as MoneyIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material"

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

const CreateCoupon = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [formData, setFormData] = useState({
    couponCode: "",
    couponType: "percentage",
    offerValue: "",
    expiryDate: "",
    status: false,
    specificUsers: [],
    isUserSpecific: false,
  })

  const [errors, setErrors] = useState({
    couponCode: false,
    offerValue: false,
    expiryDate: false,
  })

  const handleInputChange = (field) => (event) => {
    const value = event.target.value
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
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

  const handleDateChange = (event) => {
    const date = event.target.value
    setFormData((prev) => ({
      ...prev,
      expiryDate: date,
    }))
    setErrors((prev) => ({
      ...prev,
      expiryDate: false,
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
      couponCode: !formData.couponCode.trim(),
      offerValue: !formData.offerValue.trim() || parseFloat(formData.offerValue) <= 0,
      expiryDate: !formData.expiryDate,
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSave = () => {
    if (validateForm()) {
      console.log("Coupon saved:", formData)
      // Here you would typically send the data to your API
    }
  }

  const handleCouponList = () => {
    console.log("Navigate to coupon list")
    // Here you would navigate to the coupon list page
  }

  const generateCouponCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    setFormData((prev) => ({
      ...prev,
      couponCode: code,
    }))
    setErrors((prev) => ({
      ...prev,
      couponCode: false,
    }))
  }

  const fieldStyles = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "#f8fafc",
      borderRadius: 2,
      "& fieldset": {
        borderColor: "#e5e7eb",
      },
      "&:hover fieldset": {
        borderColor: "#d1d5db",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6366f1",
      },
    },
  }

  const errorFieldStyles = (hasError) => ({
    "& .MuiOutlinedInput-root": {
      bgcolor: "#f8fafc",
      borderRadius: 2,
      "& fieldset": {
        borderColor: hasError ? "#f44336" : "#e5e7eb",
      },
      "&:hover fieldset": {
        borderColor: hasError ? "#f44336" : "#d1d5db",
      },
      "&.Mui-focused fieldset": {
        borderColor: hasError ? "#f44336" : "#6366f1",
      },
    },
  })

  return (
    <Box sx={{ p: isMobile ? 2 : 4, maxWidth: 800, mx: "auto", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: isSmallMobile ? "flex-start" : "center",
          mb: 4,
          flexDirection: isSmallMobile ? "column" : "row",
          gap: isSmallMobile ? 2 : 0,
        }}
      >
        <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 600, color: "text.primary" }}>
          Create Coupon
        </Typography>
        <Button
          variant="contained"
          startIcon={<ListIcon />}
          fullWidth={isSmallMobile}
          onClick={handleCouponList}
          sx={{
            bgcolor: "#2c3e50",
            color: "white",
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#34495e",
            },
          }}
        >
          Coupon List
        </Button>
      </Box>

      {/* Form Section */}
      <Paper
        elevation={0}
        sx={{
          p: isMobile ? 3 : 4,
          borderRadius: 3,
          bgcolor: "white",
          border: "1px solid #e5e7eb",
        }}
      >
        <Stack spacing={4}>
          {/* Coupon Code Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1.5,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Coupon Code <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                value={formData.couponCode}
                onChange={handleInputChange("couponCode")}
                placeholder="Enter coupon code"
                error={errors.couponCode}
                helperText={errors.couponCode ? "Coupon code is required" : ""}
                sx={errorFieldStyles(errors.couponCode)}
              />
              <Button
                variant="outlined"
                onClick={generateCouponCode}
                sx={{
                  minWidth: "auto",
                  px: 2,
                  borderColor: "#e5e7eb",
                  color: "text.secondary",
                  borderRadius: 2,
                  
                }}
              >
                Generate
              </Button>
            </Box>
          </Box>

          {/* Coupon Code Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1.5,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Usage Limit <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                value={formData.couponCode}
                onChange={handleInputChange("couponCode")}
                placeholder="Enter Usage limit"
                error={errors.couponCode}
                helperText={errors.couponCode ? "Coupon code is required" : ""}
                sx={errorFieldStyles(errors.couponCode)}
              />
            </Box>
          </Box>


          {/* Coupon Type Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1.5,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Coupon Type <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <FormControl fullWidth>
              <Select
                value={formData.couponType}
                onChange={handleInputChange("couponType")}
                sx={{
                  bgcolor: "#f8fafc",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e5e7eb",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#d1d5db",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6366f1",
                  },
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
          </Box>

          {/* Offer Value Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1.5,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              {formData.couponType === "percentage" ? "Offer (%)" : "Offer Amount ($)"}{" "}
              <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={formData.offerValue}
              onChange={handleInputChange("offerValue")}
              placeholder={formData.couponType === "percentage" ? "Enter percentage" : "Enter amount"}
              error={errors.offerValue}
              helperText={
                errors.offerValue
                  ? `${formData.couponType === "percentage" ? "Percentage" : "Amount"} is required`
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {formData.couponType === "percentage" ? (
                      <PercentIcon sx={{ color: "primary.main" }} />
                    ) : (
                      <MoneyIcon sx={{ color: "success.main" }} />
                    )}
                  </InputAdornment>
                ),
                inputProps: {
                  min: 0,
                  max: formData.couponType === "percentage" ? 100 : undefined,
                },
              }}
              sx={errorFieldStyles(errors.offerValue)}
            />
          </Box>
          
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1.5,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              {formData.couponType === "percentage" ? "Offer (%)" : "Offer Amount ($)"}{" "}
              <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              type="number"
              value={formData.offerValue}
              onChange={handleInputChange("offerValue")}
              placeholder={formData.couponType === "percentage" ? "Enter percentage" : "Enter amount"}
              error={errors.offerValue}
              helperText={
                errors.offerValue
                  ? `${formData.couponType === "percentage" ? "Percentage" : "Amount"} is required`
                  : ""
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {formData.couponType === "percentage" ? (
                      <PercentIcon sx={{ color: "primary.main" }} />
                    ) : (
                      <MoneyIcon sx={{ color: "success.main" }} />
                    )}
                  </InputAdornment>
                ),
                inputProps: {
                  min: 0,
                  max: formData.couponType === "percentage" ? 100 : undefined,
                },
              }}
              sx={errorFieldStyles(errors.offerValue)}
            />
          </Box>

          {/* Expiry Date Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1.5,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Expiry Date <span style={{ color: "#f44336" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={formData.expiryDate}
              onChange={handleDateChange}
              error={errors.expiryDate}
              helperText={errors.expiryDate ? "Expiry date is required" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={errorFieldStyles(errors.expiryDate)}
            />
          </Box>

          {/* User Specific Toggle */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1.5,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
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
          </Box>

          {/* Specific Users Field */}
          {formData.isUserSpecific && (
            <Box>
              <Typography
                variant="body1"
                sx={{
                  mb: 1.5,
                  fontWeight: 500,
                  color: "text.primary",
                }}
              >
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
                        "& .MuiChip-deleteIcon": {
                          color: "#6366f1",
                        },
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
                    sx={fieldStyles}
                  />
                )}
              />
            </Box>
          )}

          {/* Status Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                mb: 1.5,
                fontWeight: 500,
                color: "text.primary",
              }}
            >
              Status
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.status}
                  onChange={handleSwitchChange("status")}
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
                  {formData.status ? "Active" : "Inactive"}
                </Typography>
              }
            />
          </Box>

          {/* Save Button */}
          <Box sx={{ pt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSave}
              fullWidth={isMobile}
              sx={{
                bgcolor: "#2c3e50",
                color: "white",
                textTransform: "none",
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1rem",
                minWidth: isMobile ? "100%" : 150,
                "&:hover": {
                  bgcolor: "#34495e",
                },
              }}
            >
              Save Coupon
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Preview Section */}
      {(formData.couponCode || formData.offerValue) && (
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            bgcolor: "white",
            border: "1px solid #e5e7eb",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "text.primary" }}>
            Coupon Preview
          </Typography>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {formData.couponCode || "COUPON CODE"}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {formData.offerValue
                ? `${formData.offerValue}${formData.couponType === "percentage" ? "% OFF" : "$ OFF"}`
                : "DISCOUNT"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {formData.expiryDate 
                ? `Valid until ${new Date(formData.expiryDate).toLocaleDateString()}` 
                : "Valid until expiry"
              }
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  )
}

export default CreateCoupon