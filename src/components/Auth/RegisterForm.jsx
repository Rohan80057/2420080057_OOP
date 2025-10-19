import { useState } from 'react'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'

export default function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function handleSubmit(e) {
    e.preventDefault()
    onRegister(form)
  }
  return (
    <Paper sx={{ p: 4, width: 350, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Register Portfolio Account</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
          required
        />
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
          <Button variant="contained" type="submit">Register</Button>
        </Box>
      </form>
    </Paper>
  )
}
