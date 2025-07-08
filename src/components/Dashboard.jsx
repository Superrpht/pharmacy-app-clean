import React from "react";
import { Paper, Box, Typography, Button, Grid } from "@mui/material";

export default function Dashboard() {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: "60px auto",
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4
      }}
    >
      <Box sx={{
        mx: "auto", px: 3, py: 1.5,
        borderRadius: "999px",
        background: "linear-gradient(to right, #49c9af, #7be495)",
        boxShadow: "0 0 12px rgba(75, 209, 172, 0.3)",
        width: "fit-content"
      }}>
        <svg viewBox="0 0 320 50" width="240" height="50"
             xmlns="http://www.w3.org/2000/svg" style={{ fill: "#fff" }}>
          <text x="160" y="35" textAnchor="middle"
                fontFamily="sans-serif" fontSize="30" fontWeight="700">
            diSPENCERx
          </text>
        </svg>
      </Box>

      <Typography variant="h4" textAlign="center">
        Welcome, Travis
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6">Medications</Typography>
            <Typography variant="h3">42</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6">Patients</Typography>
            <Typography variant="h3">17</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6">Refills Today</Typography>
            <Typography variant="h3">5</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button variant="contained" size="large">Add Medication</Button>
        <Button variant="outlined" size="large">View Records</Button>
      </Box>
    </Box>
  );
}
