import { Card, CardContent, Typography, Grid } from "@mui/material"

export default function PortfolioOverview({ value, savings, income, expenses }) {
  return (
    <Grid container spacing={3} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">Total Value</Typography>
            <Typography variant="h5">{value}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">Savings</Typography>
            <Typography variant="h5">{savings}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">Income</Typography>
            <Typography variant="h5">{income}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="subtitle2" color="textSecondary">Expenses</Typography>
            <Typography variant="h5">{expenses}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
