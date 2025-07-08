import React, { useState } from "react";
import { TextField, Button, Paper, Box, Alert } from "@mui/material";
import "../index.css"; // Your pulseLogo + .logo-pill styles

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    let res;
    try {
      res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
      });
    } catch (networkErr) {
      setError("Network error: could not reach server");
      return;
    }

    // Read raw text first
    let text;
    try {
      text = await res.text();
    } catch {
      setError("Failed to read response");
      return;
    }

    // Try parsing JSON if there's content
    let data = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        // invalid JSON
        console.warn("Invalid JSON from /login:", text);
        setError("Server returned invalid data");
        return;
      }
    }

    // Handle HTTP status
    if (!res.ok) {
      // use server message or fallback
      const msg = data.message || `Login failed (${res.status})`;
      setError(msg);
      return;
    }

    // Success path: must have data.user
    if (data.user) {
      onLoginSuccess(data.user);
    } else {
      setError("Login succeeded but no user data returned");
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 4,
        maxWidth: 400,
        margin: "60px auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center"
      }}
    >
      {/* pulsing logo pill */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <span className="logo-pill">diSPENCERx</span>
      </Box>

      <form onSubmit={handleLogin} style={{ width: "100%" }}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          Log In
        </Button>
      </form>
    </Box>
  );
}
