import { Typography, Switch, Box, Paper } from '@mui/material';

export default function Settings({ mode, setMode }) {
  return (
    <Box sx={{ p: 5 }}>
      <Paper sx={{ p: 5, maxWidth: 500, mx: 'auto' }}>
        <Typography variant="h5" mb={2}>Settings</Typography>
        <Typography>Theme:</Typography>
        <Switch
          checked={mode === 'dark'}
          onChange={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        />
      </Paper>
    </Box>
  );
}
