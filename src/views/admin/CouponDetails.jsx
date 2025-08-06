"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  Divider,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  LocalOffer as OfferIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material"
import { useNavigate, useSearchParams } from "react-router"
import EditCouponDetails from "../../components/coupons/EditCouponDetails"

// Sample coupon details data
const couponDetailsData = {
  id: 1,
  code: "SAVE20",
  offer: "20% Off",
  offerType: "percentage",
  offerValue: 20,
  endTime: "25 Mar, 2025",
  startTime: "01 Jan, 2025",
  status: "Active",
  description: "Special discount for new users. Get 20% off on your first purchase.",
  usageLimit: 1000,
  usedCount: 245,
  minimumAmount: 50,
  createdDate: "15 Dec, 2024",
  createdBy: "Admin User",
  isUserSpecific: true,
  specificUsers: [
    { id: 1, name: "John Doe", email: "john.doe@example.com", avatar: "/placeholder.svg?height=40&width=40&text=JD" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", avatar: "/placeholder.svg?height=40&width=40&text=JS" },
    { id: 3, name: "David Wilson", email: "david.wilson@example.com", avatar: "/placeholder.svg?height=40&width=40&text=DW" },
  ],
  usageHistory: [
    { id: 1, user: "John Doe", date: "20 Jan, 2025", amount: 75.00, discount: 15.00 },
    { id: 2, user: "Jane Smith", date: "18 Jan, 2025", amount: 120.00, discount: 24.00 },
    { id: 3, user: "David Wilson", date: "15 Jan, 2025", amount: 89.50, discount: 17.90 },
  ]
}

const CouponDetails = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const couponId = searchParams.get("id")
  
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [couponData, setCouponData] = useState(couponDetailsData)

  const getStatusChipColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return { bgcolor: "#d4edda", color: "#155724" }
      case 'inactive':
        return { bgcolor: "#fff3cd", color: "#856404" }
      case 'expired':
        return { bgcolor: "#f8d7da", color: "#721c24" }
      default:
        return { bgcolor: "#e2e3e5", color: "#383d41" }
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponData.code)
    // You can add a toast notification here
  }

  const handleEditSave = (updatedCoupon) => {
    setCouponData({ ...couponData, ...updatedCoupon })
    setEditModalOpen(false)
  }

  const usagePercentage = (couponData.usedCount / couponData.usageLimit) * 100

  return (
    <Box sx={{ p: isMobile ? 2 : 4, maxWidth: 1400, mx: "auto", bgcolor: "#f8fafc", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, gap: 2 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: "white",
            boxShadow: 1,
            "&:hover": {
              bgcolor: "grey.100",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 600, color: "text.primary", flex: 1 }}>
          Coupon Details
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setEditModalOpen(true)}
            sx={{
              bgcolor: "#6366f1",
              color: "white",
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              py: 1.5,
              fontWeight: 500,
              "&:hover": {
                bgcolor: "#5048e5",
              },
            }}
          >
            Edit
          </Button>
          <IconButton
            sx={{
              bgcolor: "#ef4444",
              color: "white",
              
              height: 50,
              width: 50,
            }}
          >
            <DeleteIcon size/>
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Coupon Info */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "white",
              border: "1px solid #e5e7eb",
              mb: 3,
            }}
          >
            {/* Coupon Visual */}
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                textAlign: "center",
                mb: 4,
                position: "relative",
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                {couponData.code}
              </Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {couponData.offer}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Valid until {couponData.endTime}
              </Typography>
              <IconButton
                onClick={handleCopyCode}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.2)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                <CopyIcon />
              </IconButton>
            </Box>

            {/* Coupon Details Grid */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    Coupon Code
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {couponData.code}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    Status
                  </Typography>
                  <Chip
                    label={couponData.status}
                    sx={{
                      ...getStatusChipColor(couponData.status),
                      fontWeight: 500,
                      borderRadius: 2,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    Offer Type
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, textTransform: "capitalize" }}>
                    {couponData.offerType}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    Offer Value
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {couponData.offerType === "percentage" ? `${couponData.offerValue}%` : `$${couponData.offerValue}`}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    Start Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {couponData.startTime}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    End Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {couponData.endTime}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    Minimum Amount
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    ${couponData.minimumAmount}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    Created By
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {couponData.createdBy}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                    Description
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {couponData.description}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Usage Statistics */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "white",
              border: "1px solid #e5e7eb",
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
              <TrendingUpIcon sx={{ color: "primary.main" }} />
              Usage Statistics
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined" sx={{ p: 3, textAlign: "center", borderColor: "primary.main" }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main", mb: 1 }}>
                    {couponData.usedCount}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Times Used
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined" sx={{ p: 3, textAlign: "center", borderColor: "success.main" }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "success.main", mb: 1 }}>
                    {couponData.usageLimit}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Usage Limit
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined" sx={{ p: 3, textAlign: "center", borderColor: "warning.main" }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: "warning.main", mb: 1 }}>
                    {usagePercentage.toFixed(1)}%
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Usage Rate
                  </Typography>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          {/* Recent Usage History */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              bgcolor: "white",
              border: "1px solid #e5e7eb",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
              <VisibilityIcon sx={{ color: "primary.main" }} />
              Recent Usage History
            </Typography>
            
            <List>
              {couponData.usageHistory.map((usage, index) => (
                <ListItem
                  key={usage.id}
                  sx={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 2,
                    mb: 2,
                    bgcolor: "#f8fafc",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      {usage.user.split(" ").map(n => n[0]).join("")}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={usage.user}
                    secondary={`${usage.date} • Order: $${usage.amount} • Discount: $${usage.discount}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

       
      </Grid>

      {/* Edit Modal */}
      <EditCouponDetails
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleEditSave}
        couponData={couponData}
      />
    </Box>
  )
}

export default CouponDetails
