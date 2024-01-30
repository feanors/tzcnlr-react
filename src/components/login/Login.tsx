import React, { useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { AccountCircleSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <br />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AccountCircleSharp
          sx={{
            width: "100px",
            height: "100px",
          }}
        />
      </Box>

      <br />
      <br />

      <FormControl fullWidth>
        <TextField
          required
          id="outlined-required"
          label="Kullanıcı Adı"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </FormControl>

      <br />

      <FormControl fullWidth>
        <TextField
          required
          id="outlined-required"
          label="Şifre"
          type={"password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormControl>
      <br />

      <Button
        onClick={() => handleLogin(username, password)}
        fullWidth
        color={"primary"}
        variant={"contained"}
      >
        GİRİŞ YAP
      </Button>
    </Box>
  );
}
