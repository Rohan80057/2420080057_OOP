import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideNav from "./components/SideNav";
import TopBar from "./components/TopBar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Investments from "./pages/Investments";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useApp } from "./context/AppContext";

function App() {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);
  const { user, logout } = useApp();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {user && <TopBar logout={logout} />}
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {user && <SideNav />}
          <div style={{ flex: 1, marginTop: user ? 64 : 0 }}>
            <Routes>
              <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/" />} />
              <Route path="/investments" element={user ? <Investments /> : <Navigate to="/" />} />
              <Route path="/transactions" element={user ? <Transactions /> : <Navigate to="/" />} />
              <Route path="/settings" element={user ? <Settings mode={mode} setMode={setMode} /> : <Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
