import { AppBar, Toolbar, Typography, IconButton, Box, Avatar } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useNavigate } from 'react-router-dom'

export default function TopBar({ logout }) {
  const navigate = useNavigate()

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, background: '#181F2A', color: '#fff' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Stock Portfolio Tracker
        </Typography>
        <IconButton onClick={logout} color="inherit" title="Logout">
          <LogoutIcon />
        </IconButton>
        <Box ml={2}>
          <Avatar sx={{ bgcolor: "#6C70FF" }}>U</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
