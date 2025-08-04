import { Breadcrumbs, Typography, Box, Link, useMediaQuery } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const BreadcrumbNavigation = ({ steps,setStep }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ py: 2, px: 2, overflowX: isMobile ? "auto" : "visible" ,alignItems:"center", mx: "auto", justifyContent: "center",display: "flex"}}>
      <Breadcrumbs
        separator={<ChevronRight sx={{ color: "#666", fontSize: "1rem" }} />}
        aria-label="breadcrumb"
        sx={{
          whiteSpace: isMobile ? "nowrap" : "normal",
          display: "flex",
          alignItems: "center",
          "& .MuiBreadcrumbs-ol": {
            alignItems: "center",
            flexWrap: isMobile ? "nowrap" : "wrap",
          },
        }}
      >
        {steps.map((step, index) =>
          step.active ? (
            <Typography
              key={index}
              sx={{
                color: "#6366f1",
                fontWeight: 800,
                fontSize: isMobile ? "0.875rem" : "1rem",
                cursor: "pointer",
                "&:hover": {
                  color: "#4f46e5",
                },
              }}
              
            >
              {step.label}
            </Typography>
          ) : (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href="#"
              sx={{
                color: "#374151",
                fontWeight: 800,
                fontSize: isMobile ? "0.875rem" : "1rem",
                cursor: step.completed ? "pointer" : "default",
              }}
              onClick={() => setStep(step.label)}
            >
              {step.label}
            </Link>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbNavigation;
