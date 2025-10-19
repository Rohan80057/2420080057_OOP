import { useState } from 'react'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'

export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function handleSubmit(e) {
    e.preventDefault()
    onLogin(form)
  }
  return (
    <Paper sx={{ p: 4, width: 350, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Login to Portfolio</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <Box sx={{ textAlign: 'right' }}>
          <Button variant="contained" type="submit">Sign In</Button>
        </Box>
      </form>
    </Paper>
  )
}
