"use client"

import * as React from "react"
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TableHead,
  Chip,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Grid } from "@mui/material"
import { IconTrash, IconEdit, IconPlus, IconTrashFilled } from "@tabler/icons-react"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { IconTrashOff } from "@tabler/icons"

// Category data matching the screenshot
const categoryData = [
  { id: 1, title: "Server Management", status: "Active" },
  { id: 2, title: "Online Educations", status: "Active" },
  { id: 3, title: "Design System", status: "Active" },
  { id: 4, title: "Blockchain Develop", status: "Active" },
  { id: 5, title: "Photography & Video", status: "Active" },
  { id: 6, title: "Math & Technology", status: "Active" },
]

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor("id", {
    header: () => "Serial",
    cell: (info) => (
      <Typography
        variant="body1"
        sx={{
          color: "#2d3748",
          fontSize: { xs: "14px", sm: "16px" },
          fontWeight: 400,
        }}
      >
        {info.getValue()}
      </Typography>
    ),
  }),
  columnHelper.accessor("title", {
    header: () => "Category",
    cell: (info) => (
      <Typography
        variant="body1"
        sx={{
          color: "#2d3748",
          fontSize: { xs: "14px", sm: "18px" },
          fontWeight: 900,
        }}
      >
        {info.getValue()}
      </Typography>
    ),
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => (
      <Chip
        label={info.getValue()}
        sx={{
          backgroundColor: "#c6f6d5",
          color: "#22543d",
          fontWeight: 500,
          fontSize: { xs: "12px", sm: "14px" },
          height: { xs: "28px", sm: "32px" },
          borderRadius: "6px",
          px: { xs: 1, sm: 2 },
          "& .MuiChip-label": {
            px: 1,
          },
        }}
      />
    ),
  }),
  columnHelper.accessor("id", {
    id: "actions",
    header: () => "Action",
    cell: (info) => (
      <Box sx={{ display: "flex", gap: { xs: 1, sm: 1.5 }, flexWrap: "wrap" }}>
        <Button
          size="small"
          startIcon={<IconEdit size="1rem" />}
          sx={{
            backgroundColor: "#2d3748",
            color: "white",
            textTransform: "none",
            fontSize: { xs: "12px", sm: "17px" },
            fontWeight: 500,
            px: { xs: 1.5, sm: 2.5 },
            borderRadius: "8px",
            minWidth: "130px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "black",
              boxShadow: "none",
            },
          }}

          onClick={() => window.location.href = `/admin/edit-category?id=${info.getValue()}`}
        >
          Edit
        </Button>
        <Button
          size="small"
          sx={{
            backgroundColor: "#fd5722",
            color: "white",
            minWidth: { xs: "32px", sm: "50px" },
            width: { xs: "32px", sm: "50px" },
            height: { xs: "32px", sm: "50px" },
            borderRadius: "6px",
            p: 0,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#e53e3e",
              boxShadow: "none",
            },
          }}
        >
          <IconTrashFilled size="1.5rem" />
        </Button>
      </Box>
    ),
  }),
]

const CategoryList = () => {
  const [data, setData] = React.useState(() => [...categoryData])
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [search, setSearch] = React.useState("")
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  // Filter data based on search
  const filteredData = React.useMemo(() => {
    if (!search) return data
    return data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
  }, [data, search])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
  }

  return (
    <Box
      sx={{ py: 3,minWidth: 1350, mx: "auto", bgcolor: "#f8fafc", minHeight: "100vh",position: "relative" ,right: 100 }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: { xs: 3, sm: 4 },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: "#1a1a1a",
            fontSize: { xs: "24px", sm: "28px", md: "22px" },
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Category List
        </Typography>
        <Button
          variant="contained"
          startIcon={<IconPlus size="1.1rem" />}
          sx={{
            backgroundColor: "#2d3748",
            color: "white",
            borderRadius: "6px",
            textTransform: "none",
            fontWeight: 500,
            fontSize: { xs: "12px", sm: "18px" },
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 1, sm: 1.2 },
            boxShadow: "none",
            alignSelf: { xs: "flex-start", sm: "auto" },
            "&:hover": {
              backgroundColor: "#1a202c",
              boxShadow: "none",
            },
          }}
          onClick={() => window.location.href = "/admin/create-category"}
        >
          Create New
        </Button>
      </Box>

      {/* Controls Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 3,
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body1"
            sx={{
              color: "#4a5568",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: 400,
            }}
          >
            Show
          </Typography>
          <FormControl size="small" sx={{ minWidth: { xs: 60, sm: 70 } }}>
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 500,
                color: "#2d3748",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                },
                "& .MuiSelect-select": {
                  py: { xs: 0.5, sm: 0.8 },
                  px: { xs: 1, sm: 1.5 },
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #cbd5e0",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #3182ce",
                },
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>
          <Typography
            variant="body1"
            sx={{
              color: "#4a5568",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: 400,
            }}
          >
            entries
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#4a5568",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: 400,
              whiteSpace: "nowrap",
            }}
          >
            Search:
          </Typography>
          <TextField
            size="small"
            value={search}
            onChange={handleSearch}
            sx={{
              width: { xs: "100%", sm: 200, md: 250 },
              "& .MuiOutlinedInput-root": {
                fontSize: { xs: "12px", sm: "14px" },
                "& fieldset": {
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                },
                "&:hover fieldset": {
                  border: "1px solid #cbd5e0",
                },
                "&.Mui-focused fieldset": {
                  border: "1px solid #3182ce",
                },
                "& input": {
                  py: { xs: 0.8, sm: 1 },
                  px: { xs: 1, sm: 1.5 },
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* Table */}
      <Grid container spacing={0}>
        <Grid size={12}>
          <Box sx={{ overflowX: "auto" }}>
            <TableContainer
              sx={{
                border: "none",
                boxShadow: "none",
                minWidth: { xs: "600px", md: "auto" },
                "& .MuiTable-root": {
                  borderCollapse: "separate",
                  borderSpacing: 0,
                },
              }}
            >
              <Table>
                <TableHead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableCell
                          key={header.id}
                          sx={{
                            fontWeight: 800,
                            color: "#718096",
                            fontSize: { xs: "14px", sm: "17px" },
                            py: { xs: 2, sm: 2.5 },
                            px: { xs: 1, sm: 2 },
                            border: "none",
                            backgroundColor: "transparent",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f7fafc",
                        },
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          sx={{
                            py: { xs: 2, sm: 3 },
                            px: { xs: 1, sm: 2 },
                            border: "none",
                            verticalAlign: "middle",
                          }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CategoryList

