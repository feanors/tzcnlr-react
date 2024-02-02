import React, { useEffect, useState } from "react";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import tr from "dayjs/locale/tr";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ArrowBackSharp } from "@mui/icons-material";
import { Link } from "react-router-dom";

function NewCompletedTask({
  companies,
  companyBranchMap,
  machines,
  handlePostCompletedTask,
  handleFetchMachines,
  handleFetchCompanies,
  handleFetchCompanyBranchMap,
  authToken,
  onAuthTokenChange,
}) {
  useEffect(() => {
    onAuthTokenChange();
    handleFetchMachines();
    handleFetchCompanies();
    handleFetchCompanyBranchMap();
  }, [authToken]);

  const durations = [];
  for (let i = 1; i < 24; i++) {
    durations.push((i - 1).toString() + ".5");
    durations.push(i.toString());
  }

  const rentDurations = [];
  for (let i = 1; i < 10; i++) {
    rentDurations.push(i.toString());
  }

  const handleCompanyChange = (event: SelectChangeEvent) => {
    setSelectedCompanyName(event.target.value as string);
    setSelectedBranch("");
  };

  const handleBranchChange = (event: SelectChangeEvent) => {
    setSelectedBranch(event.target.value as string);
  };

  const handleMachineChange = (event: SelectChangeEvent) => {
    setSelectedMachine(event.target.value as string);
  };

  const handleTaskStartDateChange = (val: dayjs.Dayjs) => {
    setTaskStartDate(val);
  };

  const handleTaskStartTimeChange = (val: dayjs.Dayjs) => {
    if (val != null) {
      setTaskStartTime(val);
    }
  };

  const handleTaskDurationChange = (event: SelectChangeEvent) => {
    const convertedFloat = parseFloat(event.target.value as string);
    setTaskDurationInMinutes(convertedFloat * 60);
  };

  const handleRentalDurationChange = (event: SelectChangeEvent) => {
    const convertedInt = parseInt(event.target.value as string);
    setTaskDurationInMinutes(convertedInt * 60 * 24);
  };

  const [selectedCompany, setSelectedCompanyName] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");
  const [taskStartDate, setTaskStartDate] = useState<dayjs.Dayjs>();
  const [taskStartTime, setTaskStartTime] = useState<dayjs.Dayjs>();
  const [taskDurationInMinutes, setTaskDurationInMinutes] = useState(0);
  const [isRental, setIsRental] = useState(false);

  const handleIsRentalChange = (isRental: boolean) => {
    setTaskDetail("");
    setTaskDurationInMinutes(0);
    if (isRental) {
      setTaskStartTime(dayjs(0));
    } else {
      setTaskStartTime(undefined);
    }
    setIsRental(isRental);
  };

  const [taskDetail, setTaskDetail] = useState("");

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box>
        <IconButton component={Link} to={"/home"} sx={{ borderRadius: "0" }}>
          <ArrowBackSharp />
          Anasayfaya Dön
        </IconButton>
      </Box>

      <br />

      <FormControl required fullWidth>
        <LocalizationProvider adapterLocale={tr} dateAdapter={AdapterDayjs}>
          <DemoItem>
            <DatePicker
              defaultValue={null}
              format={"DD/MM/YYYY"}
              label={"İş başlama tarihi"}
              value={taskStartDate}
              onChange={handleTaskStartDateChange}
              ampm={false}
            />
          </DemoItem>
        </LocalizationProvider>
      </FormControl>

      <br />

      <FormControl required fullWidth>
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

      <FormControl required fullWidth>
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

      <FormControl required fullWidth>
        <InputLabel id="task-selection">Makine Seçimi</InputLabel>
        <Select
          labelId="task-selection"
          id="task-select"
          value={selectedMachine}
          label="Makine Seçimi"
          onChange={handleMachineChange}
        >
          {machines.map(({ machineName }) => (
            <MenuItem value={machineName}>{machineName}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />

      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleIsRentalChange(event.target.value == "true");
          }}
        >
          <FormControlLabel
            value={"false"}
            control={<Radio />}
            label="Saatlik iş"
          />
          <FormControlLabel
            value={"true"}
            control={<Radio />}
            label="Kiralık araç"
          />
        </RadioGroup>
      </FormControl>
      {console.log(isRental)}
      <br />
      {!isRental && (
        <Box display={"flex"} flexDirection={"column"}>
          <FormControl required fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem>
                <TimePicker
                  onChange={handleTaskStartTimeChange}
                  ampm={false}
                  label="İş Başlama Saati"
                />
              </DemoItem>
            </LocalizationProvider>
          </FormControl>

          <br />

          <FormControl required fullWidth>
            <InputLabel id="duration-selection">Süre seçimi</InputLabel>
            <Select
              labelId="duration-selection"
              id="duration-select"
              label="Süre seçimi"
              onChange={handleTaskDurationChange}
            >
              {durations.map((duration) => (
                <MenuItem key={duration} value={duration}>
                  {duration} saat
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br />

          <FormControl fullWidth>
            <TextField
              id="outlined-multiline-flexible"
              label="İş detayı (opsiyonel)"
              multiline
              maxRows={20}
              value={taskDetail}
              onChange={(event) => {
                setTaskDetail(event.target.value as string);
              }}
            />
          </FormControl>
        </Box>
      )}

      {isRental && (
        <FormControl required fullWidth>
          <InputLabel id="duration-selection">Gün seçimi</InputLabel>
          <Select
            labelId="duration-selection"
            id="duration-select"
            label="Gün seçimi"
            onChange={handleRentalDurationChange}
          >
            {rentDurations.map((duration) => (
              <MenuItem key={duration} value={duration}>
                {duration} gün
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {console.log(taskDurationInMinutes)}

      <br />

      <Button
        onClick={() => {
          handlePostCompletedTask(
            selectedCompany,
            selectedBranch,
            selectedMachine,
            taskStartDate,
            taskStartTime,
            taskDurationInMinutes,
            taskDetail,
            isRental,
          );
        }}
        fullWidth
        color={"success"}
        variant={"contained"}
      >
        Tamam
      </Button>
    </Box>
  );
}

export default NewCompletedTask;
