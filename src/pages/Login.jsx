import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Paper, Typography, TextField, Button, Divider, IconButton,
  InputAdornment, Checkbox, FormControlLabel, Snackbar
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import StarBackground from "../components/StarBackground";
import { useApp } from "../context/AppContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
    remember: false,
  });
  const [snack, setSnack] = useState({ open: false, message: "", color: "info" });
  const { login } = useApp();
  const navigate = useNavigate();

  function toggleShowPassword() {
    setForm(f => ({ ...f, showPassword: !f.showPassword }));
  }
  function handleChange(e) {
    const { name, value, checked, type } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setSnack({ open: true, message: "Please fill all fields", color: "error" });
      return;
    }
    login({ email: form.email });
    setSnack({ open: true, message: "Login successful!", color: "success" });
    setTimeout(() => navigate("/dashboard"), 900);
  }
  function social(provider) {
    setSnack({ open: true, message: `Connecting to ${provider}...`, color: "info" });
  }

  // common sx for filled fields (so autofill rules apply the same)
  const filledSx = {
    mb: 2,
    "& .MuiFilledInput-root": {
      background: "#181F2A !important",
      color: "#fff !important",
      borderRadius: "6px"
    },
    "& .MuiFilledInput-input": {
      background: "#181F2A !important",
      color: "#fff !important",
    },
    "& .Mui-focused .MuiFilledInput-root": {
      background: "#181F2A !important",
      color: "#fff !important",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#6C70FF"
    },
    "& label.Mui-focused": {
      color: "#6C70FF"
    },
    "& input:focus": {
      background: "#181F2A !important",
      color: "#fff !important"
    },
    // override browser autofill styles (very important)
    "& input:-webkit-autofill, & input:-webkit-autofill:focus, & input:-webkit-autofill:hover": {
      WebkitBoxShadow: "0 0 0 1000px #181F2A inset !important",
      boxShadow: "0 0 0 1000px #181F2A inset !important",
      WebkitTextFillColor: "#fff !important",
    },
    // firefox
    "& input:-moz-autofill": {
      boxShadow: "0 0 0 1000px #181F2A inset !important",
      MozTextFillColor: "#fff !important",
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0C0934",
        position: "relative"
      }}
    >
      <StarBackground />
      <Paper
        elevation={12}
        sx={{
          p: 5,
          width: 400,
          borderRadius: 5,
          background: "rgba(25,31,44,0.98)",
          color: "#fff",
          zIndex: 2,
          boxShadow: "0 8px 48px #17257B60",
          position: "relative",
        }}
      >
        <Box sx={{ mb: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography
            fontWeight={800}
            fontSize={28}
            color="#F5F6FA"
            variant="h3"
            textAlign="center"
            sx={{ gap: 2, display: "flex", alignItems: "center" }}
          >
            <GoogleIcon sx={{ color: "#6C70FF" }} />
            StockSight
          </Typography>
        </Box>
        <Typography variant="h5" fontWeight={600} letterSpacing={0.5} mb={1} mt={2} color="#ADB7DB" align="center">
          Welcome Back
        </Typography>
        <Typography variant="body2" color="#7b85b2" align="center" mb={2}>
          Sign in to your account to continue
        </Typography>
        {/* Note: set form autoComplete to 'on' and individual fields get explicit autocomplete attributes.
            That + the autofill override CSS prevents the white box while keeping autofill useful. */}
        <form onSubmit={handleSubmit} autoComplete="on">
          <TextField
            variant="filled"
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
            sx={filledSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#6C70FF" }} />
                </InputAdornment>
              ),
              disableUnderline: false
            }}
            InputLabelProps={{
              style: { color: "#adb7db" }
            }}
            autoComplete="email"
          />
          <TextField
            variant="filled"
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type={form.showPassword ? "text" : "password"}
            required
            fullWidth
            sx={{ ...filledSx, mb: 1.5 }}
            InputProps={{
              style: { background: "#181F2A", color: "#fff" },
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#6C70FF" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleShowPassword}
                    tabIndex={-1}
                    edge="end"
                    sx={{ color: "#6C70FF" }}
                  >
                    {form.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              disableUnderline: false
            }}
            InputLabelProps={{
              style: { color: "#adb7db" }
            }}
            autoComplete="current-password"
          />
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.remember}
                  onChange={handleChange}
                  name="remember"
                  sx={{ color: "#6C70FF" }}
                />
              }
              label={
                <Typography variant="body2" color="#ADAFD4">
                  Remember me
                </Typography>
              }
            />
            <Typography
              sx={{ cursor: "pointer", color: "#6C70FF" }}
              variant="body2"
              onClick={() => setSnack({ open: true, message: "Password reset link sent!", color: "info" })}
            >
              Forgot Password?
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              width: "100%",
              bgcolor: "#6C70FF",
              color: "#fff",
              py: 1,
              fontWeight: 600,
              fontSize: 17,
              boxShadow: "0 2px 16px #6c70ff33",
            }}
          >
            Sign In
          </Button>
        </form>
        <Divider sx={{ my: 3, bgcolor: "#1B2A3A" }}>or</Divider>
        <Box display="flex" flexDirection="column" gap={1}>
          <Button
            className="social-btn"
            onClick={() => social("Google")}
            startIcon={<GoogleIcon />}
            sx={{ bgcolor: "#fff", color: "#23283A", fontWeight: 600, mb: 0.5 }}
          >
            Continue with Google
          </Button>
          <Button
            className="social-btn"
            onClick={() => social("Facebook")}
            startIcon={<FacebookIcon />}
            sx={{ bgcolor: "#3b5998", color: "#fff", fontWeight: 600, mb: 0.5 }}
          >
            Continue with Facebook
          </Button>
          <Button
            className="social-btn"
            onClick={() => social("Phone")}
            startIcon={<PhoneAndroidIcon />}
            sx={{ bgcolor: "#181F2A", color: "#bfc7f5", fontWeight: 600 }}
          >
            Continue with Phone Number
          </Button>
        </Box>
        <Typography mt={3} fontSize={15} color="#AAB4D3" textAlign="center">
          Don&apos;t have an account?
          <span
            style={{ color: "#6C70FF", cursor: "pointer", marginLeft: 4 }}
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </Typography>
      </Paper>
      <Snackbar
        open={snack.open}
        onClose={() => setSnack({ ...snack, open: false })}
        autoHideDuration={2200}
        message={snack.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          sx: {
            bgcolor: snack.color === "error" ? "#e3575c" : "#293BA7",
            color: "#fff",
            fontWeight: 600,
          },
        }}
      />
    </Box>
  );
}
