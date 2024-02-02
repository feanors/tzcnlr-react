import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Check, Close, FilterAlt } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import tr from "dayjs/locale/tr";
import dayjs from "dayjs";

type Anchor = "top" | "left" | "bottom" | "right";

export default function FilterDrawer({
  companies,
  companyBranchMap,
  handleFetchCompletedTasks,
  startDate,
  endDate,
  selectedCompany,
  selectedBranch,
  setStartDate,
  setEndDate,
  setSelectedCompanyName,
  setSelectedBranch,
  authToken,
  onAuthTokenChange,
}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const handleCompanyChange = (event: SelectChangeEvent) => {
    setSelectedCompanyName(event.target.value as string);
    setSelectedBranch("");
  };

  const handleBranchChange = (event: SelectChangeEvent) => {
    setSelectedBranch(event.target.value as string);
  };

  const handleStartDateChange = (val: dayjs.Dayjs) => {
    setStartDate(val);
  };

  const handleEndDateChange = (val: dayjs.Dayjs) => {
    setEndDate(val);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      console.log(event.type);
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const [filtersChanged, setFiltersChanged] = useState(false);

  useEffect(() => {
    onAuthTokenChange();
    handleFetchCompletedTasks(
      startDate,
      endDate,
      selectedCompany,
      selectedBranch,
    );
  }, [authToken, filtersChanged]);

  const list = (anchor: Anchor) => (
    <Box
      width={"270px"}
      paddingLeft={"5%"}
      paddingRight={"5%"}
      display={"flex"}
      flexDirection={"column"}
    >
      <br />

      <FormControl fullWidth>
        <LocalizationProvider adapterLocale={tr} dateAdapter={AdapterDayjs}>
          <DemoItem>
            <DatePicker
              defaultValue={null}
              format={"DD/MM/YYYY"}
              label={"Ne zamandan"}
              value={startDate}
              onChange={handleStartDateChange}
              ampm={false}
            />
          </DemoItem>
        </LocalizationProvider>
      </FormControl>

      <br />

      <FormControl fullWidth>
        <LocalizationProvider adapterLocale={tr} dateAdapter={AdapterDayjs}>
          <DemoItem>
            <DatePicker
              defaultValue={null}
              value={endDate}
              format={"DD/MM/YYYY"}
              label={"Ne zamana"}
              onChange={handleEndDateChange}
              ampm={false}
            />
          </DemoItem>
        </LocalizationProvider>
      </FormControl>

      <br />

      <FormControl fullWidth>
        <InputLabel id="company-name">Şirket Seçimi</InputLabel>
        <Select
          labelId="company-name"
          id="company-name-select"
          value={selectedCompany}
          label="Şirket Seçimi"
          onChange={handleCompanyChange}
        >
          {companies.map(({ companyName, id }) => (
            <MenuItem key={id} value={companyName}>
              {companyName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />

      <FormControl fullWidth>
        <InputLabel id="company-instance">Şube Seçimi</InputLabel>
        <Select
          labelId="company-instance"
          id="company-instance-select"
          value={selectedBranch}
          label="Şube Seçimi"
          onChange={handleBranchChange}
        >
          {companyBranchMap.has(selectedCompany) &&
            companyBranchMap.get(selectedCompany).map(({ branchName, id }) => (
              <MenuItem key={id} value={branchName}>
                {branchName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <br />
      <br />

      <Button
        onClick={() => {
          setFiltersChanged(!filtersChanged);
          setState({ ...state, [anchor]: false });
          console.log(state[anchor]);
        }}
        fullWidth
        color={"primary"}
        variant={"outlined"}
      >
        <Check />
        FİLTRE UYGULA
      </Button>

      <br />

      <Button
        onClick={() => {
          setStartDate(null);
          setEndDate(null);
          setSelectedCompanyName("");
          setSelectedBranch("");
          setFiltersChanged(!filtersChanged);
        }}
        fullWidth
        color={"error"}
        variant={"outlined"}
      >
        <Close />
        FİLTRELERİ KALDIR
      </Button>
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Box>
            <Box display={"flex"} justifyContent={"right"}>
              <IconButton
                onClick={toggleDrawer(anchor, true)}
                sx={{ borderRadius: "0" }}
              >
                <Typography color={"#000000"}>Filtrele</Typography>
                <FilterAlt />
              </IconButton>
            </Box>
          </Box>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
