import Navbar from "./components/Navbar.tsx";
import { ReactNode } from "react";
import { Box } from "@mui/material";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <Navbar />
      <br />
      <Box justifyContent={"center"} display={"flex"}>
        {children}
      </Box>
      <br />
    </Box>
  );
}
