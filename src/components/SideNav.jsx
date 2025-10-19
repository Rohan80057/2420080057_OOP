import { useState } from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import HistoryIcon from '@mui/icons-material/History'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, route: '/dashboard' },
  { label: 'Investments', icon: <AccountBalanceWalletIcon />, route: '/investments' },
  { label: 'Analytics', icon: <AssessmentIcon />, route: '/analytics' },
  { label: 'Transactions', icon: <HistoryIcon />, route: '/transactions' },
  { label: 'Settings', icon: <SettingsIcon />, route: '/settings' },
]

const drawerWidth = 220

export default function SideNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selected, setSelected] = useState(location.pathname)

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: "#181F2A", color: "#fff" },
      }}>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map(item => (
            <ListItem
              button
              key={item.label}
              selected={selected === item.route}
              onClick={() => {
                setSelected(item.route)
                navigate(item.route)
              }}
              sx={{
                my: 1,
                borderRadius: 2,
                background: selected === item.route ? "#222c3c" : "none"
              }}
            >
              <ListItemIcon sx={{ color: "#6C70FF" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
