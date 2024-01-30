import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar
      sx={{
        width: "100%%",
        bgcolor: "#000000",
        paddingLeft: "1%",
        paddingRight: "1%",
      }}
      position={"static"}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "center" }}
        disableGutters
      >
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          TEZCANLAR VİNÇ
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
