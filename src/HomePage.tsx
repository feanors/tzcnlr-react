import { Box, Button } from "@mui/material";

import { Link } from "react-router-dom";
import * as React from "react";

function HomePage() {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <br />
      <br />
      <Button
        component={Link}
        to={"/newCompletedTask"}
        fullWidth
        variant={"outlined"}
        color={"success"}
      >
        İŞ GİR
      </Button>
      <br />
      <Button
        component={Link}
        to={"/completedTaskDisplay"}
        fullWidth
        variant={"outlined"}
        color={"success"}
      >
        İŞ VERİLERİNİ GÖR
      </Button>
      <br />
      <Button
        component={Link}
        to={"/companyBranch"}
        fullWidth
        variant={"outlined"}
        color={"primary"}
      >
        ŞİRKETLER VE ŞUBELER
      </Button>
      <br />
      <Button
        component={Link}
        to={"/machines"}
        fullWidth
        variant={"outlined"}
        color={"primary"}
      >
        MAKİNELER
      </Button>
      <br />
      <Button
        component={Link}
        to={"/editCompany"}
        fullWidth
        variant={"outlined"}
        color={"error"}
      >
        MEVCUT BİR ŞİRKETİ DÜZENLE
      </Button>
      <br />
    </Box>
  );
}

export default HomePage;
