import { useApp } from "../context/AppContext";
import { Box, Typography, Paper, Grid } from "@mui/material";

export default function Dashboard() {
  const { portfolio } = useApp();
  const totalValue = portfolio.reduce((sum, s) => sum + s.price * s.quantity, 0);
  const stockCount = portfolio.length;

  return (
    <Box sx={{ p: 3, bgcolor: "#121212", minHeight: "100vh", color: "white" }}>
      <Typography variant="h4" mb={3}>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography>Total Portfolio Value</Typography>
            <Typography variant="h5">₹{totalValue.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography>Total Stocks</Typography>
            <Typography variant="h5">{stockCount}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
