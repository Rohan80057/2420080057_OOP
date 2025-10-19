import { Box, Typography, Paper } from "@mui/material";

export default function Analytics() {
  return (
    <Box sx={{ p: 3, bgcolor: "#14171E", minHeight: "100vh", color: "white" }}>
      <Typography variant="h4" mb={3}>Portfolio Analytics (simplified)</Typography>
      <Paper sx={{ p: 2, bgcolor: "#202740" }}>
        <Typography>Analytics content coming soon...</Typography>
      </Paper>
    </Box>
  );
}
